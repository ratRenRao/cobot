"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Created by branric on 3/25/2018.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


require("isomorphic-fetch");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Cobot = function () {
    function Cobot() {
        _classCallCheck(this, Cobot);

        this.apiConnector = new ApiConnector();
    }

    _createClass(Cobot, [{
        key: "run",
        value: function run() {
            // this.apiConnector.getAllTradingPairs().then(response => console.log(JSON.stringify(response))).then(() => console.log("\n\n*************\n\n"));
            // this.apiConnector.getAllCurrencies().then(response => console.log(JSON.stringify(response))).then(() => console.log("\n\n*************\n\n"));
            // this.apiConnector.getOrderBook("BTC-USDT").then(response => console.log(JSON.stringify(response))).then(() => console.log("\n\n*************\n\n"));
            // this.apiConnector.getOrderBookPrecision("BTC-USDT").then(response => console.log(JSON.stringify(response))).then(() => console.log("\n\n*************\n\n"));
            // this.apiConnector.getTradingStatistics().then(response => console.log(JSON.stringify(response))).then(() => console.log("\n\n*************\n\n"));
            // this.apiConnector.getTicker("BTC-USDT").then(response => console.log(JSON.stringify(response))).then(() => console.log("\n\n*************\n\n"));
            // this.apiConnector.getRecentTrades("BTC-USDT").then(response => console.log(JSON.stringify(response))).then(() => console.log("\n\n*************\n\n"));
            this.apiConnector.getWalletBalances().then(function (response) {
                return console.log(JSON.stringify(response));
            }).then(function () {
                return console.log("\n\n*************\n\n");
            });
        }
    }]);

    return Cobot;
}();

var ApiConnector = function () {
    function ApiConnector() {
        _classCallCheck(this, ApiConnector);

        var apiBaseUrl = "http://api.cobinhood.com";
        this.getAllCurrenciesUrl = apiBaseUrl + "/v1/market/currencies";
        this.getAllTradingPairsUrl = apiBaseUrl + "/v1/market/trading_pairs";
        this.getOrderBookBaseUrl = apiBaseUrl + "/v1/market/orderbooks";
        this.getOrderBookPrecisionBaseUrl = apiBaseUrl + "/v1/market/orderbook/precisions";
        this.getTradingStatisticsUrl = apiBaseUrl + "/v1/market/stats";
        this.getTickerBaseUrl = apiBaseUrl + "/v1/market/tickers";
        this.getRecentTradesBaseUrl = apiBaseUrl + "/v1/market/trades";
        this.getWalletBalancesUrl = apiBaseUrl + "/v1/wallet/balances";

        this.apiKey = null;
        var fs = require('fs');
        var path = require('path');
        this.apiKey = fs.readFile(path.join(__dirname, '../.key'), 'utf8', function (err, keyData) {
            if (err) throw err;
        });

        while (!this.apiKey) {}

        this.authenticatedGetHeader = {
            method: 'GET',
            authorization: this.apiKey
        };

        this.unauthenticatedGetHeader = { method: 'GET' };
    }

    _createClass(ApiConnector, [{
        key: "getAllCurrencies",
        value: function getAllCurrencies() {
            return this.sendRequest(this.getAllCurrenciesUrl, this.unauthenticatedGetHeader);
        }
    }, {
        key: "getAllTradingPairs",
        value: function getAllTradingPairs() {
            return this.sendRequest(this.getAllTradingPairsUrl, this.unauthenticatedGetHeader);
        }
    }, {
        key: "getTradingStatistics",
        value: function getTradingStatistics() {
            return this.sendRequest(this.getTradingStatisticsUrl, this.unauthenticatedGetHeader);
        }
    }, {
        key: "getOrderBook",
        value: function getOrderBook(tradingPair) {
            return this.sendRequest(this.getOrderBookBaseUrl + "/" + tradingPair, this.unauthenticatedGetHeader);
        }
    }, {
        key: "getOrderBookPrecision",
        value: function getOrderBookPrecision(tradingPair) {
            return this.sendRequest(this.getOrderBookPrecisionBaseUrl + "/" + tradingPair, this.unauthenticatedGetHeader);
        }
    }, {
        key: "getTicker",
        value: function getTicker(tradingPair) {
            return this.sendRequest(this.getTickerBaseUrl + "/" + tradingPair, this.unauthenticatedGetHeader);
        }
    }, {
        key: "getRecentTrades",
        value: function getRecentTrades(tradingPair) {
            return this.sendRequest(this.getRecentTradesBaseUrl + "/" + tradingPair, this.unauthenticatedGetHeader);
        }
    }, {
        key: "getWalletBalances",
        value: function getWalletBalances() {
            return this.sendRequest("" + this.getWalletBalancesUrl, this.authenticatedGetHeader);
        }
    }, {
        key: "sendRequest",
        value: function sendRequest(requestUrl, header) {
            return fetch(requestUrl, header).then(function (response) {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error(result.status + " - " + result.statusText);
                }
            });
        }
    }]);

    return ApiConnector;
}();

new Cobot().run();
