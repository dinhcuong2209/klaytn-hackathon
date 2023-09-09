import path from 'path';
import head from './config/head';
import {
    APP_ENV,
    APP_NAME,
    APP_URL,
    HOST,
    PORT,
    API_URL,
    API_CURRENT_VERSION,
    // SENTRY_DSN,
    // GA_ID,
} from './config/env';

export default {
    ssr: false,

    srcDir: path.resolve(__dirname, 'src'),

    components: {
        dirs: ['~/components'],
    },

    build: {
        postcss: {
            plugins: {
            },
        },

        plugins: [
            // Enable if use laravel echo
            // new ProvidePlugin({
            //     io: 'socket.io-client',
            // }),
        ],
    },

    env: {
        APP_ENV,
        APP_NAME,
        APP_URL,
        API_URL,
        API_CURRENT_VERSION,
    },

    server: {
        host: HOST,
        port: PORT,
    },

    render: {
        http2: {
            push: true,
        },
    },

    head,

    plugins: [
        '@/plugins/nuxt-client-init', // Enable if use client side render
        // '@/plugins/js/bootstrap-select.min', // Enable if use client side render
        { src: '~/plugins/ethers.js', mode: 'client' },
    ],

    buildModules: [
        // '@nuxtjs/google-analytics', // Enable if use Google Analytics
    ],

    css: [
        '~/assets/css/bootstrap-checkbox.css',
        '~/assets/css/bootstrap-select.min.css',
        '~/assets/css/bootstrap-slider.min.css',
        '~/assets/css/bootstrap.min.css',
        '~/assets/css/bootstrap.offcanvas.min.css',
        '~/assets/css/core.css',
        '~/assets/css/featherlight.min.css',
        '~/assets/css/flexslider.css',
        '~/assets/css/font-awesome.min.css',
        '~/assets/css/jquery.scrolling-tabs.min.css',
        '~/assets/css/responsive.css',
        '~/assets/css/style.css',
    ],

    pwa: {
        meta: {
            title: 'hackathon',
            author: 'hackathon',
        },
        manifest: {
            name: 'hackathon',
            short_name: 'hackathon',
            lang: 'en',
            display: 'standalone',
            useWebmanifestExtension: false,
            theme_color: '#6E04D7',
        },
        workbox: {
            // enabled: true,
        },
    },

    modules: [
        'nuxt-i18n',
    ],

    i18n: {
        langDir: '~/locales/',
        locales: [
            { code: 'en', file: 'en.json' },
            // { code: 'vi', file: 'vi.json' },
            // { code: 'jp', file: 'jp.json' },
        ],
        strategy: 'no_prefix',
        defaultLocale: 'en',
        vueI18n: {
            fallbackLocale: 'en',
        },
    },

    axios: {
        browserBaseURL: API_URL,
    },

    loading: {
        color: '#409EFF',
        height: '3px',
    },

    // Enable if use Google Analytics
    // googleAnalytics: {
    //   id: GA_ID,
    //   debug: {
    //       sendHitTask: true,
    //   },
    // },

    // Enable if use Sentry
    // sentry: {
    //   dsn: SENTRY_DSN,
    //   config: {
    //       environment: APP_ENV,
    //   },
    // },
};
