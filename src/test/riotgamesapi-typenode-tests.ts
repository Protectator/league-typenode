/*	This file is part of riotgamesapi-typenode.

 riotgamesapi-typenode - Simple TypeScript library for Riot Games' API
 Copyright (C) 2016 Kewin Dousse (Protectator)
 */

import * as chai from 'chai';
import * as api from 'riotGamesApi';
import * as rtnode from '../riotgamesapi-typenode';
import * as fs from 'fs';
import {RiotTypenode,ApiError} from "../riotgamesapi-typenode";

export class RiotTypenodeTests {
    public static run() {
        var assert:Chai.Assert = chai.assert;

        var keyValue:string;
        var keyTournaments:boolean;

        try {
            var fileContent:any = fs.readFileSync("key.json");
            var jsonContent = JSON.parse(fileContent);
            keyValue = jsonContent.value;
            keyTournaments = jsonContent.tournaments;
        } catch (e) {
            if (e.code === 'ENOENT') {
                keyValue = process.env.RIOTTYPENODE_KEY;
                if (keyValue != "") {
                    console.info("key.json file not found. Using environment variable RIOTTYPENODE_KEY.");
                    keyTournaments = false;
                } else {
                    throw new Error("No valid API key found.");
                }
            } else {
                throw new Error("No valid API key found.");
            }
        }

        var tn:rtnode.RiotTypenode = new rtnode.RiotTypenode(keyValue, keyTournaments);
        var playerId = 20717177;

        describe('champion-v1.2', function () {

            this.slow(200);

            describe('getChampionsStatus', () => {

                it("should return more than 100 values with no filter", (done) => {
                    tn.getChampionsStatus("euw", false, (error, response) => {
                        if (!error) {
                            assert.isAtLeast(response.champions.length, 100, "number of champions");
                            done();
                        } else {
                            throw error;
                        }
                    });
                });
                it("should return at least 10 values with freeToPlay=true", (done) => {
                    tn.getChampionsStatus("euw", true, (error, response) => {
                        if (!error) {
                            assert.isAtLeast(response.champions.length, 10, "number of free champions");
                            done();
                        } else {
                            throw error;
                        }
                    });
                });

            });

            describe('getChampionStatusById', () => {

                it("should return the champion asked (84)", (done) => {
                    tn.getChampionStatusById("euw", 84, (error, response) => {
                        if (!error) {
                            assert.equal(response.id, 84, "id of champion asked");
                            done();
                        } else {
                            throw error;
                        }
                    });
                });

            });
        });

        describe('championmastery', function () {

            describe('getChampionMastery', () => {

                it("should return a valid answer with a positive number of championPoints", (done) => {
                    tn.getChampionMastery("EUW1", 25517257, 84, (error, response) => {
                        if (!error) {
                            assert.equal(response.playerId, 25517257, "player id");
                            assert.equal(response.championId, 84, "champion id");
                            assert.isAtLeast(response.championPoints, 0, "champion points");
                            done();
                        } else {
                            throw error;
                        }
                    })
                });

            });

            describe('getChampionsMastery', () => {

                it("should be a list", (done) => {
                    tn.getChampionsMastery("EUW1", 255171257, (error, response) => {
                        if (!error) {
                            assert.isArray(response, "response is an array");
                            done();
                        } else {
                            throw error;
                        }
                    })
                });

            });

            describe('getScore', () => {

                it("should be a positive number", (done) => {
                    tn.getScore("EUW1", 255171257, (error, response) => {
                        if (!error) {
                            assert.isAtLeast(response, 0, "total score");
                            done();
                        } else {
                            throw error;
                        }
                    })
                });

            });

            describe('getTopChampions', () => {

                it("should be a list", (done) => {
                    tn.getTopChampions("EUW1", 255171257, 3, (error, response) => {
                        if (!error) {
                            assert.isArray(response, "response in an array");
                            done();
                        } else {
                            throw error;
                        }
                    })
                });

            });

        });

        describe('current-game', function () {

            this.slow(200);

            describe('getSpectatorGameInfoBySummonerId', () => {

                it("should try to find a game");

            });

        });

        describe('featured-games', function () {

            this.slow(200);

            describe('getFeaturedGames', () => {

                it("should have multiple valid featured games", (done) => {
                    tn.getFeaturedGames("euw", (error, response) => {
                        if (!error) {
                            assert.isAbove(response.clientRefreshInterval, 0, "client refresh internal");
                            assert.isAbove(response.gameList.length, 1, "game list length");
                            assert.isAbove(response.gameList[0].gameId, 0, "first game's id");
                            done();
                        } else {
                            throw error;
                        }
                    })
                });

            });

        });

        describe('game', function () {

            this.slow(200);

            describe('getRecentGamesBySummonerId', () => {

                it("should return a 404 error", (done) => {
                    tn.getRecentGamesBySummonerId("euw", 255171257, (error, response) => {
                        if (error) {
                            if (error.name == "ApiError") {
                                if ((<ApiError>error).code == 404) {
                                    done();
                                }
                            }
                        }
                    });

                });

            });

        });

        describe('league', function () {

            this.slow(200);

            describe('getLeagueBySummonerIds', () => {

                it("should find a league", (done) => {
                    tn.getLeagueBySummonerIds("euw", `${playerId}`, (error, response) => {
                        if (!error) {
                            assert.isBoolean(response[`${playerId}`][0].entries[0].isInactive);
                            assert.equal(response[`${playerId}`][0].participantId, playerId);
                            done();
                        } else {
                            throw error;
                        }
                    })
                });

            });

            describe('getLeagueEntryBySummonerIds', () => {

                it("should", (done) => {
                    tn.getLeagueEntryBySummonerIds("euw", `${playerId}`, (error, response) => {
                        if (!error) {
                            assert.isBoolean(response[`${playerId}`][0].entries[0].isInactive);
                            assert.equal(response[`${playerId}`][0].participantId, playerId);
                            done();
                        } else {
                            throw error;
                        }
                    })
                });

            });

            describe('getLeagueByTeamIds', () => {

                it("should", (done) => {
                    tn.getLeagueByTeamIds("euw", '0', (error, response) => {
                        if (!error) {
                            // TODO
                            done();
                        }
                    })
                });

            });

            describe('getLeagueEntryByTeamIds', () => {

                it("should", (done) => {
                    tn.getLeagueEntryByTeamIds("euw", '0', (error, response) => {
                        if (!error) {
                            // TODO
                            done();
                        }
                    })
                });

            });

            describe('getLeagueChallenger', () => {

                it("should", (done) => {
                    tn.getLeagueChallenger("euw", "0", (error, response) => {
                        if (!error) {
                            // TODO
                            done();
                        }
                    })
                });

            });

            describe('getLeagueMaster', () => {

                it("should", (done) => {
                    tn.getLeagueMaster("euw", '0', (error, response) => {
                        if (!error) {
                            // TODO
                            done();
                        }
                    })
                });

            });

        });

        describe('lol-static-data', function () {

            this.slow(200);

            describe('getChampions', () => {

                it("should");

            });

            describe('getChampionById', () => {

                it("should");

            });

            describe('getItems', () => {

                it("should");

            });

            describe('getItemById', () => {

                it("should");

            });

            describe('getLanguageStrings', () => {

                it("should");

            });

            describe('getLanguages', () => {

                it("should");

            });

            describe('getMaps', () => {

                it("should");

            });

            describe('getMeasteries', () => {

                it("should");

            });

            describe('getMasteryById', () => {

                it("should");

            });

            describe('getRealm', () => {

                it("should");

            });

            describe('getRunes', () => {

                it("should");

            });

            describe('getRuneById', () => {

                it("should");

            });

            describe('getSummonerSpells', () => {

                it("should");

            });

            describe('getSummonerSpellById', () => {

                it("should");

            });

            describe('getVersions', () => {

                it("should");

            });

        });

        describe('lol-status', function () {

            this.slow(200);

            describe('getShards', () => {

                it("should");

            });

            describe('getShard', () => {

                it("should");

            });

        });

        describe('match', function () {

            this.slow(200);

            describe('getMatchIdsByTournamentCode', () => {

                it("should");

            });

            describe('getMatchByIdAndTournamentCode', () => {

                it("should");

            });

            describe('getMatchById', () => {

                it("should");

            });

        });

        describe('matchlist', function () {

            this.slow(200);

            describe('getMatchesBySummonerId', () => {

                it("should");

            });

        });

        describe('stats', function () {

            this.slow(200);

            describe('getRankedBySummonerId', () => {

                it("should");

            });

            describe('getSummaryBySummonerId', () => {

                it("should");

            });

        });

        describe('summoner', function () {

            this.slow(200);

            describe('getSummonerByNames', () => {

                it("should");

            });

            describe('getSummonerByIds', () => {

                it("should");

            });

            describe('getMasteryPagesBySummonerIds', () => {

                it("should");

            });

            describe('getNameBySummonerIds', () => {

                it("should");

            });

            describe('getRunePagesBySummonerIds', () => {

                it("should");

            });

        });

        describe('team', function () {

            this.slow(200);

            describe('getTeamsBySummonerIds', () => {

                it("should");

            });

            describe('getTeamsByTeamIds', () => {

                it("should");

            });

        });

        describe('tournament-provider', function () {

            before(function () {
                if (!tn.key.tournaments) {
                    console.info("Skipping 'tournament-provider' tests : No compatible key found");
                    this.skip();
                }
            });

            this.slow(200);

            describe('createTournamentCodesById', () => {

                it("should");

            });

            describe('getTournamentByCode', () => {

                it("should");

            });

            describe('updateTournamentByCode', () => {

                it("should");

            });

            describe('getLobbyEventsByTournamentCode', () => {

                it("should");

            });

            describe('createTournamentProvider', () => {

                it("should");

            });

            describe('createTournament', () => {

                it("should");

            });

        });
    }
}

RiotTypenodeTests.run();