const dailyResults = require('../test/data/daily_results.json');

const URLS = {
    dailyResults: 'https://api.sportradar.us/csgo-t1/us/schedules'
}

const checkUrl = (url, begin, type) => {
    return url.indexOf(begin) > -1 && url.indexOf(type) > -1
}

module.exports = {
    get: jest.fn(url => {
        switch(url) {
            case checkUrl(url, URLS.dailyResults, 'results.json'):
                return Promise.resolve({
                    data: dailyResults
                });
        }
    })
}