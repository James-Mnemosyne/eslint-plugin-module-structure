# eslint-plugin-module-structure

ESLint plugin for modular directory code factorization.

## Overview

It can be difficult to enforce interfaces in typescript without destroying your code structure. Interfaces that aren't maintained in the same file as their dependent code are effectively useless, but code sprawl reduces productivity and muddles clarity. This should help, by enforcing a module pattern that is not dependent on single file exports.

This allows you to create private directories that can only be accessed by top level interfaces.

E.g. if you have a single-function per file setup, utilizing index files, you might have a module that looks something like:

```
src/
    └── module0/
        ├── publicFunction0/
        │   └── index.ts
        ├── publicFunction1/
        │   └── index.ts
        ├── privateFunction1/
        │   └── index.ts
        └── privateFunction2/
             └── index.ts
```

And maybe you're trying to add a new module, like this.

```
src/
    ├── module0/
    │   ├── publicFunction0/
    │   │   └── index.ts
    │   ├── publicFunction1/
    │   │   └── index.ts
    │   ├── privateFunction1/
    │   │   └── index.ts
    │   └── privateFunction2/
    │        └── index.ts
    └── module1/
        └── index.ts
```

Where module 1 needs to call some of the functions in module0.

In an ideal world, developers would use the public functions, and not use the private functions, or they would migrate the private functions to the public interface, depending on the circumstances. But we don't live in an ideal world :shrug:, so it might be better to actually enforce this somehow.

This eslint plugin enforces a privatization pattern. E.g. given the follwing setup:

```
src/
    ├── module0/
    │   ├── private/
    │   │   ├── privateFunction1/
    │   │   │   └── index.ts
    │   │   └── privateFunction2/
    │   │        └── index.ts
    │   ├── publicFunction0/
    │   │   └── index.ts
    │   └── publicFunction1/
    │       └── index.ts
    └── module1/
        └── index.ts
```

It protects the private functions from being called outside of module 0. More specifically, it prevents anything in module0/private, from being called outside of module0.

## Install

You can install this package as a dev dep, or you can install it globally.

### NPM

`npm i --save-dev eslint-plugin-module-structure`

### Yarn

`yarn add -D eslint-plugin-module-structure`

## Use

Update your eslint config with the following:

```
{
  ...
  "plugins": [
      ...
      "module-structure"
  ],
  "rules": {
    ...
    "module-structure/module-structure": ["error" ]
  }
}

```

### Examples:

\* Denotes file that is importing

\*\* Denotes file that is being imported.

#### Passing:

:green_heart:

```
/Users/jamesstrynkowski/projects/module-structure-testbed
└── src/
    ├── module/
    │   └── index.ts **
    └── index.ts *
```

:green_heart:

```
/Users/jamesstrynkowski/projects/module-structure-testbed
└── src/
    ├── private/
    │   └── index.ts **
    └── index.ts *
```

:green_heart:

```
/Users/jamesstrynkowski/projects/module-structure-testbed
└── src/
    ├── private/
    │   └── thing/
    │       └── whanot/
    │           └── index.ts **
    └── index.ts *
```

:green_heart:

```
/Users/jamesstrynkowski/projects/module-structure-testbed
└── src/
    ├── module0/
    │   └── index.ts **
    └── module1/
        └── private/
                └── index.ts *
```

#### Failing:

:red_circle:

```
/Users/jamesstrynkowski/projects/module-structure-testbed
└── src/
    ├── index.ts *
    └── module0/
        └── private/
            └── index.ts **
```

:red_circle:

```
/Users/jamesstrynkowski/projects/module-structure-testbed
└── src/
    ├── module0/
    │   └── index.ts *
    └── module1/
        └── private/
            └── index.ts **
```

:red_circle:

```
/Users/jamesstrynkowski/projects/module-structure-testbed
└── src/
    └── module/
        ├── private/
        │   └── thing0/
        │       └── private/
        │           └── thing1/
        │               └── index.ts **
        └── index.ts *
```

:red_circle:

```
/Users/jamesstrynkowski/projects/module-structure-testbed
└── src/
    ├── module0/
    │   └── private/
    │       └── index.ts *
    └── module1/
        └── private/
                └── index.ts **
```

## Extended Use

I mean, you can toggle the "error" in your eslint to "warning", frankly, but outside of that, you're kind of on your own.

Perusing the idea of allowing custom names for the directories, but I don't think any of the other settings should really be toggle-able, so :shrug:. As always, feel free to reach out if you disagree.

## Links

### Github

https://github.com/James-Mnemosyne/eslint-plugin-module-structure/tree/master

### NPM

https://www.npmjs.com/package/eslint-plugin-module-structure
