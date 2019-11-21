const deepEqualFunction = require("./deep-equal-matcher").deepEqualFunction;

describe("deepEqualFunction", () => {
  describe("with primitive types", () => {
    describe("should return true", () => {
      const expectedValue = true;

      it("with same type function", () => {
        const a = () => true,
          b = () => true;
        expect(deepEqualFunction(a, b)).toBe(expectedValue);
        expect(deepEqualFunction(b, a)).toBe(expectedValue);
      });

      it("with same type null", () => {
        expect(deepEqualFunction(null, null)).toBe(expectedValue);
      });

      it("with same type undefined", () => {
        expect(deepEqualFunction(undefined, undefined)).toBe(expectedValue);
      });

      it("with same type number", () => {
        expect(deepEqualFunction(1, 1)).toBe(expectedValue);
      });

      it("with two different types of number", () => {
        const a = 1.0,
          b = 1;
        expect(deepEqualFunction(a, b)).toBe(expectedValue);
        expect(deepEqualFunction(b, a)).toBe(expectedValue);
      });

      it("with same type string", () => {
        expect(deepEqualFunction("a", "a")).toBe(expectedValue);
      });
    });
    describe("should return false", () => {
      const expectedValue = false;

      it("with same type function", () => {
        const a = () => true,
          b = () => false;
        expect(deepEqualFunction(a, b)).toBe(expectedValue);
        expect(deepEqualFunction(b, a)).toBe(expectedValue);
      });

      it("with type null and undefined", () => {
        const a = null,
          b = undefined;
        expect(deepEqualFunction(a, b)).toBe(expectedValue);
        expect(deepEqualFunction(b, a)).toBe(expectedValue);
      });

      it("with same type number", () => {
        const a = 1,
          b = 2;
        expect(deepEqualFunction(a, b)).toBe(expectedValue);
        expect(deepEqualFunction(b, a)).toBe(expectedValue);
      });

      it("with two different types of number", () => {
        const a = 1.0,
          b = 2;
        expect(deepEqualFunction(a, b)).toBe(expectedValue);
        expect(deepEqualFunction(b, a)).toBe(expectedValue);
      });

      it("with same type string", () => {
        const a = "a",
          b = "b";
        expect(deepEqualFunction(a, b)).toBe(expectedValue);
        expect(deepEqualFunction(b, a)).toBe(expectedValue);
      });
    });
  });

  describe("with array types", () => {
    describe("should return true", () => {
      const expectedValue = true;

      it("with circulare structure", () => {
        const a = ["a"],
          b = ["a"];

        a.push(a);
        b.push(b);

        expect(deepEqualFunction(a, b)).toBe(expectedValue);
        expect(deepEqualFunction(b, a)).toBe(expectedValue);
      });

      it("with simple array with same elements and same order", () => {
        const a = [1, 2, 3, 4],
          b = [1, 2, 3, 4];
        expect(deepEqualFunction(a, b)).toBe(expectedValue);
        expect(deepEqualFunction(b, a)).toBe(expectedValue);
      });

      it("with simple array with same elements but not same order", () => {
        const a = [1, 2, 3, 4],
          b = [4, 2, 3, 1];
        expect(deepEqualFunction(a, b)).toBe(expectedValue);
        expect(deepEqualFunction(b, a)).toBe(expectedValue);
      });

      describe("with array containnig objects", () => {
        it("with circulare structure", () => {
          const objA = {
              attr: "a"
            },
            objB = {
              attr: "a"
            };

          objA.circular = objA;
          objB.circular = objB;

          const a = [objA, { attr1: 1 }],
            b = [{ attr1: 1 }, objB];
          expect(deepEqualFunction(a, b)).toBe(expectedValue);
          expect(deepEqualFunction(b, a)).toBe(expectedValue);
        });

        it("with simple object with same elements and same order", () => {
          const a = [
              {
                attr1: 1,
                attr2: "2",
                attr3: 3.0
              },
              { attr1: 1 }
            ],
            b = [
              {
                attr1: 1,
                attr2: "2",
                attr3: 3.0
              },
              { attr1: 1 }
            ];
          expect(deepEqualFunction(a, b)).toBe(expectedValue);
          expect(deepEqualFunction(b, a)).toBe(expectedValue);
        });

        it("with simple object with same elements and not same order", () => {
          const a = [
              {
                attr1: 1,
                attr2: "2",
                attr3: 3.0
              },
              { attr1: 1 }
            ],
            b = [
              {
                attr1: 1,
                attr3: 3.0,
                attr2: "2"
              },
              { attr1: 1 }
            ];
          expect(deepEqualFunction(a, b)).toBe(expectedValue);
          expect(deepEqualFunction(b, a)).toBe(expectedValue);
        });
      });
    });

    describe("should return false", () => {
      const expectedValue = false;
      it("with simple array with not same keys", () => {
        const a = [1, 2, 3, 4],
          b = [1, 2, 3, 4, 5];
        expect(deepEqualFunction(a, b)).toBe(expectedValue);
        expect(deepEqualFunction(b, a)).toBe(expectedValue);
      });

      it("with simple array with not same values", () => {
        const a = [1, 2, 3, 4],
          b = [1, 2, 6, 4];

        expect(deepEqualFunction(a, b)).toBe(expectedValue);
        expect(deepEqualFunction(b, a)).toBe(expectedValue);
      });

      describe("with array containnig objects", () => {
        it("object with not same keys", () => {
          const a = [
              {
                attr1: 1,
                attr2: "2",
                attr3: 3.0
              },
              { attr1: 1 }
            ],
            b = [
              {
                attr1: 1,
                attr2: "2",
                attr3: 3.0,
                attr4: "quatre"
              },
              { attr1: 1 }
            ];
          expect(deepEqualFunction(a, b)).toBe(expectedValue);
          expect(deepEqualFunction(b, a)).toBe(expectedValue);
        });

        it("object with not same keys", () => {
          const a = [
              {
                attr1: 1,
                attr2: "2",
                attr3: 3.0
              },
              { attr1: 1 }
            ],
            b = [
              {
                attr1: 1,
                attr2: "2",
                attr3: 4.0
              },
              { attr1: 1 }
            ];
          expect(deepEqualFunction(a, b)).toBe(expectedValue);
          expect(deepEqualFunction(b, a)).toBe(expectedValue);
        });
      });
    });
  });

  describe("with object types", () => {
    describe("should return true", () => {
      const expectedValue = true;

      it("with circulare structure", () => {
        const a = {
            attr: "a"
          },
          b = {
            attr: "a"
          };

        a.circular = a;
        b.circular = b;

        expect(deepEqualFunction(a, b)).toBe(expectedValue);
        expect(deepEqualFunction(b, a)).toBe(expectedValue);
      });

      it("with simple object with same elements and same order", () => {
        const a = {
            attr1: 1,
            attr2: "2",
            attr3: 3.0
          },
          b = {
            attr1: 1,
            attr2: "2",
            attr3: 3.0
          };
        expect(deepEqualFunction(a, b)).toBe(expectedValue);
        expect(deepEqualFunction(b, a)).toBe(expectedValue);
      });

      it("with simple object with same elements and not same order", () => {
        const a = {
            attr1: 1,
            attr2: "2",
            attr3: 3.0
          },
          b = {
            attr1: 1,
            attr3: 3.0,
            attr2: "2"
          };
        expect(deepEqualFunction(a, b)).toBe(expectedValue);
        expect(deepEqualFunction(b, a)).toBe(expectedValue);
      });

      describe("with object containnig array", () => {
        it("with circulare structure", () => {
          const attra = ["a"],
            attrb = ["a"];

          attra.push(attra);
          attrb.push(attrb);

          const a = {
              attr1: "attr1",
              attrWithArray: attra
            },
            b = {
              attr1: "attr1",
              attrWithArray: attrb
            };

          expect(deepEqualFunction(a, b)).toBe(expectedValue);
          expect(deepEqualFunction(b, a)).toBe(expectedValue);
        });

        it("with simple array with same elements and same order", () => {
          const a = {
              attr1: "attr1",
              attrWithArray: [1, 2, 3, 4]
            },
            b = {
              attr1: "attr1",
              attrWithArray: [1, 2, 3, 4]
            };
          expect(deepEqualFunction(a, b)).toBe(expectedValue);
          expect(deepEqualFunction(b, a)).toBe(expectedValue);
        });

        it("with simple array with same elements but not same order", () => {
          const a = {
              attr1: "attr1",
              attrWithArray: [1, 2, 3, 4]
            },
            b = {
              attr1: "attr1",
              attrWithArray: [4, 2, 3, 1]
            };
          expect(deepEqualFunction(a, b)).toBe(expectedValue);
          expect(deepEqualFunction(b, a)).toBe(expectedValue);
        });
      });
    });
    describe("should return false", () => {
      const expectedValue = false;

      it("with circulare structure", () => {
        const a = {
            attr: "a"
          },
          b = {
            attr: "a"
          };

        a.a = a;
        b.a = b;
        b.a.attr2 = "";

        expect(deepEqualFunction(a, b)).toBe(expectedValue);
        expect(deepEqualFunction(b, a)).toBe(expectedValue);
      });
      it("with simple object with not same keys", () => {
        const a = {
            attr1: 1,
            attr2: "2",
            attr3: 3.0
          },
          b = {
            attr1: 1,
            attr2: "2",
            attr3: 3.0,
            attr4: "quatre"
          };
        expect(deepEqualFunction(a, b)).toBe(expectedValue);
        expect(deepEqualFunction(b, a)).toBe(expectedValue);
      });

      it("with simple object with not same values", () => {
        const a = {
            attr1: 1,
            attr2: "2",
            attr3: 3.0
          },
          b = {
            attr1: 1,
            attr2: "2",
            attr3: 4.0
          };
        expect(deepEqualFunction(a, b)).toBe(expectedValue);
        expect(deepEqualFunction(b, a)).toBe(expectedValue);
      });

      describe("with object containnig array", () => {
        it("with simple array with same elements and same order", () => {
          const a = {
              attr1: "attr1",
              attrWithArray: [1, 2, 3, 4]
            },
            b = {
              attr1: "attr1",
              attrWithArray: [1, 2, 3, 4, 5]
            };
          expect(deepEqualFunction(a, b)).toBe(expectedValue);
          expect(deepEqualFunction(b, a)).toBe(expectedValue);
        });

        it("with simple array with same elements but not same order", () => {
          const a = {
              attr1: "attr1",
              attrWithArray: [1, 2, 3, 4]
            },
            b = {
              attr1: "attr1",
              attrWithArray: [1, 2, 6, 4]
            };
          expect(deepEqualFunction(a, b)).toBe(expectedValue);
          expect(deepEqualFunction(b, a)).toBe(expectedValue);
        });
      });
    });
  });

  describe("testof", () => {
    it("should not pass with object circular", () => {
      const a = {
          attr: "a"
        },
        b = {
          attr: "a"
        };

      a.circular = a;
      b.circular = "not same";
      expect(deepEqualFunction(a, b)).toBe(false);
      expect(deepEqualFunction(b, a)).toBe(false);
    });

    it("should not pass with array circular", () => {
      const a = ["a"],
        b = ["a"];

      a.push(a);
      b.push("not same");

      expect(deepEqualFunction(a, b)).toBe(false);
      expect(deepEqualFunction(b, a)).toBe(false);
    });
  });
});
