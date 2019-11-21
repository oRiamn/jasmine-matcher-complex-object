Usage :

```
const customMatchers = {
  deepEqualInAnyOrder: () => {
    return {
      compare: (actual, expectedResult) => {
        const result = {
          pass: deepEqualFunction(actual, expectedResult),
          message: ""
        };

        if (!result.pass) {
          result.message =
            "Expected " +
            JSON.stringify(actual) +
            " to be deep equal in any order with " +
            JSON.stringify(expectedResult);
        }
        return result;
      }
    };
  }
};

beforeEach(() => {
  jasmine.addMatchers(customMatchers);
});
```
