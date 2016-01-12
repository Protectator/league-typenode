/*	This file is part of riotgamesapi-typenode.

    riotgamesapi-typenode - Simple TypeScript library for Riot Games' API
    Copyright (C) 2016 Kewin Dousse (Protectator)
*/

///<reference path="../src/riotgamesapi-typenode"/>
///<reference path="../tsd/qunit"/>

export class RiotTypenodeTests {     
    public static run() {
        QUnit.module("Test : Working tests");
        QUnit.test("Placeholder test", function(assert) {
            assert.equal(1, 1);
        });
    }
}

RiotTypenodeTests.run();

QUnit.start();