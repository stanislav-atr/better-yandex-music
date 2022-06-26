const URL_REGEXES = {
    MUSIC_API: /music\.yandex\.ru\/api\//,
    NEW_TRACK_START: /(\/handlers\/)(.*)(\/start\?__t=)/,
};

const ENDPOINTS = {
    TRACK: 'https://music.yandex.ru/handlers/track.jsx?track={trackId}',
};

const LYRICS_STUB = 'DEFAULT GREETING TEXT';
const CONTAINER_NODE_ID = 'root:better_lyrics';

export {
    URL_REGEXES,
    ENDPOINTS,
    LYRICS_STUB,
    CONTAINER_NODE_ID,
};
