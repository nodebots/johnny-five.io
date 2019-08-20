require("copy-paste");
const cp = require("child_process");
const inspect = require("util").inspect;
const fs = require("fs");
const request = require("request");
const moment = require("moment");
const FeedParser = require("feedparser");
const {Remarkable} = require("remarkable");
const markdown = new Remarkable({
  html: true
});
const yfm = require("yaml-front-matter");

module.exports = function(grunt) {

  const {
    task,
    file,
    log,
    verbose,
    fail,
    option,
    config,
    template,
    util: { _ }
  } = grunt;

  let header = _.template(file.read("tpl/.header.html"));
  let footer = file.read("tpl/.footer.html");
  let navigation = file.read("tpl/.navigation.html");
  let egPrograms;
  let egTitles;
  let egSources;
  let examples;


  function loadPrograms() {
    try {
      egPrograms = JSON.parse(file.read("src/johnny-five/tpl/programs.json"));
      egTitles = egPrograms.reduce((accum, program) => {
        const titles = program.examples.reduce((accum, example) => {
          accum[example.file] = example.title;
          return accum;
        }, {});
        return Object.assign(accum, titles);
      }, {});

      egSources = Object.keys(egTitles).reduce((source, key) => {
        source[key] = file.read(`src/johnny-five/eg/${key}`);
        return source;
      }, {});
    } catch (e) {
      // console.log(e);
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


  grunt.registerTask("launch", () => {
    cp.exec("open 'http://127.0.0.1:1337/'", err => {
      console.log(err);
    });
  });

  grunt.registerTask("load-programs", () => {
    loadPrograms();
  });

  grunt.registerTask("index", "generate index", () => {
    const templates = {
      index: _.template(file.read("tpl/.index.html")),
      header,
    };

    const plugins = JSON.parse(file.read("src/platforms-plugins.json"));
    const platforms = plugins.platforms.reduce((accum, {variants}) => accum.concat(variants.filter(({enabled}) => enabled).map(({name, image}) => `[![${name}](http://static.johnny-five.io/img/platforms/small/${image})](/platform-support/#${slug(name)})`)), []).join("\n");

    file.write("public/index.html", templates.index({
      navigation,
      platforms: markdown.render(platforms),
      header: templates.header({ description: "", keywords: "" }),
      footer
    }));
  });

  grunt.registerTask("articles-from-rss", function() {
    const done = this.async();
    const targets = grunt.config("articles-from-rss.targets");
    let remaining = targets.length;
    const templates = {
      articles: _.template(file.read("tpl/.articles.html")),
      rssList: _.template(file.read("tpl/.rss-list.html")),
      header,
    };
    const rendered = "";
    const articles = {
      navigation,
      header: templates.header({ description: "", keywords: "" }),
      footer
    };

    file.mkdir("public/articles/");

    targets.forEach(({feed, name}) => {
      rssToList(feed, (err, list) => {
        articles[name] = templates.rssList({
          items: list
        });
        remaining--;
      });
    });

    setInterval(() => {
      if (remaining === 0) {
        file.write("public/articles/index.html", templates.articles(articles));
        done();
      }
    }, 0);
  });

  grunt.registerTask("examples-list", "generate examples list", () => {
    const templates = {
      examples: _.template(file.read("tpl/.examples.html")),
      header,
    };

    const accum = [];

    // refers to grunt-local "egPrograms"
    egPrograms.forEach(egProgram => {

      accum.push(`### ${egProgram.topic}`);

      egProgram.examples.forEach(example => {
        accum.push(` - [${example.title}](/examples/${example.file.replace(".js", "")}/)`);
      });

      accum.push("\n");
    });

    // refers to grunt-local "examples"
    examples = accum.join("\n");

    file.mkdir("public/examples/");
    file.write("public/examples/index.html", templates.examples({
      navigation,
      list: markdown.render(examples),
      header: templates.header({ description: ", Examples", keywords: ", Examples" }),
      footer
    }));
  });

  grunt.registerMultiTask("examples", "generate examples", function() {
    const templates = {
      exampleContent: _.template(file.read("tpl/.example-content.html")),
      header,
    };

    const apisource = file.read("src/johnny-five/lib/johnny-five.js");
    const apiignorelist = ["Color","Light","LedControl","Gripper","Fn","Distance","Repl","IR","Nodebot", "Touchpad","Wii" ];
    const apinames = extract("apinames", apisource)[0].map(value => {
      const relevant = value.split(": ")[0].trim();
      return relevant;
    }).filter(name => !apiignorelist.includes(name));
    const ogImagePath = "http://johnny-five.io/img/images/";

    const entries = JSON.parse(file.read(file.expand(this.data)));
    entries.forEach(entry => {
      entry.examples.forEach(eg => {
        const title = eg.title;
        const outpath = `public/examples/${eg.file.replace(".js", "/index.html")}`;
        const mdSource = (eg.name || eg.file).replace(".js", "");
        const inpath = `src/johnny-five/docs/${mdSource}.md`;
        const contents = markdown.render(
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

        const apilist = markdown.render(
          apinames.filter(apiname => {
            if (contents.includes(apiname)) {
              return true;
            }
          }).map(apiname => `- [${apiname}](/api/${apiname.toLowerCase()})`).join("\n")
        );

        const ogImage = ogImagePath + findImage(eg);
        const sluggedTitle = eg.file.replace(".js", "");
        const header = templates.header({ description: `, ${title}`, keywords: `, ${title}` });
        const list = markdown.render(examples);
        const url = sluggedTitle;

        // Place it into our html template
        file.mkdir(`public/examples/${sluggedTitle}`);
        file.write(outpath, templates.exampleContent({
          apilist,
          contents,
          header,
          footer,
          list,
          navigation,
          ogImage,
          title,
          url: sluggedTitle,
        }));
      });
    });
  });

  grunt.registerTask("api-docs", "generate api docs", () => {
    const templates = {
      api: _.template(file.read("tpl/.api.html")),
      apiContent: _.template(file.read("tpl/.api-content.html")),
      header,
    };

    file.mkdir("public/api/");

    const source = file.read("src/johnny-five.wiki/Home.md");
    const api = extract("api", source)[0].join("\n");
    const guides = extract("guides", source).reduce((accum, set) => accum.concat(set), []).join("\n");

    const matches = api.match(/\(https:\/\/github.com\/rwaldron\/johnny-five\/wiki\/(.*)\)/g).map(match => {

      const result = match.slice(1, -1);
      const lastIndex = result.lastIndexOf("/");
      const title = result.slice(lastIndex + 1);

      return {
        title,
        source: `src/johnny-five.wiki/${title}.md`,
        target: `api/${title.toLowerCase()}/index.html`,
        pretty: `api/${title.toLowerCase()}/`
      };
    });
    const list = markdown.render(matches.reduce((accum, {title, pretty}) => {
      accum += `- [${title}](/${pretty})\n`;
      return accum;
    }, ""));

    matches.forEach(match => {
      let examples = Object.keys(egSources).reduce((accum, example) => {
        if (egSources[example].includes(match.title)) {
          const htmlFile = example.replace(".js", "");
          accum.push(`- [${egTitles[example]}](/examples/${htmlFile})`);
        }
        return accum;
      }, []);

      if (examples.length) {
        examples.unshift("## Examples");
        examples = examples.join("\n");
      } else {
        examples = "";
      }

      const sluggedTitle = match.title.toLowerCase();

      file.mkdir(`public/api/${sluggedTitle}`);
      const source = file.read(match.source).replace(/https:\/\/github.com\/rwaldron\/johnny-five\/wiki\//g, found => "/api/");
      file.write(`public/${match.target}`, templates.apiContent({
        navigation,
        title: match.title,
        list,
        contents: markdown.render(
          // Strip sections marked for removal
          remove(source)
        ),
        examples: examples.length && markdown.render(examples),
        header: templates.header({ description: `, ${match.title}`, keywords: `, ${match.title}` }),
        footer,
        url: sluggedTitle,
      }));
    });

    file.write("public/api/index.html", templates.api({
      navigation,
      list,
      guides: markdown.render(guides),
      header: templates.header({ description: ", API Documentation", keywords: ", API, Documentation" }),
      footer
    }));
  });

  grunt.registerMultiTask("news", "generate news", function() {
    const templates = {
      author: _.template(file.read("tpl/.author.html")),
      news: _.template(file.read("tpl/.news.html")),
      newsContent: _.template(file.read("tpl/.news-content.html")),
      newsContentBody: _.template(file.read("tpl/.news-content-body.html")),
      header,
    };

    const authors = JSON.parse(file.read("src/authors.json"));

    const sources = file.expand(this.data).map(source => yfm.loadFront(file.read(source))).sort((a, b) => // Sort newest first
    new Date(b.date).getTime() - new Date(a.date).getTime());

    const latest = templates.newsContentBody(Object.assign({}, sources[0], {
      date: moment(sources[0].date).format("MMMM Do YYYY"),
      content: markdown.render(sources[0].__content),
      author: templates.author({
        author: sources[0].author,
        github: authors[sources[0].author].github
      })
    }));

    file.mkdir("public/news/");


    const list = markdown.render(sources.reduce((accum, source) => {
      const sluggedTitle = source.slug || slug(source.title);
      accum += `- [${source.title}](/news/${sluggedTitle}/)\n`;
      return accum;
    }, ""));


    sources.forEach(source => {
      const sluggedTitle = source.slug || slug(source.title);

      file.mkdir(`public/news/${sluggedTitle}`);

      const contents = templates.newsContentBody(Object.assign({}, source, {
        date: moment(source.date).format("MMMM Do YYYY"),
        content: markdown.render(source.__content),
        author: templates.author({
          author: source.author,
          github: authors[source.author].github
        }),
        title: "",
        url: sluggedTitle
      }));

      file.write(`public/news/${sluggedTitle}/index.html`, templates.newsContent({
        navigation,
        list,
        title: source.title,
        contents,
        header: templates.header({ description: `, ${source.title}`, keywords: `, ${source.title}` }),
        footer,
        url: sluggedTitle
      }));
    });

    file.write("public/news/index.html", templates.news({
      navigation,
      list,
      latest,
      header: templates.header({ description: ", News and Announcements", keywords: ", News, Announcements" }),
      footer
    }));
  });

  grunt.registerTask("platform-support", "generate platform support", () => {
    const garbage = ["<thead>","<tr><th>_</th><th>_</th></tr>","</thead>"];
    const templates = {
      platformSupport: _.template(file.read("tpl/.platform-support.html")),
      platformVariant: _.template(file.read("tpl/.platform-variant.html")),
      platformData: _.template(file.read("tpl/.platform-data.js")),
      header,
    };

    const plugins = JSON.parse(file.read("src/platforms-plugins.json"));
    const glossary = plugins.glossary;
    let contents = "";

    plugins.platforms.forEach(platform => {
      const plugin = platform.plugin;
      const env = platform.environment;

      platform.variants.forEach((variant, index) => {
        if (variant.enabled) {

          const keys = Object.keys(variant.capabilities);
          const values = keys.map(key => variant.capabilities[key]);
          const first = keys.join("|");
          // Build a table in markdown
          const header = `|${first}|`;
          const bounds = `|${first.replace(/([A-Z ])\w+/g, "-")}|`;
          const capabilities = `|${values.join("|")}|`;
          const capabilitiesA = [header, bounds, capabilities].join("\n");
          const capabilitiesB = ["|_|_|", "|-|-|"].concat(Object.keys(variant.capabilities).map((key, index) => `|${key}|${variant.capabilities[key]}|`)).join("\n");

          const information = variant.information.map(value => strip(markdown.render(value), ["<p>", "</p>"]));

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
            information,
            relationship: env.relationship,
          });
        }
      });
    });

    const platforms = plugins.platforms.reduce((accum, {variants}) => accum.concat(variants.filter(({enabled}) => enabled).map(({name, image}) => `[![${name}](http://static.johnny-five.io/img/platforms/small/${image})](/platform-support/#${slug(name)})`)), []).join("\n");

    file.mkdir("public/platform-support/");
    file.write("public/platform-support/index.html", templates.platformSupport({
      navigation,
      platforms: markdown.render(platforms),
      contents,
      header: templates.header({ description: ", Platform Support", keywords: ", Platform, Support" }),
      footer
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
    const lines = !Array.isArray(source) ? source.split("\n") : source;
    let extraction = 0;
    const extractions = [];
    let isExtraction = false;
    let isNewExtraction = false;

    lines.forEach(line => {
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
    const result = [];
    const lines = !Array.isArray(source) ? source.split("\n") : source;
    let isRemoval = false;
    let isRemovalEnd = false;

    lines.forEach(line => {
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
    const title = [
      [/^.+\//, ""],
      [/\.js/, ""],
      [/\s+/g, "-"]
    ].reduce((accum, args) => {
      accum = "".replace.apply(accum, args);
      return accum;
    }, text);

    return title.toLowerCase();
  }

  function rssToList(url, callback) {
    const req = request(url);
    const feedparser = new FeedParser();
    const items = [];

    req.on("response", function({statusCode}) {
      if (statusCode !== 200) {
        return this.emit("error", new Error("Bad status code"));
      }

      this.pipe(feedparser);
    });

    feedparser.on("readable", function() {
      const item = this.read();
      if (item) {
        items.push({
          title: item.title,
          link: item.link
        });
      }
    });

    feedparser.on("finish", () => {
      callback(null, items);
    });
  }
};



