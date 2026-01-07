import React, { useEffect, useState } from "react";
import Header from "../components/Common/Header";
import SelectCoins from "../components/Compare/SelectCoin";
import CoinCompareCard from "../components/Compare/CoinCompareCard";
import CompareChart from "../components/Compare/CompareChart";

import { get100Coins } from "../functions/get100Coins";
import { getCoinChartData } from "../functions/getCoinChartData";
import { getCoinInfo } from "../functions/getCoinInfo";

function ComparePage() {
  const [crypto1, setCrypto1] = useState("bitcoin");
  const [crypto2, setCrypto2] = useState("ethereum");
  const [days, setDays] = useState(30);

  const [coins, setCoins] = useState([]);
  const [chartData1, setChartData1] = useState([]);
  const [chartData2, setChartData2] = useState([]);
  const [coinInfo1, setCoinInfo1] = useState(null);
  const [coinInfo2, setCoinInfo2] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load top 100 coins
  useEffect(() => {
    async function loadCoins() {
      const data = await get100Coins();
      setCoins(data || []);
      setLoading(false);
    }
    loadCoins();
  }, []);

  // Normalize chart data
  function normalizeData(data) {
    if (!data?.length) return [];
    const firstPrice = data[0][1];
    return data.map((item) => ({
      date: new Date(item[0]).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      value: ((item[1] - firstPrice) / firstPrice) * 100,
      price: item[1],
    }));
  }

  // Load chart data (coin info is optional now)
  useEffect(() => {
    async function loadCharts() {
      const [data1, data2] = await Promise.all([
        getCoinChartData(crypto1, days),
        getCoinChartData(crypto2, days),
      ]);

      setChartData1(normalizeData(data1));
      setChartData2(normalizeData(data2));
    }

    if (crypto1 && crypto2) loadCharts();
  }, [crypto1, crypto2, days]);

  const coin1 = coins.find((c) => c.id === crypto1);
  const coin2 = coins.find((c) => c.id === crypto2);

  function handleCoinChange(e, isSecond) {
    isSecond ? setCrypto2(e.target.value) : setCrypto1(e.target.value);
  }

  if (loading) return <p style={{ padding: "2rem" }}>Loading...</p>;

  return (
    <div style={{ padding: "1rem 2rem", maxWidth: "1400px", margin: "0 auto" }}>
      <Header />

      {/* Coin selectors */}
      <SelectCoins
        crypto1={crypto1}
        crypto2={crypto2}
        days={days}
        setDays={setDays}
        handleCoinChange={handleCoinChange}
        allCoins={coins}
      />

      {/* Compare cards */}
      <div
        style={{
          display: "flex",
          gap: "1rem",
          marginTop: "1.5rem",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {coin1 && <CoinCompareCard coin={coin1} />}
        {coin2 && <CoinCompareCard coin={coin2} />}
      </div>

      {/* Compare chart */}
      <div style={{ marginTop: "2rem" }}>
        <CompareChart
          key={`${crypto1}-${crypto2}-${days}`}
          data1={chartData1}
          data2={chartData2}
          label1={crypto1}
          label2={crypto2}
        />
      </div>
    </div>
  );
}

export default ComparePage;
