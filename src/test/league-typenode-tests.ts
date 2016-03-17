/*	This file is part of league-typenode.

 league-typenode - Simple TypeScript library for Riot Games' API
 Copyright (C) 2016 Kewin Dousse (Protectator)
 */

import * as chai from 'chai';
import * as api from 'leagueApi';
import * as leaguetn from '../league-typenode';
import * as fs from 'fs';
import {LeagueTypenode,ApiError} from "../league-typenode";

export class LeagueTypenodeTests {

    public static maxRetry = 3;
    public static playerId = 20717177;

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
                keyValue = process.env.LEAGUETYPENODE_KEY;
                if (keyValue != "") {
                    console.info("key.json file not found. Using environment variable LEAGUETYPENODE_KEY.");
                    keyTournaments = false;
                } else {
                    throw new Error("No valid API key found.");
                }
            } else {
                throw new Error("No valid API key found.");
            }
        }

        var tn:leaguetn.LeagueTypenode = new leaguetn.LeagueTypenode(keyValue, keyTournaments);

        describe('champion-v1.2', function () {

            this.slow(200);

            describe('getChampionsStatus', () => {

                LeagueTypenodeTests.testGetChampionStatus(tn, LeagueTypenodeTests.maxRetry);

            });

            describe('getChampionStatusById', () => {

                LeagueTypenodeTests.testGetChampionStatusById(tn, LeagueTypenodeTests.maxRetry);

            });
        });

        describe('championmastery', function () {

            this.slow(200);

            describe('getChampionMastery', () => {

                LeagueTypenodeTests.testGetChampionMastery(tn, LeagueTypenodeTests.maxRetry);

            });

            describe('getChampionsMastery', () => {

                LeagueTypenodeTests.testGetChampionsMastery(tn, LeagueTypenodeTests.maxRetry);

            });

            describe('getScore', () => {

                LeagueTypenodeTests.testGetScore(tn, LeagueTypenodeTests.maxRetry);

            });

            describe('getTopChampions', () => {

                LeagueTypenodeTests.testGetTopChampions(tn, LeagueTypenodeTests.maxRetry);

            });

        });

        describe('current-game', function () {

            this.slow(200);

            describe('getSpectatorGameInfoBySummonerId', () => {

                LeagueTypenodeTests.testGetSpectatorGameInfoBySummonerId(tn, LeagueTypenodeTests.maxRetry);

            });

        });

        describe('featured-games', function () {

            this.slow(200);

            describe('getFeaturedGames', () => {

                LeagueTypenodeTests.testGetFeaturedGames(tn, LeagueTypenodeTests.maxRetry);

            });

        });

        describe('game', function () {

            this.slow(200);

            describe('getRecentGamesBySummonerId', () => {

                LeagueTypenodeTests.testGetRecentGamesBySummonerId(tn, LeagueTypenodeTests.maxRetry);

            });

        });

        describe('league', function () {

            this.slow(200);

            describe('getLeagueBySummonerIds', () => {

                LeagueTypenodeTests.testGetLeagueBySummonerIds(tn, LeagueTypenodeTests.maxRetry);

            });

            describe('getLeagueEntryBySummonerIds', () => {

                LeagueTypenodeTests.testGetLeagueEntryBySummonerIds(tn, LeagueTypenodeTests.maxRetry);

            });

            describe('getLeagueByTeamIds', () => {

                LeagueTypenodeTests.testGetLeagueByTeamIds(tn, LeagueTypenodeTests.maxRetry);

            });

            describe('getLeagueEntryByTeamIds', () => {

                LeagueTypenodeTests.testGetLeagueEntryByTeamIds(tn, LeagueTypenodeTests.maxRetry);

            });

            describe('getLeagueChallenger', () => {

                LeagueTypenodeTests.testGetLeagueChallenger(tn, LeagueTypenodeTests.maxRetry);

            });

            describe('getLeagueMaster', () => {

                LeagueTypenodeTests.testGetLeagueMaster(tn, LeagueTypenodeTests.maxRetry);

            });

        });

        describe('lol-static-data', function () {

            this.slow(200);

            describe('getChampions', () => {

                LeagueTypenodeTests.testGetChampions(tn, LeagueTypenodeTests.maxRetry);

            });

            describe('getChampionById', () => {

                LeagueTypenodeTests.testGetChampionById(tn, LeagueTypenodeTests.maxRetry);

            });

            describe('getItems', () => {

                LeagueTypenodeTests.testGetItems(tn, LeagueTypenodeTests.maxRetry);

            });

            describe('getItemById', () => {

                LeagueTypenodeTests.testGetItemById(tn, LeagueTypenodeTests.maxRetry);

            });

            describe('getLanguageStrings', () => {

                LeagueTypenodeTests.testGetLanguageStrings(tn, LeagueTypenodeTests.maxRetry);

            });

            describe('getLanguages', () => {

                LeagueTypenodeTests.testGetLanguages(tn, LeagueTypenodeTests.maxRetry);

            });

            describe('getMaps', () => {

                LeagueTypenodeTests.testGetMaps(tn, LeagueTypenodeTests.maxRetry);

            });

            describe('getMasteries', () => {

                LeagueTypenodeTests.testGetMasteries(tn, LeagueTypenodeTests.maxRetry);

            });

            describe('getMasteryById', () => {

                LeagueTypenodeTests.testGetMasteryById(tn, LeagueTypenodeTests.maxRetry);

            });

            describe('getRealm', () => {

                LeagueTypenodeTests.testGetRealm(tn, LeagueTypenodeTests.maxRetry);

            });

            describe('getRunes', () => {

                LeagueTypenodeTests.testGetRunes(tn, LeagueTypenodeTests.maxRetry);

            });

            describe('getRuneById', () => {

                LeagueTypenodeTests.testGetRuneById(tn, LeagueTypenodeTests.maxRetry);

            });

            describe('getSummonerSpells', () => {

                LeagueTypenodeTests.testGetSummonerSpells(tn, LeagueTypenodeTests.maxRetry);

            });

            describe('getSummonerSpellById', () => {

                LeagueTypenodeTests.testGetSummonerSpellById(tn, LeagueTypenodeTests.maxRetry);

            });

            describe('getVersions', () => {

                LeagueTypenodeTests.testGetVersions(tn, LeagueTypenodeTests.maxRetry);

            });

        });

        describe('lol-status', function () {

            this.slow(200);

            describe('getShards', () => {

                LeagueTypenodeTests.testGetShards(tn, LeagueTypenodeTests.maxRetry);

            });

            describe('getShard', () => {

                LeagueTypenodeTests.testGetShard(tn, LeagueTypenodeTests.maxRetry);

            });

        });

        describe('match', function () {

            this.slow(200);

            describe('getMatchIdsByTournamentCode', () => {

                LeagueTypenodeTests.testGetMatchIdsByTournamentCode(tn, LeagueTypenodeTests.maxRetry);

            });

            describe('getMatchByIdAndTournamentCode', () => {

                LeagueTypenodeTests.testGetMatchByIdAndTournamentCode(tn, LeagueTypenodeTests.maxRetry);

            });

            describe('getMatchById', () => {

                LeagueTypenodeTests.testGetMatchById(tn, LeagueTypenodeTests.maxRetry);

            });

        });

        describe('matchlist', function () {

            this.slow(200);

            describe('getMatchesBySummonerId', () => {

                LeagueTypenodeTests.testGetMatchesBySummonerId(tn, LeagueTypenodeTests.maxRetry);

            });

        });

        describe('stats', function () {

            this.slow(200);

            describe('getRankedBySummonerId', () => {

                LeagueTypenodeTests.testGetRankedBySummonerId(tn, LeagueTypenodeTests.maxRetry);

            });

            describe('getSummaryBySummonerId', () => {

                LeagueTypenodeTests.testGetSummaryBySummonerId(tn, LeagueTypenodeTests.maxRetry);

            });

        });

        describe('summoner', function () {

            this.slow(200);

            describe('getSummonerByNames', () => {

                LeagueTypenodeTests.testGetSummonerByNames(tn, LeagueTypenodeTests.maxRetry);

            });

            describe('getSummonerByIds', () => {

                LeagueTypenodeTests.testGetSummonerByIds(tn, LeagueTypenodeTests.maxRetry);

            });

            describe('getMasteryPagesBySummonerIds', () => {

                LeagueTypenodeTests.testGetMasteryPagesBySummonerIds(tn, LeagueTypenodeTests.maxRetry);

            });

            describe('getNameBySummonerIds', () => {

                LeagueTypenodeTests.testGetNameBySummonerIds(tn, LeagueTypenodeTests.maxRetry);

            });

            describe('getRunePagesBySummonerIds', () => {

                LeagueTypenodeTests.testGetRunePagesBySummonerIds(tn, LeagueTypenodeTests.maxRetry);

            });

        });

        describe('team', function () {

            this.slow(200);

            describe('getTeamsBySummonerIds', () => {

                LeagueTypenodeTests.testGetTeamsBySummonerIds(tn, LeagueTypenodeTests.maxRetry);

            });

            describe('getTeamsByTeamIds', () => {

                LeagueTypenodeTests.testGetTeamsByTeamIds(tn, LeagueTypenodeTests.maxRetry);

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

                LeagueTypenodeTests.testCreateTournamentCodesById(tn, LeagueTypenodeTests.maxRetry);

            });

            describe('getTournamentByCode', () => {

                LeagueTypenodeTests.testGetTournamentByCode(tn, LeagueTypenodeTests.maxRetry);

            });

            describe('updateTournamentByCode', () => {

                LeagueTypenodeTests.testUpdateTournamentByCode(tn, LeagueTypenodeTests.maxRetry);

            });

            describe('getLobbyEventsByTournamentCode', () => {

                LeagueTypenodeTests.testGetLobbyEventsByTournamentCode(tn, LeagueTypenodeTests.maxRetry);

            });

            describe('createTournamentProvider', () => {

                LeagueTypenodeTests.testCreateTournamentProvider(tn, LeagueTypenodeTests.maxRetry);

            });

            describe('createTournament', () => {

                LeagueTypenodeTests.testCreateTournament(tn, LeagueTypenodeTests.maxRetry);

            });

        });
    }

    private static retryIf429(tn:LeagueTypenode, error:Error, toTry:Function, retries:number) {
        if (error.name == "ApiError" && (<ApiError>error).code == 429 && retries > 0) {
            var toWait:number = error["Retry-After"];
            setTimeout(function () {
                toTry(tn, --retries);
            }, toWait);
        } else {
            throw error;
        }
    }

    private static testGetChampionStatus(tn:LeagueTypenode, retries:number) {
        it("should return more than 100 values with no filter", (done) => {
            tn.getChampionsStatus("euw", false, (error, response) => {
                if (!error) {
                    chai.assert.isAtLeast(response.champions.length, 100, "number of champions");
                    done();
                } else {
                    LeagueTypenodeTests.retryIf429(tn, error, LeagueTypenodeTests.testGetChampionStatus, retries);
                }
            });


        });

        it("should return at least 10 values with freeToPlay=true", (done) => {
            tn.getChampionsStatus("euw", true, (error, response) => {
                if (!error) {
                    chai.assert.isAtLeast(response.champions.length, 10, "number of free champions");
                    done();
                } else {
                    LeagueTypenodeTests.retryIf429(tn, error, LeagueTypenodeTests.testGetChampionStatus, retries);
                }
            });
        });
    }

    private static testGetChampionStatusById(tn:LeagueTypenode, retries:number):void {
        it("should return the champion asked (84)", (done) => {
            tn.getChampionStatusById("euw", 84, (error, response) => {
                if (!error) {
                    chai.assert.equal(response.id, 84, "id of champion asked");
                    done();
                } else {
                    LeagueTypenodeTests.retryIf429(tn, error, LeagueTypenodeTests.testGetChampionStatusById, retries);
                }
            });
        });
    }

    private static testGetChampionMastery(tn:LeagueTypenode, retries:number):void {
        it("should return a valid answer with a positive number of championPoints", (done) => {
            tn.getChampionMastery("EUW1", 25517257, 84, (error, response) => {
                if (!error) {
                    chai.assert.equal(response.playerId, 25517257, "player id");
                    chai.assert.equal(response.championId, 84, "champion id");
                    chai.assert.isAtLeast(response.championPoints, 0, "champion points");
                    done();
                } else {
                    LeagueTypenodeTests.retryIf429(tn, error, LeagueTypenodeTests.testGetChampionMastery, retries);
                }
            })
        });
    }

    private static testGetChampionsMastery(tn:LeagueTypenode, retries:number):void {
        it("should be a list", (done) => {
            tn.getChampionsMastery("EUW1", 255171257, (error, response) => {
                if (!error) {
                    chai.assert.isArray(response, "response is an array");
                    done();
                } else {
                    LeagueTypenodeTests.retryIf429(tn, error, LeagueTypenodeTests.testGetChampionsMastery, retries);
                }
            })
        });
    }

    private static testGetScore(tn:LeagueTypenode, retries:number):void {
        it("should be a positive number", (done) => {
            tn.getScore("EUW1", 255171257, (error, response) => {
                if (!error) {
                    chai.assert.isAtLeast(response, 0, "total score");
                    done();
                } else {
                    LeagueTypenodeTests.retryIf429(tn, error, LeagueTypenodeTests.testGetScore, retries);
                }
            })
        });
    }

    private static testGetTopChampions(tn:LeagueTypenode, retries:number):void {
        it("should be a list", (done) => {
            tn.getTopChampions("EUW1", 255171257, 3, (error, response) => {
                if (!error) {
                    chai.assert.isArray(response, "response in an array");
                    done();
                } else {
                    LeagueTypenodeTests.retryIf429(tn, error, LeagueTypenodeTests.testGetTopChampions, retries);
                }
            })
        });
    }

    private static testGetSpectatorGameInfoBySummonerId(tn:LeagueTypenode, retries:number):void {
        it("should try to find a game");
    }

    private static testGetFeaturedGames(tn:LeagueTypenode, retries:number):void {
        it("should have multiple valid featured games", (done) => {
            tn.getFeaturedGames("euw", (error, response) => {
                if (!error) {
                    chai.assert.isAbove(response.clientRefreshInterval, 0, "client refresh internal");
                    chai.assert.isAbove(response.gameList.length, 1, "game list length");
                    chai.assert.isAbove(response.gameList[0].gameId, 0, "first game's id");
                    done();
                } else {
                    LeagueTypenodeTests.retryIf429(tn, error, LeagueTypenodeTests.testGetFeaturedGames, retries);
                }
            })
        });
    }

    private static testGetRecentGamesBySummonerId(tn:LeagueTypenode, retries:number):void {
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
    }

    private static testGetLeagueBySummonerIds(tn:LeagueTypenode, retries:number):void {
        it("should find a league for the asked playerId", (done) => {
            tn.getLeagueBySummonerIds("euw", `${LeagueTypenodeTests.playerId}`, (error, response) => {
                if (!error) {
                    chai.assert.isBoolean(response[`${LeagueTypenodeTests.playerId}`][0].entries[0].isInactive);
                    chai.assert.equal(response[`${LeagueTypenodeTests.playerId}`][0].participantId, LeagueTypenodeTests.playerId);
                    done();
                } else {
                    LeagueTypenodeTests.retryIf429(tn, error, LeagueTypenodeTests.testGetLeagueBySummonerIds, retries);
                }
            })
        });
    }

    private static testGetLeagueEntryBySummonerIds(tn:LeagueTypenode, retries:number):void {
        it("should contain the asked playerId ans a valid entry for it", (done) => {
            tn.getLeagueEntryBySummonerIds("euw", `${LeagueTypenodeTests.playerId}`, (error, response) => {
                if (!error) {
                    chai.assert.isBoolean(response[`${LeagueTypenodeTests.playerId}`][0].entries[0].isInactive);
                    chai.assert.equal(response[`${LeagueTypenodeTests.playerId}`][0].participantId, LeagueTypenodeTests.playerId);
                    done();
                } else {
                    LeagueTypenodeTests.retryIf429(tn, error, LeagueTypenodeTests.testGetLeagueEntryBySummonerIds, retries);
                }
            })
        });
    }

    private static testGetLeagueByTeamIds(tn:LeagueTypenode, retries:number):void {
        it("should", (done) => {
            tn.getLeagueByTeamIds("euw", '0', (error, response) => {
                if (!error) {
                    // TODO
                    done();
                } else {
                    LeagueTypenodeTests.retryIf429(tn, error, LeagueTypenodeTests.testGetLeagueByTeamIds, retries);
                }
            })
        });
    }

    private static testGetLeagueEntryByTeamIds(tn:LeagueTypenode, retries:number):void {
        it("should", (done) => {
            tn.getLeagueEntryByTeamIds("euw", '0', (error, response) => {
                if (!error) {
                    // TODO
                    done();
                } else {
                    LeagueTypenodeTests.retryIf429(tn, error, LeagueTypenodeTests.testGetLeagueEntryByTeamIds, retries);
                }
            })
        });
    }

    private static testGetLeagueChallenger(tn:LeagueTypenode, retries:number):void {
        it("should have the asked playerId's valid challenger league", (done) => {
            tn.getLeagueChallenger("euw", `${LeagueTypenodeTests.playerId}`, (error, response) => {
                if (!error) {
                    chai.assert.equal(response.participantId, `${LeagueTypenodeTests.playerId}`, "participantId");
                    done();
                } else {
                    LeagueTypenodeTests.retryIf429(tn, error, LeagueTypenodeTests.testGetLeagueChallenger, retries);
                }
            })
        });
    }

    private static testGetLeagueMaster(tn:LeagueTypenode, retries:number):void {
        it("should have the asked playerId's valid master league", (done) => {
            tn.getLeagueMaster("euw", `${LeagueTypenodeTests.playerId}`, (error, response) => {
                if (!error) {
                    // TODO
                    done();
                } else {
                    throw error;
                }
            })
        });
    }

    private static testGetChampions(tn:LeagueTypenode, retries:number):void {
        it("test case to be implemented");
    }

    private static testGetChampionById(tn:LeagueTypenode, retries:number):void {
        it("test case to be implemented");
    }

    private static testGetItems(tn:LeagueTypenode, retries:number):void {
        it("test case to be implemented");
    }

    private static testGetItemById(tn:LeagueTypenode, retries:number):void {
        it("test case to be implemented");
    }

    private static testGetLanguageStrings(tn:LeagueTypenode, retries:number):void {
        it("test case to be implemented");
    }

    private static testGetLanguages(tn:LeagueTypenode, retries:number):void {
        it("test case to be implemented");
    }

    private static testGetMaps(tn:LeagueTypenode, retries:number):void {
        it("test case to be implemented");
    }

    private static testGetMasteries(tn:LeagueTypenode, retries:number):void {
        it("test case to be implemented");
    }

    private static testGetMasteryById(tn:LeagueTypenode, retries:number):void {
        it("test case to be implemented");
    }

    private static testGetRealm(tn:LeagueTypenode, retries:number):void {
        it("test case to be implemented");
    }

    private static testGetRunes(tn:LeagueTypenode, retries:number):void {
        it("test case to be implemented");
    }

    private static testGetRuneById(tn:LeagueTypenode, retries:number):void {
        it("test case to be implemented");
    }

    private static testGetSummonerSpells(tn:LeagueTypenode, retries:number):void {
        it("test case to be implemented");
    }

    private static testGetSummonerSpellById(tn:LeagueTypenode, retries:number):void {
        it("test case to be implemented");
    }

    private static testGetVersions(tn:LeagueTypenode, retries:number):void {
        it("test case to be implemented");
    }

    private static testGetShards(tn:LeagueTypenode, retries:number):void {
        it("test case to be implemented");
    }

    private static testGetShard(tn:LeagueTypenode, retries:number):void {
        it("test case to be implemented");
    }

    private static testGetMatchIdsByTournamentCode(tn:LeagueTypenode, retries:number):void {
        it("test case to be implemented");
    }

    private static testGetMatchByIdAndTournamentCode(tn:LeagueTypenode, retries:number):void {
        it("test case to be implemented");
    }

    private static testGetMatchById(tn:LeagueTypenode, retries:number):void {
        it("test case to be implemented");
    }

    private static testGetMatchesBySummonerId(tn:LeagueTypenode, retries:number):void {
        it("test case to be implemented");
    }

    private static testGetRankedBySummonerId(tn:LeagueTypenode, retries:number):void {
        it("test case to be implemented");
    }

    private static testGetSummaryBySummonerId(tn:LeagueTypenode, retries:number):void {
        it("test case to be implemented");
    }

    private static testGetSummonerByNames(tn:LeagueTypenode, retries:number):void {
        it("test case to be implemented");
    }

    private static testGetSummonerByIds(tn:LeagueTypenode, retries:number):void {
        it("test case to be implemented");
    }

    private static testGetMasteryPagesBySummonerIds(tn:LeagueTypenode, retries:number):void {
        it("test case to be implemented");
    }

    private static testGetNameBySummonerIds(tn:LeagueTypenode, retries:number):void {
        it("test case to be implemented");
    }

    private static testGetRunePagesBySummonerIds(tn:LeagueTypenode, retries:number):void {
        it("test case to be implemented");
    }

    private static testGetTeamsBySummonerIds(tn:LeagueTypenode, retries:number):void {
        it("test case to be implemented");
    }

    private static testGetTeamsByTeamIds(tn:LeagueTypenode, retries:number):void {
        it("test case to be implemented");
    }

    private static testCreateTournamentCodesById(tn:LeagueTypenode, retries:number):void {
        it("test case to be implemented");
    }

    private static testGetTournamentByCode(tn:LeagueTypenode, retries:number):void {
        it("test case to be implemented");
    }

    private static testUpdateTournamentByCode(tn:LeagueTypenode, retries:number):void {
        it("test case to be implemented");
    }

    private static testGetLobbyEventsByTournamentCode(tn:LeagueTypenode, retries:number):void {
        it("test case to be implemented");
    }

    private static testCreateTournamentProvider(tn:LeagueTypenode, retries:number):void {
        it("test case to be implemented");
    }

    private static testCreateTournament(tn:LeagueTypenode, retries:number):void {
        it("test case to be implemented");
    }
}

LeagueTypenodeTests.run();