import {system} from 'mini-web-game-system';

let cacheName = 'mini-web-game';
let cachedUrls = [];

let {start, PRECACHE_URLS} = system.sw;
PRECACHE_URLS.push(...cachedUrls);
start(cacheName);
