import * as path from 'path';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import babel from 'rollup-plugin-babel';

process.env.BABEL_ENV = process.env.NODE_ENV = 'production';

const pkg = require(path.resolve(process.cwd(), 'package.json'));

export default {
  input: 'src/index.ts',
  external: [
    ...Object.keys(pkg.peerDependencies || {}),
    ...Object.keys(pkg.dependencies || {}),
    ...(pkg.bin ? ['path', 'util', 'child_process', 'fs', 'crypto', 'vm'] : [])
  ],
  output: [
    pkg.main && { file: pkg.main, format: 'cjs' },
    pkg.module && { file: pkg.module, format: 'es' },
    pkg.unpkg && { name: pkg.name, file: pkg.unpkg, format: 'umd' }
  ].filter(Boolean),
  plugins: [
    babel({
      runtimeHelpers: true,
      configFile: path.join(__dirname, 'babel.config.js'),
      extensions: ['.ts', '.tsx', '.js']
    }),
    resolve({
      extensions: ['.ts', '.tsx', '.js']
    }),
    commonjs({
      namedExports: {
        '@storybook/react': ['addDecorator'],
        '@storybook/theming': ['withTheme'],
        '@storybook/components': ['ActionBar'],
        '@storybook/addons': ['makeDecorator'],
        react: [
          'createContext',
          'createElement',
          'Component',
          'Fragment',
          'forwardRef'
        ]
      }
    }),
    json()
  ]
};
