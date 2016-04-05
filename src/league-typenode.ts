/*	This file is part of league-typenode.

 league-typenode - Simple TypeScript library for Riot Games' API
 Copyright (C) 2016 Kewin Dousse (Protectator)
 */

import * as https from 'https';
import * as http from 'http';
import * as url from 'url';
import * as api from 'leagueApi';
import * as fs from 'fs';
import {ClientRequest} from "http";

export class ApiKey {
    public value:string;
    public tournaments:boolean;

    constructor(value:string, tournamentsAccess:boolean = false) {
        this.value = value;
        this.tournaments = tournamentsAccess;
    }

    public static fromFile(fileName:string):ApiKey {
        var fileContent:any = fs.readFileSync(fileName);
        var jsonContent = JSON.parse(fileContent);
        return new ApiKey(jsonContent.value, jsonContent.tournaments);
    }

    public static fromEnv(variableName:string, tournaments:boolean):ApiKey {
        var value:string;
        value = process.env[variableName];
        return new ApiKey(value, tournaments);
    }
}

export class ApiError implements Error {
    public name:string = "ApiError";

    constructor(public code:number, public message:string) {
        this.name = "ApiError";
    }
}

export class TooManyRequestsError extends ApiError {
    public name:string = "TooManyRequestsError";

    constructor(message:string, public retryAfter:number, public limitType:"user" | "service") {
        super(429, message);
    }
}

export class LeagueTypenode implements api.champion.Operations, api.championmastery.Operations,
    api.currentGame.Operations, api.featuredGames.Operations, api.game.Operations, api.league.Operations,
    api.lolStaticData.Operations, api.lolStatus.Operations, api.match.Operations, api.matchlist.Operations,
    api.stats.Operations, api.summoner.Operations, api.team.Operations, api.tournamentProvider.Operations {

    public  key:ApiKey;

    private baseConfig:url.Url;
    private static platformRegion = {
        'BR1': 'br',
        'EUN1': 'eune',
        'EUW1': 'euw',
        'KR': 'kr',
        'LA1': 'lan',
        'LA2': 'las',
        'NA1': 'na',
        'OC1': 'oce',
        'TR1': 'tr',
        'RU': 'ru',
        'PBE1': 'pbe'
    };

    /**
     * Instanciates a LeagueTypenode object using a key value
     *
     * @param keyValue The API's key value, or ApiKey
     * @param tournamentsAccess true if the key can access tournaments endpoints
     */
    constructor(keyValue:string|ApiKey, tournamentsAccess:boolean = false) {
        if (keyValue instanceof ApiKey) {
            this.key = keyValue;
            return;
        } else if (typeof keyValue === "string") {
            this.key = new ApiKey(keyValue, tournamentsAccess);
            this.baseConfig = {
                protocol: 'https',
                slashes: true
            };
        } else {
            throw new Error("keyValue must be either a string or an ApiKey.");
        }
    }

    // champion

    public getChampionsStatus(region:string, freeToPlay?:boolean, callback?:(error:Error, data:api.champion.ChampionListDto)=>void):void {
        var path = `/api/lol/${region}/v1.2/champion`;
        var query = {
            "freeToPlay": freeToPlay
        };
        var reqUrl = this.apiUrl(region, path, query);
        this.apiCall(reqUrl, 'GET', '', (error:Error, json:string, headers:Object) => {
            LeagueTypenode.checkAndCast<api.champion.ChampionListDto>(error, json, headers, callback);
        });
    }

    public getChampionStatusById(region:string, id:number, callback?:(error:Error, data:api.champion.ChampionDto)=>void):void {
        var path = `/api/lol/${region}/v1.2/champion/${id}`;
        var query = {
            "id": id
        };
        var reqUrl = this.apiUrl(region, path, query);
        this.apiCall(reqUrl, 'GET', '', (error:Error, json:string, headers:Object) => {
            LeagueTypenode.checkAndCast<api.champion.ChampionDto>(error, json, headers, callback);
        });
    }

    // championmastery

    public getChampionMastery(platformId:string, playerId:number, championId:number, callback?:(error:Error, data:api.championmastery.ChampionMasteryDto)=>void):void {
        var path = `/championmastery/location/${platformId}/player/${playerId}/champion/${championId}`;
        var query = {};
        var reqUrl = this.apiUrl(LeagueTypenode.platformRegion[platformId], path, query);
        this.apiCall(reqUrl, 'GET', '', (error:Error, json:string, headers:Object) => {
            LeagueTypenode.checkAndCast<api.championmastery.ChampionMasteryDto>(error, json, headers, callback);
        });
    }

    public getChampionsMastery(platformId:string, playerId:number, callback?:(error:Error, data:api.championmastery.ChampionMasteryDto[])=>void):void {
        var path = `/championmastery/location/${platformId}/player/${playerId}/champions`;
        var query = {};
        var reqUrl = this.apiUrl(LeagueTypenode.platformRegion[platformId], path, query);
        this.apiCall(reqUrl, 'GET', '', (error:Error, json:string, headers:Object) => {
            LeagueTypenode.checkAndCast<api.championmastery.ChampionMasteryDto[]>(error, json, headers, callback);
        });
    }

    public getScore(platformId:string, playerId:number, callback?:(error:Error, data:number)=>void):void {
        var path = `/championmastery/location/${platformId}/player/${playerId}/score`;
        var query = {};
        var reqUrl = this.apiUrl(LeagueTypenode.platformRegion[platformId], path, query);
        this.apiCall(reqUrl, 'GET', '', (error:Error, json:string, headers:Object) => {
            LeagueTypenode.checkAndCast<number>(error, json, headers, callback);
        });
    }

    public getTopChampions(platformId:string, playerId:number, count:number, callback?:(error:Error, data:api.championmastery.ChampionMasteryDto[])=>void):void {
        var path = `/championmastery/location/${platformId}/player/${playerId}/topchampions`;
        var query = {
            "count": count
        };
        var reqUrl = this.apiUrl(LeagueTypenode.platformRegion[platformId], path, query);
        this.apiCall(reqUrl, 'GET', '', (error:Error, json:string, headers:Object) => {
            LeagueTypenode.checkAndCast<api.championmastery.ChampionMasteryDto[]>(error, json, headers, callback);
        });
    }

    // current-game

    public getSpectatorGameInfoBySummonerId(platformId:string, summonerId:number, callback?:(error:Error, data:api.currentGame.CurrentGameInfo)=>void):void {
        var path = `/observer-mode/rest/consumer/getSpectatorGameInfo/${platformId}/${summonerId}`;
        var query = {};
        var reqUrl = this.apiUrl(LeagueTypenode.platformRegion[platformId], path, query);
        this.apiCall(reqUrl, 'GET', '', (error:Error, json:string, headers:Object) => {
            LeagueTypenode.checkAndCast<api.currentGame.CurrentGameInfo>(error, json, headers, callback);
        });
    }

    // featured-games

    public getFeaturedGames(region:string, callback?:(error:Error, data:api.featuredGames.FeaturedGames)=>void):void {
        var path = `/observer-mode/rest/featured`;
        var query = {};
        var reqUrl = this.apiUrl(region, path, query);
        this.apiCall(reqUrl, 'GET', '', (error:Error, json:string, headers:Object) => {
            LeagueTypenode.checkAndCast<api.featuredGames.FeaturedGames>(error, json, headers, callback);
        });
    }

    // game

    public getRecentGamesBySummonerId(region:string, summonerId:number, callback?:(error:Error, data:api.game.RecentGamesDto)=>void):void {
        var path = `/api/lol/${region}/v1.3/game/by-summoner/${summonerId}/recent`;
        var query = {};
        var reqUrl = this.apiUrl(region, path, query);
        this.apiCall(reqUrl, 'GET', '', (error:Error, json:string, headers:Object) => {
            LeagueTypenode.checkAndCast<api.game.RecentGamesDto>(error, json, headers, callback);
        });
    }

    // league

    public getLeagueBySummonerIds(region:string, summonerIds:string, callback?:(error:Error, data:{[s: string]: api.league.LeagueDto[]})=>void):void {
        var path = `/api/lol/${region}/v2.5/league/by-summoner/${summonerIds}`;
        var query = {};
        var reqUrl = this.apiUrl(region, path, query);
        this.apiCall(reqUrl, 'GET', '', (error:Error, json:string, headers:Object) => {
            LeagueTypenode.checkAndCast<{[s: string]: api.league.LeagueDto[]}>(error, json, headers, callback);
        });
    }

    public getLeagueEntryBySummonerIds(region:string, summonerIds:string, callback?:(error:Error, data:{[s: string]: api.league.LeagueDto[]})=>void):void {
        var path = `/api/lol/${region}/v2.5/league/by-summoner/${summonerIds}/entry`;
        var query = {};
        var reqUrl = this.apiUrl(region, path, query);
        this.apiCall(reqUrl, 'GET', '', (error:Error, json:string, headers:Object) => {
            LeagueTypenode.checkAndCast<{[s: string]: api.league.LeagueDto[]}>(error, json, headers, callback);
        });
    }

    public getLeagueByTeamIds(region:string, teamIds:string, callback?:(error:Error, data:{[s: string]: api.league.LeagueDto[]})=>void):void {
        var path = `/api/lol/${region}/v2.5/league/by-team/${teamIds}`;
        var query = {};
        var reqUrl = this.apiUrl(region, path, query);
        this.apiCall(reqUrl, 'GET', '', (error:Error, json:string, headers:Object) => {
            LeagueTypenode.checkAndCast<{[s: string]: api.league.LeagueDto[]}>(error, json, headers, callback);
        });
    }

    public getLeagueEntryByTeamIds(region:string, teamIds:string, callback?:(error:Error, data:{[s: string]: api.league.LeagueDto[]})=>void):void {
        var path = `/api/lol/${region}/v2.5/league/by-team/${teamIds}/entry`;
        var query = {};
        var reqUrl = this.apiUrl(region, path, query);
        this.apiCall(reqUrl, 'GET', '', (error:Error, json:string, headers:Object) => {
            LeagueTypenode.checkAndCast<{[s: string]: api.league.LeagueDto[]}>(error, json, headers, callback);
        });
    }

    public getLeagueChallenger(region:string, type:string, callback?:(error:Error, data:api.league.LeagueDto)=>void):void {
        var path = `/api/lol/${region}/v2.5/league/challenger`;
        var query = {
            "type": type
        };
        var reqUrl = this.apiUrl(region, path, query);
        this.apiCall(reqUrl, 'GET', '', (error:Error, json:string, headers:Object) => {
            LeagueTypenode.checkAndCast<api.league.LeagueDto>(error, json, headers, callback);
        });
    }

    public getLeagueMaster(region:string, type:string, callback?:(error:Error, data:api.league.LeagueDto)=>void):void {
        var path = `/api/lol/${region}/v2.5/league/master`;
        var query = {
            "type": type
        };
        var reqUrl = this.apiUrl(region, path, query);
        this.apiCall(reqUrl, 'GET', '', (error:Error, json:string, headers:Object) => {
            LeagueTypenode.checkAndCast<api.league.LeagueDto>(error, json, headers, callback);
        });
    }

    // lol-static-data

    public getChampions(region:string, locale:string, version:string, dataById:boolean, champData:string, callback?:(error:Error, data:api.lolStaticData.ChampionListDto)=>void):void {
        var path = `/api/lol/static-data/${region}/v1.2/champion`;
        var query = {
            "locale": locale,
            "version": version,
            "dataById": dataById,
            "champData": champData
        };
        var reqUrl = this.apiUrl("global", path, query);
        this.apiCall(reqUrl, 'GET', '', (error:Error, json:string, headers:Object) => {
            LeagueTypenode.checkAndCast<api.lolStaticData.ChampionListDto>(error, json, headers, callback);
        });
    }

    public getChampionById(region:string, id:number, locale:string, version:string, champData:string, callback?:(error:Error, data:api.lolStaticData.ChampionDto)=>void):void {
        var path = `/api/lol/static-data/${region}/v1.2/champion/${id}`;
        var query = {
            "locale": locale,
            "version": version,
            "champData": champData
        };
        var reqUrl = this.apiUrl("global", path, query);
        this.apiCall(reqUrl, 'GET', '', (error:Error, json:string, headers:Object) => {
            LeagueTypenode.checkAndCast<api.lolStaticData.ChampionDto>(error, json, headers, callback);
        });
    }

    public getItems(region:string, locale:string, version:string, itemListData:string, callback?:(error:Error, data:api.lolStaticData.ItemListDto)=>void):void {
        var path = `/api/lol/static-data/${region}/v1.2/item`;
        var query = {
            "locale": locale,
            "version": version,
            "itemListData": itemListData
        };
        var reqUrl = this.apiUrl("global", path, query);
        this.apiCall(reqUrl, 'GET', '', (error:Error, json:string, headers:Object) => {
            LeagueTypenode.checkAndCast<api.lolStaticData.ItemListDto>(error, json, headers, callback);
        });
    }

    public getItemById(region:string, id:number, locale:string, version:string, itemData:string, callback?:(error:Error, data:api.lolStaticData.ItemDto)=>void):void {
        var path = `/api/lol/static-data/${region}/v1.2/item/${id}`;
        var query = {
            "locale": locale,
            "version": version,
            "itemData": itemData
        };
        var reqUrl = this.apiUrl("global", path, query);
        this.apiCall(reqUrl, 'GET', '', (error:Error, json:string, headers:Object) => {
            LeagueTypenode.checkAndCast<api.lolStaticData.ItemDto>(error, json, headers, callback);
        });
    }

    public getLanguageStrings(region:string, locale:string, version:string, callback?:(error:Error, data:api.lolStaticData.LanguageStringsDto)=>void):void {
        var path = `/api/lol/static-data/${region}/v1.2/language-strings`;
        var query = {
            "locale": locale,
            "version": version
        };
        var reqUrl = this.apiUrl("global", path, query);
        this.apiCall(reqUrl, 'GET', '', (error:Error, json:string, headers:Object) => {
            LeagueTypenode.checkAndCast<api.lolStaticData.LanguageStringsDto>(error, json, headers, callback);
        });
    }

    public getLanguages(region:string, callback?:(error:Error, data:string[])=>void):void {
        var path = `/api/lol/static-data/${region}/v1.2/languages`;
        var query = {};
        var reqUrl = this.apiUrl("global", path, query);
        this.apiCall(reqUrl, 'GET', '', (error:Error, json:string, headers:Object) => {
            LeagueTypenode.checkAndCast<string[]>(error, json, headers, callback);
        });
    }

    public getMaps(region:string, locale:string, version:string, callback?:(error:Error, data:api.lolStaticData.MapDataDto)=>void):void {
        var path = `/api/lol/static-data/${region}/v1.2/map`;
        var query = {
            "locale": locale,
            "version": version
        };
        var reqUrl = this.apiUrl("global", path, query);
        this.apiCall(reqUrl, 'GET', '', (error:Error, json:string, headers:Object) => {
            LeagueTypenode.checkAndCast<api.lolStaticData.MapDataDto>(error, json, headers, callback);
        });
    }

    public getMasteries(region:string, locale:string, version:string, masteryListData:string, callback?:(error:Error, data:api.lolStaticData.MasteryListDto)=>void):void {
        var path = `/api/lol/static-data/${region}/v1.2/mastery`;
        var query = {
            "locale": locale,
            "version": version,
            "masteryListData": masteryListData
        };
        var reqUrl = this.apiUrl("global", path, query);
        this.apiCall(reqUrl, 'GET', '', (error:Error, json:string, headers:Object) => {
            LeagueTypenode.checkAndCast<api.lolStaticData.MasteryListDto>(error, json, headers, callback);
        });
    }

    public getMasteryById(region:string, id:number, locale:string, version:string, masteryData:string, callback?:(error:Error, data:api.lolStaticData.MasteryDto)=>void):void {
        var path = `/api/lol/static-data/${region}/v1.2/mastery/${id}`;
        var query = {
            "locale": locale,
            "version": version,
            "masteryData": masteryData
        };
        var reqUrl = this.apiUrl("global", path, query);
        this.apiCall(reqUrl, 'GET', '', (error:Error, json:string, headers:Object) => {
            LeagueTypenode.checkAndCast<api.lolStaticData.MasteryDto>(error, json, headers, callback);
        });
    }

    public getRealm(region:string, callback?:(error:Error, data:api.lolStaticData.RealmDto)=>void):void {
        var path = `/api/lol/static-data/${region}/v1.2/realm`;
        var query = {};
        var reqUrl = this.apiUrl("global", path, query);
        this.apiCall(reqUrl, 'GET', '', (error:Error, json:string, headers:Object) => {
            LeagueTypenode.checkAndCast<api.lolStaticData.RealmDto>(error, json, headers, callback);
        });
    }

    public getRunes(region:string, locale:string, version:string, runeListData:string, callback?:(error:Error, data:api.lolStaticData.RuneListDto)=>void):void {
        var path = `/api/lol/static-data/${region}/v1.2/rune`;
        var query = {
            "locale": locale,
            "version": version,
            "runeListData": runeListData
        };
        var reqUrl = this.apiUrl("global", path, query);
        this.apiCall(reqUrl, 'GET', '', (error:Error, json:string, headers:Object) => {
            LeagueTypenode.checkAndCast<api.lolStaticData.RuneListDto>(error, json, headers, callback);
        });
    }

    public getRuneById(region:string, id:number, locale:string, version:string, runeData:string, callback?:(error:Error, data:api.lolStaticData.RuneDto)=>void):void {
        var path = `/api/lol/static-data/${region}/v1.2/rune/${id}`;
        var query = {
            "locale": locale,
            "version": version,
            "runeData": runeData
        };
        var reqUrl = this.apiUrl("global", path, query);
        this.apiCall(reqUrl, 'GET', '', (error:Error, json:string, headers:Object) => {
            LeagueTypenode.checkAndCast<api.lolStaticData.RuneDto>(error, json, headers, callback);
        });
    }

    public getSummonerSpells(region:string, locale:string, version:string, dataById:boolean, spellData:string, callback?:(error:Error, data:api.lolStaticData.SummonerSpellListDto)=>void):void {
        var path = `/api/lol/static-data/${region}/v1.2/summoner-spell`;
        var query = {
            "locale": locale,
            "version": version,
            "dataById": dataById,
            "spellData": spellData
        };
        var reqUrl = this.apiUrl("global", path, query);
        this.apiCall(reqUrl, 'GET', '', (error:Error, json:string, headers:Object) => {
            LeagueTypenode.checkAndCast<api.lolStaticData.SummonerSpellListDto>(error, json, headers, callback);
        });
    }

    public getSummonerSpellById(region:string, id:number, locale:string, version:string, spellData:string, callback?:(error:Error, data:api.lolStaticData.SummonerSpellDto)=>void):void {
        var path = `/api/lol/static-data/${region}/v1.2/summoner-spell/${id}`;
        var query = {
            "locale": locale,
            "version": version,
            "spellData": spellData
        };
        var reqUrl = this.apiUrl("global", path, query);
        this.apiCall(reqUrl, 'GET', '', (error:Error, json:string, headers:Object) => {
            LeagueTypenode.checkAndCast<api.lolStaticData.SummonerSpellDto>(error, json, headers, callback);
        });
    }

    public getVersions(region:string, callback?:(error:Error, data:string[])=>void):void {
        var path = `/api/lol/static-data/${region}/v1.2/versions`;
        var query = {};
        var reqUrl = this.apiUrl("global", path, query);
        this.apiCall(reqUrl, 'GET', '', (error:Error, json:string, headers:Object) => {
            LeagueTypenode.checkAndCast<string[]>(error, json, headers, callback);
        });
    }

    // lol-status

    public getShards(callback?:(error:Error, data:api.lolStatus.Shard[])=>void):void {
        var reqUrl = {
            protocol: 'http',
            slashes: this.baseConfig.slashes,
            hostname: `status.leagueoflegends.com`,
            port: this.baseConfig.port,
            pathname: `/shards`
        };
        this.apiCall(reqUrl, 'GET', '', (error:Error, json:string, headers:Object) => {
            LeagueTypenode.checkAndCast<api.lolStatus.Shard[]>(error, json, headers, callback);
        }, false);
    }

    public getShard(region:string, callback?:(error:Error, data:api.lolStatus.ShardStatus)=>void):void {
        var reqUrl = {
            protocol: 'http',
            slashes: this.baseConfig.slashes,
            hostname: `status.leagueoflegends.com`,
            port: this.baseConfig.port,
            pathname: `/shards/${region}`
        };
        this.apiCall(reqUrl, 'GET', '', (error:Error, json:string, headers:Object) => {
            LeagueTypenode.checkAndCast<api.lolStatus.ShardStatus>(error, json, headers, callback);
        }, false);
    }

    // match

    public getMatchIdsByTournamentCode(region:string, tournamentCode:string, callback?:(error:Error, data:number[])=>void):void {
        var path = `/api/lol/${region}/v2.2/match/by-tournament/${tournamentCode}/ids`;
        var query = {};
        var reqUrl = this.apiUrl(region, path, query);
        this.apiCall(reqUrl, 'GET', '', (error:Error, json:string, headers:Object) => {
            LeagueTypenode.checkAndCast<number[]>(error, json, headers, callback);
        });
    }

    public getMatchByIdAndTournamentCode(region:string, matchId:number, tournamentCode:string, includeTimeline:boolean, callback?:(error:Error, data:api.match.MatchDetail)=>void):void {
        var path = `/api/lol/${region}/v2.2/match/for-tournament/${matchId}`;
        var query = {
            "tournamentCode": tournamentCode,
            "includeTimeline": includeTimeline
        };
        var reqUrl = this.apiUrl(region, path, query);
        this.apiCall(reqUrl, 'GET', '', (error:Error, json:string, headers:Object) => {
            LeagueTypenode.checkAndCast<api.match.MatchDetail>(error, json, headers, callback);
        });
    }

    public getMatchById(region:string, matchId:number, includeTimeline:boolean, callback?:(error:Error, data:api.match.MatchDetail)=>void):void {
        var path = `/api/lol/${region}/v2.2/match/${matchId}`;
        var query = {
            "includeTimeline": includeTimeline
        };
        var reqUrl = this.apiUrl(region, path, query);
        this.apiCall(reqUrl, 'GET', '', (error:Error, json:string, headers:Object) => {
            LeagueTypenode.checkAndCast<api.match.MatchDetail>(error, json, headers, callback);
        });
    }

    // matchlist

    public getMatchesBySummonerId(region:string, summonerId:number, championIds:string, rankedQueues:string, seasons:string, beginTime:number, endTime:number, beginIndex:number, endIndex:number, callback?:(error:Error, data:api.matchlist.MatchList)=>void):void {
        var path = `/api/lol/${region}/v2.2/matchlist/by-summoner/${summonerId}`;
        var query = {
            "championIds": championIds,
            "rankedQueues": rankedQueues,
            "seasons": seasons,
            "beginTime": beginTime,
            "endTime": endTime,
            "beginIndex": beginIndex,
            "endIndex": endIndex
        };
        var reqUrl = this.apiUrl(region, path, query);
        this.apiCall(reqUrl, 'GET', '', (error:Error, json:string, headers:Object) => {
            LeagueTypenode.checkAndCast<api.matchlist.MatchList>(error, json, headers, callback);
        });
    }

    // stats

    public getRankedBySummonerId(region:string, summonerId:number, season:string, callback?:(error:Error, data:api.stats.RankedStatsDto)=>void):void {
        var path = `/api/lol/${region}/v1.3/stats/by-summoner/${summonerId}/ranked`;
        var query = {
            "season": season
        };
        var reqUrl = this.apiUrl(region, path, query);
        this.apiCall(reqUrl, 'GET', '', (error:Error, json:string, headers:Object) => {
            LeagueTypenode.checkAndCast<api.stats.RankedStatsDto>(error, json, headers, callback);
        });
    }

    public getSummaryBySummonerId(region:string, summonerId:number, season:string, callback?:(error:Error, data:api.stats.PlayerStatsSummaryListDto)=>void):void {
        var path = `/api/lol/${region}/v1.3/stats/by-summoner/${summonerId}/summary`;
        var query = {
            "season": season
        };
        var reqUrl = this.apiUrl(region, path, query);
        this.apiCall(reqUrl, 'GET', '', (error:Error, json:string, headers:Object) => {
            LeagueTypenode.checkAndCast<api.stats.PlayerStatsSummaryListDto>(error, json, headers, callback);
        });
    }

    // summoner

    public getSummonerByNames(region:string, summonerNames:string, callback?:(error:Error, data:{[s: string]: api.summoner.SummonerDto})=>void):void {
        var path = `/api/lol/${region}/v1.4/summoner/by-name/${summonerNames}`;
        var query = {};
        var reqUrl = this.apiUrl(region, path, query);
        this.apiCall(reqUrl, 'GET', '', (error:Error, json:string, headers:Object) => {
            LeagueTypenode.checkAndCast<{[s: string]: api.summoner.SummonerDto}>(error, json, headers, callback);
        });
    }

    public getSummonerByIds(region:string, summonerIds:string, callback?:(error:Error, data:{[s: string]: api.summoner.SummonerDto})=>void):void {
        var path = `/api/lol/${region}/v1.4/summoner/${summonerIds}`;
        var query = {};
        var reqUrl = this.apiUrl(region, path, query);
        this.apiCall(reqUrl, 'GET', '', (error:Error, json:string, headers:Object) => {
            LeagueTypenode.checkAndCast<{[s: string]: api.summoner.SummonerDto}>(error, json, headers, callback);
        });
    }

    public getMasteryPagesBySummonerIds(region:string, summonerIds:string, callback?:(error:Error, data:{[s: string]: api.summoner.MasteryPagesDto})=>void):void {
        var path = `/api/lol/${region}/v1.4/summoner/${summonerIds}/masteries`;
        var query = {};
        var reqUrl = this.apiUrl(region, path, query);
        this.apiCall(reqUrl, 'GET', '', (error:Error, json:string, headers:Object) => {
            LeagueTypenode.checkAndCast<{[s: string]: api.summoner.MasteryPagesDto}>(error, json, headers, callback);
        });
    }

    public getNameBySummonerIds(region:string, summonerIds:string, callback?:(error:Error, data:{[s: string]: string})=>void):void {
        var path = `/api/lol/${region}/v1.4/summoner/${summonerIds}/name`;
        var query = {};
        var reqUrl = this.apiUrl(region, path, query);
        this.apiCall(reqUrl, 'GET', '', (error:Error, json:string, headers:Object) => {
            LeagueTypenode.checkAndCast<{[s: string]: string}>(error, json, headers, callback);
        });
    }

    public getRunePagesBySummonerIds(region:string, summonerIds:string, callback?:(error:Error, data:{[s: string]: api.summoner.RunePagesDto})=>void):void {
        var path = `/api/lol/${region}/v1.4/summoner/${summonerIds}/runes`;
        var query = {};
        var reqUrl = this.apiUrl(region, path, query);
        this.apiCall(reqUrl, 'GET', '', (error:Error, json:string, headers:Object) => {
            LeagueTypenode.checkAndCast<{[s: string]: api.summoner.RunePagesDto}>(error, json, headers, callback);
        });
    }

    // team

    public getTeamsBySummonerIds(region:string, summonerIds:string, callback?:(error:Error, data:{[s: string]: api.team.TeamDto[]})=>void):void {
        var path = `/api/lol/${region}/v2.4/team/by-summoner/${summonerIds}`;
        var query = {};
        var reqUrl = this.apiUrl(region, path, query);
        this.apiCall(reqUrl, 'GET', '', (error:Error, json:string, headers:Object) => {
            LeagueTypenode.checkAndCast<{[s: string]: api.team.TeamDto[]}>(error, json, headers, callback);
        });
    }

    public getTeamsByTeamIds(region:string, teamIds:string, callback?:(error:Error, data:{[s: string]: api.team.TeamDto})=>void):void {
        var path = `/api/lol/${region}/v2.4/team/${teamIds}`;
        var query = {};
        var reqUrl = this.apiUrl(region, path, query);
        this.apiCall(reqUrl, 'GET', '', (error:Error, json:string, headers:Object) => {
            LeagueTypenode.checkAndCast<{[s: string]: api.team.TeamDto}>(error, json, headers, callback);
        });
    }

    // tournament-provider

    public createTournamentCodesById(tournamentId:number, count:number, body:api.tournamentProvider.TournamentCodeParameters, callback?:(error:Error, data:string[])=>void):void {
        var path = `/tournament/public/v1/code`;
        var query = {
            "tournamentId": tournamentId,
            "count": count
        };
        var reqUrl = this.apiUrl("global", path, query);
        this.apiCall(reqUrl, 'POST', JSON.stringify(body), (error:Error, json:string, headers:Object) => {
            LeagueTypenode.checkAndCast<string[]>(error, json, headers, callback);
        });
    }

    public getTournamentByCode(tournamentCode:string, callback?:(error:Error, data:api.tournamentProvider.TournamentCodeDTO)=>void):void {
        var path = `/tournament/public/v1/code/${tournamentCode}`;
        var query = {};
        var reqUrl = this.apiUrl("global", path, query);
        this.apiCall(reqUrl, 'GET', '', (error:Error, json:string, headers:Object) => {
            LeagueTypenode.checkAndCast<api.tournamentProvider.TournamentCodeDTO>(error, json, headers, callback);
        });
    }

    public updateTournamentByCode(tournamentCode:string, body:api.tournamentProvider.TournamentCodeUpdateParameters, callback?:(error:Error, data:void)=>void):void {
        var path = `/tournament/public/v1/code/${tournamentCode}`;
        var query = {};
        var reqUrl = this.apiUrl("global", path, query);
        this.apiCall(reqUrl, 'PUT', '', (error:Error, json:string, headers:Object) => {
            LeagueTypenode.checkAndCast<void>(error, json, headers, callback);
        });
    }

    public getLobbyEventsByTournamentCode(tournamentCode:string, callback?:(error:Error, data:api.tournamentProvider.LobbyEventDTOWrapper)=>void):void {
        var path = `/tournament/public/v1/lobby/events/by-code/${tournamentCode}`;
        var query = {};
        var reqUrl = this.apiUrl("global", path, query);
        this.apiCall(reqUrl, 'GET', '', (error:Error, json:string, headers:Object) => {
            LeagueTypenode.checkAndCast<api.tournamentProvider.LobbyEventDTOWrapper>(error, json, headers, callback);
        });
    }

    public createTournamentProvider(body:api.tournamentProvider.ProviderRegistrationParameters, callback?:(error:Error, data:number)=>void):void {
        var path = `/tournament/public/v1/provider`;
        var query = {};
        var reqUrl = this.apiUrl("global", path, query);
        this.apiCall(reqUrl, 'POST', '', (error:Error, json:string, headers:Object) => {
            LeagueTypenode.checkAndCast<number>(error, json, headers, callback);
        });
    }

    public createTournament(body:api.tournamentProvider.TournamentRegistrationParameters, callback?:(error:Error, data:number)=>void):void {
        var path = `/tournament/public/v1/tournament`;
        var query = {};
        var reqUrl = this.apiUrl("global", path, query);
        this.apiCall(reqUrl, 'POST', '', (error:Error, json:string, headers:Object) => {
            LeagueTypenode.checkAndCast<number>(error, json, headers, callback);
        });
    }

    // Private methods

    private apiUrl(region:string, path:string, query:Object):url.Url {
        var result = "";
        query["api_key"] = this.key.value;
        for (var key in query) {
            if (result != "") {
                result += "&";
            }
            result += key + "=" + encodeURIComponent(query[key]);
        }
        return {
            protocol: this.baseConfig.protocol,
            slashes: this.baseConfig.slashes,
            hostname: `${region}.api.pvp.net`,
            port: this.baseConfig.port,
            pathname: path,
            query: `?${result}`
        };
    }

    private apiCall(reqUrl:url.Url, method:string = 'GET', content?:string, callback?:(error:Error, data:string, headers:Object)=>void, useHttps: boolean = true) {
        var options:https.RequestOptions = {
            hostname: reqUrl.hostname,
            path: reqUrl.pathname + (reqUrl.query ? reqUrl.query : ''),
            method: method,
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Content-Length': content.length
            }
        };
        var req: ClientRequest;
        var handler = (res) => {
            var body = '';
            res.on('data', (chunk) => {
                body += chunk;
            });
            res.on('end', () => {
                callback(null, body, res.headers);
            })
        };
        if (useHttps) {
            req = https.request(options, handler);
        } else {
            req = http.request(options, handler);
        }
        req.on('error', (e) => {
            callback(e, null, null);
        });
        req.write(content);
        req.end();
    }

    private static checkAndCast<T>(error:Error, json:string, headers:Object, callback:(error:Error, data:T)=>void) {
        if (error) {
            callback(error, null);
        } else {
            try {
                var data = LeagueTypenode.errorCheck(json, headers);
            } catch (e) {
                callback(e, null);
                return;
            }
            callback(null, <T>data);
        }
    }

    private static errorCheck(jsonContent:string, headers:Object) {
        var data = JSON.parse(jsonContent);
        if (data.status && data.status.status_code !== 200) {
            var error:ApiError;
            if (data.status.status_code == 429) {
                error = new TooManyRequestsError(`Server responded with error ${data.status.status_code} : "${data.status.message}"`, headers['retry-after'], headers['x-rate-limit-type']);
            } else {
                error = new ApiError(data.status.status_code, `Server responded with error ${data.status.status_code} : "${data.status.message}"`);
            }
            throw error;
        }
        return data;
    }
}
