'use strict';
exports.__esModule = true;
exports.importingFileIsInsideOfSameModule = void 0;
var helpers_1 = require('../helpers');
var importingFileIsAtModuleRoot_1 = require('../importingFileIsAtModuleRoot');
var importingFileIsInsideOfSameModulePrivate_1 = require('../importingFileIsInsideOfSameModulePrivate');
var relativePathDoesNotPassThroughAdditionalPrivate_1 = require('../relativePathDoesNotPassThroughAdditionalPrivate');
var path = require('path');
function importingFileIsInsideOfSameModule(importingPath, importedPath) {
  var normalizedImportingPath = path.normalize(importingPath);
  var normalizedImportedPath = path.normalize(importedPath);
  // Just defensive coding.
  if (!(0, helpers_1.pathIsInsideOfModulePrivate)(normalizedImportedPath)) {
    return true;
  }
  if (
    (0, helpers_1.isRelativePath)(normalizedImportedPath) &&
    (0,
    relativePathDoesNotPassThroughAdditionalPrivate_1.relativePathDoesNotPassThroughAdditionalPrivate)(
      normalizedImportingPath,
      normalizedImportedPath
    )
  ) {
    return true;
  }
  if (
    (0, importingFileIsAtModuleRoot_1.importingFileIsAtModuleRoot)(
      normalizedImportingPath,
      normalizedImportedPath
    )
  ) {
    return true;
  }
  if (
    (0, importingFileIsInsideOfSameModulePrivate_1.importingFileIsInsideOfSameModulePrivate)(
      normalizedImportingPath,
      normalizedImportedPath
    )
  ) {
    return true;
  }
  return false;
}
exports.importingFileIsInsideOfSameModule = importingFileIsInsideOfSameModule;
