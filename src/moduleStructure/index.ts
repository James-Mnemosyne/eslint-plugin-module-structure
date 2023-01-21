import { AST_NODE_TYPES } from '@typescript-eslint/types';
import type { Rule } from 'eslint';
import { isRelativePath, pathIsInsideOfModulePrivate, WithContext } from './helpers';
import { importingFileIsAtModuleRoot } from './importingFileIsAtModuleRoot';
import { importingFileIsInsideOfSameModulePrivate } from './importingFileIsInsideOfSameModulePrivate';
import { relativePathDoesNotPassThroughAdditionalPrivate } from './relativePathDoesNotPassThroughAdditionalPrivate';

function importingFileIsInsideOfSameModule(importingPath: string, importedPath: string) {
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

const ImportDeclaration: WithContext<Rule.NodeListener['ImportDeclaration']> = function (
  node,
  context
) {
  const importingPath = context.getFilename();
  const importedPath = `${node.source.value}`;
  if (!importingFileIsInsideOfSameModule(importingPath, importedPath)) {
    context.report(
      node,
      // @ts-ignore
      `Cannot access private module component ${importedPath} from ${importingPath}`
    );
  }
};

export function moduleStructure(context: Rule.RuleContext) {
  return {
    [AST_NODE_TYPES.ImportDeclaration]: (node) => ImportDeclaration(node, context),
  };
}
