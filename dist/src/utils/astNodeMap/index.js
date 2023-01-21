'use strict';
exports.__esModule = true;
exports.getASTNodeMap = void 0;
var types_1 = require('@typescript-eslint/types');
var reducers_1 = require('../reducers');
function isValid() {
  return false;
}
function logNode(context, node, astNodeName) {
  console.log('node', astNodeName, node);
  if (!isValid()) {
    // @ts-ignore
    context.report(node, 'notValid');
  }
}
function getASTNodeMap(context) {
  return Object.values(types_1.AST_NODE_TYPES)
    .map(function (nodeType) {
      var _a;
      return (
        (_a = {}),
        (_a[nodeType] = function (node) {
          return logNode(context, node, nodeType);
        }),
        _a
      );
    })
    .reduce(reducers_1.Merge, {});
}
exports.getASTNodeMap = getASTNodeMap;
