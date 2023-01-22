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
  var splitImportedPath = importedPath.replace(/^@/, '').split('/');
  var poppedPathSegments = [];
  while (
    splitImportedPath.length &&
    (0, helpers_1.last)(splitImportedPath) !== (0, helpers_1.last)(splitImportingPath)
  ) {
    poppedPathSegments.push(splitImportedPath.pop());
  }
  // If there was a private segment removed, and it wasn't the last one popped, it's not just above the correct module. (e.g. nested).
  if (
    (poppedPathSegments === null || poppedPathSegments === void 0
      ? void 0
      : poppedPathSegments.indexOf('private')) !== -1 &&
    (poppedPathSegments === null || poppedPathSegments === void 0
      ? void 0
      : poppedPathSegments.indexOf('private')) !==
      poppedPathSegments.length - 1
  ) {
    return false;
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
