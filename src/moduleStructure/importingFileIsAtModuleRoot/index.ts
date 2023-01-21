import { last, pathIsInsideOfModulePrivate } from '../helpers';

export function importingFileIsAtModuleRoot(importingPath: string, importedPath: string): boolean {
  // Just defensive coding. No module to be at root of.
  if (!pathIsInsideOfModulePrivate(importedPath)) {
    return true;
  }
  if (!importedPath.endsWith('/private') && importedPath.lastIndexOf('/private/') === 1) {
    return true;
  }
  const splitImportingPath = importingPath.split('/');
  const splitImportedPath = importedPath.replace(/^@/, '').split('/');
  while (splitImportedPath.length && last(splitImportedPath) !== last(splitImportingPath)) {
    splitImportedPath.pop();
  }
  if (!splitImportedPath.length) {
    return false;
  }

  while (splitImportedPath.length) {
    const importedDir = splitImportedPath.pop();
    const importingDir = splitImportingPath.pop();
    if (importedDir !== importingDir) {
      return false;
    }
  }
  return true;
}
