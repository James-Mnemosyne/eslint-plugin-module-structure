import { AST_NODE_TYPES } from '@typescript-eslint/types';
import type { Rule } from 'eslint';
export declare type NodeType = Parameters<Rule.NodeListener[keyof Rule.NodeListener]>[0];
export declare type ASTMap = Record<AST_NODE_TYPES, (node: NodeType) => void>;
export declare function getBaseASTNodeMap(): ASTMap;
