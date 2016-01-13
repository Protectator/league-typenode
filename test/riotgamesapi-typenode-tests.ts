/*	This file is part of riotgamesapi-typenode.

    riotgamesapi-typenode - Simple TypeScript library for Riot Games' API
    Copyright (C) 2016 Kewin Dousse (Protectator)
*/

///<reference path="../lib/riotgamesapi-typedef/riotgamesapi" />
///<reference path="../src/riotgamesapi-typenode"/>
///<reference path="../typings/mocha/mocha" />
///<reference path="../typings/chai/chai" />

import * as chai from 'chai';
import * as api from "riotGamesApi";
import * as tn from "riotGamesTypeNode";

export class RiotTypenodeTests {
    public static run() {
        var assert: Chai.Assert = chai.assert;

        describe('champion-v1.2', () => {
            describe('get all champions', () => {
                it ("should return correctly", () => {
                    var tn: tn.RiotTypenode = new tn.RiotTypenode("af6fde63-ed67-417f-8147-1d16984aecdf", "euw");
                    tn.getChampionsL("euw", true, (response) => {
                        var champList: riotGamesApi.champion.ChampionDto[] = response.champions;
                        for (var key in response.champions) {
                           var champ = champList[key];
                           console.log(champ.id);
                        }
                    });
                    assert.equal(2+2, 4, "Test");
                })
            });
        });
    }
}

RiotTypenodeTests.run();