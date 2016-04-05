# league-typenode
[![Build Status](https://travis-ci.org/Protectator/league-typenode.svg?branch=master)](https://travis-ci.org/Protectator/league-typenode) [![devDependency Status](https://david-dm.org/protectator/league-typenode/dev-status.svg)](https://david-dm.org/protectator/league-typenode#info=devDependencies)

Simple TypeScript + Node.js wrapper for the official [Riot Games' League of Legends API](https://developer.riotgames.com/api/methods) using [league-typedef](https://github.com/Protectator/league-typedef) definitions.

## Installing

- Install npm with [Node.js](https://nodejs.org/en/)
- Run `npm install` in the project's root directory

## Building

- Run `gulp build` in the project's root directory to build the sources and test files.

## Usage

```typescript
// Import the wrapper
import * as leaguetn from 'league-typenode';

// Instanciate it
var tn: leaguetn.LeagueTypenode = new leaguetn.LeagueTypenode('your-api-key', false);

// Use it with callbacks
tn.getSummonerByNames("euw", "protectator", (error, summoners) => {
    if (error) {
        throw error;
    }
    console.log(summoners["protectator"].id);
});
```

## Testing

- Run `gulp test` in the project's root directory to run the tests locally.


## License

league-typenode is distributed under [The MIT License](http://opensource.org/licenses/MIT).
