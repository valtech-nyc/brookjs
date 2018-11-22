import R from 'ramda';
import loader from 'esm';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { observeDelta } from 'brookjs';
import { run } from './actions';
import { envDelta, scaffoldDelta, terminalDelta,
    testRunnerDelta, webpackDelta } from './deltas';
import { app, command, env, mocha, webpack } from './reducers';
import { glob, ui, WebpackService } from './services';

export default R.curry(function main (name, args, options, logger) {
    const store = createStore(
        combineReducers({ app, command, env, mocha, webpack }),
        applyMiddleware(observeDelta(
            envDelta({ process, require: loader(module, { mode: 'auto', cjs: true }) }),
            scaffoldDelta({ logger }),
            terminalDelta({ ui: ui(logger) }),
            testRunnerDelta({ glob }),
            webpackDelta({ webpack: WebpackService })
        ))
    );

    store.dispatch(run(name, args, options));
});
