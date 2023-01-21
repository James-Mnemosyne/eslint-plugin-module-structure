'use strict';
exports.__esModule = true;
exports.getCircularReplacer = void 0;
function getCircularReplacer() {
  var seen = new WeakSet();
  return function (_key, value) {
    if (typeof value === 'object' && value !== null) {
      if (seen.has(value)) {
        return;
      }
      seen.add(value);
    }
    return value;
  };
}
exports.getCircularReplacer = getCircularReplacer;
