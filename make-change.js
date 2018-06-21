// PROBLEM: FIND THE SMALLEST NUMBER OF BILLS WITH WHICH WE CAN PAY CERTAIN
//          VALUE (DYNAMIC PROGRAMMING WITH MEMOIZATION)

// idea:
//   - create a function that finds all the possible solutions and stores them in a cache
//   - memoize that function
//   - extract the best option from the cache

// helper function that generates all the possible solutions
// meaning, all the possible ways in which we can pay the provided amount
// and caches those solutions;
// returns the number of possible solutions but that is not neccessary
// in this case
const _makeChange = (toPay, bills, pick, cache) => {
  if (toPay < 0) { return 0; }
  if (toPay === 0) {
    cache.add(pick);
    return 1;
  }
  if (bills.length === 0) { return 0; }

  return _makeChange(toPay - bills[0], bills, pick.concat(bills[0]), cache)
    + _makeChange(toPay, bills.slice(1), pick, cache);
};

// memoize only with respect to the first two arguments - toPay, bills
// the other two are not necessary in this case
const memoizeFirstTwoArgs = fn => {
  const cache = new Map();
  return (...args) => {
    const key = JSON.stringify(args.slice(0, 2));
    if (cache.has(key)) { return cache.get(key); }
    const res = fn(...args);
    cache.set(key, res);
    return res;
  };
};

// uses memoized version of makeChange and provides cache to that function;
// after cache has been populated, by executing memoized version of makeChange,
// find the option with smallest length and return it
const makeChange = (toPay, bills) => {
  const cache = new Set();
  const memoizedMakeChange = memoizeFirstTwoArgs(_makeChange);
  memoizedMakeChange(toPay, bills, [], cache);

  let minLength = Infinity;
  let resValues;

  for (const value of cache) {
    if (value.length < minLength) {
      minLength = value.length;
      resValues = value;
    }
  }

  return resValues;
}

const bills = [10, 7, 11, 3];
const toPay = 16;

console.log(makeChange(toPay, bills));
