import Kefir from 'kefir';
import { webpackCompiled } from '../actions';
import { isBuildCommand, isDevAppCommand, selectWebpackConfig,
    takeStateOnBootstrap } from '../selectors';

export default ({ webpack }) => (actions$, state$) => {
    const bootstrap$ = takeStateOnBootstrap(state$, actions$);

    const build$ = bootstrap$.filter(isBuildCommand)
        .flatMap(state =>
            webpack.create(selectWebpackConfig(state))
                .flatMap(compiler => compiler.run())
                .map(webpackCompiled)
        );

    const dev$ = bootstrap$.filter(isDevAppCommand)
        .flatMap(state =>
            webpack.create(selectWebpackConfig(state))
                .flatMap(compiler => compiler.watch())
                .map(webpackCompiled)
        );

    return Kefir.merge([
        build$,
        dev$
    ]);
};