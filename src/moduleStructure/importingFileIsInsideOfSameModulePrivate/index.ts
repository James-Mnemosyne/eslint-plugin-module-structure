import { pathIsInsideOfModulePrivate } from '../helpers';

// If we're here, we know that the imported path is inside of a private module.
// Which means that if this path does not start from the first element, or that is not module name or private, we can return.
function getInitialSharedPath(splitImportingPath: string[], splitImportedPath: string[]) {
  const initialIndex = splitImportingPath?.indexOf(splitImportedPath[0]);
  if (splitImportedPath?.length && splitImportingPath?.indexOf(splitImportedPath[0]) === -1) {
    return false;
  }

  let firstMismatch = splitImportedPath.length;
  for (const i in splitImportedPath) {
    const index = Number(i);
    const path = splitImportedPath[index];
    if (path !== splitImportingPath[initialIndex + index]) {
      firstMismatch = Number(index);
      break;
    }
  }
  return splitImportedPath.slice(0, firstMismatch);
}

export function importingFileIsInsideOfSameModulePrivate(
  importingPath: string,
  importedPath: string
): boolean {
  // Just defensive coding. No module to be at root of.
  if (!pathIsInsideOfModulePrivate(importedPath)) {
    return true;
  }
  const splitImportingPath = importingPath.slice(0, importingPath.lastIndexOf('/')).split('/');
  const splitImportedPath = importedPath.replace(/^@/, '').split('/');
  // TODO (there's probably some better way, deep down in eslint, to link up paths.)
  // Right now, we select the largest shared path (first), and assume that that is the base.
  const initialSharedPath = getInitialSharedPath(splitImportingPath, splitImportedPath);

  if (!initialSharedPath || !initialSharedPath.length) {
    return false;
  }

  // must already be inside of the private folder
  const importedPathToCheck = splitImportedPath.slice(
    initialSharedPath.length,
    splitImportedPath.length
  );
  if (importedPathToCheck.filter((segment) => segment === 'private').length > 1) {
    return false;
  }

  if (importedPathToCheck.filter((segment) => segment === 'private').length < 1) {
    return true;
  }

  // 0 for first or -1 for not found.
  if (importedPathToCheck.indexOf('private') <= 0) {
    return true;
  }

  return false;
}
