import { importingFileIsInsideOfSameModule } from '../../../src/moduleStructure/importingFileIsInsideOfSameModule';

// For comments, * denotes importing, ** denotes imported.

describe('importingFileIsInsideOfSameModule', () => {
  describe('returns true', () => {
    /*
     /Users/jamesstrynkowski/projects/module-structure-testbed
      └── src/
          ├── module/
          │   ├── index.ts **
          └── index.ts *
    */
    it('if import is not in a private module', () => {
      const importingPath =
        '/Users/jamesstrynkowski/projects/module-structure-testbed/src/index.ts';
      const importedPath = 'src/module';
      const result = importingFileIsInsideOfSameModule(importingPath, importedPath);
      expect(result).toBeTruthy();
    });

    /*
     /Users/jamesstrynkowski/projects/module-structure-testbed
      └── src/
          ├── private/
          │   └── index.ts **
          └── index.ts *
    */
    it('if import is relative import from level above module private', () => {
      const importingPath =
        '/Users/jamesstrynkowski/projects/module-structure-testbed/src/index.ts';
      const importedPath = './private';
      const result = importingFileIsInsideOfSameModule(importingPath, importedPath);
      expect(result).toBeTruthy();
    });

    /*
     /Users/jamesstrynkowski/projects/module-structure-testbed
      └── src/
          ├── private/
          │   └── index.ts **
          └── index.ts *
    */
    it('if import is relative through multiple redirection', () => {
      const importingPath =
        '/Users/jamesstrynkowski/projects/module-structure-testbed/src/index.ts';
      const importedPath = './private/./../././//private';
      const result = importingFileIsInsideOfSameModule(importingPath, importedPath);
      expect(result).toBeTruthy();
    });

    /*
     /Users/jamesstrynkowski/projects/module-structure-testbed
      └── src/
          ├── private/
          │   └── thing/
          │       └── whanot/
          │           └── index.ts **
          └── index.ts *
    */
    it('if import is relative import from level above module private, deeply fetching.', () => {
      const importingPath =
        '/Users/jamesstrynkowski/projects/module-structure-testbed/src/index.ts';
      const importedPath = './private/thing/whatnot';
      const result = importingFileIsInsideOfSameModule(importingPath, importedPath);
      expect(result).toBeTruthy();
    });

    /*
     /Users/jamesstrynkowski/projects/module-structure-testbed
      └── src/
          └── module/
              ├── private/
              │   └── index.ts **
              └── index.ts *
          
    */
    it('for descending absolute path contained', () => {
      const importingPath =
        '/Users/jamesstrynkowski/projects/module-structure-testbed/src/module/index.ts';
      const importedPath = 'src/module/private';
      const result = importingFileIsInsideOfSameModule(importingPath, importedPath);
      expect(result).toBeTruthy();
    });

    /*
     /Users/jamesstrynkowski/projects/module-structure-testbed
      └── src/
          ├── module0/
          │   └── index.ts **
          └── module1/
              └── private/
                      └── index.ts *
    */
    it('if import is calling out of private module into separate public space module, absolute', () => {
      const importingPath =
        '/Users/jamesstrynkowski/projects/module-structure-testbed/src/module1/private/index.ts';
      const importedPath = 'src/module0';
      const result = importingFileIsInsideOfSameModule(importingPath, importedPath);
      expect(result).toBeTruthy();
    });

    /*
     /Users/jamesstrynkowski/projects/module-structure-testbed
      └── src/
          ├── module0/
          │   └── index.ts **
          └── module1/
              └── private/
                      └── index.ts *
    */
    it('if import is calling out of private module into separate public space module, relative', () => {
      const importingPath =
        '/Users/jamesstrynkowski/projects/module-structure-testbed/src/module1/private/index.ts';
      const importedPath = '../../module0';
      const result = importingFileIsInsideOfSameModule(importingPath, importedPath);
      expect(result).toBeTruthy();
    });

    /*
     /Users/jamesstrynkowski/projects/module-structure-testbed
      └── src/
          └── module/
              ├── private/
              │   └── thing/
              │       └── index.ts **
              └── index.ts *
    */
    it('for descending absolute path contained nested reduced match', () => {
      const importingPath =
        '/Users/jamesstrynkowski/projects/module-structure-testbed/src/module/index.ts';
      const importedPath = 'module/private/thing';
      const result = importingFileIsInsideOfSameModule(importingPath, importedPath);
      expect(result).toBeTruthy();
    });

    /*
     /Users/jamesstrynkowski/projects/module-structure-testbed
      └── src/
          └── module/
              └── private/
                  └── thing0/
                      └── private/
                          ├── thing1/
                          │   └── index.ts **
                          └── index.ts *
    */
    it('for paired nested modules, absolute', () => {
      const importingPath =
        '/Users/jamesstrynkowski/projects/module-structure-testbed/src/module/private/thing0/private/thing1/index.ts';
      const importedPath = 'module/private/thing0/private/thing1';
      const result = importingFileIsInsideOfSameModule(importingPath, importedPath);
      expect(result).toBeTruthy();
    });

    /*
     /Users/jamesstrynkowski/projects/module-structure-testbed
      └── src/
          └── module/
              └── private/
                  └── thing0/
                      └── private/
                          ├── thing1/
                          │   └── index.ts **
                          └── index.ts *
    */
    it('for paired nested modules, relative', () => {
      const importingPath =
        '/Users/jamesstrynkowski/projects/module-structure-testbed/src/module/private/thing0/private/thing1/index.ts';
      const importedPath = '../thing1';
      const result = importingFileIsInsideOfSameModule(importingPath, importedPath);
      expect(result).toBeTruthy();
    });

    /*
     /Users/jamesstrynkowski/projects/module-structure-testbed
      └── src/
          └── module/
              └── private/
                  ├── thing0/
                  │   └── private/
                  │       └── thing1/
                  │           └── index.ts **
                  └── index.ts *
    */
    it('from above nested modules, relative', () => {
      const importingPath =
        '/Users/jamesstrynkowski/projects/module-structure-testbed/src/module/private/thing0/index.ts';
      const importedPath = 'module/private/thing0/thing1/';
      const result = importingFileIsInsideOfSameModule(importingPath, importedPath);
      expect(result).toBeTruthy();
    });
  });

  describe('returns false', () => {
    /*
     /Users/jamesstrynkowski/projects/module-structure-testbed
      └── src/
          ├── index.ts *
          └── module0/
              └── private/
                  └── index.ts **
    */
    it('if calling into private code from public space above immediate parent, absolute', () => {
      const importingPath =
        '/Users/jamesstrynkowski/projects/module-structure-testbed/src/index.ts';
      const importedPath = 'src/module0/private';
      const result = importingFileIsInsideOfSameModule(importingPath, importedPath);
      expect(result).toBeFalsy();
    });

    /*
     /Users/jamesstrynkowski/projects/module-structure-testbed
      └── src/
          ├── index.ts *
          └── module0/
              └── private/
                  └── index.ts **
    */
    it('if calling into private code from public space above immediate parent, relative', () => {
      const importingPath =
        '/Users/jamesstrynkowski/projects/module-structure-testbed/src/index.ts';
      const importedPath = './module0/private';
      const result = importingFileIsInsideOfSameModule(importingPath, importedPath);
      expect(result).toBeFalsy();
    });

    /*
     /Users/jamesstrynkowski/projects/module-structure-testbed
      └── src/
          ├── module0/
          │   └── index.ts *
          └── module1/
              └── private/
                  └── index.ts **
    */
    it('if import is not in separate private module, relative', () => {
      const importingPath =
        '/Users/jamesstrynkowski/projects/module-structure-testbed/src/module0/index.ts';
      const importedPath = '../module1/private';
      const result = importingFileIsInsideOfSameModule(importingPath, importedPath);
      expect(result).toBeFalsy();
    });

    /*
     /Users/jamesstrynkowski/projects/module-structure-testbed
      └── src/
          ├── module0/
          │   └── private/
          │       └── index.ts *
          └── module1/
              └── private/
                      └── index.ts **
    */
    it('if import is in separate private module, absolute', () => {
      const importingPath =
        '/Users/jamesstrynkowski/projects/module-structure-testbed/src/module0/private/index.ts';
      const importedPath = 'src/module1/private';
      const result = importingFileIsInsideOfSameModule(importingPath, importedPath);
      expect(result).toBeFalsy();
    });

    /*
     /Users/jamesstrynkowski/projects/module-structure-testbed
      └── src/
          ├── module0/
          │   └── private/
          │       └── index.ts *
          └── module1/
              └── private/
                      └── index.ts **
    */
    it('if import is in separate private module, relative', () => {
      const importingPath =
        '/Users/jamesstrynkowski/projects/module-structure-testbed/src/module0/private/index.ts';
      const importedPath = '../../module1/private';
      const result = importingFileIsInsideOfSameModule(importingPath, importedPath);
      expect(result).toBeFalsy();
    });

    /*
     /Users/jamesstrynkowski/projects/module-structure-testbed
      └── src/
          └── module/
              ├── private/
              │   └── thing0/
              │       └── private/
              │           └── thing1/
              │               └── index.ts **
              └── index.ts *
    */
    it('for separated nested modules at top level, absolute', () => {
      const importingPath =
        '/Users/jamesstrynkowski/projects/module-structure-testbed/src/module/private/index.ts';
      const importedPath = 'module/private/thing0/private/thing1';
      const result = importingFileIsInsideOfSameModule(importingPath, importedPath);
      expect(result).toBeFalsy();
    });

    /*
     /Users/jamesstrynkowski/projects/module-structure-testbed
      └── src/
          └── module/
              ├── private/
              │   └── thing0/
              │       └── private/
              │           └── thing1/
              │               └── index.ts **
              └── index.ts *
    */
    it('for separated nested modules at top level, relative', () => {
      const importingPath =
        '/Users/jamesstrynkowski/projects/module-structure-testbed/src/module/private/index.ts';
      const importedPath = './private/thing0/private/thing1';
      const result = importingFileIsInsideOfSameModule(importingPath, importedPath);
      expect(result).toBeFalsy();
    });

    /*
     /Users/jamesstrynkowski/projects/module-structure-testbed
      └── src/
          ├── module0/
          │   └── private/
          │       └── index.ts *
          └── module1/
              └── private/
                      └── index.ts **
    */
    it('if import is calling out of private module into separate private module, absolute', () => {
      const importingPath =
        '/Users/jamesstrynkowski/projects/module-structure-testbed/src/module0/private/index.ts';
      const importedPath = 'src/module1/private';
      const result = importingFileIsInsideOfSameModule(importingPath, importedPath);
      expect(result).toBeFalsy();
    });

    /*
     /Users/jamesstrynkowski/projects/module-structure-testbed
      └── src/
          ├── module0/
          │   └── private/
          │       └── index.ts *
          └── module1/
              └── private/
                      └── index.ts **
    */
    it('if import is calling out of private module into separate private module, relative', () => {
      const importingPath =
        '/Users/jamesstrynkowski/projects/module-structure-testbed/src/module0/private/index.ts';
      const importedPath = '../../module1/private';
      const result = importingFileIsInsideOfSameModule(importingPath, importedPath);
      expect(result).toBeFalsy();
    });
  });
});
