const {
  getYieldForPlant,
  getYieldForCrop,
  getTotalYield,
  getCostsForCrop,
  getRevenueForCrop,
  getProfitForCrop,
  getTotalProfit,
} = require("./farm");

//1.////////////////////////////////////////////////

describe("getYieldForPlant", () => {
  const corn = {
    name: "corn",
    yield: 30,
    factor: {
      sun: {
        low: -50,
        high: 50,
      },
    },
  };

  test("Get yield for plant with no environment factors", () => {
    expect(getYieldForPlant(corn)).toBe(30);
  });

  test("Get yield for plant with environment factor: sun low", () => {
    const environmentFactors = {
      sun: "low",
    };

    expect(getYieldForPlant(corn, environmentFactors)).toBe(15);
  });

  test("Get yield for plant with environment factor: sun high", () => {
    const environmentFactors = {
      sun: "high",
    };
    expect(getYieldForPlant(corn, environmentFactors)).toBe(45);
  });
});

//2.////////////////////////////////////////////////

describe("getYieldForCrop", () => {
  const corn = {
    name: "corn",
    yield: 3,
    numCrops: 10,
    factor: {
      wind: {
        low: 0,
        high: -40,
      },
    },
  };

  test("Get yield for crop, simple", () => {
    expect(getYieldForCrop(corn)).toBe(30);
  });

  test("Get yield for crop with environment factor: wind low", () => {
    const environmentFactors = {
      wind: "low",
    };

    expect(getYieldForCrop(corn, environmentFactors)).toBe(30);
  });

  test("Get yield for crop with environment factor: wind high", () => {
    const environmentFactors = {
      wind: "high",
    };

    expect(getYieldForCrop(corn, environmentFactors)).toBe(18);
  });
});

//3./////////////////////////////////////////////////

describe("getTotalYield", () => {
  const corn = {
    name: "corn",
    yield: 3,
  };
  const pumpkin = {
    name: "pumpkin",
    yield: 4,
  };
  const input = [
    { crop: corn, numCrops: 5 },
    { crop: pumpkin, numCrops: 2 },
  ];

  ///  testing

  ///

  test("Calculate total yield with multiple crops", () => {
    expect(getTotalYield({ input })).toBe(23);
  });

  test("Get total yield with environment factor: wind Medium", () => {
    const environmentFactors = {
      wind: "medium",
    };

    expect(getTotalYield({ input }, environmentFactors)).toBe(16.1);
  });

  test("Get total yield with environment factor: sun high", () => {
    const environmentFactors = {
      sun: "high",
    };

    expect(
      getTotalYield(
        { input },

        environmentFactors
      )
    ).toBe(34.5);
  });
});

//4.////////////////////////////////////////////////

describe("getCostsForCrop", () => {
  test("Calculate cost for a crop", () => {
    const corn = {
      name: "corn",
      costs: 3,
    };

    const price = { price: 1 };

    expect(getCostsForCrop(corn, price)).toBe(3);
  });
});

//5.////////////////////////////////////////////////

describe("getRevenueForCrop", () => {
  const corn = {
    name: "corn",
    counts: 3,
  };

  test("Calculate Revenue for a crop ", () => {
    const revenue = [{ corn, price: 2 }];
    expect(getRevenueForCrop(revenue)).toBe(6);
  });

  test("Calculate Revenue for a crop with environment factor: wind High", () => {
    const environmentFactors = {
      wind: "medium",
    };
    const revenue = [{ corn, price: 2 }];
    expect(getRevenueForCrop(revenue, environmentFactors)).toBe(2.4);
  });
});

//

//6.////////////////////////////////////////////////

describe("getProfitForCrop", () => {
  const revenue = { price: 2 };

  const corn = {
    name: "corn",
    counts: 3,
    costs: 3,
  };

  test("Calculate Profit for a crop", () => {
    const costsAndRevenue = [corn, revenue];

    expect(getProfitForCrop(costsAndRevenue)).toBe(3);
  });

  test("Calculate Profit for a crop with environment factor: wind Medium and sun High", () => {
    const costsAndRevenue = [corn, revenue];

    const environmentFactors = {
      wind: "Medium",
      sun: "high",
    };

    expect(getProfitForCrop(costsAndRevenue, environmentFactors)).toBe(4.2);
  });
});

//7.////////////////////////////////////////////////

getTotalProfit;

describe("getTotalProfit", () => {
  const corn = {
    name: "corn",
    yield: 3,
    costs: 3,
  };

  const pumpkin = {
    name: "pumpkin",
    yield: 4,
    costs: 4,
  };

  test("Calculate total profit", () => {
    const revenue = { price: 2 };

    const profit = [corn, pumpkin, revenue];

    expect(getTotalProfit(profit)).toBe(7);
  });

  test("Calculate total profit with environment factor: sun Low and Rain high", () => {
    const revenue = { price: 2 };
    const profit = [corn, pumpkin, revenue];

    const environmentFactors = {
      Rain: "high: -30%",
      sun: "Low",
    };

    expect(getTotalProfit(profit, environmentFactors)).toBe(3.5);
  });
});
