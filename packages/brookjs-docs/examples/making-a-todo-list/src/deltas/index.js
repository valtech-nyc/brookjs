import Kefir from 'kefir';
import { sampleByAction } from 'brookjs';
import { init } from '../actions';

export const rootDelta = (action$, state$) => {
  const init$ = state$.thru(sampleByAction(action$, init)).flatMap(() => {
    console.log('App initialized');

    return Kefir.never();
  });

  return Kefir.merge([init$]);
};
