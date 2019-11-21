module.exports = {
  deepEqualFunction
};

/**
 * Compare deeply tow members and deal with array orders and objects
 * @todo log for friendly messages
 * @param {*} a
 * @param {*} b
 * @returns {boolean} false when members are different
 */
function deepEqualFunction(value, expected) {
  const deepEqual = (a, b, seenObjects) => {
    seenObjects = new Set(seenObjects);
    if (seenObjects.has(a) && seenObjects.has(b)) {
      return true;
    }

    if (typeof a === "function" && typeof b === "function") {
      const aString = a.toString(),
        bString = b.toString();
      return (
        aString.substring(aString.indexOf("(")) ===
        bString.substring(bString.indexOf("("))
      );
    }

    if (Array.isArray(a) && Array.isArray(b)) {
      if (a.length !== b.length) {
        return false;
      }

      return a.every(aEl => {
        if (!b.some(bEl => deepEqual(aEl, bEl, [...seenObjects, a, b]))) {
          return false;
        }
        return true;
      });
    }

    if (
      typeof a === "object" &&
      a !== null &&
      typeof b === "object" &&
      b !== null
    ) {
      const aProps = Object.keys(a),
        bProps = Object.keys(b);

      if (aProps.length !== bProps.length) {
        return false;
      }

      for (const aKey in a) {
        if (!b.hasOwnProperty(aKey)) {
          return false;
        }

        if (!deepEqual(a[aKey], b[aKey], [...seenObjects, a, b])) {
          return false;
        }
      }

      return true;
    }

    if (
      !Number.isNaN(a) &&
      !["string", "undefined"].includes(typeof a) &&
      !Number.isNaN(b) &&
      !["string", "undefined"].includes(typeof b)
    ) {
      return Math.abs(a - b) < Number.EPSILON;
    }

    return Object.is(a, b);
  };
  return deepEqual(value, expected, []);
}
