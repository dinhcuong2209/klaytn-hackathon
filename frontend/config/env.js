import {
    cleanEnv,
    str,
    url,
    host,
    port,
} from 'envalid';

const validEnv = cleanEnv(process.env, {
    APP_ENV: str({
        devDefault: 'local',
        desc: 'Application environment',
    }),
    APP_URL: url({
        default: 'http://localhost',
        desc: 'Default application url',
    }),
    APP_NAME: str({
        default: 'Hackathon',
        desc: 'Application name',
    }),
    HOST: host({
        default: '0.0.0.0',
        desc: 'Application host',
    }),
    PORT: port({
        default: 3000,
        desc: 'Application post',
    }),
    SENTRY_DSN: str({
        default: '',
        desc: 'Sentry DSN for logging error',
    }),
    API_URL: str({
        default: '/api',
        desc: 'API rewrite entry point',
    }),
    API_CURRENT_VERSION: str({
        default: 'v1',
        desc: 'API version',
    }),
    GA_ID: str({
        default: '',
        desc: 'Google Analytic ID',
    }),
    GOOGLE_MAP_API_KEY: str({
        default: '',
        desc: 'Google map api key',
    }),
});

export const {
    APP_ENV,
    APP_URL,
    APP_NAME,
    HOST,
    PORT,
    SENTRY_DSN,
    API_URL,
    API_CURRENT_VERSION,
} = validEnv;
