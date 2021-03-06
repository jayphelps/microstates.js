import 'jest';
import { map } from 'funcadelic';
import Microstate, { create } from '../src';
import { reveal } from '../src/utils/secret';

it('exports create', function() {
  expect(create).toBeInstanceOf(Function);
});

it('throws an error when a transition called state is defined', () => {
  expect(function() {
    Microstate.create(
      class MyClass {
        state() {}
      }
    );
  }).toThrowError(
    `You can not use 'state' as transition name because it'll conflict with state property on the microstate.`
  );
});
it('throws an error when state property is set', () => {
  expect(function() {
    Microstate.create(Number).state = 10;
  }).toThrowError(`Setting state property will not do anything useful. Please don't do this.`);
});

describe('valueOf', () => {
  let ms;
  beforeEach(() => {
    ms = Microstate.create(Number, 10);
  });
  it('returns passed in value of', () => {
    expect(ms.valueOf()).toBe(10);
  });
  it('is not enumerable', () => {
    expect(Object.keys(ms).indexOf('valueOf')).toBe(-1);
  });
});