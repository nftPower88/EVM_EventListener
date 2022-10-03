# Deployment

1. Add env variables from .env
    * `PRIVATE_KEY` of your wallet
    * `RINKEBY_URL` from either alchemy or infuria
2. `npx hardhat compile`
3. `npx hardhat run ./scripts/deploy.ts --network rinkeby`
4.  Output should look like this
```
Token deployed to: 0xcf660669C9aAC47ff36AFAd6C5FB5dA0BBd05B89 (rinkeby)
```
5. type `npx hardhat verify --network rinkeby <ADDRESS> <ARGS-OF-CONTRACT>`

Token verified to: 