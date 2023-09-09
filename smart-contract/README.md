# Smart Contract

## Getting started

1. Init .env
```
cp .env.example .env
```
2. [Get private key](https://support.metamask.io/hc/en-us/articles/360015289632-How-to-export-an-account-s-private-key) 
3. [Get api key](https://docs.bscscan.com/getting-started/viewing-api-usage-statistics)
4. Install node_modules
```
yarn -i
```

## Complie
```
npx hardhat compile
```

## Deploy
```
npx hardhat run --network klaytnTestnet scripts/deploy.js
```

## Verify
```
npx hardhat verify --network klaytnTestnet [contract address]
```