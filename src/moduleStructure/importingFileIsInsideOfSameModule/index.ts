import { isRelativePath, pathIsInsideOfModulePrivate } from '../helpers';
import { importingFileIsAtModuleRoot } from '../importingFileIsAtModuleRoot';
import { importingFileIsInsideOfSameModulePrivate } from '../importingFileIsInsideOfSameModulePrivate';
import { relativePathDoesNotPassThroughAdditionalPrivate } from '../relativePathDoesNotPassThroughAdditionalPrivate';

export function importingFileIsInsideOfSameModule(importingPath: string, importedPath: string) {
  // Just defensive coding.
  if (!pathIsInsideOfModulePrivate(importedPath)) {
    return true;
  }
  if (
    isRelativePath(importedPath) &&
    relativePathDoesNotPassThroughAdditionalPrivate(importingPath, importedPath)
  ) {
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
