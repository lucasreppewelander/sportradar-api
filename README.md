# Sportradar API wrapper for Node
> A small wrapper for the Sportradar API.

## Table of Contents
- Installation
- Authenticating
- Configuration
- Basic usage
- Methods

----

## [Installation](#installation)
```
npm install sportradar-api
```

## [Authenticating and default configuration](#auth)
```js
const Sportradar = require('sportradar-api');
const sr = new Sportradar('API_KEY');
```

## Authenticating with provided configuration
```js
const Sportradar = require('sportradar-api');
const config = { sport: 'dota2', access_level: 'p' };

const sr = new Sportradar('API_KEY', config);
```

### [Configuration options](#config)
| Key | Description | Type | Default | Available options |
|-----|-------------|------|:---------------:|-------------------|
| sport | Type of sport | string | `csgo` | `dota2`, `csgo`, `lol` |
| access_level | Trial or Production | string | `t` | `t` - trial<br>`p` -production |
| lang | Locale of result | string | `en` | [Supported locales](https://developer.sportradar.com/files/locales.pdf)
| version | API Version | string | `1` | `1` sometimes `2`

***

## [Basic usage](#usage)
```js
const Sportradar = require('sportradar-api');
const sr = new Sportradar('API_KEY', { sport: 'dota2' });

sr.match('sr:match:9356887', 'summary').then(result => {
    // result contains the data object
    // with a match summary like the
    // following url: 
    // https://developer.sportradar.com/files/csgo_match_summary_sample.xml
}).catch(requestError => console.error(requestError));
```

***

## [Available methods](#methods)

### Schedule `(date)`
```js
// date: must be an valid date in ISO format.

sportradar.schedule("2018-05-05");
```

### Result `(date)`
```js
// date: must be an valid date in ISO format.

sportradar.result("2018-05-05");
```

### Match `(id, type)`
```js
// available types:
// * summary
// * timeline (csgo only)
// * lineups
// * probabilities

sportradar.result("sr:match:345784", "summary");
```

### Head 2 Head `(team1_id, team2_id)`
```js
// both id should be of type string
sportradar.head2head("sr:competitor:345784", "sr:competitor:90983");
```

### Team `(team_id, ?type)`
```js
// id should be of type string
// available types:
// * profile
// * results
// * schedule

// type is optional if no type is provided, the API
// will provide a list of all available teams

sportradar.team("sr:competitor:345784", "profile");

// or

sportradar.team("sr:competitor:345784");

```

### Player `(player_id)`
```js
// id should be of type string
sportradar.player("sr:player:345784");
```

