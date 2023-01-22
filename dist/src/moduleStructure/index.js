'use strict';
exports.__esModule = true;
exports.moduleStructure = void 0;
var types_1 = require('@typescript-eslint/types');
var importingFileIsInsideOfSameModule_1 = require('./importingFileIsInsideOfSameModule');
var ImportDeclaration = function (node, context) {
  var importingPath = context.getFilename();
  var importedPath = ''.concat(node.source.value);
  if (
    !(0, importingFileIsInsideOfSameModule_1.importingFileIsInsideOfSameModule)(
      importingPath,
      importedPath
    )
  ) {
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
