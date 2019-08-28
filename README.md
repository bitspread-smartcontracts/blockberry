<h1 align="center">Welcome to blockberry 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
</p>

> BlockBerry is BitSpread's implementation of ERC20 Tokens for its fund management business.  
## Contracts
> All solidity contracts are located in the directory /contracts.  
> Contracts are developed using much of the [OpenZeppelin](https://github.com/OpenZeppelin/) libraries.  
> BlockBerry.sol is the implementation of an ERC20 Token with the following additional functionalities:
> * Contract is ownable, where ownership can be transferred
> * Tokens are capped at a maximum amount
> * Tokens can be burned or minted by the owner
> * Addresses can be frozen or unfrozen by the owner
>
> The contracts BAEDT.sol, BLB.sol, BMCTT.sol, BWAGT.sol, CPUGT.sol, CPUST.sol, CPUTT.sol, JBART.sol, and MNLT.sol are direct inheritors of the BlockBerry.sol contract with no additional modifications.  
>
> Migrations.sol is soley used by the [Truffle](https://github.com/trufflesuite/truffle) development suite for deployment purposes.
### 🏠 [Homepage](https://blockberry.com)

## Install

```sh
npm install
```

## Run tests

```sh
npm run test 
npm run solidity-coverage
```

## Author

👤 **BlockBerry Team**

* Github: [@bitspread-smartcontracts](https://github.com/bitspread-smartcontracts)