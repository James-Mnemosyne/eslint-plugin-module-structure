'use strict';
var __spreadArray =
  (this && this.__spreadArray) ||
  function (to, from, pack) {
    if (pack || arguments.length === 2)
      for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
          if (!ar) ar = Array.prototype.slice.call(from, 0, i);
          ar[i] = from[i];
        }
      }
    return to.concat(ar || Array.prototype.slice.call(from));
  };
exports.__esModule = true;
exports.moduleStructure = void 0;
var types_1 = require('@typescript-eslint/types');
function last(arr) {
  return arr[arr.length - 1];
}
function pathIsInsideOfModulePrivate(path) {
  return (
    (path === null || path === void 0 ? void 0 : path.includes('/private/')) ||
    path.endsWith('/private')
  );
}
function importingFileIsAtModuleRoot(importingPath, importedPath) {
  // Just defensive coding. No module to be at root of.
  if (!pathIsInsideOfModulePrivate(importedPath)) {
    return true;
  }
  if (
    importedPath === './private' ||
    (importedPath.startsWith('./private/') &&
      !importedPath.endsWith('/private') &&
      importedPath.lastIndexOf('/private/') === 1)
  ) {
    return true;
  }
  var splitImportingPath = importingPath.split('/');
  var splitImportedPath = importedPath.replace(/^@/, '').split('/');
  while (splitImportedPath.length && last(splitImportedPath) !== last(splitImportingPath)) {
    splitImportedPath.pop();
  }
  if (!splitImportedPath.length) {
    return false;
  }
  while (splitImportedPath.length) {
    var importedDir = splitImportedPath.pop();
    var importingDir = splitImportingPath.pop();
    if (importedDir !== importingDir) {
      return false;
    }
  }
  // TODO: technically, we should handle even dumber edge cases.
  return !splitImportedPath.every(function (segment) {
    return segment == '.';
  });
}
function importingFileIsInsideOfSameModulePrivate(importingPath, importedPath) {
  // Just defensive coding. No module to be at root of.
  if (!pathIsInsideOfModulePrivate(importedPath)) {
    return true;
  }
  var splitImportingPath = importingPath
    .slice(0, importingPath.lastIndexOf('/private/'))
    .split('/');
  var splitImportedPath = importedPath
    .slice(0, importedPath.lastIndexOf('/private/'))
    .replace(/^@/, '')
    .split('/');
  while (splitImportedPath.length && last(splitImportedPath) !== last(splitImportingPath)) {
    splitImportedPath.pop();
  }
  if (!splitImportedPath.length) {
    return false;
  }
  while (splitImportedPath.length && last(splitImportedPath) !== '..') {
    var importedDir = splitImportedPath.pop();
    var importingDir = splitImportingPath.pop();
    if (importedDir !== importingDir) {
      return false;
    }
  }
  return true;
}
function importingFileIsInsideOfSameModule(importingPath, importedPath) {
  // Just defensive coding.
  if (!pathIsInsideOfModulePrivate(importedPath)) {
    return true;
  }
  if (importingFileIsAtModuleRoot(importingPath, importedPath)) {
    return true;
  }
  if (importingFileIsInsideOfSameModulePrivate(importingPath, importedPath)) {
    return true;
  }
  return false;
}
var ImportDeclaration = function (node, context) {
  var importingPath = context.getFilename();
  var importedPath = ''.concat(node.source.value);
  console.log('importingPath', importingPath);
  console.log('importedPath', importedPath);
  if (!importingFileIsInsideOfSameModule(importingPath, importedPath)) {
    console.log('not inside the same path.');
    context.report(
      node,
      // @ts-ignore
      'Cannot access private module component '.concat(importedPath, ' from ').concat(importingPath)
    );
  }
};
function moduleStructure(context) {
  var _a;
  var args = [];
  for (var _i = 1; _i < arguments.length; _i++) {
    args[_i - 1] = arguments[_i];
  }
  console.log.apply(console, __spreadArray(['context', context, 'args'], args, false));
  return (
    (_a = {}),
    (_a[types_1.AST_NODE_TYPES.ImportDeclaration] = function (node) {
      return ImportDeclaration(node, context);
    }),
    _a
  );
}
exports.moduleStructure = moduleStructure;
