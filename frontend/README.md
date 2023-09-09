## Following the steps below to install project on development
 - Copy `.env.example` to `.env`
```shell script
cp .env.example .env
```
 - Install dependencies from `package.json`
 ```shell script
yarn install
```
 - Build project for development
```shell script
yarn dev
```

 - Build project for production
```shell script
yarn build
```
 - Lint
```shell script
yarn run lint --fix
