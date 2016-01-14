require("es6-shim");
require("array-includes").shim();
require("copy-paste");
var cp = require("child_process");
var inspect = require("util").inspect;
var fs = require("fs");
var request = require("request");
var moment = require("moment");
var FeedParser = require("feedparser");
var Remarkable = require("remarkable");
var markdown = new Remarkable({
  html: true
});
var yfm = require("yaml-front-matter");

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

  var header = _.template(file.read("tpl/.header.html"));
  var footer = file.read("tpl/.footer.html");
  var navigation = file.read("tpl/.navigation.html");
  var egPrograms;
  var egTitles;
  var egSources;
  var examples;


  function loadPrograms() {
    try {
      egPrograms = JSON.parse(file.read("src/johnny-five/tpl/programs.json"));
      egTitles = egPrograms.reduce(function(accum, program) {
        var titles = program.examples.reduce(function(accum, example) {
          accum[example.file] = example.title;
          return accum;
        }, {});
        return Object.assign(accum, titles);
      }, {});

      egSources = Object.keys(egTitles).reduce(function(source, key) {
        source[key] = file.read("src/johnny-five/eg/" + key);
        return source;
      }, {});
    } catch (e) {

      console.log(e);
    }
  }

  loadPrograms();

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
        "public/api",
        "public/news",
        "public/examples",
        "public/guides",
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
      anchorcss: {
        nonull: true,
        src: "src/sass/anchor.css",
        dest: "public/css/anchor.css"
      },
      magiccss: {
        nonull: true,
        src: "src/sass/magic.css",
        dest: "public/css/magic.css"
      },
      breadboards: {
        nonull: true,
        expand: true,
        flatten: true,
        src: "src/johnny-five/docs/breadboard/**",
        dest: "public/img/breadboard/"
      },
      img: {
        nonull: true,
        expand: true,
        cwd: "src/img",
        src: "**",
        dest: "public/img/"
      },
      audio: {
        nonull: true,
        expand: true,
        cwd: "src/audio",
        src: "**",
        dest: "public/audio/"
      },
      images: {
        nonull: true,
        expand: true,
        flatten: true,
        src: "src/johnny-five/docs/images/**",
        dest: "public/img/images/"
      },
      static: {
        nonull: true,
        expand: true,
        flatten: true,
        src: "src/img/static/**",
        dest: "public/img/static/"
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
          hostname: "127.0.0.1",
          port: 1337,
          base: "public",
          livereload: true
        }
      }
    },
    examples: {
      files: ["src/johnny-five/tpl/programs.json"]
    },
    watch: {
      regen: {
        files: ["src/**/*.*", "tpl/**/*.*"],
        tasks: ["regen"],
        options: {
          livereload: true
        },
      },
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
          copy: true,
          platformdata: true
        }
      },
      files: {
        src: [
          "Gruntfile.js",
          "src/js/**/*.js",
          "!src/js/jquery.js",
          "!src/js/tablesaw.stackonly.js",
          "!src/js/es6-shim.js"
        ]
      }
    },
    jscs: {
      files: {
        src: [
          "Gruntfile.js",
          "src/js/**/*.js",
          "!src/js/anchor.js",
          "!src/js/jquery.js",
          "!src/js/tablesaw.stackonly.js",
          "!src/js/es6-shim.js"
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
        // validateQuoteMarks: {
        //   mark: "\"",
        //   escape: true
        // }
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
    },
    "articles-from-rss": {
      targets: [
        { name: "reddit", feed: "http://www.reddit.com/r/NodeBots/.rss" }
      ]
    },
    news: {
      files: ["src/news/**/*.md"]
    },
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
  grunt.registerTask("bootstrap", ["clean:deps", "gitclone", "copy"]);
  grunt.registerTask("dev", ["load-programs", "connect", "launch", "watch"]);
  grunt.registerTask("regen", ["load-programs", "copy", "uglify", "index", "articles-from-rss", "examples-list", "examples", "api-docs", "platform-support", "news"]);
  grunt.registerTask("default", ["load-programs", "clean:build", "regen", "sass:dist", "uglify"]);


  grunt.registerTask("launch", function() {
    cp.exec("open 'http://127.0.0.1:1337/'", function(err) {
      console.log(err);
    });
  });

  grunt.registerTask("load-programs", function() {
    loadPrograms();
  });

  grunt.registerTask("index", "generate index", function() {
    var templates = {
      index: _.template(file.read("tpl/.index.html")),
      header: header,
    };

    var plugins = JSON.parse(file.read("src/platforms-plugins.json"));
    var platforms = plugins.platforms.reduce(function(accum, platform) {
      return accum.concat(platform.variants.filter(function(variant) {
        return variant.enabled;
      }).map(function(variant) {
        return "[![" + variant.name + "](http://static.johnny-five.io/img/platforms/small/" + variant.image + ")](/platform-support/#" + slug(variant.name) + ")";
      }));
    }, []).join("\n");

    file.write("public/index.html", templates.index({
      navigation: navigation,
      platforms: markdown.render(platforms),
      header: templates.header({ description: "", keywords: "" }),
      footer: footer
    }));
  });

  grunt.registerTask("articles-from-rss", function() {
    var done = this.async();
    var targets = grunt.config("articles-from-rss.targets");
    var remaining = targets.length;
    var templates = {
      articles: _.template(file.read("tpl/.articles.html")),
      rssList: _.template(file.read("tpl/.rss-list.html")),
      header: header,
    };
    var rendered = "";
    var articles = {
      navigation: navigation,
      header: templates.header({ description: "", keywords: "" }),
      footer: footer
    };

    file.mkdir("public/articles/");

    targets.forEach(function(target) {
      rssToList(target.feed, function(err, list) {
        articles[target.name] = templates.rssList({
          items: list
        });
        remaining--;
      });
    });

    setInterval(function() {
      if (remaining === 0) {
        file.write("public/articles/index.html", templates.articles(articles));
        done();
      }
    }, 0);
  });

  grunt.registerTask("examples-list", "generate examples list", function() {
    var templates = {
      examples: _.template(file.read("tpl/.examples.html")),
      header: header,
    };

    var accum = [];

    // refers to grunt-local "egPrograms"
    egPrograms.forEach(function(egProgram) {

      accum.push("### " + egProgram.topic);

      egProgram.examples.forEach(function(example) {
        accum.push(" - [" + example.title + "](/examples/" + example.file.replace(".js", "") + "/)");
      });

      accum.push("\n");
    });

    // refers to grunt-local "examples"
    examples = accum.join("\n");

    file.mkdir("public/examples/");
    file.write("public/examples/index.html", templates.examples({
      navigation: navigation,
      list: markdown.render(examples),
      header: templates.header({ description: ", Examples", keywords: ", Examples" }),
      footer: footer
    }));
  });

  grunt.registerMultiTask("examples", "generate examples", function() {
    var templates = {
      exampleContent: _.template(file.read("tpl/.example-content.html")),
      header: header,
    };

    var apisource = file.read("src/johnny-five/lib/johnny-five.js");
    var apiblacklist = ["LedControl","Gripper","Fn","Distance","Repl","IR","Nodebot","Wii" ];
    var apinames = extract("apinames", apisource)[0].map(function(value) {
      var relevant = value.split(": ")[0].trim();
      return relevant;
    }).filter(function(name) {
      return !apiblacklist.includes(name);
    });
    var ogImagePath = "http://johnny-five.io/img/images/";

    var entries = JSON.parse(file.read(file.expand(this.data)));
    entries.forEach(function(entry) {
      entry.examples.forEach(function(eg) {
        var title = eg.title;
        var outpath = "public/examples/" + eg.file.replace(".js", "/index.html");
        var mdSource = (eg.name || eg.file).replace(".js", "");
        var inpath = "src/johnny-five/docs/" + mdSource + ".md";
        var contents = markdown.render(
          // open file
          // eliminate sections marked for removal
          // modify image path
          // modify displayed fzz
          remove(file.read(inpath))
            .replace(/\]\(breadboard\//g, "](/img/breadboard/")
            .replace(/\]\(images\//g, "](/img/images/")
            .replace(/docs\/breadboard\//g, "")
            .replace(/docs\/images\//g, "")
        );

        var apilist = apinames.filter(function(apiname) {
          if (contents.includes(apiname)) {
            return true;
          }
        }).map(function(apiname) {
          return "- [" + apiname + "](/api/" + apiname.toLowerCase() + ")";
        }).join("\n");

        var ogImage = ogImagePath + findImage(eg);
        var sluggedTitle = eg.file.replace(".js", "");

        // Place it into our html template
        file.mkdir("public/examples/" + sluggedTitle);
        file.write(outpath, templates.exampleContent({
          apilist: markdown.render(apilist),
          contents: contents,
          header: templates.header({ description: ", " + title, keywords: ", " + title }),
          footer: footer,
          list: markdown.render(examples),
          navigation: navigation,
          ogImage: ogImage,
          title: title,
          url: sluggedTitle,
        }));
      });
    });
  });

  grunt.registerTask("api-docs", "generate api docs", function() {
    var templates = {
      api: _.template(file.read("tpl/.api.html")),
      apiContent: _.template(file.read("tpl/.api-content.html")),
      header: header,
    };

    file.mkdir("public/api/");

    var source = file.read("src/johnny-five.wiki/Home.md");
    var api = extract("api", source)[0].join("\n");
    var guides = extract("guides", source).reduce(function(accum, set) {
      return accum.concat(set);
    }, []).join("\n");

    var matches = api.match(/\(https:\/\/github.com\/rwaldron\/johnny-five\/wiki\/(.*)\)/g).map(function(match) {

      var result = match.slice(1, -1);
      var lastIndex = result.lastIndexOf("/");
      var title = result.slice(lastIndex + 1);

      return {
        title: title,
        source: "src/johnny-five.wiki/" + title + ".md",
        target: "api/" + title.toLowerCase() + "/index.html",
        pretty: "api/" + title.toLowerCase() + "/"
      };
    });

    var list = markdown.render(matches.reduce(function(accum, match) {
      accum += "- [" + match.title + "](/" + match.pretty + ")\n";
      return accum;
    }, ""));

    matches.forEach(function(match) {
      var examples = Object.keys(egSources).reduce(function(accum, example) {
        if (egSources[example].includes(match.title)) {
          var htmlFile = example.replace(".js", "");
          accum.push("- [" + egTitles[example] + "](/examples/" + htmlFile + ")");
        }
        return accum;
      }, []);


      if (examples.length) {
        examples.unshift("## Examples");
        examples = examples.join("\n");
      }

      var sluggedTitle = match.title.toLowerCase();

      file.mkdir("public/api/" + sluggedTitle);

      var source = file.read(match.source).replace(/https:\/\/github.com\/rwaldron\/johnny-five\/wiki\//g, function(found) {
        return "/api/";
      });

      file.write("public/" + match.target, templates.apiContent({
        navigation: navigation,
        title: match.title,
        list: list,
        contents: markdown.render(
          // Strip sections marked for removal
          remove(source)
        ),
        examples: markdown.render(examples),
        header: templates.header({ description: ", " + match.title, keywords: ", " + match.title }),
        footer: footer,
        url: sluggedTitle,
      }));
    });

    file.write("public/api/index.html", templates.api({
      navigation: navigation,
      list: list,
      guides: markdown.render(guides),
      header: templates.header({ description: ", API Documentation", keywords: ", API, Documentation" }),
      footer: footer
    }));
  });

  grunt.registerMultiTask("news", "generate news", function() {
    var templates = {
      author: _.template(file.read("tpl/.author.html")),
      news: _.template(file.read("tpl/.news.html")),
      newsContent: _.template(file.read("tpl/.news-content.html")),
      newsContentBody: _.template(file.read("tpl/.news-content-body.html")),
      header: header,
    };

    var authors = JSON.parse(file.read("src/authors.json"));

    var sources = file.expand(this.data).map(function(source) {
      return yfm.loadFront(file.read(source));
    }).sort(function(a, b) {
      // Sort newest first
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

    var latest = templates.newsContentBody(Object.assign({}, sources[0], {
      date: moment(sources[0].date).format("MMMM Do YYYY"),
      content: markdown.render(sources[0].__content),
      author: templates.author({
        author: sources[0].author,
        github: authors[sources[0].author].github
      })
    }));

    file.mkdir("public/news/");


    var list = markdown.render(sources.reduce(function(accum, source) {
      var sluggedTitle = source.slug || slug(source.title);
      accum += "- [" + source.title + "](/news/" + sluggedTitle + "/)\n";
      return accum;
    }, ""));


    sources.forEach(function(source) {
      var sluggedTitle = source.slug || slug(source.title);

      file.mkdir("public/news/" + sluggedTitle);

      var contents = templates.newsContentBody(Object.assign({}, source, {
        date: moment(source.date).format("MMMM Do YYYY"),
        content: markdown.render(source.__content),
        author: templates.author({
          author: source.author,
          github: authors[source.author].github
        }),
        title: "",
        url: sluggedTitle
      }));

      file.write("public/news/" + sluggedTitle + "/index.html", templates.newsContent({
        navigation: navigation,
        list: list,
        title: source.title,
        contents: contents,
        header: templates.header({ description: ", " + source.title, keywords: ", " + source.title }),
        footer: footer,
        url: sluggedTitle
      }));
    });

    file.write("public/news/index.html", templates.news({
      navigation: navigation,
      list: list,
      latest: latest,
      header: templates.header({ description: ", News and Announcements", keywords: ", News, Announcements" }),
      footer: footer
    }));
  });

  grunt.registerTask("platform-support", "generate platform support", function() {
    var garbage = ["<thead>","<tr><th>_</th><th>_</th></tr>","</thead>"];
    var templates = {
      platformSupport: _.template(file.read("tpl/.platform-support.html")),
      platformVariant: _.template(file.read("tpl/.platform-variant.html")),
      platformData: _.template(file.read("tpl/.platform-data.js")),
      header: header,
    };

    var plugins = JSON.parse(file.read("src/platforms-plugins.json"));
    var glossary = plugins.glossary;
    var contents = "";

    plugins.platforms.forEach(function(platform) {
      var plugin = platform.plugin;
      var env = platform.environment;

      platform.variants.forEach(function(variant, index) {
        if (variant.enabled) {

          var keys = Object.keys(variant.capabilities);
          var values = keys.map(function(key) {
            return variant.capabilities[key];
          });
          var first = keys.join("|");
          // Build a table in markdown
          var header = "|" + first + "|";
          var bounds = "|" + first.replace(/([A-Z ])\w+/g, "-") + "|";
          var capabilities = "|" + values.join("|") + "|";
          var capabilitiesA = [header, bounds, capabilities].join("\n");
          var capabilitiesB = ["|_|_|", "|-|-|"].concat(Object.keys(variant.capabilities).map(function(key, index) {
            return "|" + key + "|" + variant.capabilities[key] + "|";
          })).join("\n");

          var information = variant.information.map(function(value) {
            return strip(markdown.render(value), ["<p>", "</p>"]);
          });

          contents += templates.platformVariant({
            capabilitiesA: markdown.render(capabilitiesA),
            capabilitiesB: strip(markdown.render(capabilitiesB), garbage),
            image: variant.image,
            name: variant.name,
            pluginName: plugin.name,
            pluginUrl: plugin.url,
            pluginInstructions: plugin.instructions,
            envName: env.name,
            envUrl: env.url,
            envInstructions: env.instructions,
            envRelationship: strip(markdown.render(glossary[env.relationship]), ["<p>", "</p>"]),
            information: information,
            relationship: env.relationship,
          });
        }
      });
    });

    var platforms = plugins.platforms.reduce(function(accum, platform) {
      return accum.concat(platform.variants.filter(function(variant) {
        return variant.enabled;
      }).map(function(variant) {
        return "[![" + variant.name + "](http://static.johnny-five.io/img/platforms/" + variant.image + ")](/platform-support/#" + slug(variant.name) + ")";
      }));
    }, []).join("\n");

    file.mkdir("public/platform-support/");
    file.write("public/platform-support/index.html", templates.platformSupport({
      navigation: navigation,
      platforms: markdown.render(platforms),
      contents: contents,
      header: templates.header({ description: ", Platform Support", keywords: ", Platform, Support" }),
      footer: footer
    }));

    file.write("public/js/platform-data.js", templates.platformData({
      platforms: JSON.stringify(plugins, null, 2)
    }));
  });

  function findImage(example) {
    if (example.images) {
      return example.images[0].file;
    }
    return example.file.replace(".js", ".png");
  }

  function extract(name, source) {
    var lines = !Array.isArray(source) ? source.split("\n") : source;
    var extraction = 0;
    var extractions = [];
    var isExtraction = false;
    var isNewExtraction = false;

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

  function remove(source) {
    var result = [];
    var lines = !Array.isArray(source) ? source.split("\n") : source;
    var isRemoval = false;
    var isRemovalEnd = false;

    lines.forEach(function(line) {
      if (line.includes("remove-end")) {
        isRemovalEnd = true;
      }

      if (line.includes("remove-start")) {
        isRemoval = true;
      }

      if (!isRemoval) {
        result.push(line);
      }

      if (isRemovalEnd) {
        isRemovalEnd = false;
        isRemoval = false;
      }
    });

    return result.join("\n").trim();
  }

  function strip(text, targets) {
    return text.replace(new RegExp(targets.join("|"), "g"), "");
  }

  function slug(text) {
    var title = [
      [/^.+\//, ""],
      [/\.js/, ""],
      [/\s+/g, "-"]
    ].reduce(function(accum, args) {
      accum = "".replace.apply(accum, args);
      return accum;
    }, text);

    return title.toLowerCase();
  }

  function rssToList(url, callback) {
    var req = request(url);
    var feedparser = new FeedParser();
    var items = [];

    req.on("response", function(res) {
      if (res.statusCode !== 200) {
        return this.emit("error", new Error("Bad status code"));
      }

      this.pipe(feedparser);
    });

    feedparser.on("readable", function() {
      var item = this.read();
      items.push({
        title: item.title,
        link: item.link
      });
    });

    feedparser.on("finish", function() {
      callback(null, items);
    });
  }
};



