'use strict';
exports.__esModule = true;
exports.importingFileIsInsideOfSameModule = void 0;
var helpers_1 = require('../helpers');
var importingFileIsAtModuleRoot_1 = require('../importingFileIsAtModuleRoot');
var importingFileIsInsideOfSameModulePrivate_1 = require('../importingFileIsInsideOfSameModulePrivate');
var relativePathDoesNotPassThroughAdditionalPrivate_1 = require('../relativePathDoesNotPassThroughAdditionalPrivate');
function importingFileIsInsideOfSameModule(importingPath, importedPath) {
  // Just defensive coding.
  if (!(0, helpers_1.pathIsInsideOfModulePrivate)(importedPath)) {
    return true;
  }
  if (
    (0, helpers_1.isRelativePath)(importedPath) &&
    (0,
    relativePathDoesNotPassThroughAdditionalPrivate_1.relativePathDoesNotPassThroughAdditionalPrivate)(
      importingPath,
      importedPath
    )
  ) {
    return true;
  }
  if ((0, importingFileIsAtModuleRoot_1.importingFileIsAtModuleRoot)(importingPath, importedPath)) {
    return true;
  }
  if (
    (0, importingFileIsInsideOfSameModulePrivate_1.importingFileIsInsideOfSameModulePrivate)(
      importingPath,
      importedPath
    )
  ) {
    return true;
  }
  return false;
}
exports.importingFileIsInsideOfSameModule = importingFileIsInsideOfSameModule;
