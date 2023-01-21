import type { Rule } from 'eslint';

export type WithContext<TFunction extends (...args: any) => any> = (
  ...args: [...Parameters<TFunction>, Rule.RuleContext]
) => ReturnType<TFunction>;

export function last(arr: any[]) {
  return arr[arr.length - 1];
}

export function isRelativePath(path: string) {
  return path.startsWith('./') || path.startsWith('../');
}

export function pathIsInsideOfModulePrivate(path: string) {
  return path.includes('/private/') || path.endsWith('/private');
}
