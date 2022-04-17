//https://eth-ropsten.alchemyapi.io/v2/R03AQilEz06n7IxsfI8bm1g5LcKWuAJH

require('@nomiclabs/hardhat-waffle');

module.exports = {
  solidity: '0.8.4',
  networks: {
    ropsten: {
      url: 'https://eth-ropsten.alchemyapi.io/v2/R03AQilEz06n7IxsfI8bm1g5LcKWuAJH',
      accounts: ['918ab7f45869c1503108912a9d60ad83a948b4b190768a06401257155abf62a4']
    }
  }
}