# NODE - EXPRESS TYPESCRIPT SETUP

```bash
npm init -y
```
- change the type to module instead of commonjs in package.json
```json
"type": "module"
```

- Install packages typescript (node24 because its the LTS version of node right now i am using)
```bash
npm install typescript @types/node @tsconfig/node24 -D
```

- create tsconfig.json
```json
{
  "extends": "@tsconfig/node24/tsconfig.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src",
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*"]
}

```

- install express package
```bash
npm i express
npm i @types/express -D
```

- create server.ts
```bash
code src/server.ts
```

```ts
import express from "express";

const app = express();
const port = parseInt(process.env.PORT || "3000");

//middleware
app.use(express.json());

//Routes
app.get("/", (req, res) => {
  res.send("Hello World");
});

//Server start
app.listen(port, () => {
  console.log(`server started at http://localhost${port}`);
});

```

- add scripts inside package.json
```json
"build": "tsc",
"start": "node ./dist/server.js"
```

- install tsc-watch package to combine build and start script so we don't have to restart the server again
```bash
npm i tsc-watch -D
```

-add dev script (--env-file=.env if your are using .env file)
```json
"dev": "tsc-watch --onSuccess \"node --env-file=.env dist/server.js\""
```

# ESLINT & PRETTIER SETUP

```bash
npm install eslint typescript-eslint eslint-config-prettier eslint-plugin-prettier eslint-plugin-simple-import-sort eslint-plugin-unicorn prettier @vitest/eslint-plugin -D
```
 
 - create a ..prettierrc file.
```json
{
  "arrowParens": "avoid",
  "bracketSameLine": false,
  "bracketSpacing": true,
  "htmlWhitespaceSensitivity": "css",
  "insertPragma": false,
  "jsxSingleQuote": false,
  "plugins": [],
  "printWidth": 80,
  "proseWrap": "always",
  "quoteProps": "as-needed",
  "requirePragma": false,
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "all",
  "useTabs": false
}
```
- next create an eslint.config.js file.
```js
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import simpleImportSort from 'eslint-plugin-simple-import-sort';

export default tseslint.config(
  { ignores: ['**/*.js', 'dist/**/*', 'node_modules/**/*'] },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  eslintPluginUnicorn.configs['flat/recommended'],
  {
    files: ['**/*.{js,ts}'],
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      'unicorn/better-regex': 'warn',
      'unicorn/no-process-exit': 'off',
      'unicorn/no-array-reduce': 'off',
      'unicorn/prevent-abbreviations': [
        'error',
        { replacements: { params: false } },
      ],
    },
  },

  eslintPluginPrettierRecommended,
);

```

- Scripts for linting and formatting in package.json
```json
"format": "prettier --write .",
  "lint": "eslint .",
  "lint:fix": "eslint . --fix",
```

- for .vscode/settings.json
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "always"
  },
  "eslint.useFlatConfig": true,
  "eslint.validate": ["javascript", "typescript"]
}
```