//1.////////////////////////////////////////////////

const getYieldForPlant = (plant, environmentFactors) => {
  if (!environmentFactors) {
    return plant.yield;
  }
  if (environmentFactors.sun === "low") {
    return plant.yield - (plant.yield / -100) * plant.factor.sun.low;
  } else {
    if (environmentFactors.sun === "high")
      return plant.yield - (plant.yield / -100) * plant.factor.sun.high;
  }
};

//2.////////////////////////////////////////////////

const getYieldForCrop = (plant, environmentFactors) => {
  if (!environmentFactors) {
    return getYieldForPlant(plant) * plant.numCrops;
  } else {
    if (environmentFactors.wind === "low") {
      return getYieldForPlant(plant) * plant.numCrops;
    } else {
      if (environmentFactors.wind === "high")
        return getYieldForPlant(plant) * plant.numCrops * 0.6;
    }
  }
};

//3./////////////////////////////////////////////////

const getTotalYield = ({ input }, environmentFactors) => {
  console.log("input[0].crop.yield is: ", input[0].crop.yield);
  console.log("input[1].crop.yield is: ", input[1].crop.yield);

  if (!environmentFactors) {
    return (
      getYieldForPlant(input[0].crop.yield) *
        getYieldForCrop(input[0].crop.numCrops) +
      getYieldForPlant(input[1].crop.yield) *
        getYieldForCrop(input[1].crop.numCrops)

      //input[0].crop.yield * input[0].numCrops +
      //input[1].crop.yield * input[1].numCrops
    );
  } else {
    if (environmentFactors.wind === "medium") {
      return (
        ((input[0].crop.yield * input[0].numCrops +
          input[1].crop.yield * input[1].numCrops) /
          100) *
        70
      );
    } else {
      return (
        (input[0].crop.yield * input[0].numCrops +
          input[1].crop.yield * input[1].numCrops) *
        1.5
      );
    }
  }
};

//4.////////////////////////////////////////////////

const getCostsForCrop = (corn, price) => {
  return corn.costs * price.price;
};

//5.////////////////////////////////////////////////

const getRevenueForCrop = (revenue, environmentFactors) => {
  if (!environmentFactors) {
    return revenue[0].corn.counts * revenue[0].price;
  } else {
    return ((revenue[0].corn.counts * revenue[0].price) / 100) * 40;
  }
};

//6.////////////////////////////////////////////////

const getProfitForCrop = (costsAndRevenue, environmentFactors) => {
  if (!environmentFactors) {
    return (
      costsAndRevenue[0].counts * costsAndRevenue[1].price -
      costsAndRevenue[0].costs
    );
  } else {
    return (
      ((costsAndRevenue[0].counts * costsAndRevenue[1].price -
        costsAndRevenue[0].costs) /
        100) *
      70 *
      2
    );
  }
};

//7.////////////////////////////////////////////////

const getTotalProfit = (profit, environmentFactors) => {
  if (!environmentFactors) {
    return (
      (profit[0].yield + profit[1].yield) * profit[2].price -
      (profit[0].costs + profit[1].costs)
    );
  } else {
    w = Math.round(
      (((profit[0].yield + profit[1].yield) * profit[2].price -
        (profit[0].costs + profit[1].costs)) /
        100) *
        50 *
        10
    );
    return w / 10;
  }
};

module.exports = {
  getYieldForPlant,
  getYieldForCrop,
  getTotalYield,
  getCostsForCrop,
  getRevenueForCrop,
  getProfitForCrop,
  getTotalProfit,
};
