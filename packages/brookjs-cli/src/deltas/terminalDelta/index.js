import R from 'ramda';
import { Kefir } from 'brookjs';
import {  RUN } from '../../actions';
import log from './log';
import newCommandPrompt from './newCommandPrompt';

const commandNotFound = ({ ui }, actions$, state$) =>
    state$.take(1).flatMap(state => ui.error(`Command not found: ${state.command.name}.`));

export default R.curry((services, actions$, state$) =>
    state$.sampledBy(actions$.ofType(RUN)).flatMap(state => {
        switch (state.command.name) {
            case 'new':
                return Kefir.concat([
                    newCommandPrompt(services, actions$, state$),
                    log(services, actions$, state$)
                ]);
            case 'make':
            case 'dev':
            case 'test':
            case 'build':
                return log(services, actions$, state$);
            default:
                return commandNotFound(services, actions$, state$);
        }
    }));
