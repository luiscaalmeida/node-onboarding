const MAX_OLD_SCALE = 10;
const MIN_OLD_SCALE = 0;

const MAX_NEW_SCALE = 5;
const MIN_NEW_SCALE = 0;

export const normalizeToScale0to5 = value => ((MAX_NEW_SCALE - MIN_NEW_SCALE) / (MAX_OLD_SCALE - MIN_OLD_SCALE)) * (value - MAX_OLD_SCALE) + MAX_NEW_SCALE;

export const isObjectEmpty = (obj) => {
  return obj
    && Object.keys(obj).length === 0
    && Object.getPrototypeOf(obj) === Object.prototype;
}
