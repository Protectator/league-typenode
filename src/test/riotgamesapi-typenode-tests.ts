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

        describe('champion-v1.2', () => {
            describe('get all champions', () => {
                it ("should return correctly", () => {
                    var fileContent: any = fs.readFileSync("../key.json");
                    var jsonContent = JSON.parse(fileContent);
                    var tn: rtnode.RiotTypenode = new rtnode.RiotTypenode(jsonContent.value, jsonContent.server);
                    tn.getChampions("euw", true, (response) => {
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