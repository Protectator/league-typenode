/*	This file is part of riotgamesapi-typenode.

    riotgamesapi-typenode - Simple TypeScript library for Riot Games' API
    Copyright (C) 2016 Kewin Dousse (Protectator)
*/

import * as https from 'https';
import * as url from 'url';
import * as api from 'riotGamesApi';

export class ApiKey {
    public value: string;
    public tournaments: boolean;

    constructor(value:string, tournamentsAccess:boolean = false) {
        this.value = value;
        this.tournaments = tournamentsAccess;
    }
}

export class RiotTypenode implements api.champion.Operations {
    public  key: ApiKey;
    private baseConfig: url.Url;

    constructor(keyValue:string, tournamentsAccess:boolean = false) {
        this.key = new ApiKey(keyValue, tournamentsAccess);
        this.baseConfig = {
            protocol: 'https',
            slashes: true,
            port: '80'
        };
    }

    public getChampions(region:string, freeToPlay?:boolean, callback?:(data: api.champion.ChampionListDto)=>void): void {
        var ftp = freeToPlay ? 'true' : 'false';
        var path = `/api/lol/${region}/v1.2/champion`;
        var query = `?freeToPlay=${ftp}&api_key=${this.key.value}`;
        var reqUrl = this.apiUrl(region, path, query);
        this.apiCall(reqUrl, 'GET', '', (data:string) => {
            var typed: api.champion.ChampionListDto = <api.champion.ChampionListDto>JSON.parse(data);
            callback(typed);
        });
    }

    public getChampionById(region:string, id:number, callback?:(data:riotGamesApi.champion.ChampionDto)=>void):void {
        // TODO
    }

    private apiCall(reqUrl:url.Url, method:string = 'GET', content?:string, callback?:(data:string)=>void) {
        var options: https.RequestOptions = {
            hostname: reqUrl.hostname,
            path: reqUrl.pathname + reqUrl.query,
            method: method,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': content.length
            }
        };
        var req = https.request(options, (res) => {
            var body = '';
            res.on('data', (chunk) => {
                body += chunk;
            });
            res.on('end', () => {
                callback(body);
            })
        });
        req.on('error', (e) => {
            throw Error(`${e}`);
        });
        req.write(content);
        req.end();
    }

    private apiUrl(region:string, path:string, query:string): url.Url {
        return {
            protocol: this.baseConfig.protocol,
            slashes: this.baseConfig.slashes,
            hostname: `${region}.api.pvp.net`,
            port: this.baseConfig.port,
            pathname: path,
            query: query
        };
    }
}
