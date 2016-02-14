/*	This file is part of riotgamesapi-typenode.

    riotgamesapi-typenode - Simple TypeScript library for Riot Games' API
    Copyright (C) 2016 Kewin Dousse (Protectator)
*/

///<reference path="../lib/riotgamesapi-typedef/riotgamesapi" />
///<reference path="../typings/node/node" />

import * as http from "http";
import * as url from "url";
import * as api from "riotGamesApi";

module riotGamesTypeNode {
    export class ApiKey {
        public value: string;
        public server: string;
        public tournaments: boolean;

        constructor(value:string, server:string, tournamentsAccess:boolean = false) {
            this.value = value;
            this.server = server;
            this.tournaments = tournamentsAccess;
        }
    }

    export class RiotTypenode implements api.champion.Operations {
        private static basePath: string = "/api/lol/";
        private hostname: string;
        public key: ApiKey;

        constructor(keyValue: string, server: string, tournamentsAccess: boolean = false) {
            this.key = new ApiKey(keyValue, server, tournamentsAccess);
            this.hostname = "${this.key.region}.api.pvp.net";
        }

        public getChampions(region:string, freeToPlay?:boolean, callback?:(data: api.champion.ChampionListDto)=>void): void {
            var ftp = freeToPlay ? "true" : "false";
            var toFormat: url.Url = {};
            var ref = url.format(toFormat);
            //var url = "${RiotTypenode.basePath}/${region}/v1.2/champion/?freeToPlay=${ftp}&api_key=${this.apiKey}";
        }

        public getChampionById(region:string, id:number, callback?:(data:riotGamesApi.champion.ChampionDto)=>void):void {
            // TODO
        }

        private apiCall(url: string, method: string = 'get', path: string, content?: string, callback?: (data: string)=>void) {
            var options: http.RequestOptions = {
                hostname: this.hostname,
                path: path,
                method: method,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Content-Length': content.length
                }
            };
            var req = http.request(options, (res) => {
                var body = '';
                res.on('data', (chunk) => {
                    body += chunk;
                });
                res.on('end', () => {
                    callback(body);
                })
            });
            req.on('error', (e) => {
                throw new Error("Error : ${e}");
            });
            req.write(content);
            req.end();
        }
    }
}