// @flow

const axios = require('axios');

class Sportradar {
    key: string;
    sport: string;
    lang: string;
    version: string;
    access_level: string;
    base: string;

    constructor(API_KEY: string, opts: Object) {
        this.key = API_KEY;

        this.sport = opts.sport || 'csgo';
        this.lang = opts.language || 'en';
        this.access_level = opts.access_level || 't';
        this.version = opts.version || '1';

        this.base = `http://api.sportradar.us/${this.sport}-${this.access_level}${this.version}/${this.lang}`;
    }

    schedule (date: string) {
        return new Promise((resolve, reject) => {
            axios.get(`${this.base}/schedules/${date}/schedule.json?api_key=${this.key}`)
            .then(response => resolve(response))
            .catch(error => reject(error));
        });
    }

    result (date: string) {
        return new Promise((resolve, reject) => {
            axios.get(`${this.base}/schedules/${date}/results.json?api_key=${this.key}`)
            .then(response => resolve(response))
            .catch(error => reject(error));
        });
    }

    match (type: string, matchId: string) {
        const validTypes = {
            timeline: true, lineups: true,
            probabilities: true, summary: true
        };

        if (type === 'timeline' && this.sport !== 'csgo') {
            throw new Error('Match timeline is only available for Counter-Strike Global Offensive.');
        }

        return new Promise((resolve, reject) => {
            if (!validTypes[type]) {
                return reject('Invalid type');
            }

            axios.get(`${this.base}/matches/${matchId}/${type}.json?api_key=${this.key}`)
            .then(response => resolve(response))
            .catch(error => reject(error));
        });
    }

    head2head (teamId1: string, teamId2: string) {
        return new Promise((resolve, reject) => {
            axios.get(`${this.base}/teams/${teamId1}/versus/${teamId2}/matches.json?api_key=${this.key}`)
            .then(response => resolve(response))
            .catch(error => reject(error));
        });
    }

    player (playerId: string) {
        const validTypes = {
            timeline: true, lineups: true,
            probabilities: true, summary: true
        };

        return new Promise((resolve, reject) => {
            axios.get(`${this.base}/player/${playerId}/profile.json?api_key=${this.key}`)
            .then(response => resolve(response))
            .catch(error => reject(error));
        });
    }

    team (type: string, teamId: string) {
        const validTypes = {
            profile: true, results: true, schedule: true
        };

        return new Promise((resolve, reject) => {
            if (!validTypes[type]) {
                axios.get(`${this.base}/teams.json?api_key=${this.key}`)
                .then(response => resolve(response))
                .catch(error => reject(error));
            } else {
                axios.get(`${this.base}/teams/${teamId}/${type}.json?api_key=${this.key}`)
                .then(response => resolve(response))
                .catch(error => reject(error));
            }
        });
        
    }
}

module.exports = Sportradar;