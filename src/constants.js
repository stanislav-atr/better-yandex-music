const URL_REGEXES = {
    MUSIC_API: /music\.yandex\.ru\/api\//,
    NEW_TRACK_START: /(\/handlers\/)(.*)(\/start\?__t=)/,
};

const ENDPOINTS = {
    TRACK: 'https://music.yandex.ru/handlers/track.jsx?track={trackId}',
};

const STYLES = {
    fontToSizeRatio: 24,
};

const LYRICS_STUB = 'DEFAULT GREETING TEXT';
const CONTAINER_NODE_ID = 'root:better-lyrics';

export {
    URL_REGEXES,
    ENDPOINTS,
    STYLES,
    LYRICS_STUB,
    CONTAINER_NODE_ID,
};
