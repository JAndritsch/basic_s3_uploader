var bs3u = {
  version: {
    full: "2.0.5",
    major: "2",
    minor: "0",
    patch: "5"
  }
};

bs3u.extend = function(parent, child) {
  for (attr in Object.keys(parent)) {
    child[attr] = parent[attr]
  }
  return child;
}
