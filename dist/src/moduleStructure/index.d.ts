import type { Rule } from 'eslint';
export declare function moduleStructure(context: Rule.RuleContext): {
  ImportDeclaration: (node: any) => void;
};
