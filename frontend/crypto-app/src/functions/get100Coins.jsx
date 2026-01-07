import axios from "axios";

export const get100Coins = () => {
    const myCoins = axios
        .get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin&names=Bitcoin&symbols=btc&category=layer-1&price_change_percentage=1h")
        .then((response) => {
            //code for handeling the responses
            console.log("RESPONSE>>>", response);
            return response.data;
            
        })
        .catch((error) => {
            //code for handeling the error
            console.log("ERROR>>>",error);
        });
    return myCoins;

}