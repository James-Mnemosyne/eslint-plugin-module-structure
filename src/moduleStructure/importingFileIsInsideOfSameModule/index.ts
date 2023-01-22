import { isRelativePath, pathIsInsideOfModulePrivate } from '../helpers';
import { importingFileIsAtModuleRoot } from '../importingFileIsAtModuleRoot';
import { importingFileIsInsideOfSameModulePrivate } from '../importingFileIsInsideOfSameModulePrivate';
import { relativePathDoesNotPassThroughAdditionalPrivate } from '../relativePathDoesNotPassThroughAdditionalPrivate';
import * as path from 'path';

export function importingFileIsInsideOfSameModule(importingPath: string, importedPath: string) {
  const normalizedImportingPath = path.normalize(importingPath);
  const normalizedImportedPath = path.normalize(importedPath);
  // Just defensive coding.
  if (!pathIsInsideOfModulePrivate(normalizedImportedPath)) {
    return true;
  }
  if (
    isRelativePath(normalizedImportedPath) &&
    relativePathDoesNotPassThroughAdditionalPrivate(normalizedImportingPath, normalizedImportedPath)
  ) {
    return true;
  }
  if (importingFileIsAtModuleRoot(normalizedImportingPath, normalizedImportedPath)) {
    return true;
  }
  if (importingFileIsInsideOfSameModulePrivate(normalizedImportingPath, normalizedImportedPath)) {
    return true;
  }
  return false;
}
