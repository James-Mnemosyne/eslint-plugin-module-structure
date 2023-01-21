import type { Rule } from 'eslint';
export declare function moduleStructure(
  context: Rule.RuleContext,
  ...args: any[]
): {
  ImportDeclaration: (node: any) => void;
};
