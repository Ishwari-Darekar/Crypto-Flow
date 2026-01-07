import React, { useEffect, useState } from 'react'
import axios from "axios";
import Header from '../components/Common/Header';
import TabsComponent from '../components/Dashboard/Tabs';
import Search from '../components/Dashboard/Search';
import BackToTop from '../components/Common/BackToTop';
import { get100Coins } from '../functions/get100Coins';

function DashboardPage() {
    const [coins, setCoins]  = useState([]);
    const[search,setSearch] = useState("");

    const onSearchChange=(e)=>{
        setSearch(e.target.value);
    };

    var filteredCoins = 
        coins.filter((item) => 
            item.name.toLowerCase().includes(search.toLowerCase() ) ||
            item.symbol.toLowerCase().includes(search.toLowerCase()) );
        

    useEffect(()=>{
        getData();
        //fetch("https://pro-api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin&names=Bitcoin&symbols=btc&category=layer-1&price_change_percentage=1h");},[]);
        /*axios
            .get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin&names=Bitcoin&symbols=btc&category=layer-1&price_change_percentage=1h")
            .then((response) => {
                //code for handeling the responses
                console.log("RESPONSE>>>", response);
                setCoins(response.data);
            })
            .catch((error) => {
                //code for handeling the error
                console.log("ERROR>>>",error);
            });*/
    },[]);
 
    const getData = async ()=>{
        const myCoins = await get100Coins();
        if(myCoins){
            setCoins(myCoins);
            //setPaginatedCoin(myCoins.slice(0, 10));
            //setIsLoading(false);
        }
        
    }
    return (
        <div>
            <Header/>
            <BackToTop />
            <Search search={search} onSearchChange={onSearchChange}/>
            <TabsComponent coins={filteredCoins}/>

        </div>
    );
}

export default DashboardPage;