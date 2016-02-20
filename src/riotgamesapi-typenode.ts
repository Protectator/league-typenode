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

export class RiotTypenode implements api.champion.Operations, api.championmastery.Operations,
    api.currentGame.Operations, api.featuredGames.Operations, api.game.Operations, api.league.Operations,
    api.lolStaticData.Operations, api.lolStatus.Operations, api.match.Operations, api.matchlist.Operations,
    api.stats.Operations, api.summoner.Operations, api.team.Operations, api.tournamentProvider.Operations {

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
        var path = `/api/lol/${region}/v1.2/champion`;
        var query = {
            "freeToPlay" : freeToPlay
        };
        var reqUrl = this.apiUrl(region, path, query);
        this.apiCall(reqUrl, 'GET', '', (data:string) => callback(<api.champion.ChampionListDto>JSON.parse(data)));
    }

    public getChampionById(region:string, id:number, callback?:(data:api.champion.ChampionDto)=>void):void {
        var path = `/api/lol/${region}/v1.2/champion/${id}`;
        var query = {
            "id" : id
        };
        var reqUrl = this.apiUrl(region, path, query);
        this.apiCall(reqUrl, 'GET', '', (data:string) => callback(<api.champion.ChampionDto>JSON.parse(data)));
    }

    public getChampionMastery(platformId:string, summonerId:number, championId:number, callback?:(data:riotGamesApi.championmastery.ChampionMasteryDto)=>void):void {
        // TODO
    }

    public getChampionsMastery(platformId:string, summonerId:number, callback?:(data:riotGamesApi.championmastery.ChampionMasteryDto[])=>void):void {
        // TODO
    }

    public getScore(platformId:string, summonerId:number, callback?:(data:number)=>void):void {
        // TODO
    }

    public getTopChampions(platformId:string, summonerId:number, count:number, callback?:(data:riotGamesApi.championmastery.ChampionMasteryDto[])=>void):void {
        // TODO
    }

    public getSpectatorGameInfoBySummonerId(platformId:string, summonerId:number, callback?:(data:riotGamesApi.currentGame.CurrentGameInfo)=>void):void {
        // TODO
    }

    public getFeaturedGames(region:string, callback?:(data:riotGamesApi.featuredGames.FeaturedGames)=>void):void {
        // TODO
    }

    public getRecentGamesBySummonerId(region:string, summonerId:number, callback?:(data:riotGamesApi.game.RecentGamesDto)=>void):void {
        // TODO
    }

    public getLeagueBySummonerIds(region:string, summonerIds:string, callback?:(data:{})=>void):void {
        // TODO
    }

    public getLeagueEntryBySummonerIds(region:string, summonerIds:string, callback?:(data:{})=>void):void {
        // TODO
    }

    public getLeagueByTeamIds(region:string, summonerIds:string, callback?:(data:{})=>void):void {
        // TODO
    }

    public getLeagueEntryByTeamIds(region:string, summonerIds:string, callback?:(data:{})=>void):void {
        // TODO
    }

    public getLeagueChallenger(region:string, type:string, callback?:(data:riotGamesApi.league.LeagueDto)=>void):void {
        // TODO
    }

    public getLeagueMaster(region:string, type:string, callback?:(data:riotGamesApi.league.LeagueDto)=>void):void {
        // TODO
    }

    public getChampions(region:string, locale:string, version:string, dataById:boolean, champData:string, callback?:(data:riotGamesApi.lolStaticData.ChampionListDto)=>void):void {
        // TODO
    }

    public getChampionById(region:string, id:number, locale:string, version:string, champData:string, callback?:(data:riotGamesApi.lolStaticData.ChampionDto)=>void):void {
        // TODO
    }

    public getItems(region:string, locale:string, version:string, itemListData:string, callback?:(data:riotGamesApi.lolStaticData.ItemListDto)=>void):void {
        // TODO
    }

    public getItemById(region:string, id:number, locale:string, version:string, itemData:string, callback?:(data:riotGamesApi.lolStaticData.ItemDto)=>void):void {
        // TODO
    }

    public getLanguageStrings(region:string, locale:string, version:string, callback?:(data:riotGamesApi.lolStaticData.LanguageStringsDto)=>void):void {
        // TODO
    }

    public getLanguages(region:string, callback?:(data:string[])=>void):void {
        // TODO
    }

    public getMaps(region:string, locale:string, version:string, callback?:(data:riotGamesApi.lolStaticData.MapDataDto)=>void):void {
        // TODO
    }

    public getMasteries(region:string, locale:string, version:string, masteryListData:string, callback?:(data:riotGamesApi.lolStaticData.MasteryListDto)=>void):void {
        // TODO
    }

    public getMasteryById(region:string, id:number, locale:string, version:string, masteryData:string, callback?:(data:riotGamesApi.lolStaticData.MasteryDto)=>void):void {
        // TODO
    }

    public getRealm(region:string, callback?:(data:riotGamesApi.lolStaticData.RealmDto)=>void):void {
        // TODO
    }

    public getRunes(region:string, locale:string, version:string, runeListData:string, callback?:(data:riotGamesApi.lolStaticData.RuneListDto)=>void):void {
        // TODO
    }

    public getRuneById(region:string, id:number, locale:string, version:string, runeData:string, callback?:(data:riotGamesApi.lolStaticData.RuneDto)=>void):void {
        // TODO
    }

    public getSummonerSpells(region:string, locale:string, version:string, dataById:boolean, spellData:string, callback?:(data:riotGamesApi.lolStaticData.SummonerSpellListDto)=>void):void {
        // TODO
    }

    public getSummonerSpellById(region:string, id:number, locale:string, version:string, spellData:string, callback?:(data:riotGamesApi.lolStaticData.SummonerSpellDto)=>void):void {
        // TODO
    }

    public getVersions(region:string, callback?:(data:string[])=>void):void {
        // TODO
    }

    public getShards(callback?:(data:riotGamesApi.lolStatus.Shard[])=>void):void {
        // TODO
    }

    public getShard(region:string, callback?:(data:riotGamesApi.lolStatus.ShardStatus)=>void):void {
        // TODO
    }

    public getMatchIdsByTournamentCode(region:string, tournamentCode:string, callback?:(data:number[])=>void):void {
        // TODO
    }

    public getMatchByIdAndTournamentCode(region:string, matchId:number, tournamentCode:string, includeTimeline:boolean, callback?:(data:riotGamesApi.match.MatchDetail)=>void):void {
        // TODO
    }

    public getMatchById(region:string, matchId:number, includeTimeline:boolean, callback?:(data:riotGamesApi.match.MatchDetail)=>void):void {
        // TODO
    }

    public getMatchesBySummonerId(region:string, summonerId:number, championIds:string, rankedQueues:string, seasons:string, beginTime:number, endTime:number, beginIndex:number, endIndex:number, callback?:(data:riotGamesApi.matchlist.MatchList)=>void):void {
        // TODO
    }

    public getRankedBySummonerId(region:string, summonerId:number, season:string, callback?:(data:riotGamesApi.stats.RankedStatsDto)=>void):void {
        // TODO
    }

    public getSummaryBySummonerId(region:string, summonerId:number, season:string, callback?:(data:riotGamesApi.stats.PlayerStatsSummaryListDto)=>void):void {
        // TODO
    }

    public getSummonerByNames(region:string, summonerNames:string, callback?:(data:{})=>void):void {
        // TODO
    }

    public getSummonerByIds(region:string, summonerIds:string, callback?:(data:{})=>void):void {
        // TODO
    }

    public getMasteryPagesBySummonerIds(region:string, summonerIds:string, callback?:(data:{})=>void):void {
        // TODO
    }

    public getNameBySummonerIds(region:string, summonerIds:string, callback?:(data:{})=>void):void {
        // TODO
    }

    public getRunePagesBySummonerIds(region:string, summonerIds:string, callback?:(data:{})=>void):void {
        // TODO
    }

    public getTeamsBySummonerIds(region:string, summonerIds:string, callback?:(data:{})=>void):void {
        // TODO
    }

    public getTeamsByTeamIds(region:string, teamIds:string, callback?:(data:{})=>void):void {
        // TODO
    }

    public createTournamentCodesById(tournamentId:number, count:number, body:riotGamesApi.tournamentProvider.TournamentCodeParameters, callback?:(data:string[])=>void):void {
        // TODO
    }

    public getTournamentByCode(tournamentCode:string, callback?:(data:riotGamesApi.tournamentProvider.TournamentCodeDTO)=>void):void {
        // TODO
    }

    public updateTournamentByCode(tournamentCode:string, body:riotGamesApi.tournamentProvider.TournamentCodeUpdateParameters, callback?:(data:void)=>void):void {
        // TODO
    }

    public getLobbyEventsByTournamentCode(tournamentCode:string, callback?:(data:riotGamesApi.tournamentProvider.LobbyEventDTOWrapper)=>void):void {
        // TODO
    }

    public createTournamentProvider(body:riotGamesApi.tournamentProvider.ProviderRegistrationParameters, callback?:(data:number)=>void):void {
        // TODO
    }

    public createTournament(body:riotGamesApi.tournamentProvider.TournamentRegistrationParameters, callback?:(data:number)=>void):void {
        // TODO
    }

    private apiUrl(region:string, path:string, query:Object): url.Url {
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
}
