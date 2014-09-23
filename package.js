Package.describe({
  name: "sergeyt:d3-gems",
  summary: "d3-gems - collection of reusable widgets powered by d3.js.",
  git: "https://github.com/sergeyt/d3-gems",
  version: "0.0.8"
});

Package.onUse(function(api){
  var client = ["client"];
  api.use(['jquery', 'd3'], client);
  api.addFiles('dist/d3-tip.js', client);
  api.addFiles('dist/d3.gems.js', client);
  api.addFiles('dist/d3.gems.css', client);
});

