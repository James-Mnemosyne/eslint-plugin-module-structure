import type { Rule } from 'eslint';
export declare type WithContext<TFunction extends (...args: any) => any> = (
  ...args: [...Parameters<TFunction>, Rule.RuleContext]
) => ReturnType<TFunction>;
export declare function last(arr: any[]): any;
export declare function isRelativePath(path: string): boolean;
export declare function pathIsInsideOfModulePrivate(path: string): boolean;
