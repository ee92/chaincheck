const request = require('request');

var btc;
var ltc;
var usd;
var rank;
var lite;
var bit;
var coins = 1;

function priceCheck(coins){
  request({
    url: 'https://www.cryptopia.co.nz/api/GetMarket/2186',
    json: true,
  }, (error, response, body) => {
    if (!error){
      btc = (body.Data.LastPrice * coins)
    }
  });
  request({
    url: 'https://www.cryptopia.co.nz/api/GetMarket/2188',
    json: true,
  }, (error, response, body) => {
    if (!error){
      ltc = (body.Data.LastPrice * coins)
    }
  });
  request({
    url: 'https://api.coinmarketcap.com/v1/ticker/chaincoin/',
    json: true,
  }, (error, response, body) => {
    if (!error){
      usd = (body[0].price_usd * coins)
      rank = ("# " + body[0].rank + " on CoinMarketCap")
    }
  });
  request({
    url: 'https://api.coinmarketcap.com/v1/ticker/litecoin/',
    json: true,
  }, (error, response, body) => {
    if (!error){
      lite = (body[0].price_usd)
    }
  });
  request({
    url: 'https://api.coinmarketcap.com/v1/ticker/bitcoin/',
    json: true,
  }, (error, response, body) => {
    if (!error){
      bit = (body[0].price_usd)
    }
  });
  if (btc && ltc && usd && rank && lite && bit){
    return {
      rank,
      btc,
      ltc,
      usd,
      lite: (lite * ltc).toFixed(2),
      bit: (bit * btc).toFixed(2)
    };
  }
}

setInterval(() => {
  console.log(priceCheck(coins));
}, 10000);
