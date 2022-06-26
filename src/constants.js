const URL_REGEXES = {
    MUSIC_API: /music\.yandex\.ru\/api\//,
    NEW_TRACK_START: /(\/handlers\/)(.*)(\/start\?__t=)/,
};

const ENDPOINTS = {
    TRACK: 'https://music.yandex.ru/handlers/track.jsx?track={trackId}',
};

const APP_MESSAGES = {
    GREETING: 'DEFAULT GREETING TEXT',
    LYRICS_NOT_AVAILABLE: 'NO LYRICS AVAILABLE',
};
const CONTAINER_NODE_ID = 'root:better_lyrics';

export {
    URL_REGEXES,
    ENDPOINTS,
    APP_MESSAGES,
    CONTAINER_NODE_ID,
};
