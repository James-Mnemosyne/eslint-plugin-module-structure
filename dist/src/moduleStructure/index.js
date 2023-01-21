'use strict';
exports.__esModule = true;
exports.moduleStructure = void 0;
var types_1 = require('@typescript-eslint/types');
var helpers_1 = require('./helpers');
var importingFileIsAtModuleRoot_1 = require('./importingFileIsAtModuleRoot');
var importingFileIsInsideOfSameModulePrivate_1 = require('./importingFileIsInsideOfSameModulePrivate');
var relativePathDoesNotPassThroughAdditionalPrivate_1 = require('./relativePathDoesNotPassThroughAdditionalPrivate');
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
var ImportDeclaration = function (node, context) {
  var importingPath = context.getFilename();
  var importedPath = ''.concat(node.source.value);
  if (!importingFileIsInsideOfSameModule(importingPath, importedPath)) {
    context.report(
      node,
      // @ts-ignore
      'Cannot access private module component '.concat(importedPath, ' from ').concat(importingPath)
    );
  }
};
function moduleStructure(context) {
  var _a;
  return (
    (_a = {}),
    (_a[types_1.AST_NODE_TYPES.ImportDeclaration] = function (node) {
      return ImportDeclaration(node, context);
    }),
    _a
  );
}
exports.moduleStructure = moduleStructure;
