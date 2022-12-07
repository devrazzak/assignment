import { City } from "country-state-city";

const divisions = City.getCitiesOfCountry("BD");

export const filteredDivisions = divisions.filter(function (v) {
  return (
    v["name"] === "Dhaka" ||
    v["name"] === "Chittagong" ||
    v["name"] === "Barisal" ||
    v["name"] === "Khulna" ||
    v["name"] === "Sylhet" ||
    v["name"] === "Rajshahi" ||
    v["name"] === "Rangpur"
  );
});

export const getStateCode = (stateName) => {
  let stateCode;
  if (stateName === "Dhaka") {
    stateCode = "13";
  }
  if (stateName === "Chittagong") {
    stateCode = "B";
  }
  if (stateName === "Barisal") {
    stateCode = "06";
  }
  if (stateName === "Khulna") {
    stateCode = "27";
  }
  if (stateName === "Sylhet") {
    stateCode = "60";
  }
  if (stateName === "Rajshahi") {
    stateCode = "54";
  }
  if (stateName === "Rangpur") {
    stateCode = "55";
  }
  return stateCode;
};
