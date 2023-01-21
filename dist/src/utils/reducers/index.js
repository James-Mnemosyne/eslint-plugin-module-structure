'use strict';
exports.__esModule = true;
exports.Merge = void 0;
function Merge(initialMap, newMap) {
  // TODO: Suspect that this probably optimizes if the reference is unchanged. Verify.
  Object.keys(newMap !== null && newMap !== void 0 ? newMap : {}).forEach(function (key) {
    initialMap[key] = newMap[key];
  });
  return initialMap;
}
exports.Merge = Merge;
