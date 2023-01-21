'use strict';
exports.__esModule = true;
exports.getBaseASTNodeMap = void 0;
var types_1 = require('@typescript-eslint/types');
var reducers_1 = require('../reducers');
function getBaseASTNodeMap() {
  return Object.values(types_1.AST_NODE_TYPES)
    .map(function (nodeType) {
      var _a;
      return (
        (_a = {}),
        (_a[nodeType] = function (_node) {
          return;
        }),
        _a
      );
    })
    .reduce(reducers_1.Merge, {});
}
exports.getBaseASTNodeMap = getBaseASTNodeMap;
