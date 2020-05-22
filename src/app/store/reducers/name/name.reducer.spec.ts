import { nameReducer, initialState } from './name.reducer';
import { setName, clearName } from '../../actions/name/name.actions';

const name = { firstName: 'Pablo', lastName: 'Sanchez' };

describe('Name Reducer', () => {
  it('should return init state', () => {
    const newState = nameReducer(undefined, { type: 'noop' });

    expect(newState).toEqual(initialState);
  });

  it('should set and clear name', () => {
    const newState = nameReducer(initialState, setName(name));

    expect(newState).toEqual(name);

    const newClearState = nameReducer(initialState, clearName());

    expect(newClearState).toEqual(initialState);
  });
});
