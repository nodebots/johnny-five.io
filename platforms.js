var fs = require("fs");
var csv = require("csv");

var support = fs.readFileSync("src/platform-support.csv", "utf8");
var plugins = JSON.parse(fs.readFileSync("src/platforms-plugins.json", "utf8"));

function toVariant(row) {
  return [ row[0] + " " + row[1] ].concat(row.slice(2));
}

csv.parse(support, {}, function(err, output) {
  if (err) {
    throw new Error(err);
  }

  var fields = toVariant(output[0]);
  var capabilities = fields.slice(1);
  var rows = output.slice(1).map(toVariant);
  var variants = rows.reduce(function(accum, row) {
    accum.push({
      name: row[0],
      capabilities: {
        keyed: row.slice(1).reduce(function(accum, value, index) {
          accum[capabilities[index]] = value;
          return accum;
        }, {}),
        table: [ capabilities, row.slice(1).map(function(value) {
          return value === "yes" ? 1 : 0;
        }), row.slice(1)]
      }
    });
    return accum;
  }, []);

  var mapped = variants.reduce(function(accum, variant) {
    accum[variant.name] = variant;
    return accum;
  }, {});

  plugins.platforms.forEach(function(platform) {
    platform.variants.forEach(function(variant, index) {
      if (variant.enabled) {
        platform.variants[index].capabilities = mapped[variant.name].capabilities;
      }
    });
  });

  console.log(JSON.stringify(plugins, null, 2));

  fs.writeFile("src/platforms-plugins.json", JSON.stringify(plugins, null, 2), "utf8")
});




