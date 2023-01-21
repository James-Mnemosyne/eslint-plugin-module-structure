'use strict';
exports.__esModule = true;
exports.importingFileIsAtModuleRoot = void 0;
var helpers_1 = require('../helpers');
function importingFileIsAtModuleRoot(importingPath, importedPath) {
  // Just defensive coding. No module to be at root of.
  if (!(0, helpers_1.pathIsInsideOfModulePrivate)(importedPath)) {
    return true;
  }
  if (!importedPath.endsWith('/private') && importedPath.lastIndexOf('/private/') === 1) {
    return true;
  }
  var splitImportingPath = importingPath.split('/');
  var splitImportedPath = importedPath.replace(/^@/, '').split('/');
  while (
    splitImportedPath.length &&
    (0, helpers_1.last)(splitImportedPath) !== (0, helpers_1.last)(splitImportingPath)
  ) {
    splitImportedPath.pop();
  }
  if (!splitImportedPath.length) {
    return false;
  }
  while (splitImportedPath.length) {
    var importedDir = splitImportedPath.pop();
    var importingDir = splitImportingPath.pop();
    if (importedDir !== importingDir) {
      return false;
    }
  }
  return true;
}
exports.importingFileIsAtModuleRoot = importingFileIsAtModuleRoot;
