require("copy-paste");
var inspect = require("util").inspect;
var fs = require("fs");

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
        clone: {
            options: {
                repository: "https://github.com/rwaldron/johnny-five.git",
                directory: "src/j5",
                depth: 1
            }
        }
    },
    clean:{
      build:[
        "public/css",
        "public/js",
        "public/docs"
      ]
    },
    copy:{
      pure: {
        nonull: true,
        src: "node_modules/purecss/pure-nr-min.css",
        dest: "public/css/pure.min.css"
      }
    },
    sass: {
      dev: {
        files: {
          "public/css/styles.css": "src/sass/styles.scss"
        },
        options:{
          update: true
        }
      },
      dist: {
        files: {
          "public/css/styles.css": "src/sass/styles.scss"
        },
        options:{
          style: "compact",
          sourcemap: "none"
        }
      }
    },
    metalsmith:{
      docsGen: {
        options: {
          plugins: {
            "metalsmith-markdown":{

            }
          }
        },
        src: "src/docs",
        dest: "public/docs-markup"
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
    docs: {
      files: ["src/j5/programs.json"]
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
        options:{
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
  grunt.loadNpmTasks("grunt-metalsmith");
  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-jsbeautifier");
  grunt.loadNpmTasks("grunt-jscs");
  grunt.loadNpmTasks("grunt-contrib-cssmin");
  grunt.loadNpmTasks("grunt-contrib-uglify");  

  // Default task(s).
  // grunt.registerTask("default", ["uglify"]);
  grunt.registerTask("install", ["gitclone", "docs"]);
  grunt.registerTask("dev", ["connect", "watch"]);
  grunt.registerTask("default", ["clean", "metalsmith", "copy", "sass:dist", "uglify"]);


  grunt.registerMultiTask("docs", "generate simple docs from examples", function() {
    var templates = {
      doc: _.template(file.read("src/j5/tpl/.docs.md")),
      img: _.template(file.read("src/j5/tpl/.img.md")),
      fritzing: _.template(file.read("src/j5/tpl/.fritzing.md")),
      doclink: _.template(file.read("src/j5/tpl/.readme.doclink.md")),
      readme: _.template(file.read("src/j5/tpl/.readme.md")),
      noedit: _.template(file.read("src/j5/tpl/.noedit.md")),
      plugin: _.template(file.read("src/j5/tpl/.plugin.md")),
    };
    // Concat specified files.
    var entries = JSON.parse(file.read(file.expand(this.data)));
    var readme = [];
    var tplType = "doc";
    entries.forEach(function(entry) {
      var values, markdown, eg, md, png, fzz, title,
      hasPng, hasFzz, inMarkdown, filepath, fritzfile, fritzpath;
      var isHeading = Array.isArray(entry);
      var heading = isHeading ? entry[0] : null;

      if (isHeading) {
        tplType = entry.length === 2 ? entry[1] : "doc";
        // Produces:
        // "### Heading\n"
        readme.push("\n### " + heading + "\n");
        // TODO: figure out a way to have tiered subheadings
        // readme.push(
        // entry.reduce(function( prev, val, k ) {
        // // Produces:
        // // "### Board\n"
        // return prev + (Array(k + 4).join("#")) + " " + val + "\n";
        // }, "")
        // );
      } else {
        filepath = "src/j5/eg/" + entry;
        eg = file.read(filepath);
        md = "src/docs/" + entry.replace(".js", ".md");
        png = "src/docs/breadboard/" + entry.replace(".js", ".png");
        fzz = "src/docs/breadboard/" + entry.replace(".js", ".fzz");
        title = entry;
        markdown = [];
        // Generate a title string from the file name
        [
        [/^.+\//, ""],
        [/\.js/, ""],
        [/\-/g, " "]
        ].forEach(function(args) {
          title = "".replace.apply(title, args);
        });
        fritzpath = fzz.split("/");
        fritzfile = fritzpath[fritzpath.length - 1];
        inMarkdown = false;
        // Modify code in example to appear as it would if installed via npm
        eg = eg.replace(/\.\.\/lib\/|\.js/g, "")
        .split("\n").filter(function(line) {
          if (/@markdown/.test(line)) {
            inMarkdown = !inMarkdown;
            return false;
          }
          if (inMarkdown) {
            line = line.trim();
            if (line) {
              markdown.push(
                line.replace(/^\/\//, "").trim()
                );
            }
        // Filter out the markdown lines
        // from the main content.
        return false;
        }
        return true;
        }).join("\n");
        hasPng = fs.existsSync(png);
        hasFzz = fs.existsSync(fzz);
        // console.log( markdown );
        values = {
          title: _.titleize(title),
          command: "node " + filepath,
          example: eg,
          file: md,
          markdown: markdown.join("\n"),
          breadboard: hasPng ? templates.img({ png: png }) : "",
          fritzing: hasFzz ? templates.fritzing({ fzz: fzz }) : ""
        };
        // Write the file to /docs/*
        file.write(md, templates[tplType](values));
        // Push a rendered markdown link into the readme "index"
        readme.push(templates.doclink(values));
      }
    });
  });
};