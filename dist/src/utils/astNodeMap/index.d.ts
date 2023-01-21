import type { Rule } from 'eslint';
declare type NodeType = Parameters<Rule.NodeListener[keyof Rule.NodeListener]>[0];
export declare function getASTNodeMap(context: any): {
  [x: string]: (node: NodeType) => void;
};
export {};
