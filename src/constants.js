const URL_REGEXES = {
    MUSIC_API: /music\.yandex\.ru\/api\//,
    NEW_TRACK_START: /(\/handlers\/)(.*)(\/start\?__t=)/,
};

const ENDPOINTS = {
    TRACK: 'https://music.yandex.ru/handlers/track.jsx?track={trackId}',
};

const APP_MESSAGES = {
    BASE_STYLE: {
        display: 'table',
        margin: '50% auto 0 auto',
        fontSize: '1.5em',
        color: 'inherit',
    },
    GREETING: {
        VALUE: '｡◕‿◕｡',
        STYLE: {
            color: 'green',
        },
    },
    LYRICS_NOT_AVAILABLE: {
        VALUE: '（>﹏<）',
        STYLE: {
            color: 'rgb(255, 219, 77)',
        },
    },
};

const DEFAULT_STYLE_PARAMS = {
    FONT_SIZE: '15',
    VERSE_BREAK_HEIGHT: '12.5',
    RND_WIDTH: 360,
    RND_HEIGHT: 640,
    RND_MIN_WIDTH: '200',
    RND_MIN_HEIGHT: '355',
    SCROLL_BLUR_HEIGHT: '25.5',
};

const CONTAINER_RATIOS = {
    FONT_RATIO: 20,
    VERSE_BREAK_RATIO: 28.8,
    SCROLL_BLUR_RATIO: 14.1,
};

const CONTAINER_NODE_ID = 'root:better_lyrics';

export {
    URL_REGEXES,
    ENDPOINTS,
    APP_MESSAGES,
    CONTAINER_NODE_ID,
    CONTAINER_RATIOS,
    DEFAULT_STYLE_PARAMS,
};
