import * as _ from 'lodash';

/** Randomness source that returns a random number in range [A; B] (both ends inclusive). */
export type NumberInclusiveRangeRandom = (from: number, to: number) => number;

/** Default {@link NumberInclusiveRangeRandom} implementation. */
export const getRandNumberFromInclusiveRange: NumberInclusiveRangeRandom = (
  from,
  to
) => Math.round(Math.random() * (to - from) + from);

/** Randomness source that returns a random array element. */
export type ArrayItemRandom<T> = (array: T[]) => T;

/** Default {@link ArrayItemRandom} implementation. */
export const getRandArrayItem = <T>(array: T[]) =>
  array[getRandNumberFromInclusiveRange(0, array.length - 1)];

/** Type of a function that returns a sequence of unique elements from a two-dimensional array. */
export type UniqueSequenceFrom2DArrayRandom<T> = (
  array: T[][],
  seqLen: number
) => T[];

/** Default {@link UniqueSequenceFrom2DArrayRandom} implementation. */
export const getUniqSeqFrom2DArray = <T>(array: T[][], seqLen: number) =>
  _.take(_.shuffle(_.flatten(array)), seqLen);
