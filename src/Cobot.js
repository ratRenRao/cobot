/**
 * Created by branric on 3/25/2018.
 */
//require("babel-register");
require("babel-core");

class Cobot {

}

class ApiConnector {

    const apiBaseUrl = () => "https://api.cobinhood.com";
    const getAllCurrenciesUrl = () => `${apiBaseUrl}/v1/market/currencies`;
    const getAllTradingPairs = () => `${apiBaseUrl}/v1/market/trading_pairs`;

    GetAllCurrencies = () => {
    };

    GetAllTradingPairs = () => {
        console.log("Working");
        console.log(this.SendRequest(this.getAllTradingPairs));
    };

    SendRequest = (requestUrl) => {
       return fetch(requestUrl)
           .then(response => {
               return response.json();
           });
    }
}

let test = new ApiConnector();
test.GetAllTradingPairs();

