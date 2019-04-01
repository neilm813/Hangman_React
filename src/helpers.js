// makeUpdater function idea edited from last code snippet here: https://medium.freecodecamp.org/get-pro-with-react-setstate-in-10-minutes-d38251d1c781

const makeUpdater = apply => (...rest) => state => {
  return apply(state, ...rest); // apply needs to return the new state obj
}

export const splitKeyPath = (path) => Array.isArray(path) ? path : typeof (path) === 'string' ? path.split(/[\\\[\\\].]/).filter(Boolean) : [];

export const toggleKey = makeUpdater(
  (prevState, keyPath) => copyObjPath(prevState, keyPath, prev => !prev)
);

export const incrementKeyBy = makeUpdater(
  (prevState, keyPath, amnt) => copyObjPath(prevState, keyPath, prev => prev + amnt)
);

export const concatKey = makeUpdater(
  (prevState, keyPath, add) => copyObjPath(prevState, keyPath, prevArr => prevArr.concat(add))
);

export function checkObjType(o, typeCheck) {
  const type = Object.prototype.toString.call(o);
  if (typeCheck) return type === `[object ${typeCheck}]`;
  else return type;
}

// returns obj with the specified keyPath and it's respective values with references broken
// setState will merge all the other key value pairs
// setState does not merge missing key value pairs in nested objects, so nested objects need to have all keys present,
  // not just the one edited like you can do at the first level of key value pairs
export function copyObjPath(o, keyPath, newPathVal) {

  let copy = {};
  const keys = splitKeyPath(keyPath);
  copy[keys[0]] = o[keys[0]];

  keys.reduce((prev, curr, i) => {

    if (prev && prev[curr] !== undefined) {

      let type = checkObjType(prev[curr]);

      if (type === '[object Object]') prev[curr] = { ...prev[curr] };
      else if (type === '[object Array]') prev[curr] = [...prev[curr]];

      if (i === keys.length - 1 && newPathVal)
        prev[curr] = checkObjType(newPathVal, 'Function') ? newPathVal(prev[curr]) : newPathVal;
      return prev[curr];

    } else copy = null; return null;
  }, copy);
  return copy;
}

export function nElems (n, cb) {
  const els = [];

  for (let i = 0; i < n; i++) 
    els.push(cb(i));
  return els;
}