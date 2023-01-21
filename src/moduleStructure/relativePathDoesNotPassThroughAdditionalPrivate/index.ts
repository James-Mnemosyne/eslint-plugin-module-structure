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
  console.log('truncatedImportingPath', truncatedImportingPath);
  const denormalizedFullImportedPath = path.join(truncatedImportingPath, importedPath);
  console.log('denormalizedFullImportedPath', denormalizedFullImportedPath);
  const fullImportedPath = path.normalize(denormalizedFullImportedPath);
  console.log('fullImportedPath', fullImportedPath);
  const normalizedRelativeImportPath = fullImportedPath.replace(truncatedImportingPath, '');
  console.log('normalizedRelativeImportPath', normalizedRelativeImportPath);
  // We want to avoid the first private dir, if it is a direct subset.
  const normalizedDeprivatizedPath =
    normalizedRelativeImportPath === '/private' ||
    normalizedRelativeImportPath.startsWith('/private/')
      ? normalizedRelativeImportPath?.replace('/private', '')
      : normalizedRelativeImportPath;
  console.log('relative0', importedPath);

  // If there's still a layer of private, return false. Otherwise, true.
  return !pathIsInsideOfModulePrivate(normalizedDeprivatizedPath);
}
