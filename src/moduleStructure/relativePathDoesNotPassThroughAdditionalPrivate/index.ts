import { isRelativePath, pathIsInsideOfModulePrivate } from '../helpers';
import * as path from 'path';

export function relativePathDoesNotPassThroughAdditionalPrivate(
  importingPath: string,
  importedPath: string
) {
  if (!isRelativePath(importedPath)) {
    return true;
  }
  const truncatedImportingPath = importingPath.slice(0, importingPath.lastIndexOf('/'));
  const denormalizedFullImportedPath = path.join(truncatedImportingPath, importedPath);
  const fullImportedPath = path.normalize(denormalizedFullImportedPath);

  const truncatedImportingPathSplit = truncatedImportingPath.split('/');
  const fullImportedPathSplit = fullImportedPath.split('/');

  while (
    truncatedImportingPathSplit?.length &&
    truncatedImportingPathSplit[0] === fullImportedPathSplit[0]
  ) {
    truncatedImportingPathSplit.shift();
    fullImportedPathSplit.shift();
  }

  const normalizedRelativeImportPath = `/${fullImportedPathSplit.join('/')}`;
  // We want to avoid the first private dir, if it is a direct subset.
  const normalizedDeprivatizedPath =
    normalizedRelativeImportPath === '/private' ||
    normalizedRelativeImportPath.startsWith('/private/')
      ? normalizedRelativeImportPath?.replace('/private', '')
      : normalizedRelativeImportPath;

  // If there's still a layer of private, return false. Otherwise, true.
  return !pathIsInsideOfModulePrivate(normalizedDeprivatizedPath);
}
