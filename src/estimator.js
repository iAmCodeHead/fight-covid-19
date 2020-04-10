const time = (period, timeToElapse) => {
  let convertedTime = '';
  if (period.tolowerCase() === 'weeks') {
    convertedTime += timeToElapse * 7;
  } if (period.tolowerCase() === 'months') {
    convertedTime += timeToElapse * 30;
  }
  return convertedTime;
};

const covid19ImpactEstimator = (data) => {
  const resp = {
    data,
    impact: {},
    severeImpact: {}
  };


  resp.impact.currentlyInfected = data.reportedCases * 10;
  resp.impact.infectionsByRequestedTime = resp.impact.currentlyInfected.value * (2 ** 10);
  resp.impact.severeCasesByRequestedTime = resp.impact.infectionsByRequestedTime * 0.15;
  resp.impact.hospitalBedsByRequestedTime = data.totalHospitalBeds - resp.impact.severeCasesByRequestedTime;
  resp.impact.casesForICUByRequestedTime = resp.impact.infectionsByRequestedTime * 0.05;
  resp.impact.casesForVentilatorsByRequestedTime = resp.impact.infectionsByRequestedTime * 0.02;
  resp.impact.dollarsInFlight = (resp.impact.infectionsByRequestedTime * data.region.avgDailyIncomePopulation) * data.region.avgDailyIncomeInUSD * time(data.periodType, data.timeToElapse);

  resp.severeImpact.currentlyInfected = data.reportedCases * 10;
  resp.severeImpact.infectionsByRequestedTime = resp.severeImpact.currentlyInfected.value * (2 ** 10);
  resp.severeImpact.severeCasesByRequestedTime = resp.severeImpact.infectionsByRequestedTime * 0.15;
  resp.severeImpact.hospitalBedsByRequestedTime = data.totalHospitalBeds - resp.severeImpact.severeCasesByRequestedTime;
  resp.severeImpact.casesForICUByRequestedTime = resp.severeImpact.infectionsByRequestedTime * 0.05;
  resp.severeImpact.casesForVentilatorsByRequestedTime = resp.severeImpact.infectionsByRequestedTime * 0.02;
  resp.severeImpact.dollarsInFlight = (resp.severeImpact.infectionsByRequestedTime * data.region.avgDailyIncomePopulation) * data.region.avgDailyIncomeInUSD * time(data.periodType, data.timeToElapse);

  return resp;
};


export default covid19ImpactEstimator;
