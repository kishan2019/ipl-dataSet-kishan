import {
  getNoOfMatchesPlayed,
  getNoOfMatchesWonPerTeamPerYear,
  getExtraRunsPerTeamForYear,
  getEconomicalBowlersForYear
} from "./ipl";

describe("IPL module", () => {
  describe("No. of matches played per team for all years, getNoOfMatchesPlayed", () => {
    const matchesSample = [
      {
        season: 2008
      },
      {
        season: 2009
      },
      {
        season: 2008
      }
    ];
    const expectedResult = {
      2008: 2,
      2009: 1
    };
    test("should exist", () => {
      expect(getNoOfMatchesPlayed).toBeDefined();
    });
    test("should return an object", () => {
      expect(getNoOfMatchesPlayed(matchesSample)).toBeDefined();
      expect(typeof getNoOfMatchesPlayed(matchesSample)).toEqual("object");
      expect(getNoOfMatchesPlayed(matchesSample)).toEqual(expectedResult);
    });
  });
  describe("No. of matches won per team per year, getNoOfMatchesWonPerTeamPerYear", () => {
    test("should exist", () => {
      expect(getNoOfMatchesWonPerTeamPerYear).toBeDefined();
    });
  });
  describe("Extra runs conceeded per team for year, getExtraRunsPerTeamForYear", () => {
    test("should exist", () => {
      expect(getExtraRunsPerTeamForYear).toBeDefined();
    });
  });
  describe("Economical bowlers for year, getEconomicalBowlersForYear", () => {
    test("should exist", () => {
      expect(getEconomicalBowlersForYear).toBeDefined();
    });
  });
});
