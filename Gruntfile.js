require("es6-shim");
require("copy-paste");
var inspect = require("util").inspect;
var fs = require("fs");
var Remarkable = require("remarkable");
var markdown = new Remarkable();

module.exports = function(grunt) {

  var task = grunt.task;
  var file = grunt.file;
  var log = grunt.log;
  var verbose = grunt.verbose;
  var fail = grunt.fail;
  var option = grunt.option;
  var config = grunt.config;
  var template = grunt.template;
  var _ = grunt.util._;

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    gitclone: {
      "johnny-five": {
        options: {
          repository: "https://github.com/rwaldron/johnny-five.git",
          directory: "src/johnny-five",
          depth: 1
        }
      },
      "johnny-five.wiki": {
        options: {
          repository: "https://github.com/rwaldron/johnny-five.wiki.git",
          directory: "src/johnny-five.wiki",
          depth: 1
        }
      }
    },
    clean: {
      build: [
        "public/css",
        "public/js",
        "public/docs"
      ],
      deps: [
        "src/johnny-five",
        "src/johnny-five.wiki"
      ]
    },
    copy: {
      type: {
        nonull: true,
        src: "src/sass/type.css",
        dest: "public/css/type.css"
      },
      programs: {
        nonull: true,
        src: "src/johnny-five/programs.json",
        dest: "public/js/programs.json"
      },
      breadboards: {
        nonull: true,
        expand: true,
        flatten: true,
        src: "src/johnny-five/docs/breadboard/**",
        dest: "public/img/breadboard/"
      },
      images: {
        nonull: true,
        expand: true,
        cwd: "src/img",
        src: "**",
        dest: "public/img/"
      }
    },
    sass: {
      dev: {
        files: {
          "public/css/styles.css": "src/sass/styles.scss"
        },
        options: {
          update: true
        }
      },
      dist: {
        files: {
          "public/css/styles.css": "src/sass/styles.scss"
        },
        options: {
          style: "compact",
          sourcemap: "none"
        }
      }
    },
    connect: {
      server: {
        options: {
          port: 1337,
          base: "public",
          livereload: true
        }
      }
    },
    examples: {
      files: ["src/johnny-five/programs.json"]
    },
    watch: {
      css: {
        files: "src/sass/*.scss",
        tasks: ["sass:dev"],
        options: {
          livereload: true
        },
      },
      html: {
        files: "public/*.html",
        tasks: [],
        options: {
          livereload: true
        }
      },
      js: {
        files: ["src/js/**/*.js", "Gruntfile.js"],
        tasks: ["jsbeautifier", "jshint", "jscs", "uglify"],
        options: {
          livereload: true
        }
      }
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: false,
        newcap: false,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        node: true,
        strict: false,
        esnext: true,
        globals: {
          exports: true,
          document: true,
          $: true,
          Radar: true,
          WeakMap: true,
          window: true,
          copy: true
        }
      },
      files: {
        src: [
          "Gruntfile.js",
          "src/js/**/*.js"
        ]
      }
    },
    jscs: {
      files: {
        src: [
          "Gruntfile.js",
          "src/js/**/*.js"
        ]
      },
      options: {
        config: ".jscsrc",
        requireCurlyBraces: [
          "if",
          "else",
          "for",
          "while",
          "do",
          "try",
          "catch",
        ],
        disallowNewlineBeforeBlockStatements: true,
        requireSpaceBeforeBlockStatements: true,
        requireParenthesesAroundIIFE: true,
        requireSpacesInConditionalExpression: true,
        // requireSpaceBeforeKeywords: true,
        requireSpaceAfterKeywords: [
          "if", "else",
          "switch", "case",
          "try", "catch",
          "do", "while", "for",
          "return", "typeof", "void",
        ],
        validateQuoteMarks: {
          mark: "\"",
          escape: true
        }
      }
    },
    jsbeautifier: {
      files: ["src/js/**/*.js"],
      options: {
        js: {
          braceStyle: "collapse",
          breakChainedMethods: false,
          e4x: false,
          evalCode: false,
          indentChar: " ",
          indentLevel: 0,
          indentSize: 2,
          indentWithTabs: false,
          jslintHappy: false,
          keepArrayIndentation: false,
          keepFunctionIndentation: false,
          maxPreserveNewlines: 10,
          preserveNewlines: true,
          spaceBeforeConditional: true,
          spaceInParen: false,
          unescapeStrings: false,
          wrapLineLength: 0
        }
      }
    },
    uglify: {
      my_target: {
        options: {
          sourceMap: true
        },
        files: [{
          expand: true,
          cwd: "src/js",
          src: "**/*.js",
          dest: "public/js"
        }]
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks("grunt-contrib-sass");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-contrib-connect");
  grunt.loadNpmTasks("grunt-git");
  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-jsbeautifier");
  grunt.loadNpmTasks("grunt-jscs");
  grunt.loadNpmTasks("grunt-contrib-cssmin");
  grunt.loadNpmTasks("grunt-contrib-uglify");

  // Default task(s).
  // grunt.registerTask("default", ["uglify"]);
  grunt.registerTask("install", ["clean:deps", "gitclone"]);
  grunt.registerTask("dev", ["connect", "copy", "watch"]);
  grunt.registerTask("default", ["clean:build", "examples-list", "examples", "copy", "sass:dist", "uglify"]);


  grunt.registerTask("examples-list", "generate examples list", function() {
    var templates = {
      eghome: _.template(file.read("tpl/.eghome.html")),
    };

    var examples = extract("examples", file.read("src/johnny-five/README.md")).map(function(extraction) {
      return extraction.map(function(line) {
        return line
          .replace("https://github.com/rwaldron/johnny-five/blob/master/docs/", "/examples/")
          .replace(".md", ".html")
          .replace("###", "##");
      }).join("\n");
    });

    file.write("public/examples.html", templates.eghome({
      list: markdown.render(examples[0]).replace(/<ul>/g, "<ul class='docslist'>")
    }));
  });

  grunt.registerMultiTask("examples", "generate examples", function() {
    var remove = {
      license: file.read("tpl/.license.html")
    };

    var templates = {
      eghtml: _.template(file.read("tpl/.eghtml.html")),
    };

    var entries = JSON.parse(file.read(file.expand(this.data)));
    var titles = JSON.parse(file.read("src/titles.json"));

    entries.forEach(function(entry) {
      var isHeading = Array.isArray(entry);
      var heading = isHeading ? entry[0] : null;
      var example, title, inpath, outpath;

      if (!isHeading) {
        title = titles[entry];
        outpath = "public/examples/" + entry.replace(".js", ".html");
        inpath = "src/johnny-five/docs/" + entry.replace(".js", ".md");
        example = markdown.render(
          file.read(inpath).replace(/\]\(breadboard\//g, "](../img/breadboard/")
        );

        Object.keys(remove).forEach(function(key) {
          example = example.replace(remove[key], "");
        });

        // Place it into our html template
        file.write(outpath, templates.eghtml({
          title: title,
          example: example
        }));
      }
    });
  });


  function extract(name, source) {
    var lines = source;
    var extraction = 0;
    var extractions = [];
    var isExtraction = false;
    var isNewExtraction = false;

    if (!Array.isArray(lines)) {
      lines = lines.split("\n");
    }

    lines.forEach(function(line) {
      if (line.includes("extract-end") && line.includes(name)) {
        isExtraction = false;
        extraction++;
      }

      if (isExtraction) {
        if (isNewExtraction) {
          isNewExtraction = false;
          extractions[extraction] = [];
        }

        extractions[extraction].push(line);
      }

      if (line.includes("extract-start") && line.includes(name)) {
        isExtraction = true;
        isNewExtraction = true;
      }

    });

    return extractions;
  }
};



