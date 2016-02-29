/*	This file is part of riotgamesapi-typenode.

    riotgamesapi-typenode - Simple TypeScript library for Riot Games' API
    Copyright (C) 2016 Kewin Dousse (Protectator)
*/

import * as chai from 'chai';
import * as api from 'riotGamesApi';
import * as rtnode from '../riotgamesapi-typenode';
import * as fs from 'fs';

export class RiotTypenodeTests {   
    public static run() {
        var assert: Chai.Assert = chai.assert;

        var keyValue: string;
        var keyTournaments: boolean;

        try {
            var fileContent: any = fs.readFileSync("key.json");
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

        var tn: rtnode.RiotTypenode = new rtnode.RiotTypenode(keyValue, keyTournaments);

        describe('champion-v1.2', () => {

            describe('getChampionsStatus', () => {

                it ("should return more than 100 values with no filter", (done) => {
                    tn.getChampionsStatus("euw", false, (response) => {
                        assert.isAbove(response.champions.length, 100);
                        done();
                    });
                });
                it ("should return 10 values with freeToPlay=true", (done) => {
                    tn.getChampionsStatus("euw", true, (response) => {
                        assert.equal(response.champions.length, 10);
                        done();
                    });
                });

            });

            describe('getChampionStatusById', () => {

                it ("should return the champion asked (84)", (done) => {
                    tn.getChampionStatusById("euw", 84, (response) => {
                        assert.equal(response.id, 84);
                        done();
                    });
                });

            });
        });

        describe('championmastery', () => {

            describe('getChampionMastery', () => {

                it ("should return a valid answer", (done) => {
                    tn.getChampionMastery("EUW1", 25517257, 84, (response) => {
                        console.log(response);
                        console.log(response.playerId);
                        done();
                    })
                });

            });

            describe('getChampionsMastery', () => {

                it ("should");

            });

            describe('getScore', () => {

                it ("should");

            });

            describe('getTopChampions', () => {

                it ("should");

            });
            
        });

        describe('current-game', () => {

            describe('getSpectatorGameInfoBySummonerId', () => {

                it ("should");

            });

        });

        describe('featured-games', () => {

            describe('getFeaturedGames', () => {

                it ("should");

            });

        });

        describe('game', () => {

            describe('getRecentGamesBySummonerId', () => {

                it ("should");

            });

        });

        describe('league', () => {

            describe('getLeagueBySummonerIds', () => {

                it ("should");

            });

            describe('getLeagueEntryBySummonerIds', () => {

                it ("should");

            });

            describe('getLeagueByTeamIds', () => {

                it ("should");

            });

            describe('getLeagueEntryByTeamIds', () => {

                it ("should");

            });

            describe('getLeagueChallenger', () => {

                it ("should");

            });

            describe('getLeagueMaster', () => {

                it ("should");

            });

        });

        describe('lol-static-data', () => {

            describe('getChampions', () => {

                it ("should");

            });

            describe('getChampionById', () => {

                it ("should");

            });

            describe('getItems', () => {

                it ("should");

            });

            describe('getItemById', () => {

                it ("should");

            });

            describe('getLanguageStrings', () => {

                it ("should");

            });

            describe('getLanguages', () => {

                it ("should");

            });

            describe('getMaps', () => {

                it ("should");

            });

            describe('getMeasteries', () => {

                it ("should");

            });

            describe('getMasteryById', () => {

                it ("should");

            });

            describe('getRealm', () => {

                it ("should");

            });

            describe('getRunes', () => {

                it ("should");

            });

            describe('getRuneById', () => {

                it ("should");

            });

            describe('getSummonerSpells', () => {

                it ("should");

            });

            describe('getSummonerSpellById', () => {

                it ("should");

            });

            describe('getVersions', () => {

                it ("should");

            });

        });

        describe('lol-status', () => {

            describe('getShards', () => {

                it ("should");

            });

            describe('getShard', () => {

                it ("should");

            });

        });

        describe('match', () => {

            describe('getMatchIdsByTournamentCode', () => {

                it ("should");

            });

            describe('getMatchByIdAndTournamentCode', () => {

                it ("should");

            });

            describe('getMatchById', () => {

                it ("should");

            });

        });

        describe('matchlist', () => {

            describe('getMatchesBySummonerId', () => {

                it ("should");

            });

        });

        describe('stats', () => {

            describe('getRankedBySummonerId', () => {

                it ("should");

            });

            describe('getSummaryBySummonerId', () => {

                it ("should");

            });

        });

        describe('summoner', () => {

            describe('getSummonerByNames', () => {

                it ("should");

            });

            describe('getSummonerByIds', () => {

                it ("should");

            });

            describe('getMasteryPagesBySummonerIds', () => {

                it ("should");

            });

            describe('getNameBySummonerIds', () => {

                it ("should");

            });

            describe('getRunePagesBySummonerIds', () => {

                it ("should");

            });

        });

        describe('team', () => {

            describe('getTeamsBySummonerIds', () => {

                it ("should");

            });

            describe('getTeamsByTeamIds', () => {

                it ("should");

            });

        });

        describe('tournament-provider', () => {
            before(function() {
                if (!tn.key.tournaments) {
                    console.info("Skipping 'tournament-provider' tests : No compatible key found");
                    this.skip();
                }
            });

            describe('createTournamentCodesById', () => {

                it ("should");

            });

            describe('getTournamentByCode', () => {

                it ("should");

            });

            describe('updateTournamentByCode', () => {

                it ("should");

            });

            describe('getLobbyEventsByTournamentCode', () => {

                it ("should");

            });

            describe('createTournamentProvider', () => {

                it ("should");

            });

            describe('createTournament', () => {

                it ("should");

            });

        });
    }
}

RiotTypenodeTests.run();