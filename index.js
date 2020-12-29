const { Namer } = require("@parcel/plugin");
const path = require('path');

staticFilename = (bundle, bundleGraph, entryRoot) => {
  let bundleGroup = bundleGraph.getBundleGroupsContainingBundle(bundle)[0];
  let bundleGroupBundles = bundleGraph.getBundlesInBundleGroup(bundleGroup);
  let mainBundle = bundleGroupBundles.find(b =>
    b.getEntryAssets().some(a => a.id === bundleGroup.entryAssetId),
  );
  return nameFromContent(
    mainBundle,
    bundleGroup.entryAssetId,
    entryRoot,
  );
}

// copied from: https://github.com/parcel-bundler/parcel/blob/v2/packages/namers/default/src/DefaultNamer.js
function nameFromContent(bundle, entryAssetId, entryRoot) {
  const COMMON_NAMES = new Set(['index', 'src', 'lib']);
  let entryFilePath = bundle.getEntryAssets().find(a => a.id === entryAssetId).filePath;
  let name = basenameWithoutExtension(entryFilePath);
  if (bundle.isEntry) {
    if (bundle.target.distEntry != null) {
      return basenameWithoutExtension(bundle.target.distEntry);
    }
    return path
      .join(path.relative(entryRoot, path.dirname(entryFilePath)), name)
      .replace(/\.\.(\/|\\)/g, '__$1');
  } else {
    while (COMMON_NAMES.has(name)) {
      entryFilePath = path.dirname(entryFilePath);
      name = path.basename(entryFilePath);
    }
    return name;
  }
}

function basenameWithoutExtension(file) {
  return path.basename(file, path.extname(file));
}

module.exports = new Namer({
  async name({ bundle, bundleGraph, logger, options }) {
    if (bundle.filePath != null) {
      // a target specified a output path
      return bundle.filePath;
    }
    return `${staticFilename(bundle, bundleGraph, options.entryRoot)}.${bundle.type}`;
  },
});