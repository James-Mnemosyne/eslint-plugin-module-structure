import { AST_NODE_TYPES } from '@typescript-eslint/types';
import type { Rule } from 'eslint';
import { WithContext } from './helpers';
import { importingFileIsInsideOfSameModule } from './importingFileIsInsideOfSameModule';

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
