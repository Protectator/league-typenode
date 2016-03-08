# league-typenode
[![Build Status](https://travis-ci.org/Protectator/league-typenode.svg?branch=master)](https://travis-ci.org/Protectator/league-typenode)

Simple TypeScript + Node.js wrapper for the official [Riot Games' League of Legends API](https://developer.riotgames.com/api/methods) using [league-typedef](https://github.com/Protectator/league-typedef) definitions.

## Installing

- Install npm with [Node.js](https://nodejs.org/en/)
- Run `npm install` in the project's root directory

## Building

- Run `gulp build` in the project's root directory to build the sources and test files.

## Usage

```typescript
// Import the wrapper
import * as rtnode from 'league-typenode';

// Instanciate it
var tn: rtnode.RiotTypenode = new rtnode.LeagueTypenode('your-api-key', false);

// Use it with callbacks
tn.getSummonerByNames("euw", "Protectator", (summoners) => {
    console.log(summoners["Protectator"].id);
});
```

## Testing

- Run `gulp test` in the project's root directory to run the tests locally.


## License

league-typenode is distributed under [The MIT License](http://opensource.org/licenses/MIT).
