/*	This file is part of riotgamesapi-typenode.

    riotgamesapi-typenode - Simple TypeScript library for Riot Games' API
    Copyright (C) 2016 Kewin Dousse (Protectator)
*/

///<reference path="../src/riotgamesapi-typenode"/>
///<reference path="../typings/mocha/mocha" />
///<reference path="../typings/chai/chai" />

import chai = require('chai');

export class RiotTypenodeTests {     
    public static run() {
        var assert: Chai.Assert = chai.assert;
        
        describe('placeholder', () => {
            describe('function1', () => {
                it ("should add properly", () => {
                    assert.equal(2+2, 4, "Test");
                })
            });
        });
    }
}

RiotTypenodeTests.run();