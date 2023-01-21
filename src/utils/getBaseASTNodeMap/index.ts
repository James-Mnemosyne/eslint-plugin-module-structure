import { AST_NODE_TYPES } from '@typescript-eslint/types';
import type { Rule } from 'eslint';
import { Merge } from '../reducers';

export type NodeType = Parameters<Rule.NodeListener[keyof Rule.NodeListener]>[0];
export type ASTMap = Record<AST_NODE_TYPES, (node: NodeType) => void>;

export function getBaseASTNodeMap(): ASTMap {
  return Object.values(AST_NODE_TYPES)
    .map((nodeType) => {
      return {
        [nodeType]: (_node: NodeType) => {
          return;
        },
      };
    })
    .reduce(Merge, {}) as ASTMap;
}
