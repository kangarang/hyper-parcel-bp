import 'babel-polyfill';
import { h, app } from 'hyperapp';
import './styles.css';
import { saveState, loadState } from './utils';

const state = {
  count: 0,
};

const actions = {
  up: value => state => ({ count: state.count + value }),
  down: value => state => ({ count: state.count - value }),
  persistState: () => state => {
    saveState(state);
    console.log('saved state to local storage');

    return state;
  },
  clearState: () => () => {
    saveState({});
    console.log('cleared local storage state');

    return state;
  },
  rehydrateState: () => () => loadState(),
};

const view = (state, actions) => (
  <div>
    {console.log(state)}

    {/* localStorage */}
    <div onclick={actions.persistState}>persist to localStorage</div>
    <div onclick={actions.rehydrateState}>rehydrate from localStorage</div>
    <div onclick={actions.clearState}>clear localStorage</div>

    {/* component state */}
    <h1>{state.count}</h1>
    <button onclick={() => actions.up(1)}>+</button>
    <button onclick={() => actions.down(1)}>-</button>
  </div>
);

app(state, actions, view, document.body);
