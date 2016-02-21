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

    // champion

    public getChampionsStatus(region:string, freeToPlay?:boolean, callback?:(data: api.champion.ChampionListDto)=>void): void {
        var path = `/api/lol/${region}/v1.2/champion`;
        var query = {
            "freeToPlay" : freeToPlay
        };
        var reqUrl = this.apiUrl(region, path, query);
        this.apiCall(reqUrl, 'GET', '', (data:string) => callback(<api.champion.ChampionListDto>JSON.parse(data)));
    }

    public getChampionStatusById(region:string, id:number, callback?:(data:api.champion.ChampionDto)=>void):void {
        var path = `/api/lol/${region}/v1.2/champion/${id}`;
        var query = {
            "id" : id
        };
        var reqUrl = this.apiUrl(region, path, query);
        this.apiCall(reqUrl, 'GET', '', (data:string) => callback(<api.champion.ChampionDto>JSON.parse(data)));
    }

    // championmastery

    public getChampionMastery(platformId:string, playerId:number, championId:number, callback?:(data:api.championmastery.ChampionMasteryDto)=>void):void {
        var path = `/championmastery/location/${platformId}/player/${playerId}/champion/${championId}`;
        var query = {};
        var reqUrl = this.apiUrl(platformId, path, query);
        this.apiCall(reqUrl, 'GET', '', (data:string) => callback(<api.championmastery.ChampionMasteryDto>JSON.parse(data)));
    }

    public getChampionsMastery(platformId:string, playerId:number, callback?:(data:api.championmastery.ChampionMasteryDto[])=>void):void {
        var path = `/championmastery/location/${platformId}/player/${playerId}/champions`;
        var query = {};
        var reqUrl = this.apiUrl(platformId, path, query);
        this.apiCall(reqUrl, 'GET', '', (data:string) => callback(<api.championmastery.ChampionMasteryDto[]>JSON.parse(data)));
    }

    public getScore(platformId:string, playerId:number, callback?:(data:number)=>void):void {
        var path = `/championmastery/location/${platformId}/player/${playerId}/score`;
        var query = {};
        var reqUrl = this.apiUrl(platformId, path, query);
        this.apiCall(reqUrl, 'GET', '', (data:string) => callback(<number>JSON.parse(data)));
    }

    public getTopChampions(platformId:string, playerId:number, count:number, callback?:(data:api.championmastery.ChampionMasteryDto[])=>void):void {
        var path = `/championmastery/location/${platformId}/player/${playerId}/topchampions`;
        var query = {
            "count" : count
        };
        var reqUrl = this.apiUrl(platformId, path, query);
        this.apiCall(reqUrl, 'GET', '', (data:string) => callback(<api.championmastery.ChampionMasteryDto[]>JSON.parse(data)));
    }

    // current-game

    public getSpectatorGameInfoBySummonerId(platformId:string, summonerId:number, callback?:(data:api.currentGame.CurrentGameInfo)=>void):void {
        var path = `/observer-mode/rest/consumer/getSpectatorGameInfo/${platformId}/${summonerId}`;
        var query = {};
        var reqUrl = this.apiUrl(platformId, path, query);
        this.apiCall(reqUrl, 'GET', '', (data:string) => callback(<api.currentGame.CurrentGameInfo>JSON.parse(data)));
    }

    // featured-games

    public getFeaturedGames(region:string, callback?:(data:api.featuredGames.FeaturedGames)=>void):void {
        var path = `/observer-mode/rest/featured`;
        var query = {};
        var reqUrl = this.apiUrl(region, path, query);
        this.apiCall(reqUrl, 'GET', '', (data:string) => callback(<api.featuredGames.FeaturedGames>JSON.parse(data)));
    }

    // game

    public getRecentGamesBySummonerId(region:string, summonerId:number, callback?:(data:api.game.RecentGamesDto)=>void):void {
        var path = `/api/lol/${region}/v1.3/game/by-summoner/${summonerId}/recent`;
        var query = {};
        var reqUrl = this.apiUrl(region, path, query);
        this.apiCall(reqUrl, 'GET', '', (data:string) => callback(<api.game.RecentGamesDto>JSON.parse(data)));
    }

    // league

    public getLeagueBySummonerIds(region:string, summonerIds:string, callback?:(data:{[s: string]: api.league.LeagueDto[]})=>void):void {
        var path = `/api/lol/${region}/v2.5/league/by-summoner/${summonerIds}`;
        var query = {};
        var reqUrl = this.apiUrl(region, path, query);
        this.apiCall(reqUrl, 'GET', '', (data:string) => callback(<{[s: string]: api.league.LeagueDto[]}>JSON.parse(data)));
    }

    public getLeagueEntryBySummonerIds(region:string, summonerIds:string, callback?:(data:{[s: string]: api.league.LeagueDto[]})=>void):void {
        var path = `/api/lol/${region}/v2.5/league/by-summoner/${summonerIds}/entry`;
        var query = {};
        var reqUrl = this.apiUrl(region, path, query);
        this.apiCall(reqUrl, 'GET', '', (data:string) => callback(<{[s: string]: api.league.LeagueDto[]}>JSON.parse(data)));
    }

    public getLeagueByTeamIds(region:string, teamIds:string, callback?:(data:{[s: string]: api.league.LeagueDto[]})=>void):void {
        var path = `/api/lol/${region}/v2.5/league/by-team/${teamIds}`;
        var query = {};
        var reqUrl = this.apiUrl(region, path, query);
        this.apiCall(reqUrl, 'GET', '', (data:string) => callback(<{[s: string]: api.league.LeagueDto[]}>JSON.parse(data)));
    }

    public getLeagueEntryByTeamIds(region:string, teamIds:string, callback?:(data:{[s: string]: api.league.LeagueDto[]})=>void):void {
        var path = `/api/lol/${region}/v2.5/league/by-team/${teamIds}/entry`;
        var query = {};
        var reqUrl = this.apiUrl(region, path, query);
        this.apiCall(reqUrl, 'GET', '', (data:string) => callback(<{[s: string]: api.league.LeagueDto[]}>JSON.parse(data)));
    }

    public getLeagueChallenger(region:string, type:string, callback?:(data:api.league.LeagueDto)=>void):void {
        var path = `/api/lol/${region}/v2.5/league/challenger`;
        var query = {
            "type" : type
        };
        var reqUrl = this.apiUrl(region, path, query);
        this.apiCall(reqUrl, 'GET', '', (data:string) => callback(<api.league.LeagueDto>JSON.parse(data)));
    }

    public getLeagueMaster(region:string, type:string, callback?:(data:api.league.LeagueDto)=>void):void {
        var path = `/api/lol/${region}/v2.5/league/master`;
        var query = {
            "type" : type
        };
        var reqUrl = this.apiUrl(region, path, query);
        this.apiCall(reqUrl, 'GET', '', (data:string) => callback(<api.league.LeagueDto>JSON.parse(data)));
    }

    // lol-static-data

    public getChampions(region:string, locale:string, version:string, dataById:boolean, champData:string, callback?:(data:api.lolStaticData.ChampionListDto)=>void):void {
        var path = `/api/lol/static-data/${region}/v1.2/champion`;
        var query = {
            "locale" : locale,
            "version" : version,
            "dataById" : dataById,
            "champData" : champData
        };
        var reqUrl = this.apiUrl(region, path, query);
        this.apiCall(reqUrl, 'GET', '', (data:string) => callback(<api.lolStaticData.ChampionListDto>JSON.parse(data)));
    }

    public getChampionById(region:string, id:number, locale:string, version:string, champData:string, callback?:(data:api.lolStaticData.ChampionDto)=>void):void {
        var path = `/api/lol/static-data/${region}/v1.2/champion/${id}`;
        var query = {
            "locale" : locale,
            "version" : version,
            "champData" : champData
        };
        var reqUrl = this.apiUrl(region, path, query);
        this.apiCall(reqUrl, 'GET', '', (data:string) => callback(<api.lolStaticData.ChampionDto>JSON.parse(data)));
    }

    public getItems(region:string, locale:string, version:string, itemListData:string, callback?:(data:api.lolStaticData.ItemListDto)=>void):void {
        var path = `/api/lol/static-data/${region}/v1.2/item`;
        var query = {
            "locale" : locale,
            "version" : version,
            "itemListData" : itemListData
        };
        var reqUrl = this.apiUrl(region, path, query);
        this.apiCall(reqUrl, 'GET', '', (data:string) => callback(<api.lolStaticData.ItemListDto>JSON.parse(data)));
    }

    public getItemById(region:string, id:number, locale:string, version:string, itemData:string, callback?:(data:api.lolStaticData.ItemDto)=>void):void {
        var path = `/api/lol/static-data/${region}/v1.2/item/${id}`;
        var query = {
            "locale" : locale,
            "version" : version,
            "itemData" : itemData
        };
        var reqUrl = this.apiUrl(region, path, query);
        this.apiCall(reqUrl, 'GET', '', (data:string) => callback(<api.lolStaticData.ItemDto>JSON.parse(data)));
    }

    public getLanguageStrings(region:string, locale:string, version:string, callback?:(data:api.lolStaticData.LanguageStringsDto)=>void):void {
        var path = `/api/lol/static-data/${region}/v1.2/language-strings`;
        var query = {
            "locale" : locale,
            "version" : version
        };
        var reqUrl = this.apiUrl(region, path, query);
        this.apiCall(reqUrl, 'GET', '', (data:string) => callback(<api.lolStaticData.LanguageStringsDto>JSON.parse(data)));
    }

    public getLanguages(region:string, callback?:(data:string[])=>void):void {
        var path = `/api/lol/static-data/${region}/v1.2/languages`;
        var query = {};
        var reqUrl = this.apiUrl(region, path, query);
        this.apiCall(reqUrl, 'GET', '', (data:string) => callback(<string[]>JSON.parse(data)));
    }

    public getMaps(region:string, locale:string, version:string, callback?:(data:api.lolStaticData.MapDataDto)=>void):void {
        var path = `/api/lol/static-data/${region}/v1.2/map`;
        var query = {
            "locale" : locale,
            "version" : version
        };
        var reqUrl = this.apiUrl(region, path, query);
        this.apiCall(reqUrl, 'GET', '', (data:string) => callback(<api.lolStaticData.MapDataDto>JSON.parse(data)));
    }

    public getMasteries(region:string, locale:string, version:string, masteryListData:string, callback?:(data:api.lolStaticData.MasteryListDto)=>void):void {
        var path = `/api/lol/static-data/${region}/v1.2/mastery`;
        var query = {
            "locale" : locale,
            "version" : version,
            "masteryListData" : masteryListData
        };
        var reqUrl = this.apiUrl(region, path, query);
        this.apiCall(reqUrl, 'GET', '', (data:string) => callback(<api.lolStaticData.MasteryListDto>JSON.parse(data)));
    }

    public getMasteryById(region:string, id:number, locale:string, version:string, masteryData:string, callback?:(data:api.lolStaticData.MasteryDto)=>void):void {
        var path = `/api/lol/static-data/${region}/v1.2/mastery/${id}`;
        var query = {
            "locale" : locale,
            "version" : version,
            "masteryData" : masteryData
        };
        var reqUrl = this.apiUrl(region, path, query);
        this.apiCall(reqUrl, 'GET', '', (data:string) => callback(<api.lolStaticData.MasteryDto>JSON.parse(data)));
    }

    public getRealm(region:string, callback?:(data:api.lolStaticData.RealmDto)=>void):void {
        var path = `/api/lol/static-data/${region}/v1.2/realm`;
        var query = {};
        var reqUrl = this.apiUrl(region, path, query);
        this.apiCall(reqUrl, 'GET', '', (data:string) => callback(<api.lolStaticData.RealmDto>JSON.parse(data)));
    }

    public getRunes(region:string, locale:string, version:string, runeListData:string, callback?:(data:api.lolStaticData.RuneListDto)=>void):void {
        var path = `/api/lol/static-data/${region}/v1.2/rune`;
        var query = {
            "locale" : locale,
            "version" : version,
            "runeListData" : runeListData
        };
        var reqUrl = this.apiUrl(region, path, query);
        this.apiCall(reqUrl, 'GET', '', (data:string) => callback(<api.lolStaticData.RuneListDto>JSON.parse(data)));
    }

    public getRuneById(region:string, id:number, locale:string, version:string, runeData:string, callback?:(data:api.lolStaticData.RuneDto)=>void):void {
        var path = `/api/lol/static-data/${region}/v1.2/rune/${id}`;
        var query = {
            "locale" : locale,
            "version" : version,
            "runeData" : runeData
        };
        var reqUrl = this.apiUrl(region, path, query);
        this.apiCall(reqUrl, 'GET', '', (data:string) => callback(<api.lolStaticData.RuneDto>JSON.parse(data)));
    }

    public getSummonerSpells(region:string, locale:string, version:string, dataById:boolean, spellData:string, callback?:(data:api.lolStaticData.SummonerSpellListDto)=>void):void {
        var path = `/api/lol/static-data/${region}/v1.2/summoner-spell`;
        var query = {
            "locale" : locale,
            "version" : version,
            "dataById" : dataById,
            "spellData" : spellData
        };
        var reqUrl = this.apiUrl(region, path, query);
        this.apiCall(reqUrl, 'GET', '', (data:string) => callback(<api.lolStaticData.SummonerSpellListDto>JSON.parse(data)));
    }

    public getSummonerSpellById(region:string, id:number, locale:string, version:string, spellData:string, callback?:(data:api.lolStaticData.SummonerSpellDto)=>void):void {
        var path = `/api/lol/static-data/${region}/v1.2/summoner-spell/${id}`;
        var query = {
            "locale" : locale,
            "version" : version,
            "spellData" : spellData
        };
        var reqUrl = this.apiUrl(region, path, query);
        this.apiCall(reqUrl, 'GET', '', (data:string) => callback(<api.lolStaticData.SummonerSpellDto>JSON.parse(data)));
    }

    public getVersions(region:string, callback?:(data:string[])=>void):void {
        var path = ``;
        var query = {};
        var reqUrl = this.apiUrl(region, path, query);
        this.apiCall(reqUrl, 'GET', '', (data:string) => callback(<string[]>JSON.parse(data)));
    }

    // lol-status

    public getShards(callback?:(data:api.lolStatus.Shard[])=>void):void {
        var reqUrl = {
            protocol: this.baseConfig.protocol,
            slashes: this.baseConfig.slashes,
            hostname: `status.leagueoflegends.com`,
            port: this.baseConfig.port,
            pathname: `/shards`
        };
        this.apiCall(reqUrl, 'GET', '', (data:string) => callback(<api.lolStatus.Shard[]>JSON.parse(data)));
    }

    public getShard(region:string, callback?:(data:api.lolStatus.ShardStatus)=>void):void {
        var reqUrl = {
            protocol: this.baseConfig.protocol,
            slashes: this.baseConfig.slashes,
            hostname: `status.leagueoflegends.com`,
            port: this.baseConfig.port,
            pathname: `/shards/${region}`
        };
        this.apiCall(reqUrl, 'GET', '', (data:string) => callback(<api.lolStatus.ShardStatus>JSON.parse(data)));
    }

    // match

    public getMatchIdsByTournamentCode(region:string, tournamentCode:string, callback?:(data:number[])=>void):void {
        var path = `/api/lol/${region}/v2.2/match/by-tournament/${tournamentCode}/ids`;
        var query = {};
        var reqUrl = this.apiUrl(region, path, query);
        this.apiCall(reqUrl, 'GET', '', (data:string) => callback(<number[]>JSON.parse(data)));
    }

    public getMatchByIdAndTournamentCode(region:string, matchId:number, tournamentCode:string, includeTimeline:boolean, callback?:(data:api.match.MatchDetail)=>void):void {
        var path = `/api/lol/${region}/v2.2/match/for-tournament/${matchId}`;
        var query = {
            "tournamentCode" : tournamentCode,
            "includeTimeline" : includeTimeline
        };
        var reqUrl = this.apiUrl(region, path, query);
        this.apiCall(reqUrl, 'GET', '', (data:string) => callback(<api.match.MatchDetail>JSON.parse(data)));
    }

    public getMatchById(region:string, matchId:number, includeTimeline:boolean, callback?:(data:api.match.MatchDetail)=>void):void {
        var path = `/api/lol/${region}/v2.2/match/${matchId}`;
        var query = {
            "includeTimeline" : includeTimeline
        };
        var reqUrl = this.apiUrl(region, path, query);
        this.apiCall(reqUrl, 'GET', '', (data:string) => callback(<api.match.MatchDetail>JSON.parse(data)));
    }

    // matchlist

    public getMatchesBySummonerId(region:string, summonerId:number, championIds:string, rankedQueues:string, seasons:string, beginTime:number, endTime:number, beginIndex:number, endIndex:number, callback?:(data:api.matchlist.MatchList)=>void):void {
        var path = `/api/lol/${region}/v2.2/matchlist/by-summoner/${summonerId}`;
        var query = {
            "championIds" : championIds,
            "rankedQueues" : rankedQueues,
            "seasons" : seasons,
            "beginTime" : beginTime,
            "endTime" : endTime,
            "beginIndex" : beginIndex,
            "endIndex" : endIndex
        };
        var reqUrl = this.apiUrl(region, path, query);
        this.apiCall(reqUrl, 'GET', '', (data:string) => callback(<api.matchlist.MatchList>JSON.parse(data)));
    }

    // stats

    public getRankedBySummonerId(region:string, summonerId:number, season:string, callback?:(data:api.stats.RankedStatsDto)=>void):void {
        var path = `/api/lol/${region}/v1.3/stats/by-summoner/${summonerId}/ranked`;
        var query = {
            "season" : season
        };
        var reqUrl = this.apiUrl(region, path, query);
        this.apiCall(reqUrl, 'GET', '', (data:string) => callback(<api.stats.RankedStatsDto>JSON.parse(data)));
    }

    public getSummaryBySummonerId(region:string, summonerId:number, season:string, callback?:(data:api.stats.PlayerStatsSummaryListDto)=>void):void {
        var path = `/api/lol/${region}/v1.3/stats/by-summoner/${summonerId}/summary`;
        var query = {
            "season" : season
        };
        var reqUrl = this.apiUrl(region, path, query);
        this.apiCall(reqUrl, 'GET', '', (data:string) => callback(<api.stats.PlayerStatsSummaryListDto>JSON.parse(data)));
    }

    // summoner

    public getSummonerByNames(region:string, summonerNames:string, callback?:(data:{[s: string]: api.summoner.SummonerDto})=>void):void {
        var path = `/api/lol/${region}/v1.4/summoner/by-name/${summonerNames}`;
        var query = {};
        var reqUrl = this.apiUrl(region, path, query);
        this.apiCall(reqUrl, 'GET', '', (data:string) => callback(<{[s: string]: api.summoner.SummonerDto}>JSON.parse(data)));
    }

    public getSummonerByIds(region:string, summonerIds:string, callback?:(data:{[s: string]: api.summoner.SummonerDto})=>void):void {
        var path = `/api/lol/${region}/v1.4/summoner/${summonerIds}`;
        var query = {};
        var reqUrl = this.apiUrl(region, path, query);
        this.apiCall(reqUrl, 'GET', '', (data:string) => callback(<{[s: string]: api.summoner.SummonerDto}>JSON.parse(data)));
    }

    public getMasteryPagesBySummonerIds(region:string, summonerIds:string, callback?:(data:{[s: string]: api.summoner.MasteryPagesDto})=>void):void {
        var path = `/api/lol/${region}/v1.4/summoner/${summonerIds}/masteries`;
        var query = {};
        var reqUrl = this.apiUrl(region, path, query);
        this.apiCall(reqUrl, 'GET', '', (data:string) => callback(<{[s: string]: api.summoner.MasteryPagesDto}>JSON.parse(data)));
    }

    public getNameBySummonerIds(region:string, summonerIds:string, callback?:(data:{[s: string]: string})=>void):void {
        var path = `/api/lol/${region}/v1.4/summoner/${summonerIds}/name`;
        var query = {};
        var reqUrl = this.apiUrl(region, path, query);
        this.apiCall(reqUrl, 'GET', '', (data:string) => callback(<{[s: string]: string}>JSON.parse(data)));
    }

    public getRunePagesBySummonerIds(region:string, summonerIds:string, callback?:(data:{[s: string]: api.summoner.RunePagesDto})=>void):void {
        var path = `/api/lol/${region}/v1.4/summoner/${summonerIds}/runes`;
        var query = {};
        var reqUrl = this.apiUrl(region, path, query);
        this.apiCall(reqUrl, 'GET', '', (data:string) => callback(<{[s: string]: api.summoner.RunePagesDto}>JSON.parse(data)));
    }

    // team

    public getTeamsBySummonerIds(region:string, summonerIds:string, callback?:(data:{[s: string]: api.team.TeamDto[]})=>void):void {
        var path = `/api/lol/${region}/v2.4/team/by-summoner/${summonerIds}`;
        var query = {};
        var reqUrl = this.apiUrl(region, path, query);
        this.apiCall(reqUrl, 'GET', '', (data:string) => callback(<{[s: string]: api.team.TeamDto[]}>JSON.parse(data)));
    }

    public getTeamsByTeamIds(region:string, teamIds:string, callback?:(data:{[s: string]: api.team.TeamDto})=>void):void {
        var path = `/api/lol/${region}/v2.4/team/${teamIds}`;
        var query = {};
        var reqUrl = this.apiUrl(region, path, query);
        this.apiCall(reqUrl, 'GET', '', (data:string) => callback(<{[s: string]: api.team.TeamDto}>JSON.parse(data)));
    }

    // tournament-provider

    public createTournamentCodesById(tournamentId:number, count:number, body:api.tournamentProvider.TournamentCodeParameters, callback?:(data:string[])=>void):void {
        var path = `/tournament/public/v1/code`;
        var query = {
            "tournamentId" : tournamentId,
            "count" : count
        };
        var reqUrl = this.apiUrl("global", path, query);
        this.apiCall(reqUrl, 'POST', JSON.stringify(body), (data:string) => callback(<string[]>JSON.parse(data)));
    }

    public getTournamentByCode(tournamentCode:string, callback?:(data:api.tournamentProvider.TournamentCodeDTO)=>void):void {
        var path = `/tournament/public/v1/code/${tournamentCode}`;
        var query = {};
        var reqUrl = this.apiUrl("global", path, query);
        this.apiCall(reqUrl, 'GET', '', (data:string) => callback(<api.tournamentProvider.TournamentCodeDTO>JSON.parse(data)));
    }

    public updateTournamentByCode(tournamentCode:string, body:api.tournamentProvider.TournamentCodeUpdateParameters, callback?:(data:void)=>void):void {
        var path = `/tournament/public/v1/code/${tournamentCode}`;
        var query = {};
        var reqUrl = this.apiUrl("global", path, query);
        this.apiCall(reqUrl, 'PUT', '', (data:string) => callback(<void>JSON.parse(data)));
    }

    public getLobbyEventsByTournamentCode(tournamentCode:string, callback?:(data:api.tournamentProvider.LobbyEventDTOWrapper)=>void):void {
        var path = `/tournament/public/v1/lobby/events/by-code/${tournamentCode}`;
        var query = {};
        var reqUrl = this.apiUrl("global", path, query);
        this.apiCall(reqUrl, 'GET', '', (data:string) => callback(<api.tournamentProvider.LobbyEventDTOWrapper>JSON.parse(data)));
    }

    public createTournamentProvider(body:api.tournamentProvider.ProviderRegistrationParameters, callback?:(data:number)=>void):void {
        var path = `/tournament/public/v1/provider`;
        var query = {};
        var reqUrl = this.apiUrl("global", path, query);
        this.apiCall(reqUrl, 'POST', '', (data:string) => callback(<number>JSON.parse(data)));
    }

    public createTournament(body:api.tournamentProvider.TournamentRegistrationParameters, callback?:(data:number)=>void):void {
        var path = `/tournament/public/v1/tournament`;
        var query = {};
        var reqUrl = this.apiUrl("global", path, query);
        this.apiCall(reqUrl, 'POST', '', (data:string) => callback(<number>JSON.parse(data)));
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
