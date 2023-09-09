import { APP_NAME } from './env';

export default {
    title: APP_NAME || '',
    meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no' },
    ],
    link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.svg' },
        {
            rel: 'stylesheet',
            href: 'https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap',
        },
        {
            rel: 'stylesheet',
            href: 'https://fonts.googleapis.com/icon?family=Material+Icons',
        },
        {
            rel: 'stylesheet',
            href: 'https://unpkg.com/element-ui/lib/theme-chalk/index.css',
        },
        {
            rel: 'stylesheet',
            href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css',
        },
    ],
};
