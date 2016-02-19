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
        var keyValue = process.env.RIOTTYPENODE_KEY;
        console.log(keyValue);
        var tn: rtnode.RiotTypenode = new rtnode.RiotTypenode(keyValue, false);

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