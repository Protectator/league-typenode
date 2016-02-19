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

            describe('getChampions', () => {

                it ("should return more than 100 values with no filter", (done) => {
                    tn.getChampions("euw", false, (response) => {
                        assert.isAbove(response.champions.length, 100);
                        done();
                    });
                });
                it ("should return 10 values with freeToPlay=true", (done) => {
                    tn.getChampions("euw", true, (response) => {
                        assert.equal(response.champions.length, 10);
                        done();
                    });
                });

            });

            describe('getChampionById', () => {

                it ("should return the champion asked (84)", (done) => {
                    tn.getChampionById("euw", 84, (response) => {
                        assert.equal(response.id, 84);
                        done();
                    });
                });

            });
        });
    }
}

RiotTypenodeTests.run();