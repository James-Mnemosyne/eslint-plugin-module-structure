'use strict';
exports.__esModule = true;
exports.relativePathDoesNotPassThroughAdditionalPrivate = void 0;
var helpers_1 = require('../helpers');
var path = require('path');
function relativePathDoesNotPassThroughAdditionalPrivate(importingPath, importedPath) {
  if (!(0, helpers_1.isRelativePath)(importedPath)) {
    return true;
  }
  var truncatedImportingPath = importingPath.slice(0, importingPath.lastIndexOf('/'));
  var denormalizedFullImportedPath = path.join(truncatedImportingPath, importedPath);
  var fullImportedPath = path.normalize(denormalizedFullImportedPath);
  var normalizedRelativeImportPath = fullImportedPath.replace(truncatedImportingPath, '');
  // We want to avoid the first private dir, if it is a direct subset.
  var normalizedDeprivatizedPath =
    normalizedRelativeImportPath === '/private' ||
    normalizedRelativeImportPath.startsWith('/private/')
      ? normalizedRelativeImportPath === null || normalizedRelativeImportPath === void 0
        ? void 0
        : normalizedRelativeImportPath.replace('/private', '')
      : normalizedRelativeImportPath;
  // If there's still a layer of private, return false. Otherwise, true.
  return !(0, helpers_1.pathIsInsideOfModulePrivate)(normalizedDeprivatizedPath);
}
exports.relativePathDoesNotPassThroughAdditionalPrivate =
  relativePathDoesNotPassThroughAdditionalPrivate;
