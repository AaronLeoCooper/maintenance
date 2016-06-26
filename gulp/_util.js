var _ = require('lodash/fp');

module.exports.buildOpts = function (defaults, opts) {
  var o = _.defaults(defaults)(opts);

  if (_.isArray(o.entry)) {
    var entryArr = [];
    _.each(o.entry, function (entry) {
      entryArr.push(o.paths[0] + entry);
    });
    o.entry = entryArr;
  } else {
    o.entry = o.paths[0] + o.entry;
  }

  return o;
}

module.exports.paths = {
  dev: process.env.npm_config_dev,
  dist: process.env.npm_config_dist
}
