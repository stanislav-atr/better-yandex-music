const URL_REGEXES = {
    MUSIC_API: /music\.yandex\.ru\/api\//,
    NEW_TRACK_START: /(\/handlers\/)(.*)(\/start\?__t=)/,
};

const ENDPOINTS = {
    TRACK: 'https://music.yandex.ru/handlers/track.jsx?track={trackId}',
};

export {
    URL_REGEXES,
    ENDPOINTS,
};
