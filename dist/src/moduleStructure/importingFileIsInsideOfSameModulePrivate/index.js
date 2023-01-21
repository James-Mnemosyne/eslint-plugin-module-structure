'use strict';
exports.__esModule = true;
exports.importingFileIsInsideOfSameModulePrivate = void 0;
var helpers_1 = require('../helpers');
function importingFileIsInsideOfSameModulePrivate(importingPath, importedPath) {
  // Just defensive coding. No module to be at root of.
  if (!(0, helpers_1.pathIsInsideOfModulePrivate)(importedPath)) {
    return true;
  }
  var splitImportingPath = importingPath
    .slice(0, importingPath.lastIndexOf('/private/'))
    .split('/');
  var splitImportedPath = importedPath
    .slice(0, importedPath.lastIndexOf('/private/'))
    .replace(/^@/, '')
    .split('/');
  while (
    splitImportedPath.length &&
    (0, helpers_1.last)(splitImportedPath) !== (0, helpers_1.last)(splitImportingPath)
  ) {
    splitImportedPath.pop();
  }
  if (!splitImportedPath.length) {
    return false;
  }
  // Don't need to check relative, because it's already done.
  while (splitImportedPath.length) {
    var importedDir = splitImportedPath.pop();
    var importingDir = splitImportingPath.pop();
    if (importedDir !== importingDir) {
      return false;
    }
  }
  return true;
}
exports.importingFileIsInsideOfSameModulePrivate = importingFileIsInsideOfSameModulePrivate;
