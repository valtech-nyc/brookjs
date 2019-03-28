// @todo: readd NpmInstallPlugin
// @todo: clean up this file (extra functions, commented out code, etc.)
import path from 'path';
import webpack from 'webpack';
import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin';
import { Nullable } from 'typescript-nullable';
import { errorToNull } from '../../cli';
import { State } from './types';

const selectDefaultPlugins = (state: State) => [
  new CaseSensitivePathsPlugin({
    debug: false
  })
];

const selectEnvPlugins = (state: State) => {
  switch (state.env) {
    case 'development':
      return [];
    case 'production':
      return [];
    default:
      return [];
  }
};

const selectAppPath = (state: State): string =>
  path.join(
    state.cwd,
    Nullable.maybe('src', rc => rc.dir || 'src', errorToNull(state.rc))
  );

const selectWebpackEntry = (state: State): webpack.Configuration['entry'] => {
  let entry = Nullable.maybe(
    'index.js',
    rc => Nullable.maybe('index.js', webpack => webpack.entry, rc.webpack),
    errorToNull(state.rc)
  );

  if (typeof entry === 'string') {
    return path.join(selectAppPath(state), entry);
  }

  if (Array.isArray(entry)) {
    return entry.map(e => path.join(selectAppPath(state), e));
  }

  if (typeof entry === 'object') {
    for (const [key, value] of Object.entries(entry)) {
      entry = {
        ...entry,
        [key]: path.join(selectAppPath(state), value)
      };
    }
  }

  return entry;
};

const selectFilename = (state: State): string => {
  // @TODO(James) fix this horrible code
  let filename = Nullable.maybe(
    '[name].js',
    rc =>
      Nullable.maybe(
        '[name].js',
        webpack =>
          Nullable.maybe(
            '[name].js',
            output => output.filename,
            webpack.output
          ),
        rc.webpack
      ),
    errorToNull(state.rc)
  );

  if (typeof filename === 'function') {
    filename = filename(state);

    if (typeof filename !== 'string') {
      throw new Error('rc.webpack.filename function should return a string.');
    }
  }

  return filename;
};

const selectOutput = (state: State): webpack.Configuration['output'] => ({
  path: path.join(
    state.cwd,
    Nullable.withDefault(
      'dist/',
      Nullable.andThen(
        output => output.path,
        Nullable.andThen(
          webpack => webpack.output,
          Nullable.andThen(rc => rc.webpack, errorToNull(state.rc))
        )
      )
    )
  ),
  filename: selectFilename(state)
});

export const selectWebpackConfig = (state: State): webpack.Configuration => {
  const config: webpack.Configuration = {
    entry: selectWebpackEntry(state),
    output: selectOutput(state),
    mode: state.env,
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: require.resolve('eslint-loader'),
          include: selectAppPath(state),
          enforce: 'pre',
          options: {
            eslintPath: require.resolve('eslint')
          }
        },
        {
          test: /\.js$/,
          loader: require.resolve('babel-loader'),
          include: selectAppPath(state)
        },
        {
          test: /\.hbs/,
          loader: require.resolve('handlebars-loader'),
          query: {
            helperDirs: [`${selectAppPath(state)}/helpers`],
            partialDirs: [selectAppPath(state)],
            preventIndent: true,
            compat: true
          }
        }
      ]
    },
    resolve: {
      mainFields: ['module', 'main']
    },
    plugins: [...selectDefaultPlugins(state), ...selectEnvPlugins(state)]
  };

  const modifier = Nullable.andThen(
    webpack => webpack.modifier,
    Nullable.andThen(rc => rc.webpack, errorToNull(state.rc))
  );

  if (Nullable.isSome(modifier)) {
    return modifier(config, { env: state.env, cmd: 'build' });
  }

  return config;
};