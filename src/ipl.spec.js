import {
  getNoOfMatchesPlayed,
  getNoOfMatchesWonPerTeamPerYear,
  getExtraRunsPerTeamForYear,
  getEconomicalBowlersForYear
} from "./ipl";

describe("IPL module", () => {
  // describe("No. of matches played per team for all years, getNoOfMatchesPlayed", () => {
  //   const matchesSample = [{
  //       season: 2008
  //     },
  //     {
  //       season: 2009
  //     },
  //     {
  //       season: 2008
  //     }
  //   ];
  //   const expectedResult = {
  //     2008: 2,
  //     2009: 1
  //   };
  //   test("should exist", () => {
  //     expect(getNoOfMatchesPlayed).toBeDefined();
  //   });
  //   test("should return an object", () => {
  //     expect(getNoOfMatchesPlayed(matchesSample)).toBeDefined();
  //     expect(typeof getNoOfMatchesPlayed(matchesSample)).toEqual("object");
  //     expect(getNoOfMatchesPlayed(matchesSample)).toEqual(expectedResult);
  //   });
  // });




  describe("No. of matches won per team per year, getNoOfMatchesWonPerTeamPerYear", () => {
    const matchesSample = [{
      season: '2008',
      winner: 'Delhi Daredevils'
    },
    {
      season: '2008',
      winner: 'Delhi Daredevils'
    },
    {
      season: '2008',
      winner: 'Delhi'
    },
    {
      season: '2009',
      winner: 'Delhi Daredevils'
    },
    {
      season: '2009',
      winner: 'Delhi',
    }
    ];

    const expectedResult = {
       '2008': {
          'Delhi Daredevils': 2,
           Delhi: 1 
          },
        '2009': {
           'Delhi Daredevils': 1,
            Delhi: 1 
          } 
        }

    test("should exist", () => {
      expect(getNoOfMatchesWonPerTeamPerYear).toBeDefined();
      expect(typeof getNoOfMatchesWonPerTeamPerYear(matchesSample)).toEqual("object");
      expect(getNoOfMatchesWonPerTeamPerYear(matchesSample)).toEqual(expectedResult);
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

// const matchesSample = [{
//     season: '2008',
//     winner: 'Delhi_Daredevils'
//   },
//   {
//     season: '2008',
//     winner: 'Delhi_Daredevils'
//   },
//   {
//     season: '2008',
//     winner: 'chennai'
//   },
//   {
//     season: '2009',
//     winner: 'chennai'
//   },
//   {
//     season: '2009',
//     winner: 'Delhi_Daredevils',
//   }
// ]

// const expectedResult = {
//   2008: {
//     Delhi_Daredevils: 2,
//     chenni: 1
//   },
//   2009: {
//     Delhi_Daredevils: 1,
//     chenni: 1
//   }
// };