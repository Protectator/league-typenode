/*	This file is part of riotgamesapi-typenode.

    riotgamesapi-typenode - Simple TypeScript library for Riot Games' API
    Copyright (C) 2016 Kewin Dousse (Protectator)
*/

///<reference path="../lib/riotgamesapi-typedef/riotgamesapi.d.ts" />
///<reference path="../typings/node/node" />

import * as http from "http";
import * as api from "riotGamesApi";

module riotGamesTypeNode {
    export class RiotTypenode implements api.champion.Endpoints {
        getChampions(region:string, freeToPlay?:boolean):api.champion.ChampionListDto {
            return undefined;
        }

        getChampionById(region:string, id:number):api.champion.ChampionDto {
            return undefined;
        }
        protected static methods = {
            champion: "/v1.2/champion",
        };
        private static endpoint = ".api.pvp.net/api/lol/";
        private apiKey: string;
        private region: string;
        private baseUrl: string;

        constructor(apiKey: string, region: string) {
            this.apiKey = apiKey;
            this.region = region;
            this.baseUrl = region + RiotTypenode.endpoint + region;
        }

        public getChampionsL(region:string, freeToPlay?:boolean, callback?:(championListDto: api.champion.ChampionListDto) => void): void {

            var ftp = freeToPlay ? "true" : "false";
            var url = "${this.baseUrl}/v1.2/champion/?freeToPlay=${ftp}&api_key=${this.apiKey}";

            http.get(url, function(res){
                var body = '';

                res.on('data', function(chunk){
                    body += chunk;
                });

                res.on('end', function(){
                    var result = JSON.parse(body);
                    return result;
                });
            }).on('error', function(e){
                console.log("Got an error: ", e);
            });
        }
    }
}

declare module "riotGamesTypeNode" {
    export = riotGamesTypeNode;
}