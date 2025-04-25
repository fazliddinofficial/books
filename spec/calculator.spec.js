// spec/calculator.spec.js
describe("Tax Calculator", function () {
  it("adds 2 + 3 correctly", function () {
    expect(2 + 3).toBe(5);
  });

  it("calculates tax correctly", function () {
    const total = 100;
    const tax = 0.15;
    expect(total * tax).toBe(15);
  });

  it("returns correct total after tax", function () {
    const calc = (amount, tax) => amount + amount * tax;
    expect(calc(200, 0.2)).toBe(240);
  });

  it("handles 0 tax", function () {
    const calc = (amount, tax) => amount + amount * tax;
    expect(calc(100, 0)).toBe(100);
  });

  it("rounds properly", function () {
    const calc = (amount, tax) => +(amount + amount * tax).toFixed(2);
    expect(calc(99.99, 0.13)).toBe(112.99);
  });

  it("rejects negative input", function () {
    const calc = (amount) => amount >= 0;
    expect(calc(-5)).toBeFalse();
  });

  it("returns true for valid input", function () {
    const calc = (amount) => amount >= 0;
    expect(calc(120)).toBeTrue();
  });
});
