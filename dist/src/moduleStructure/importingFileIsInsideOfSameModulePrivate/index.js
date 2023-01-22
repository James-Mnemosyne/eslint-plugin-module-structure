"use strict";
exports.__esModule = true;
exports.importingFileIsInsideOfSameModulePrivate = void 0;
var helpers_1 = require("../helpers");
// If we're here, we know that the imported path is inside of a private module.
// Which means that if this path does not start from the first element, or that is not module name or private, we can return.
function getInitialSharedPath(splitImportingPath, splitImportedPath) {
    var initialIndex = splitImportingPath === null || splitImportingPath === void 0 ? void 0 : splitImportingPath.indexOf(splitImportedPath[0]);
    if ((splitImportedPath === null || splitImportedPath === void 0 ? void 0 : splitImportedPath.length) && (splitImportingPath === null || splitImportingPath === void 0 ? void 0 : splitImportingPath.indexOf(splitImportedPath[0])) === -1) {
        return false;
    }
    var firstMismatch = splitImportedPath.length;
    for (var i in splitImportedPath) {
        var index = Number(i);
        var path = splitImportedPath[index];
        if (path !== splitImportingPath[initialIndex + index]) {
            firstMismatch = Number(index);
            break;
        }
    }
    return splitImportedPath.slice(0, firstMismatch);
}
function importingFileIsInsideOfSameModulePrivate(importingPath, importedPath) {
    // Just defensive coding. No module to be at root of.
    if (!(0, helpers_1.pathIsInsideOfModulePrivate)(importedPath)) {
        return true;
    }
    var splitImportingPath = importingPath.slice(0, importingPath.lastIndexOf('/')).split('/');
    var splitImportedPath = importedPath.replace(/^@/, '').split('/');
    // TODO (there's probably some better way, deep down in eslint, to link up paths.)
    // Right now, we select the largest shared path (first), and assume that that is the base.
    var initialSharedPath = getInitialSharedPath(splitImportingPath, splitImportedPath);
    if (!initialSharedPath || !initialSharedPath.length) {
        return false;
    }
    // must already be inside of the private folder
    var importedPathToCheck = splitImportedPath.slice(initialSharedPath.length, splitImportedPath.length);
    if (importedPathToCheck.filter(function (segment) { return segment === 'private'; }).length > 1) {
        return false;
    }
    if (importedPathToCheck.filter(function (segment) { return segment === 'private'; }).length < 1) {
        return true;
    }
    // 0 for first or -1 for not found.
    if (importedPathToCheck.indexOf('private') <= 0) {
        return true;
    }
    return false;
}
exports.importingFileIsInsideOfSameModulePrivate = importingFileIsInsideOfSameModulePrivate;
