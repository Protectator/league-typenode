/*	This file is part of riotgamesapi-typenode.

 riotgamesapi-typenode - Simple TypeScript library for Riot Games' API
 Copyright (C) 2016 Kewin Dousse (Protectator)
 */

import * as https from 'https';
import * as url from 'url';
import * as api from 'riotGamesApi';
import * as fs from 'fs';

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

export class RiotTypenode implements api.champion.Operations, api.championmastery.Operations,
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
     * Instanciates a RiotTypenode object using a key value
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
        this.apiCall(reqUrl, 'GET', '', (error:Error, json:string) => {
            if (error) {
                callback(error, null);
            } else {
                try {
                    var data = RiotTypenode.errorCheck(json);
                } catch (e) {
                    callback(e, null);
                    return;
                }
                callback(null, <api.champion.ChampionListDto>data);
            }
        });
    }

    public getChampionStatusById(region:string, id:number, callback?:(error:Error, data:api.champion.ChampionDto)=>void):void {
        var path = `/api/lol/${region}/v1.2/champion/${id}`;
        var query = {
            "id": id
        };
        var reqUrl = this.apiUrl(region, path, query);
        this.apiCall(reqUrl, 'GET', '', (error:Error, json:string) => {
            if (error) {
                callback(error, null);
            } else {
                try {
                    var data = RiotTypenode.errorCheck(json);
                } catch (e) {
                    callback(e, null);
                    return;
                }
                callback(null, <api.champion.ChampionDto>data);
            }
        });
    }

    // championmastery

    public getChampionMastery(platformId:string, playerId:number, championId:number, callback?:(error:Error, data:api.championmastery.ChampionMasteryDto)=>void):void {
        var path = `/championmastery/location/${platformId}/player/${playerId}/champion/${championId}`;
        var query = {};
        var reqUrl = this.apiUrl(RiotTypenode.platformRegion[platformId], path, query);
        this.apiCall(reqUrl, 'GET', '', (error:Error, json:string) => {
            if (error) {
                callback(error, null);
            } else {
                try {
                    var data = RiotTypenode.errorCheck(json);
                } catch (e) {
                    callback(e, null);
                    return;
                }
                callback(null, <api.championmastery.ChampionMasteryDto>data);
            }
        });
    }

    public getChampionsMastery(platformId:string, playerId:number, callback?:(error:Error, data:api.championmastery.ChampionMasteryDto[])=>void):void {
        var path = `/championmastery/location/${platformId}/player/${playerId}/champions`;
        var query = {};
        var reqUrl = this.apiUrl(RiotTypenode.platformRegion[platformId], path, query);
        this.apiCall(reqUrl, 'GET', '', (error:Error, json:string) => {
            if (error) {
                callback(error, null);
            } else {
                try {
                    var data = RiotTypenode.errorCheck(json);
                } catch (e) {
                    callback(e, null);
                    return;
                }
                callback(null, <api.championmastery.ChampionMasteryDto[]>data);
            }
        });
    }

    public getScore(platformId:string, playerId:number, callback?:(error:Error, data:number)=>void):void {
        var path = `/championmastery/location/${platformId}/player/${playerId}/score`;
        var query = {};
        var reqUrl = this.apiUrl(RiotTypenode.platformRegion[platformId], path, query);
        this.apiCall(reqUrl, 'GET', '', (error:Error, json:string) => {
            if (error) {
                callback(error, null);
            } else {
                try {
                    var data = RiotTypenode.errorCheck(json);
                } catch (e) {
                    callback(e, null);
                    return;
                }
                callback(null, <number>data);
            }
        });
    }

    public getTopChampions(platformId:string, playerId:number, count:number, callback?:(error:Error, data:api.championmastery.ChampionMasteryDto[])=>void):void {
        var path = `/championmastery/location/${platformId}/player/${playerId}/topchampions`;
        var query = {
            "count": count
        };
        var reqUrl = this.apiUrl(RiotTypenode.platformRegion[platformId], path, query);
        this.apiCall(reqUrl, 'GET', '', (error:Error, json:string) => {
            if (error) {
                callback(error, null);
            } else {
                try {
                    var data = RiotTypenode.errorCheck(json);
                } catch (e) {
                    callback(e, null);
                    return;
                }
                callback(null, <api.championmastery.ChampionMasteryDto[]>data);
            }
        });
    }

    // current-game

    public getSpectatorGameInfoBySummonerId(platformId:string, summonerId:number, callback?:(error:Error, data:api.currentGame.CurrentGameInfo)=>void):void {
        var path = `/observer-mode/rest/consumer/getSpectatorGameInfo/${platformId}/${summonerId}`;
        var query = {};
        var reqUrl = this.apiUrl(RiotTypenode.platformRegion[platformId], path, query);
        this.apiCall(reqUrl, 'GET', '', (error:Error, json:string) => {
            if (error) {
                callback(error, null);
            } else {
                try {
                    var data = RiotTypenode.errorCheck(json);
                } catch (e) {
                    callback(e, null);
                    return;
                }
                callback(null, <api.currentGame.CurrentGameInfo>data);
            }
        });
    }

    // featured-games

    public getFeaturedGames(region:string, callback?:(error:Error, data:api.featuredGames.FeaturedGames)=>void):void {
        var path = `/observer-mode/rest/featured`;
        var query = {};
        var reqUrl = this.apiUrl(region, path, query);
        this.apiCall(reqUrl, 'GET', '', (error:Error, json:string) => {
            if (error) {
                callback(error, null);
            } else {
                try {
                    var data = RiotTypenode.errorCheck(json);
                } catch (e) {
                    callback(e, null);
                    return;
                }
                callback(null, <api.featuredGames.FeaturedGames>data);
            }
        });
    }

    // game

    public getRecentGamesBySummonerId(region:string, summonerId:number, callback?:(error:Error, data:api.game.RecentGamesDto)=>void):void {
        var path = `/api/lol/${region}/v1.3/game/by-summoner/${summonerId}/recent`;
        var query = {};
        var reqUrl = this.apiUrl(region, path, query);
        this.apiCall(reqUrl, 'GET', '', (error:Error, json:string) => {
            if (error) {
                callback(error, null);
            } else {
                try {
                    var data = RiotTypenode.errorCheck(json);
                } catch (e) {
                    callback(e, null);
                    return;
                }
                callback(null, <api.game.RecentGamesDto>data);
            }
        });
    }

    // league

    public getLeagueBySummonerIds(region:string, summonerIds:string, callback?:(error:Error, data:{[s: string]: api.league.LeagueDto[]})=>void):void {
        var path = `/api/lol/${region}/v2.5/league/by-summoner/${summonerIds}`;
        var query = {};
        var reqUrl = this.apiUrl(region, path, query);
        this.apiCall(reqUrl, 'GET', '', (error:Error, json:string) => {
            if (error) {
                callback(error, null);
            } else {
                try {
                    var data = RiotTypenode.errorCheck(json);
                } catch (e) {
                    callback(e, null);
                    return;
                }
                callback(null, <{[s: string]: api.league.LeagueDto[]}>data);
            }
        });
    }

    public getLeagueEntryBySummonerIds(region:string, summonerIds:string, callback?:(error:Error, data:{[s: string]: api.league.LeagueDto[]})=>void):void {
        var path = `/api/lol/${region}/v2.5/league/by-summoner/${summonerIds}/entry`;
        var query = {};
        var reqUrl = this.apiUrl(region, path, query);
        this.apiCall(reqUrl, 'GET', '', (error:Error, json:string) => {
            if (error) {
                callback(error, null);
            } else {
                try {
                    var data = RiotTypenode.errorCheck(json);
                } catch (e) {
                    callback(e, null);
                    return;
                }
                callback(null, <{[s: string]: api.league.LeagueDto[]}>data);
            }
        });
    }

    public getLeagueByTeamIds(region:string, teamIds:string, callback?:(error:Error, data:{[s: string]: api.league.LeagueDto[]})=>void):void {
        var path = `/api/lol/${region}/v2.5/league/by-team/${teamIds}`;
        var query = {};
        var reqUrl = this.apiUrl(region, path, query);
        this.apiCall(reqUrl, 'GET', '', (error:Error, json:string) => {
            if (error) {
                callback(error, null);
            } else {
                try {
                    var data = RiotTypenode.errorCheck(json);
                } catch (e) {
                    callback(e, null);
                    return;
                }
                callback(null, <{[s: string]: api.league.LeagueDto[]}>data);
            }
        });
    }

    public getLeagueEntryByTeamIds(region:string, teamIds:string, callback?:(error:Error, data:{[s: string]: api.league.LeagueDto[]})=>void):void {
        var path = `/api/lol/${region}/v2.5/league/by-team/${teamIds}/entry`;
        var query = {};
        var reqUrl = this.apiUrl(region, path, query);
        this.apiCall(reqUrl, 'GET', '', (error:Error, json:string) => {
            if (error) {
                callback(error, null);
            } else {
                try {
                    var data = RiotTypenode.errorCheck(json);
                } catch (e) {
                    callback(e, null);
                    return;
                }
                callback(null, <{[s: string]: api.league.LeagueDto[]}>data);
            }
        });
    }

    public getLeagueChallenger(region:string, type:string, callback?:(error:Error, data:api.league.LeagueDto)=>void):void {
        var path = `/api/lol/${region}/v2.5/league/challenger`;
        var query = {
            "type": type
        };
        var reqUrl = this.apiUrl(region, path, query);
        this.apiCall(reqUrl, 'GET', '', (error:Error, json:string) => {
            if (error) {
                callback(error, null);
            } else {
                try {
                    var data = RiotTypenode.errorCheck(json);
                } catch (e) {
                    callback(e, null);
                    return;
                }
                callback(null, <api.league.LeagueDto>data);
            }
        });
    }

    public getLeagueMaster(region:string, type:string, callback?:(error:Error, data:api.league.LeagueDto)=>void):void {
        var path = `/api/lol/${region}/v2.5/league/master`;
        var query = {
            "type": type
        };
        var reqUrl = this.apiUrl(region, path, query);
        this.apiCall(reqUrl, 'GET', '', (error:Error, json:string) => {
            if (error) {
                callback(error, null);
            } else {
                try {
                    var data = RiotTypenode.errorCheck(json);
                } catch (e) {
                    callback(e, null);
                    return;
                }
                callback(null, <api.league.LeagueDto>data);
            }
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
        var reqUrl = this.apiUrl(region, path, query);
        this.apiCall(reqUrl, 'GET', '', (error:Error, json:string) => {
            if (error) {
                callback(error, null);
            } else {
                try {
                    var data = RiotTypenode.errorCheck(json);
                } catch (e) {
                    callback(e, null);
                    return;
                }
                callback(null, <api.lolStaticData.ChampionListDto>data);
            }
        });
    }

    public getChampionById(region:string, id:number, locale:string, version:string, champData:string, callback?:(error:Error, data:api.lolStaticData.ChampionDto)=>void):void {
        var path = `/api/lol/static-data/${region}/v1.2/champion/${id}`;
        var query = {
            "locale": locale,
            "version": version,
            "champData": champData
        };
        var reqUrl = this.apiUrl(region, path, query);
        this.apiCall(reqUrl, 'GET', '', (error:Error, json:string) => {
            if (error) {
                callback(error, null);
            } else {
                try {
                    var data = RiotTypenode.errorCheck(json);
                } catch (e) {
                    callback(e, null);
                    return;
                }
                callback(null, <api.lolStaticData.ChampionDto>data);
            }
        });
    }

    public getItems(region:string, locale:string, version:string, itemListData:string, callback?:(error:Error, data:api.lolStaticData.ItemListDto)=>void):void {
        var path = `/api/lol/static-data/${region}/v1.2/item`;
        var query = {
            "locale": locale,
            "version": version,
            "itemListData": itemListData
        };
        var reqUrl = this.apiUrl(region, path, query);
        this.apiCall(reqUrl, 'GET', '', (error:Error, json:string) => {
            if (error) {
                callback(error, null);
            } else {
                try {
                    var data = RiotTypenode.errorCheck(json);
                } catch (e) {
                    callback(e, null);
                    return;
                }
                callback(null, <api.lolStaticData.ItemListDto>data);
            }
        });
    }

    public getItemById(region:string, id:number, locale:string, version:string, itemData:string, callback?:(error:Error, data:api.lolStaticData.ItemDto)=>void):void {
        var path = `/api/lol/static-data/${region}/v1.2/item/${id}`;
        var query = {
            "locale": locale,
            "version": version,
            "itemData": itemData
        };
        var reqUrl = this.apiUrl(region, path, query);
        this.apiCall(reqUrl, 'GET', '', (error:Error, json:string) => {
            if (error) {
                callback(error, null);
            } else {
                try {
                    var data = RiotTypenode.errorCheck(json);
                } catch (e) {
                    callback(e, null);
                    return;
                }
                callback(null, <api.lolStaticData.ItemDto>data);
            }
        });
    }

    public getLanguageStrings(region:string, locale:string, version:string, callback?:(error:Error, data:api.lolStaticData.LanguageStringsDto)=>void):void {
        var path = `/api/lol/static-data/${region}/v1.2/language-strings`;
        var query = {
            "locale": locale,
            "version": version
        };
        var reqUrl = this.apiUrl(region, path, query);
        this.apiCall(reqUrl, 'GET', '', (error:Error, json:string) => {
            if (error) {
                callback(error, null);
            } else {
                try {
                    var data = RiotTypenode.errorCheck(json);
                } catch (e) {
                    callback(e, null);
                    return;
                }
                callback(null, <api.lolStaticData.LanguageStringsDto>data);
            }
        });
    }

    public getLanguages(region:string, callback?:(error:Error, data:string[])=>void):void {
        var path = `/api/lol/static-data/${region}/v1.2/languages`;
        var query = {};
        var reqUrl = this.apiUrl(region, path, query);
        this.apiCall(reqUrl, 'GET', '', (error:Error, json:string) => {
            if (error) {
                callback(error, null);
            } else {
                try {
                    var data = RiotTypenode.errorCheck(json);
                } catch (e) {
                    callback(e, null);
                    return;
                }
                callback(null, <string[]>data);
            }
        });
    }

    public getMaps(region:string, locale:string, version:string, callback?:(error:Error, data:api.lolStaticData.MapDataDto)=>void):void {
        var path = `/api/lol/static-data/${region}/v1.2/map`;
        var query = {
            "locale": locale,
            "version": version
        };
        var reqUrl = this.apiUrl(region, path, query);
        this.apiCall(reqUrl, 'GET', '', (error:Error, json:string) => {
            if (error) {
                callback(error, null);
            } else {
                try {
                    var data = RiotTypenode.errorCheck(json);
                } catch (e) {
                    callback(e, null);
                    return;
                }
                callback(null, <api.lolStaticData.MapDataDto>data);
            }
        });
    }

    public getMasteries(region:string, locale:string, version:string, masteryListData:string, callback?:(error:Error, data:api.lolStaticData.MasteryListDto)=>void):void {
        var path = `/api/lol/static-data/${region}/v1.2/mastery`;
        var query = {
            "locale": locale,
            "version": version,
            "masteryListData": masteryListData
        };
        var reqUrl = this.apiUrl(region, path, query);
        this.apiCall(reqUrl, 'GET', '', (error:Error, json:string) => {
            if (error) {
                callback(error, null);
            } else {
                try {
                    var data = RiotTypenode.errorCheck(json);
                } catch (e) {
                    callback(e, null);
                    return;
                }
                callback(null, <api.lolStaticData.MasteryListDto>data);
            }
        });
    }

    public getMasteryById(region:string, id:number, locale:string, version:string, masteryData:string, callback?:(error:Error, data:api.lolStaticData.MasteryDto)=>void):void {
        var path = `/api/lol/static-data/${region}/v1.2/mastery/${id}`;
        var query = {
            "locale": locale,
            "version": version,
            "masteryData": masteryData
        };
        var reqUrl = this.apiUrl(region, path, query);
        this.apiCall(reqUrl, 'GET', '', (error:Error, json:string) => {
            if (error) {
                callback(error, null);
            } else {
                try {
                    var data = RiotTypenode.errorCheck(json);
                } catch (e) {
                    callback(e, null);
                    return;
                }
                callback(null, <api.lolStaticData.MasteryDto>data);
            }
        });
    }

    public getRealm(region:string, callback?:(error:Error, data:api.lolStaticData.RealmDto)=>void):void {
        var path = `/api/lol/static-data/${region}/v1.2/realm`;
        var query = {};
        var reqUrl = this.apiUrl(region, path, query);
        this.apiCall(reqUrl, 'GET', '', (error:Error, json:string) => {
            if (error) {
                callback(error, null);
            } else {
                try {
                    var data = RiotTypenode.errorCheck(json);
                } catch (e) {
                    callback(e, null);
                    return;
                }
                callback(null, <api.lolStaticData.RealmDto>data);
            }
        });
    }

    public getRunes(region:string, locale:string, version:string, runeListData:string, callback?:(error:Error, data:api.lolStaticData.RuneListDto)=>void):void {
        var path = `/api/lol/static-data/${region}/v1.2/rune`;
        var query = {
            "locale": locale,
            "version": version,
            "runeListData": runeListData
        };
        var reqUrl = this.apiUrl(region, path, query);
        this.apiCall(reqUrl, 'GET', '', (error:Error, json:string) => {
            if (error) {
                callback(error, null);
            } else {
                try {
                    var data = RiotTypenode.errorCheck(json);
                } catch (e) {
                    callback(e, null);
                    return;
                }
                callback(null, <api.lolStaticData.RuneListDto>data);
            }
        });
    }

    public getRuneById(region:string, id:number, locale:string, version:string, runeData:string, callback?:(error:Error, data:api.lolStaticData.RuneDto)=>void):void {
        var path = `/api/lol/static-data/${region}/v1.2/rune/${id}`;
        var query = {
            "locale": locale,
            "version": version,
            "runeData": runeData
        };
        var reqUrl = this.apiUrl(region, path, query);
        this.apiCall(reqUrl, 'GET', '', (error:Error, json:string) => {
            if (error) {
                callback(error, null);
            } else {
                try {
                    var data = RiotTypenode.errorCheck(json);
                } catch (e) {
                    callback(e, null);
                    return;
                }
                callback(null, <api.lolStaticData.RuneDto>data);
            }
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
        var reqUrl = this.apiUrl(region, path, query);
        this.apiCall(reqUrl, 'GET', '', (error:Error, json:string) => {
            if (error) {
                callback(error, null);
            } else {
                try {
                    var data = RiotTypenode.errorCheck(json);
                } catch (e) {
                    callback(e, null);
                    return;
                }
                callback(null, <api.lolStaticData.SummonerSpellListDto>data);
            }
        });
    }

    public getSummonerSpellById(region:string, id:number, locale:string, version:string, spellData:string, callback?:(error:Error, data:api.lolStaticData.SummonerSpellDto)=>void):void {
        var path = `/api/lol/static-data/${region}/v1.2/summoner-spell/${id}`;
        var query = {
            "locale": locale,
            "version": version,
            "spellData": spellData
        };
        var reqUrl = this.apiUrl(region, path, query);
        this.apiCall(reqUrl, 'GET', '', (error:Error, json:string) => {
            if (error) {
                callback(error, null);
            } else {
                try {
                    var data = RiotTypenode.errorCheck(json);
                } catch (e) {
                    callback(e, null);
                    return;
                }
                callback(null, <api.lolStaticData.SummonerSpellDto>data);
            }
        });
    }

    public getVersions(region:string, callback?:(error:Error, data:string[])=>void):void {
        var path = ``;
        var query = {};
        var reqUrl = this.apiUrl(region, path, query);
        this.apiCall(reqUrl, 'GET', '', (error:Error, json:string) => {
            if (error) {
                callback(error, null);
            } else {
                try {
                    var data = RiotTypenode.errorCheck(json);
                } catch (e) {
                    callback(e, null);
                    return;
                }
                callback(null, <string[]>data);
            }
        });
    }

    // lol-status

    public getShards(callback?:(error:Error, data:api.lolStatus.Shard[])=>void):void {
        var reqUrl = {
            protocol: this.baseConfig.protocol,
            slashes: this.baseConfig.slashes,
            hostname: `status.leagueoflegends.com`,
            port: this.baseConfig.port,
            pathname: `/shards`
        };
        this.apiCall(reqUrl, 'GET', '', (error:Error, json:string) => {
            if (error) {
                callback(error, null);
            } else {
                try {
                    var data = RiotTypenode.errorCheck(json);
                } catch (e) {
                    callback(e, null);
                    return;
                }
                callback(null, <api.lolStatus.Shard[]>data);
            }
        });
    }

    public getShard(region:string, callback?:(error:Error, data:api.lolStatus.ShardStatus)=>void):void {
        var reqUrl = {
            protocol: this.baseConfig.protocol,
            slashes: this.baseConfig.slashes,
            hostname: `status.leagueoflegends.com`,
            port: this.baseConfig.port,
            pathname: `/shards/${region}`
        };
        this.apiCall(reqUrl, 'GET', '', (error:Error, json:string) => {
            if (error) {
                callback(error, null);
            } else {
                try {
                    var data = RiotTypenode.errorCheck(json);
                } catch (e) {
                    callback(e, null);
                    return;
                }
                callback(null, <api.lolStatus.ShardStatus>data);
            }
        });
    }

    // match

    public getMatchIdsByTournamentCode(region:string, tournamentCode:string, callback?:(error:Error, data:number[])=>void):void {
        var path = `/api/lol/${region}/v2.2/match/by-tournament/${tournamentCode}/ids`;
        var query = {};
        var reqUrl = this.apiUrl(region, path, query);
        this.apiCall(reqUrl, 'GET', '', (error:Error, json:string) => {
            if (error) {
                callback(error, null);
            } else {
                try {
                    var data = RiotTypenode.errorCheck(json);
                } catch (e) {
                    callback(e, null);
                    return;
                }
                callback(null, <number[]>data);
            }
        });
    }

    public getMatchByIdAndTournamentCode(region:string, matchId:number, tournamentCode:string, includeTimeline:boolean, callback?:(error:Error, data:api.match.MatchDetail)=>void):void {
        var path = `/api/lol/${region}/v2.2/match/for-tournament/${matchId}`;
        var query = {
            "tournamentCode": tournamentCode,
            "includeTimeline": includeTimeline
        };
        var reqUrl = this.apiUrl(region, path, query);
        this.apiCall(reqUrl, 'GET', '', (error:Error, json:string) => {
            if (error) {
                callback(error, null);
            } else {
                try {
                    var data = RiotTypenode.errorCheck(json);
                } catch (e) {
                    callback(e, null);
                    return;
                }
                callback(null, <api.match.MatchDetail>data);
            }
        });
    }

    public getMatchById(region:string, matchId:number, includeTimeline:boolean, callback?:(error:Error, data:api.match.MatchDetail)=>void):void {
        var path = `/api/lol/${region}/v2.2/match/${matchId}`;
        var query = {
            "includeTimeline": includeTimeline
        };
        var reqUrl = this.apiUrl(region, path, query);
        this.apiCall(reqUrl, 'GET', '', (error:Error, json:string) => {
            if (error) {
                callback(error, null);
            } else {
                try {
                    var data = RiotTypenode.errorCheck(json);
                } catch (e) {
                    callback(e, null);
                    return;
                }
                callback(null, <api.match.MatchDetail>data);
            }
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
        this.apiCall(reqUrl, 'GET', '', (error:Error, json:string) => {
            if (error) {
                callback(error, null);
            } else {
                try {
                    var data = RiotTypenode.errorCheck(json);
                } catch (e) {
                    callback(e, null);
                    return;
                }
                callback(null, <api.matchlist.MatchList>data);
            }
        });
    }

    // stats

    public getRankedBySummonerId(region:string, summonerId:number, season:string, callback?:(error:Error, data:api.stats.RankedStatsDto)=>void):void {
        var path = `/api/lol/${region}/v1.3/stats/by-summoner/${summonerId}/ranked`;
        var query = {
            "season": season
        };
        var reqUrl = this.apiUrl(region, path, query);
        this.apiCall(reqUrl, 'GET', '', (error:Error, json:string) => {
            if (error) {
                callback(error, null);
            } else {
                try {
                    var data = RiotTypenode.errorCheck(json);
                } catch (e) {
                    callback(e, null);
                    return;
                }
                callback(null, <api.stats.RankedStatsDto>data);
            }
        });
    }

    public getSummaryBySummonerId(region:string, summonerId:number, season:string, callback?:(error:Error, data:api.stats.PlayerStatsSummaryListDto)=>void):void {
        var path = `/api/lol/${region}/v1.3/stats/by-summoner/${summonerId}/summary`;
        var query = {
            "season": season
        };
        var reqUrl = this.apiUrl(region, path, query);
        this.apiCall(reqUrl, 'GET', '', (error:Error, json:string) => {
            if (error) {
                callback(error, null);
            } else {
                try {
                    var data = RiotTypenode.errorCheck(json);
                } catch (e) {
                    callback(e, null);
                    return;
                }
                callback(null, <api.stats.PlayerStatsSummaryListDto>data);
            }
        });
    }

    // summoner

    public getSummonerByNames(region:string, summonerNames:string, callback?:(error:Error, data:{[s: string]: api.summoner.SummonerDto})=>void):void {
        var path = `/api/lol/${region}/v1.4/summoner/by-name/${summonerNames}`;
        var query = {};
        var reqUrl = this.apiUrl(region, path, query);
        this.apiCall(reqUrl, 'GET', '', (error:Error, json:string) => {
            if (error) {
                callback(error, null);
            } else {
                try {
                    var data = RiotTypenode.errorCheck(json);
                } catch (e) {
                    callback(e, null);
                    return;
                }
                callback(null, <{[s: string]: api.summoner.SummonerDto}>data);
            }
        });
    }

    public getSummonerByIds(region:string, summonerIds:string, callback?:(error:Error, data:{[s: string]: api.summoner.SummonerDto})=>void):void {
        var path = `/api/lol/${region}/v1.4/summoner/${summonerIds}`;
        var query = {};
        var reqUrl = this.apiUrl(region, path, query);
        this.apiCall(reqUrl, 'GET', '', (error:Error, json:string) => {
            if (error) {
                callback(error, null);
            } else {
                try {
                    var data = RiotTypenode.errorCheck(json);
                } catch (e) {
                    callback(e, null);
                    return;
                }
                callback(null, <{[s: string]: api.summoner.SummonerDto}>data);
            }
        });
    }

    public getMasteryPagesBySummonerIds(region:string, summonerIds:string, callback?:(error:Error, data:{[s: string]: api.summoner.MasteryPagesDto})=>void):void {
        var path = `/api/lol/${region}/v1.4/summoner/${summonerIds}/masteries`;
        var query = {};
        var reqUrl = this.apiUrl(region, path, query);
        this.apiCall(reqUrl, 'GET', '', (error:Error, json:string) => {
            if (error) {
                callback(error, null);
            } else {
                try {
                    var data = RiotTypenode.errorCheck(json);
                } catch (e) {
                    callback(e, null);
                    return;
                }
                callback(null, <{[s: string]: api.summoner.MasteryPagesDto}>data);
            }
        });
    }

    public getNameBySummonerIds(region:string, summonerIds:string, callback?:(error:Error, data:{[s: string]: string})=>void):void {
        var path = `/api/lol/${region}/v1.4/summoner/${summonerIds}/name`;
        var query = {};
        var reqUrl = this.apiUrl(region, path, query);
        this.apiCall(reqUrl, 'GET', '', (error:Error, json:string) => {
            if (error) {
                callback(error, null);
            } else {
                try {
                    var data = RiotTypenode.errorCheck(json);
                } catch (e) {
                    callback(e, null);
                    return;
                }
                callback(null, <{[s: string]: string}>data);
            }
        });
    }

    public getRunePagesBySummonerIds(region:string, summonerIds:string, callback?:(error:Error, data:{[s: string]: api.summoner.RunePagesDto})=>void):void {
        var path = `/api/lol/${region}/v1.4/summoner/${summonerIds}/runes`;
        var query = {};
        var reqUrl = this.apiUrl(region, path, query);
        this.apiCall(reqUrl, 'GET', '', (error:Error, json:string) => {
            if (error) {
                callback(error, null);
            } else {
                try {
                    var data = RiotTypenode.errorCheck(json);
                } catch (e) {
                    callback(e, null);
                    return;
                }
                callback(null, <{[s: string]: api.summoner.RunePagesDto}>data);
            }
        });
    }

    // team

    public getTeamsBySummonerIds(region:string, summonerIds:string, callback?:(error:Error, data:{[s: string]: api.team.TeamDto[]})=>void):void {
        var path = `/api/lol/${region}/v2.4/team/by-summoner/${summonerIds}`;
        var query = {};
        var reqUrl = this.apiUrl(region, path, query);
        this.apiCall(reqUrl, 'GET', '', (error:Error, json:string) => {
            if (error) {
                callback(error, null);
            } else {
                try {
                    var data = RiotTypenode.errorCheck(json);
                } catch (e) {
                    callback(e, null);
                    return;
                }
                callback(null, <{[s: string]: api.team.TeamDto[]}>data);
            }
        });
    }

    public getTeamsByTeamIds(region:string, teamIds:string, callback?:(error:Error, data:{[s: string]: api.team.TeamDto})=>void):void {
        var path = `/api/lol/${region}/v2.4/team/${teamIds}`;
        var query = {};
        var reqUrl = this.apiUrl(region, path, query);
        this.apiCall(reqUrl, 'GET', '', (error:Error, json:string) => {
            if (error) {
                callback(error, null);
            } else {
                try {
                    var data = RiotTypenode.errorCheck(json);
                } catch (e) {
                    callback(e, null);
                    return;
                }
                callback(null, <{[s: string]: api.team.TeamDto}>data);
            }
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
        this.apiCall(reqUrl, 'POST', JSON.stringify(body), (error:Error, json:string) => {
            if (error) {
                callback(error, null);
            } else {
                try {
                    var data = RiotTypenode.errorCheck(json);
                } catch (e) {
                    callback(e, null);
                    return;
                }
                callback(null, <string[]>data);
            }
        });
    }

    public getTournamentByCode(tournamentCode:string, callback?:(error:Error, data:api.tournamentProvider.TournamentCodeDTO)=>void):void {
        var path = `/tournament/public/v1/code/${tournamentCode}`;
        var query = {};
        var reqUrl = this.apiUrl("global", path, query);
        this.apiCall(reqUrl, 'GET', '', (error:Error, json:string) => {
            if (error) {
                callback(error, null);
            } else {
                try {
                    var data = RiotTypenode.errorCheck(json);
                } catch (e) {
                    callback(e, null);
                    return;
                }
                callback(null, <api.tournamentProvider.TournamentCodeDTO>data);
            }
        });
    }

    public updateTournamentByCode(tournamentCode:string, body:api.tournamentProvider.TournamentCodeUpdateParameters, callback?:(error:Error, data:void)=>void):void {
        var path = `/tournament/public/v1/code/${tournamentCode}`;
        var query = {};
        var reqUrl = this.apiUrl("global", path, query);
        this.apiCall(reqUrl, 'PUT', '', (error:Error, json:string) => {
            if (error) {
                callback(error, null);
            } else {
                try {
                    var data = RiotTypenode.errorCheck(json);
                } catch (e) {
                    callback(e, null);
                    return;
                }
                callback(null, <void>data);
            }
        });
    }

    public getLobbyEventsByTournamentCode(tournamentCode:string, callback?:(error:Error, data:api.tournamentProvider.LobbyEventDTOWrapper)=>void):void {
        var path = `/tournament/public/v1/lobby/events/by-code/${tournamentCode}`;
        var query = {};
        var reqUrl = this.apiUrl("global", path, query);
        this.apiCall(reqUrl, 'GET', '', (error:Error, json:string) => {
            if (error) {
                callback(error, null);
            } else {
                try {
                    var data = RiotTypenode.errorCheck(json);
                } catch (e) {
                    callback(e, null);
                    return;
                }
                callback(null, <api.tournamentProvider.LobbyEventDTOWrapper>data);
            }
        });
    }

    public createTournamentProvider(body:api.tournamentProvider.ProviderRegistrationParameters, callback?:(error:Error, data:number)=>void):void {
        var path = `/tournament/public/v1/provider`;
        var query = {};
        var reqUrl = this.apiUrl("global", path, query);
        this.apiCall(reqUrl, 'POST', '', (error:Error, json:string) => {
            if (error) {
                callback(error, null);
            } else {
                try {
                    var data = RiotTypenode.errorCheck(json);
                } catch (e) {
                    callback(e, null);
                    return;
                }
                callback(null, <number>data);
            }
        });
    }

    public createTournament(body:api.tournamentProvider.TournamentRegistrationParameters, callback?:(error:Error, data:number)=>void):void {
        var path = `/tournament/public/v1/tournament`;
        var query = {};
        var reqUrl = this.apiUrl("global", path, query);
        this.apiCall(reqUrl, 'POST', '', (error:Error, json:string) => {
            if (error) {
                callback(error, null);
            } else {
                try {
                    var data = RiotTypenode.errorCheck(json);
                } catch (e) {
                    callback(e, null);
                    return;
                }
                callback(null, <number>data);
            }
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

    private apiCall(reqUrl:url.Url, method:string = 'GET', content?:string, callback?:(error:Error, data:string)=>void) {
        var options:https.RequestOptions = {
            hostname: reqUrl.hostname,
            path: reqUrl.pathname + reqUrl.query,
            method: method,
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Content-Length': content.length
            }
        };
        var req = https.request(options, (res) => {
            var body = '';
            res.on('data', (chunk) => {
                body += chunk;
            });
            res.on('end', () => {
                callback(null, body);
            })
        });
        req.on('error', (e) => {
            callback(e, null);
        });
        req.write(content);
        req.end();
    }

    private static errorCheck(json:string) {
        var data = JSON.parse(json);
        if (data.status && data.status.status_code !== 200) {
            var error:ApiError = new ApiError(data.status.status_code, `Server responded with error ${data.status.status_code} : "${data.status.message}"`);
            throw error;
        }
        return data;
    }
}
