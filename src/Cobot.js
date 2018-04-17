/**
 * Created by branric on 3/25/2018.
 */
import "isomorphic-fetch";

class Cobot {
    constructor() {
        this.apiConnector = new ApiConnector();
    }

    run(){
        // this.apiConnector.getAllTradingPairs().then(response => console.log(JSON.stringify(response))).then(() => console.log("\n\n*************\n\n"));
        // this.apiConnector.getAllCurrencies().then(response => console.log(JSON.stringify(response))).then(() => console.log("\n\n*************\n\n"));
        // this.apiConnector.getOrderBook("BTC-USDT").then(response => console.log(JSON.stringify(response))).then(() => console.log("\n\n*************\n\n"));
        // this.apiConnector.getOrderBookPrecision("BTC-USDT").then(response => console.log(JSON.stringify(response))).then(() => console.log("\n\n*************\n\n"));
        // this.apiConnector.getTradingStatistics().then(response => console.log(JSON.stringify(response))).then(() => console.log("\n\n*************\n\n"));
        // this.apiConnector.getTicker("BTC-USDT").then(response => console.log(JSON.stringify(response))).then(() => console.log("\n\n*************\n\n"));
        // this.apiConnector.getRecentTrades("BTC-USDT").then(response => console.log(JSON.stringify(response))).then(() => console.log("\n\n*************\n\n"));
        this.apiConnector.getWalletBalances().then(response => console.log(JSON.stringify(response))).then(() => console.log("\n\n*************\n\n"));

    }
}

class ApiConnector {
    constructor() {
        let apiBaseUrl = "http://api.cobinhood.com";
        this.getAllCurrenciesUrl = `${apiBaseUrl}/v1/market/currencies`;
        this.getAllTradingPairsUrl = `${apiBaseUrl}/v1/market/trading_pairs`;
        this.getOrderBookBaseUrl = `${apiBaseUrl}/v1/market/orderbooks`;
        this.getOrderBookPrecisionBaseUrl = `${apiBaseUrl}/v1/market/orderbook/precisions`;
        this.getTradingStatisticsUrl = `${apiBaseUrl}/v1/market/stats`;
        this.getTickerBaseUrl = `${apiBaseUrl}/v1/market/tickers`;
        this.getRecentTradesBaseUrl = `${apiBaseUrl}/v1/market/trades`;
        this.getWalletBalancesUrl = `${apiBaseUrl}/v1/wallet/balances`;

        this.apiKey = null;
        let fs = require('fs');
        let path = require('path');
        this.apiKey = fs.readFile(path.join(__dirname, '../.key'),  'utf8', (err, keyData) => {
            if(err) throw err;
        });

        while(!this.apiKey){}

        this.authenticatedGetHeader = {
            method: 'GET',
            authorization: this.apiKey
        };

        this.unauthenticatedGetHeader = {method: 'GET'};
    }

    getAllCurrencies() {
        return this.sendRequest(this.getAllCurrenciesUrl, this.unauthenticatedGetHeader);
    };

    getAllTradingPairs() {
        return this.sendRequest(this.getAllTradingPairsUrl, this.unauthenticatedGetHeader);
    };

    getTradingStatistics() {
        return this.sendRequest(this.getTradingStatisticsUrl, this.unauthenticatedGetHeader);
    }

    getOrderBook(tradingPair) {
        return this.sendRequest(`${this.getOrderBookBaseUrl}/${tradingPair}`, this.unauthenticatedGetHeader);
    }

    getOrderBookPrecision(tradingPair) {
        return this.sendRequest(`${this.getOrderBookPrecisionBaseUrl}/${tradingPair}`, this.unauthenticatedGetHeader);
    }

    getTicker(tradingPair) {
        return this.sendRequest(`${this.getTickerBaseUrl}/${tradingPair}`, this.unauthenticatedGetHeader);
    }

    getRecentTrades(tradingPair) {
        return this.sendRequest(`${this.getRecentTradesBaseUrl}/${tradingPair}`, this.unauthenticatedGetHeader);
    }

    getWalletBalances(){
        return this.sendRequest(`${this.getWalletBalancesUrl}`, this.authenticatedGetHeader);
    }

    sendRequest(requestUrl, header) {
       return fetch(requestUrl, header)
           .then(response => {
               if(response.ok) {
                   return response.json();
               }
               else {
                   throw new Error(`${result.status} - ${result.statusText}`);
               }
           });
    }
}

new Cobot().run();
