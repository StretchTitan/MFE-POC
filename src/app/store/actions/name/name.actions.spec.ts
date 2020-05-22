import { setName, clearName } from './name.actions';

const name = { firstName: 'Pablo', lastName: 'Sanchez' };

describe('Name Actions', () => {
  it('should return set name object', () => {
    expect(setName(name)).toEqual({ type: 'Set Name', ...name });
  });

  it('should return clear name object', () => {
    expect(clearName()).toEqual({ type: 'Clear Name' });
  });
});
