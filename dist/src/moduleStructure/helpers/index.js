'use strict';
exports.__esModule = true;
exports.pathIsInsideOfModulePrivate = exports.isRelativePath = exports.last = void 0;
function last(arr) {
  return arr[arr.length - 1];
}
exports.last = last;
function isRelativePath(path) {
  return path.startsWith('./') || path.startsWith('../');
}
exports.isRelativePath = isRelativePath;
function pathIsInsideOfModulePrivate(path) {
  return path.includes('/private/') || path.endsWith('/private');
}
exports.pathIsInsideOfModulePrivate = pathIsInsideOfModulePrivate;
