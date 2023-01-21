import { AST_NODE_TYPES } from '@typescript-eslint/types';
import type { Rule } from 'eslint';

type WithContext<TFunction extends (...args: any) => any> = (
  ...args: [...Parameters<TFunction>, Rule.RuleContext]
) => ReturnType<TFunction>;

function last(arr: any[]) {
  return arr[arr.length - 1];
}

function pathIsInsideOfModulePrivate(path: string) {
  return path?.includes('/private/') || path.endsWith('/private');
}

function importingFileIsAtModuleRoot(importingPath: string, importedPath: string): boolean {
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
  // TODO: technically, we should handle even dumber edge cases.
  return !splitImportedPath.every((segment) => segment == '.');
}

function importingFileIsInsideOfSameModulePrivate(
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

  while (splitImportedPath.length && last(splitImportedPath) !== '..') {
    const importedDir = splitImportedPath.pop();
    const importingDir = splitImportingPath.pop();
    if (importedDir !== importingDir) {
      return false;
    }
  }
  return true;
}

function importingFileIsInsideOfSameModule(importingPath: string, importedPath: string) {
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

const ImportDeclaration: WithContext<Rule.NodeListener['ImportDeclaration']> = function (
  node,
  context
) {
  const importingPath = context.getFilename();
  const importedPath = `${node.source.value}`;
  console.log('importingPath', importingPath);
  console.log('importedPath', importedPath);
  if (!importingFileIsInsideOfSameModule(importingPath, importedPath)) {
    console.log('not inside the same path.');
    context.report(
      node,
      // @ts-ignore
      `Cannot access private module component ${importedPath} from ${importingPath}`
    );
  }
};

export function moduleStructure(context: Rule.RuleContext, ...args) {
  console.log('context', context, 'args', ...args);

  return {
    [AST_NODE_TYPES.ImportDeclaration]: (node) => ImportDeclaration(node, context),
  };
}
