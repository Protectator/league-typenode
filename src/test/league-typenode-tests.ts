/*	This file is part of league-typenode.

 league-typenode - Simple TypeScript library for Riot Games' API
 Copyright (C) 2016 Kewin Dousse (Protectator)
 */

import * as chai from 'chai';
import * as leaguetn from '../league-typenode';
import * as fs from 'fs';
import {LeagueTypenode, ApiError, TooManyRequestsError} from "../league-typenode";

export class LeagueTypenodeTests {

    private static maxRetry = 3;
    private static playerId = 20717177;
    private static playerName = "FNC Rekkles";
    private static teamId = -1;
    private static locale = "en_US";
    private static version = "6.4";
    private static masteryId = 6121;
    private static runeId = 5233;
    private static spellId = 4;
    private static matchId;
    private static tournamentCode;
    private static tournamentId;
    private static tournamentCodeParameters;
    private static tournamentCodeUpdateParameters;
    private static providerRegistrationBody;
    private static tournamentRegistrationParameters;

    public static run() {
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
            this.timeout(15000);

            describe('getChampionsStatus', () => {

                it("should return more than 100 values with no filter", (done) => {
                    LeagueTypenodeTests.testGetChampionStatus1(tn, LeagueTypenodeTests.maxRetry, done);
                });

                it("should return at least 10 values with no filter", (done) => {
                    LeagueTypenodeTests.testGetChampionStatus2(tn, LeagueTypenodeTests.maxRetry, done);
                });

            });

            describe('getChampionStatusById', () => {
                it("should return the champion asked (84)", (done) => {
                    LeagueTypenodeTests.testGetChampionStatusById(tn, LeagueTypenodeTests.maxRetry, done);
                });
            });
        });

        describe('championmastery', function () {

            this.slow(200);
            this.timeout(15000);

            describe('getChampionMastery', () => {
                it("should return a valid answer with a positive number of championPoints", (done) => {

                    LeagueTypenodeTests.testGetChampionMastery(tn, LeagueTypenodeTests.maxRetry, done);
                });
            });

            describe('getChampionsMastery', () => {
                it("should be a list", (done) => {

                    LeagueTypenodeTests.testGetChampionsMastery(tn, LeagueTypenodeTests.maxRetry, done);
                });
            });

            describe('getScore', () => {
                it("should be a positive number", (done) => {

                    LeagueTypenodeTests.testGetScore(tn, LeagueTypenodeTests.maxRetry, done);
                });
            });

            describe('getTopChampions', () => {
                it("should be a list", (done) => {

                    LeagueTypenodeTests.testGetTopChampions(tn, LeagueTypenodeTests.maxRetry, done);
                });
            });

        });

        describe('current-game', function () {

            this.slow(200);
            this.timeout(15000);

            describe('getSpectatorGameInfoBySummonerId', () => {

                it("should try to find a game");
                // LeagueTypenodeTests.testGetSpectatorGameInfoBySummonerId(tn, LeagueTypenodeTests.maxRetry, done);

            });

        });

        describe('featured-games', function () {

            this.slow(200);
            this.timeout(15000);

            describe('getFeaturedGames', () => {
                it("should have multiple valid featured games", (done) => {

                    LeagueTypenodeTests.testGetFeaturedGames(tn, LeagueTypenodeTests.maxRetry, done);
                });
            });

        });

        describe('game', function () {

            this.slow(200);
            this.timeout(15000);

            describe('getRecentGamesBySummonerId', () => {
                it("should return a 404 error", (done) => {

                    LeagueTypenodeTests.testGetRecentGamesBySummonerId(tn, LeagueTypenodeTests.maxRetry, done);
                });
            });

        });

        describe('league', function () {

            this.slow(200);
            this.timeout(30000);

            describe('getLeagueBySummonerIds', () => {
                it("should find a league for the asked playerId", (done) => {

                    LeagueTypenodeTests.testGetLeagueBySummonerIds(tn, LeagueTypenodeTests.maxRetry, done);
                });
            });

            describe('getLeagueEntryBySummonerIds', () => {
                it("should contain the asked playerId and a valid entry for it", (done) => {

                    LeagueTypenodeTests.testGetLeagueEntryBySummonerIds(tn, LeagueTypenodeTests.maxRetry, done);
                });
            });

            describe('getLeagueByTeamIds', () => {
                it("should contain the team's asked teamId mapping to a list of entries in which first participant is valid", (done) => {

                    LeagueTypenodeTests.testGetLeagueByTeamIds(tn, LeagueTypenodeTests.maxRetry, done);
                });
            });

            describe('getLeagueEntryByTeamIds', () => {
                it("should contain the team's asked teamId mapping to a list of entries in which first participant is valid", (done) => {

                    LeagueTypenodeTests.testGetLeagueEntryByTeamIds(tn, LeagueTypenodeTests.maxRetry, done);
                });
            });

            describe('getLeagueChallenger', () => {
                it("should have the asked playerId's valid challenger league", (done) => {

                    LeagueTypenodeTests.testGetLeagueChallenger(tn, LeagueTypenodeTests.maxRetry, done);
                });
            });

            describe('getLeagueMaster', () => {
                it("should have the asked playerId's valid master league", (done) => {

                    LeagueTypenodeTests.testGetLeagueMaster(tn, LeagueTypenodeTests.maxRetry, done);
                });
            });

        });

        describe('lol-static-data', function () {

            this.slow(200);

            describe('getChampions', () => {

                // TODO
                // LeagueTypenodeTests.testGetChampions(tn, LeagueTypenodeTests.maxRetry, done);

            });

            describe('getChampionById', () => {

                // TODO
                // LeagueTypenodeTests.testGetChampionById(tn, LeagueTypenodeTests.maxRetry, done);

            });

            describe('getItems', () => {

                // TODO
                // LeagueTypenodeTests.testGetItems(tn, LeagueTypenodeTests.maxRetry, done);

            });

            describe('getItemById', () => {

                // TODO
                // LeagueTypenodeTests.testGetItemById(tn, LeagueTypenodeTests.maxRetry, done);

            });

            describe('getLanguageStrings', () => {

                // TODO
                // LeagueTypenodeTests.testGetLanguageStrings(tn, LeagueTypenodeTests.maxRetry, done);

            });

            describe('getLanguages', () => {

                // TODO
                // LeagueTypenodeTests.testGetLanguages(tn, LeagueTypenodeTests.maxRetry, done);

            });

            describe('getMaps', () => {

                // TODO
                // LeagueTypenodeTests.testGetMaps(tn, LeagueTypenodeTests.maxRetry, done);

            });

            describe('getMasteries', () => {

                // TODO
                // LeagueTypenodeTests.testGetMasteries(tn, LeagueTypenodeTests.maxRetry, done);

            });

            describe('getMasteryById', () => {

                // TODO
                // LeagueTypenodeTests.testGetMasteryById(tn, LeagueTypenodeTests.maxRetry, done);

            });

            describe('getRealm', () => {

                // TODO
                // LeagueTypenodeTests.testGetRealm(tn, LeagueTypenodeTests.maxRetry, done);

            });

            describe('getRunes', () => {

                // TODO
                // LeagueTypenodeTests.testGetRunes(tn, LeagueTypenodeTests.maxRetry, done);

            });

            describe('getRuneById', () => {

                // TODO
                // LeagueTypenodeTests.testGetRuneById(tn, LeagueTypenodeTests.maxRetry, done);

            });

            describe('getSummonerSpells', () => {

                // TODO
                // LeagueTypenodeTests.testGetSummonerSpells(tn, LeagueTypenodeTests.maxRetry, done);

            });

            describe('getSummonerSpellById', () => {

                // TODO
                // LeagueTypenodeTests.testGetSummonerSpellById(tn, LeagueTypenodeTests.maxRetry, done);

            });

            describe('getVersions', () => {

                // TODO
                // LeagueTypenodeTests.testGetVersions(tn, LeagueTypenodeTests.maxRetry, done);

            });

        });

        describe('lol-status', function () {

            this.slow(200);

            describe('getShards', () => {

                // TODO
                // LeagueTypenodeTests.testGetShards(tn, LeagueTypenodeTests.maxRetry, done);

            });

            describe('getShard', () => {

                // TODO
                // LeagueTypenodeTests.testGetShard(tn, LeagueTypenodeTests.maxRetry, done);

            });

        });

        describe('match', function () {

            this.slow(200);

            describe('getMatchIdsByTournamentCode', () => {

                // TODO
                // LeagueTypenodeTests.testGetMatchIdsByTournamentCode(tn, LeagueTypenodeTests.maxRetry, done);

            });

            describe('getMatchByIdAndTournamentCode', () => {

                // TODO
                // LeagueTypenodeTests.testGetMatchByIdAndTournamentCode(tn, LeagueTypenodeTests.maxRetry, done);

            });

            describe('getMatchById', () => {

                // TODO
                // LeagueTypenodeTests.testGetMatchById(tn, LeagueTypenodeTests.maxRetry, done);

            });

        });

        describe('matchlist', function () {

            this.slow(200);

            describe('getMatchesBySummonerId', () => {

                // TODO
                // LeagueTypenodeTests.testGetMatchesBySummonerId(tn, LeagueTypenodeTests.maxRetry, done);

            });

        });

        describe('stats', function () {

            this.slow(200);

            describe('getRankedBySummonerId', () => {

                // TODO
                // LeagueTypenodeTests.testGetRankedBySummonerId(tn, LeagueTypenodeTests.maxRetry, done);

            });

            describe('getSummaryBySummonerId', () => {

                // TODO
                // LeagueTypenodeTests.testGetSummaryBySummonerId(tn, LeagueTypenodeTests.maxRetry, done);

            });

        });

        describe('summoner', function () {

            this.slow(200);

            describe('getSummonerByNames', () => {

                // TODO
                // LeagueTypenodeTests.testGetSummonerByNames(tn, LeagueTypenodeTests.maxRetry, done);

            });

            describe('getSummonerByIds', () => {

                // TODO
                // LeagueTypenodeTests.testGetSummonerByIds(tn, LeagueTypenodeTests.maxRetry, done);

            });

            describe('getMasteryPagesBySummonerIds', () => {

                // TODO
                // LeagueTypenodeTests.testGetMasteryPagesBySummonerIds(tn, LeagueTypenodeTests.maxRetry, done);

            });

            describe('getNameBySummonerIds', () => {

                // TODO
                // LeagueTypenodeTests.testGetNameBySummonerIds(tn, LeagueTypenodeTests.maxRetry, done);

            });

            describe('getRunePagesBySummonerIds', () => {

                // TODO
                // LeagueTypenodeTests.testGetRunePagesBySummonerIds(tn, LeagueTypenodeTests.maxRetry, done);

            });

        });

        describe('team', function () {

            this.slow(200);

            describe('getTeamsBySummonerIds', () => {

                // TODO
                // LeagueTypenodeTests.testGetTeamsBySummonerIds(tn, LeagueTypenodeTests.maxRetry, done);

            });

            describe('getTeamsByTeamIds', () => {

                // TODO
                // LeagueTypenodeTests.testGetTeamsByTeamIds(tn, LeagueTypenodeTests.maxRetry, done);

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

                // TODO
                // LeagueTypenodeTests.testCreateTournamentCodesById(tn, LeagueTypenodeTests.maxRetry, done);

            });

            describe('getTournamentByCode', () => {

                // TODO
                // LeagueTypenodeTests.testGetTournamentByCode(tn, LeagueTypenodeTests.maxRetry, done);

            });

            describe('updateTournamentByCode', () => {

                // TODO
                // LeagueTypenodeTests.testUpdateTournamentByCode(tn, LeagueTypenodeTests.maxRetry, done);

            });

            describe('getLobbyEventsByTournamentCode', () => {

                // TODO
                // LeagueTypenodeTests.testGetLobbyEventsByTournamentCode(tn, LeagueTypenodeTests.maxRetry, done);

            });

            describe('createTournamentProvider', () => {

                // TODO
                // LeagueTypenodeTests.testCreateTournamentProvider(tn, LeagueTypenodeTests.maxRetry, done);

            });

            describe('createTournament', () => {

                // TODO
                // LeagueTypenodeTests.testCreateTournament(tn, LeagueTypenodeTests.maxRetry, done);

            });

        });
    }

    private static retryIf429(tn:LeagueTypenode, error:Error, toTry:Function, retries:number, done:Function) {
        if (error.name == "TooManyRequestsError" && (<ApiError>error).code == 429 && retries > 0) {
            var toWait:number = (<TooManyRequestsError>error).retryAfter;
            setTimeout(function () {
                toTry(tn, retries - 1, done);
            }, toWait * 1000);
        } else {
            throw error;
        }
    }

    private static testGetChampionStatus1(tn:LeagueTypenode, retries:number, done:Function) {
        tn.getChampionsStatus("euw", false, (error, response) => {
            if (!error) {
                chai.assert.isAtLeast(response.champions.length, 100, "number of champions");
                done();
            } else {
                LeagueTypenodeTests.retryIf429(tn, error, LeagueTypenodeTests.testGetChampionStatus1, retries, done);
            }
        });
    }

    private static testGetChampionStatus2(tn:LeagueTypenode, retries:number, done:Function) {
        tn.getChampionsStatus("euw", true, (error, response) => {
            if (!error) {
                chai.assert.isAtLeast(response.champions.length, 10, "number of free champions");
                done();
            } else {
                LeagueTypenodeTests.retryIf429(tn, error, LeagueTypenodeTests.testGetChampionStatus2, retries, done);
            }
        });
    }

    private static testGetChampionStatusById(tn:LeagueTypenode, retries:number, done:Function):void {
        tn.getChampionStatusById("euw", 84, (error, response) => {
            if (!error) {
                chai.assert.equal(response.id, 84, "id of champion asked");
                done();
            } else {
                LeagueTypenodeTests.retryIf429(tn, error, LeagueTypenodeTests.testGetChampionStatusById, retries, done);
            }
        });
    }

    private static testGetChampionMastery(tn:LeagueTypenode, retries:number, done:Function):void {
        tn.getChampionMastery("EUW1", 25517257, 84, (error, response) => {
            if (!error) {
                chai.assert.equal(response.playerId, 25517257, "player id");
                chai.assert.equal(response.championId, 84, "champion id");
                chai.assert.isAtLeast(response.championPoints, 0, "champion points");
                done();
            } else {
                LeagueTypenodeTests.retryIf429(tn, error, LeagueTypenodeTests.testGetChampionMastery, retries, done);
            }
        });
    }

    private static testGetChampionsMastery(tn:LeagueTypenode, retries:number, done:Function):void {
        tn.getChampionsMastery("EUW1", 255171257, (error, response) => {
            if (!error) {
                chai.assert.isArray(response, "response is an array");
                done();
            } else {
                LeagueTypenodeTests.retryIf429(tn, error, LeagueTypenodeTests.testGetChampionsMastery, retries, done);
            }
        });
    }

    private static testGetScore(tn:LeagueTypenode, retries:number, done:Function):void {
        tn.getScore("EUW1", 255171257, (error, response) => {
            if (!error) {
                chai.assert.isAtLeast(response, 0, "total score");
                done();
            } else {
                LeagueTypenodeTests.retryIf429(tn, error, LeagueTypenodeTests.testGetScore, retries, done);
            }
        });
    }

    private static testGetTopChampions(tn:LeagueTypenode, retries:number, done:Function):void {
        tn.getTopChampions("EUW1", 255171257, 3, (error, response) => {
            if (!error) {
                chai.assert.isArray(response, "response in an array");
                done();
            } else {
                LeagueTypenodeTests.retryIf429(tn, error, LeagueTypenodeTests.testGetTopChampions, retries, done);
            }
        });
    }

    private static testGetSpectatorGameInfoBySummonerId(tn:LeagueTypenode, retries:number, done:Function):void {
        return;
    }

    private static testGetFeaturedGames(tn:LeagueTypenode, retries:number, done:Function):void {
        tn.getFeaturedGames("euw", (error, response) => {
            if (!error) {
                chai.assert.isAbove(response.clientRefreshInterval, 0, "client refresh internal");
                chai.assert.isAbove(response.gameList.length, 1, "game list length");
                chai.assert.isAbove(response.gameList[0].gameId, 0, "first game's id");
                done();
            } else {
                LeagueTypenodeTests.retryIf429(tn, error, LeagueTypenodeTests.testGetFeaturedGames, retries, done);
            }
        });
    }

    private static testGetRecentGamesBySummonerId(tn:LeagueTypenode, retries:number, done:Function):void {
        tn.getRecentGamesBySummonerId("euw", 255171257, (error, response) => {
            if (error) {
                if (error.name == "ApiError") {
                    if ((<ApiError>error).code == 404) {
                        done();
                    }
                }
            }
        });
    }

    private static testGetLeagueBySummonerIds(tn:LeagueTypenode, retries:number, done:Function):void {
        tn.getLeagueBySummonerIds("euw", `${LeagueTypenodeTests.playerId}`, (error, response) => {
            if (!error) {
                chai.assert.isBoolean(response[`${LeagueTypenodeTests.playerId}`][0].entries[0].isInactive);
                chai.assert.equal(response[`${LeagueTypenodeTests.playerId}`][0].participantId, LeagueTypenodeTests.playerId);
                done();
            } else {
                LeagueTypenodeTests.retryIf429(tn, error, LeagueTypenodeTests.testGetLeagueBySummonerIds, retries, done);
            }
        });
    }

    private static testGetLeagueEntryBySummonerIds(tn:LeagueTypenode, retries:number, done:Function):void {
        tn.getLeagueEntryBySummonerIds("euw", `${LeagueTypenodeTests.playerId}`, (error, response) => {
            if (!error) {
                chai.assert.isBoolean(response[`${LeagueTypenodeTests.playerId}`][0].entries[0].isInactive);
                chai.assert.equal(response[`${LeagueTypenodeTests.playerId}`][0].tier, 'CHALLENGER');
                done();
            } else {
                LeagueTypenodeTests.retryIf429(tn, error, LeagueTypenodeTests.testGetLeagueEntryBySummonerIds, retries, done);
            }
        });
    }

    private static testGetLeagueByTeamIds(tn:LeagueTypenode, retries:number, done:Function):void {
        tn.getLeagueByTeamIds("euw", `${LeagueTypenodeTests.teamId}`, (error, response) => {
            if (!error) {
                chai.assert.isBoolean(response[`${LeagueTypenodeTests.teamId}`][0].entries[0].isInactive);
                done();
            } else {
                LeagueTypenodeTests.retryIf429(tn, error, LeagueTypenodeTests.testGetLeagueByTeamIds, retries, done);
            }
        });
    }

    private static testGetLeagueEntryByTeamIds(tn:LeagueTypenode, retries:number, done:Function):void {
        tn.getLeagueEntryByTeamIds("euw", `${LeagueTypenodeTests.teamId}`, (error, response) => {
            if (!error) {
                chai.assert.isBoolean(response[`${LeagueTypenodeTests.teamId}`][0].entries[0].isInactive);
                done();
            } else {
                LeagueTypenodeTests.retryIf429(tn, error, LeagueTypenodeTests.testGetLeagueEntryByTeamIds, retries, done);
            }
        })
    }

    private static testGetLeagueChallenger(tn:LeagueTypenode, retries:number, done:Function):void {
        tn.getLeagueChallenger("euw", `${LeagueTypenodeTests.playerId}`, (error, response) => {
            if (!error) {
                chai.assert.equal(response.participantId, `${LeagueTypenodeTests.playerId}`, "participantId");
                done();
            } else {
                LeagueTypenodeTests.retryIf429(tn, error, LeagueTypenodeTests.testGetLeagueChallenger, retries, done);
            }
        });
    }

    private static testGetLeagueMaster(tn:LeagueTypenode, retries:number, done:Function):void {
        tn.getLeagueMaster("euw", `${LeagueTypenodeTests.playerId}`, (error, response) => {
            if (!error) {
                chai.assert.equal(response.participantId, `${LeagueTypenodeTests.playerId}`, "participantId");
                done();
            } else {
                LeagueTypenodeTests.retryIf429(tn, error, LeagueTypenodeTests.testGetLeagueMaster, retries, done);
            }
        });
    }

    private static testGetChampions(tn:LeagueTypenode, retries:number, done:Function):void {
        tn.getChampions("euw", LeagueTypenodeTests.locale, LeagueTypenodeTests.version, false, "all", (error, response) => {
            if (!error) {
                // TODO : Assert things
                done();
            } else {
                LeagueTypenodeTests.retryIf429(tn, error, LeagueTypenodeTests.testGetChampions, retries, done);
            }
        })
    }

    private static testGetChampionById(tn:LeagueTypenode, retries:number, done:Function):void {
        tn.getChampionById("euw", 100, LeagueTypenodeTests.locale, LeagueTypenodeTests.version, "all", (error, response) => {
            if (!error) {
                // TODO : Assert things
                done();
            } else {
                LeagueTypenodeTests.retryIf429(tn, error, LeagueTypenodeTests.testGetChampionById, retries, done);
            }
        })
    }

    private static testGetItems(tn:LeagueTypenode, retries:number, done:Function):void {
        tn.getItems("euw", LeagueTypenodeTests.locale, LeagueTypenodeTests.version, "all", (error, response) => {
            if (!error) {
                // TODO : Assert things
                done();
            } else {
                LeagueTypenodeTests.retryIf429(tn, error, LeagueTypenodeTests.testGetItems, retries, done);
            }
        })
    }

    private static testGetItemById(tn:LeagueTypenode, retries:number, done:Function):void {
        tn.getItemById("euw", 100, LeagueTypenodeTests.locale, LeagueTypenodeTests.version, "all", (error, response) => {
            if (!error) {
                // TODO : Assert things
                done();
            } else {
                LeagueTypenodeTests.retryIf429(tn, error, LeagueTypenodeTests.testGetItemById, retries, done);
            }
        })
    }

    private static testGetLanguageStrings(tn:LeagueTypenode, retries:number, done:Function):void {
        tn.getLanguageStrings("euw", LeagueTypenodeTests.locale, LeagueTypenodeTests.version, (error, response) => {
            if (!error) {
                // TODO : Assert things
                done();
            } else {
                LeagueTypenodeTests.retryIf429(tn, error, LeagueTypenodeTests.testGetLanguageStrings, retries, done);
            }
        })
    }

    private static testGetLanguages(tn:LeagueTypenode, retries:number, done:Function):void {
        tn.getLanguages("euw", (error, response) => {
            if (!error) {
                // TODO : Assert things
                done();
            } else {
                LeagueTypenodeTests.retryIf429(tn, error, LeagueTypenodeTests.testGetLanguages, retries, done);
            }
        })
    }

    private static testGetMaps(tn:LeagueTypenode, retries:number, done:Function):void {
        tn.getMaps("euw", LeagueTypenodeTests.locale, LeagueTypenodeTests.version, (error, response) => {
            if (!error) {
                // TODO : Assert things
                done();
            } else {
                LeagueTypenodeTests.retryIf429(tn, error, LeagueTypenodeTests.testGetMaps, retries, done);
            }
        })
    }

    private static testGetMasteries(tn:LeagueTypenode, retries:number, done:Function):void {
        tn.getMasteries("euw", LeagueTypenodeTests.locale, LeagueTypenodeTests.version, "all", (error, response) => {
            if (!error) {
                // TODO : Assert things
                done();
            } else {
                LeagueTypenodeTests.retryIf429(tn, error, LeagueTypenodeTests.testGetMasteries, retries, done);
            }
        })
    }

    private static testGetMasteryById(tn:LeagueTypenode, retries:number, done:Function):void {
        tn.getMasteryById("euw", LeagueTypenodeTests.masteryId, LeagueTypenodeTests.locale, LeagueTypenodeTests.version, "all", (error, response) => {
            if (!error) {
                // TODO : Assert things
                done();
            } else {
                LeagueTypenodeTests.retryIf429(tn, error, LeagueTypenodeTests.testGetMasteryById, retries, done);
            }
        })
    }

    private static testGetRealm(tn:LeagueTypenode, retries:number, done:Function):void {
        tn.getRealm("euw", (error, response) => {
            if (!error) {
                // TODO : Assert things
                done();
            } else {
                LeagueTypenodeTests.retryIf429(tn, error, LeagueTypenodeTests.testGetRealm, retries, done);
            }
        })
    }

    private static testGetRunes(tn:LeagueTypenode, retries:number, done:Function):void {
        tn.getRunes("euw", LeagueTypenodeTests.locale, LeagueTypenodeTests.version, "all", (error, response) => {
            if (!error) {
                // TODO : Assert things
                done();
            } else {
                LeagueTypenodeTests.retryIf429(tn, error, LeagueTypenodeTests.testGetRunes, retries, done);
            }
        })
    }

    private static testGetRuneById(tn:LeagueTypenode, retries:number, done:Function):void {
        tn.getRuneById("euw", LeagueTypenodeTests.runeId, LeagueTypenodeTests.locale, LeagueTypenodeTests.version, "all", (error, response) => {
            if (!error) {
                // TODO : Assert things
                done();
            } else {
                LeagueTypenodeTests.retryIf429(tn, error, LeagueTypenodeTests.testGetRuneById, retries, done);
            }
        })
    }

    private static testGetSummonerSpells(tn:LeagueTypenode, retries:number, done:Function):void {
        tn.getSummonerSpells("euw", LeagueTypenodeTests.locale, LeagueTypenodeTests.version, true, "all", (error, response) => {
            if (!error) {
                // TODO : Assert things
                done();
            } else {
                LeagueTypenodeTests.retryIf429(tn, error, LeagueTypenodeTests.testGetSummonerSpells, retries, done);
            }
        })
    }

    private static testGetSummonerSpellById(tn:LeagueTypenode, retries:number, done:Function):void {
        tn.getSummonerSpellById("euw", LeagueTypenodeTests.spellId, LeagueTypenodeTests.locale, LeagueTypenodeTests.version, "all", (error, response) => {
            if (!error) {
                // TODO : Assert things
                done();
            } else {
                LeagueTypenodeTests.retryIf429(tn, error, LeagueTypenodeTests.testGetSummonerSpellById, retries, done);
            }
        })
    }

    private static testGetVersions(tn:LeagueTypenode, retries:number, done:Function):void {
        tn.getVersions("euw", (error, response) => {
            if (!error) {
                // TODO : Assert things
                done();
            } else {
                LeagueTypenodeTests.retryIf429(tn, error, LeagueTypenodeTests.testGetVersions, retries, done);
            }
        })
    }

    private static testGetShards(tn:LeagueTypenode, retries:number, done:Function):void {
        tn.getShards((error, response) => {
            if (!error) {
                // TODO : Assert things
                done();
            } else {
                LeagueTypenodeTests.retryIf429(tn, error, LeagueTypenodeTests.testGetShards, retries, done);
            }
        })
    }

    private static testGetShard(tn:LeagueTypenode, retries:number, done:Function):void {
        tn.getShard("euw", (error, response) => {
            if (!error) {
                // TODO : Assert things
                done();
            } else {
                LeagueTypenodeTests.retryIf429(tn, error, LeagueTypenodeTests.testGetShard, retries, done);
            }
        })
    }

    private static testGetMatchIdsByTournamentCode(tn:LeagueTypenode, retries:number, done:Function):void {
        tn.getMatchIdsByTournamentCode("euw", LeagueTypenodeTests.tournamentCode, (error, response) => {
            if (!error) {
                // TODO : Assert things
                done();
            } else {
                LeagueTypenodeTests.retryIf429(tn, error, LeagueTypenodeTests.testGetMatchIdsByTournamentCode, retries, done);
            }
        })
    }

    private static testGetMatchByIdAndTournamentCode(tn:LeagueTypenode, retries:number, done:Function):void {
        tn.getMatchByIdAndTournamentCode("euw", LeagueTypenodeTests.matchId, LeagueTypenodeTests.tournamentCode, true, (error, response) => {
            if (!error) {
                // TODO : Assert things
                done();
            } else {
                LeagueTypenodeTests.retryIf429(tn, error, LeagueTypenodeTests.testGetMatchByIdAndTournamentCode, retries, done);
            }
        })
    }

    private static testGetMatchById(tn:LeagueTypenode, retries:number, done:Function):void {
        tn.getMatchById("euw", LeagueTypenodeTests.matchId, true, (error, response) => {
            if (!error) {
                // TODO : Assert things
                done();
            } else {
                LeagueTypenodeTests.retryIf429(tn, error, LeagueTypenodeTests.testGetMatchById, retries, done);
            }
        })
    }

    private static testGetMatchesBySummonerId(tn:LeagueTypenode, retries:number, done:Function):void {
        tn.getMatchesBySummonerId("euw", LeagueTypenodeTests.playerId, null, null, null, null, null, null, null, (error, response) => {
            if (!error) {
                // TODO : Assert things
                done();
            } else {
                LeagueTypenodeTests.retryIf429(tn, error, LeagueTypenodeTests.testGetMatchesBySummonerId, retries, done);
            }
        })
    }

    private static testGetRankedBySummonerId(tn:LeagueTypenode, retries:number, done:Function):void {
        tn.getRankedBySummonerId("euw", LeagueTypenodeTests.playerId, "SEASON2015", (error, response) => {
            if (!error) {
                // TODO : Assert things
                done();
            } else {
                LeagueTypenodeTests.retryIf429(tn, error, LeagueTypenodeTests.testGetRankedBySummonerId, retries, done);
            }
        })
    }

    private static testGetSummaryBySummonerId(tn:LeagueTypenode, retries:number, done:Function):void {
        tn.getSummaryBySummonerId("euw", LeagueTypenodeTests.playerId, "SEASON2015", (error, response) => {
            if (!error) {
                // TODO : Assert things
                done();
            } else {
                LeagueTypenodeTests.retryIf429(tn, error, LeagueTypenodeTests.testGetSummaryBySummonerId, retries, done);
            }
        })
    }

    private static testGetSummonerByNames(tn:LeagueTypenode, retries:number, done:Function):void {
        tn.getSummonerByNames("euw", LeagueTypenodeTests.playerName, (error, response) => {
            if (!error) {
                // TODO : Assert things
                done();
            } else {
                LeagueTypenodeTests.retryIf429(tn, error, LeagueTypenodeTests.testGetSummonerByNames, retries, done);
            }
        })
    }

    private static testGetSummonerByIds(tn:LeagueTypenode, retries:number, done:Function):void {
        tn.getSummonerByIds("euw", `${LeagueTypenodeTests.playerId}`, (error, response) => {
            if (!error) {
                // TODO : Assert things
                done();
            } else {
                LeagueTypenodeTests.retryIf429(tn, error, LeagueTypenodeTests.testGetSummonerByIds, retries, done);
            }
        })
    }

    private static testGetMasteryPagesBySummonerIds(tn:LeagueTypenode, retries:number, done:Function):void {
        tn.getMasteryPagesBySummonerIds("euw", `${LeagueTypenodeTests.playerId}`, (error, response) => {
            if (!error) {
                // TODO : Assert things
                done();
            } else {
                LeagueTypenodeTests.retryIf429(tn, error, LeagueTypenodeTests.testGetMasteryPagesBySummonerIds, retries, done);
            }
        })
    }

    private static testGetNameBySummonerIds(tn:LeagueTypenode, retries:number, done:Function):void {
        tn.getNameBySummonerIds("euw", `${LeagueTypenodeTests.playerId}`, (error, response) => {
            if (!error) {
                // TODO : Assert things
                done();
            } else {
                LeagueTypenodeTests.retryIf429(tn, error, LeagueTypenodeTests.testGetNameBySummonerIds, retries, done);
            }
        })
    }

    private static testGetRunePagesBySummonerIds(tn:LeagueTypenode, retries:number, done:Function):void {
        tn.getRunePagesBySummonerIds("euw", `${LeagueTypenodeTests.playerId}`, (error, response) => {
            if (!error) {
                // TODO : Assert things
                done();
            } else {
                LeagueTypenodeTests.retryIf429(tn, error, LeagueTypenodeTests.testGetRunePagesBySummonerIds, retries, done);
            }
        })
    }

    private static testGetTeamsBySummonerIds(tn:LeagueTypenode, retries:number, done:Function):void {
        tn.getTeamsBySummonerIds("euw", `${LeagueTypenodeTests.playerId}`, (error, response) => {
            if (!error) {
                // TODO : Assert things
                done();
            } else {
                LeagueTypenodeTests.retryIf429(tn, error, LeagueTypenodeTests.testGetTeamsBySummonerIds, retries, done);
            }
        })
    }

    private static testGetTeamsByTeamIds(tn:LeagueTypenode, retries:number, done:Function):void {
        tn.getTeamsByTeamIds("euw", `${LeagueTypenodeTests.playerId}`, (error, response) => {
            if (!error) {
                // TODO : Assert things
                done();
            } else {
                LeagueTypenodeTests.retryIf429(tn, error, LeagueTypenodeTests.testGetTeamsByTeamIds, retries, done);
            }
        })
    }

    private static testCreateTournamentCodesById(tn:LeagueTypenode, retries:number, done:Function):void {
        tn.createTournamentCodesById(LeagueTypenodeTests.tournamentId, 1, LeagueTypenodeTests.tournamentCodeParameters, (error, response) => {
            if (!error) {
                // TODO : Assert things
                done();
            } else {
                LeagueTypenodeTests.retryIf429(tn, error, LeagueTypenodeTests.testCreateTournamentCodesById, retries, done);
            }
        })
    }

    private static testGetTournamentByCode(tn:LeagueTypenode, retries:number, done:Function):void {
        tn.getTournamentByCode(LeagueTypenodeTests.tournamentCode, (error, response) => {
            if (!error) {
                // TODO : Assert things
                done();
            } else {
                LeagueTypenodeTests.retryIf429(tn, error, LeagueTypenodeTests.testGetTournamentByCode, retries, done);
            }
        })
    }

    private static testUpdateTournamentByCode(tn:LeagueTypenode, retries:number, done:Function):void {
        tn.updateTournamentByCode("euw", LeagueTypenodeTests.tournamentCodeUpdateParameters, (error, response) => {
            if (!error) {
                // TODO : Assert things
                done();
            } else {
                LeagueTypenodeTests.retryIf429(tn, error, LeagueTypenodeTests.testUpdateTournamentByCode, retries, done);
            }
        })
    }

    private static testGetLobbyEventsByTournamentCode(tn:LeagueTypenode, retries:number, done:Function):void {
        tn.getLobbyEventsByTournamentCode(LeagueTypenodeTests.tournamentCode, (error, response) => {
            if (!error) {
                // TODO : Assert things
                done();
            } else {
                LeagueTypenodeTests.retryIf429(tn, error, LeagueTypenodeTests.testGetLobbyEventsByTournamentCode, retries, done);
            }
        })
    }

    private static testCreateTournamentProvider(tn:LeagueTypenode, retries:number, done:Function):void {
        tn.createTournamentProvider(LeagueTypenodeTests.providerRegistrationBody, (error, response) => {
            if (!error) {
                // TODO : Assert things
                done();
            } else {
                LeagueTypenodeTests.retryIf429(tn, error, LeagueTypenodeTests.testCreateTournamentProvider, retries, done);
            }
        })
    }

    private static testCreateTournament(tn:LeagueTypenode, retries:number, done:Function):void {
        tn.createTournament(LeagueTypenodeTests.tournamentRegistrationParameters, (error, response) => {
            if (!error) {
                // TODO : Assert things
                done();
            } else {
                LeagueTypenodeTests.retryIf429(tn, error, LeagueTypenodeTests.testCreateTournament, retries, done);
            }
        })
    }
}

LeagueTypenodeTests.run();