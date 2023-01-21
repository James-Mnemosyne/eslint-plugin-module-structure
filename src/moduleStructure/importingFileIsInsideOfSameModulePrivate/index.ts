import { last, pathIsInsideOfModulePrivate } from '../helpers';

export function importingFileIsInsideOfSameModulePrivate(
  importingPath: string,
  importedPath: string
): boolean {
  // Just defensive coding. No module to be at root of.
  if (!pathIsInsideOfModulePrivate(importedPath)) {
    return true;
  }
  const splitImportingPath = importingPath
    .slice(0, importingPath.lastIndexOf('/private/'))
    .split('/');
  const splitImportedPath = importedPath
    .slice(0, importedPath.lastIndexOf('/private/'))
    .replace(/^@/, '')
    .split('/');
  while (splitImportedPath.length && last(splitImportedPath) !== last(splitImportingPath)) {
    splitImportedPath.pop();
  }
  if (!splitImportedPath.length) {
    return false;
  }

  // Don't need to check relative, because it's already done.
  while (splitImportedPath.length) {
    const importedDir = splitImportedPath.pop();
    const importingDir = splitImportingPath.pop();
    if (importedDir !== importingDir) {
      return false;
    }
  }
  return true;
}
