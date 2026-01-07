import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Common/Header";

// Icons
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import TrendingDownRoundedIcon from "@mui/icons-material/TrendingDownRounded";

// Chart
import LineChart from "../components/Coin/LineChart";

// Helpers
import { coinObject } from "../functions/convertObject";
import { getCoinData } from "../functions/getCoinData";
import { getCoinPrices } from "../functions/getCoinPrices";

function CoinPage() {
  const { id } = useParams();

  const [coinData, setCoinData] = useState(null);
  const [readMore, setReadMore] = useState(false);
  const [days, setDays] = useState(30);
  const [prices, setPrices] = useState([]);

  useEffect(() => {
    if (id) {
      getData();
    }
  }, [id, days]);

  async function getData() {
    try {
      const data = await getCoinData(id);
      if (!data) return;
      coinObject(setCoinData, data);

      const priceData = await getCoinPrices(id, days);
      if (priceData && priceData.length > 0) {
        setPrices(priceData);
      }
    } catch (error) {
      console.error("Coin page error:", error);
    }
  }

  if (!coinData) {
    return (
      <div>
        <Header />
        <p className="coinpage-loading-text">Loading coin data...</p>
      </div>
    );
  }

  /* ===== CHART DATA ===== */
  const chartData = {
    labels: prices.map((price) =>
      new Date(price[0]).toLocaleDateString()
    ),
    datasets: [
      {
        label: `${coinData.name} Price`,
        data: prices.map((price) => price[1]),
        borderColor: "#3a80e9",
        borderWidth: 2,
        fill: true,
        tension: 0.3,
        backgroundColor: "rgba(58, 128, 233, 0.1)",
        pointRadius: 0,
      },
    ],
  };

  /* ===== DESCRIPTION TEXT ===== */
  const plainText = coinData.desc.replace(/<[^>]+>/g, "");
  const shortText = plainText.slice(0, 200);

  return (
    <div>
      <Header />

      {/* ===== TOP COIN INFO ===== */}
      <div className="coinpage-grey-wrapper">
        <div className="coinpage-row">
          <img
            src={coinData.image}
            alt={coinData.name}
            className="coinpage-coin-image"
          />

          <div className="coinpage-name-section">
            <h3 className="coinpage-symbol">
              {coinData.symbol.toUpperCase()}
            </h3>
            <p className="coinpage-name">{coinData.name}</p>
          </div>

          <div
            className={
              coinData.price_change_percentage_24h >= 0
                ? "coinpage-change positive"
                : "coinpage-change negative"
            }
          >
            {coinData.price_change_percentage_24h.toFixed(2)}%
          </div>

          <div
            className={
              coinData.price_change_percentage_24h >= 0
                ? "coinpage-trend positive"
                : "coinpage-trend negative"
            }
          >
            {coinData.price_change_percentage_24h >= 0 ? (
              <TrendingUpRoundedIcon />
            ) : (
              <TrendingDownRoundedIcon />
            )}
          </div>

          <div className="coinpage-price">
            ${coinData.current_price.toLocaleString()}
          </div>

          <div className="coinpage-marketcap">
            ${coinData.market_cap.toLocaleString()}
          </div>

          <div className="coinpage-volume">
            ${coinData.total_volume.toLocaleString()}
          </div>
        </div>
      </div>

      {/* ===== CHART (ABOVE OVERVIEW) ===== */}
      {prices.length > 0 && (
        <div className="coinpage-chart-box">
          <h3 className="coinpage-chart-title">
            {coinData.name} Price Chart (Last {days} Days)
          </h3>

          {/* ===== DAYS SELECT DROPDOWN ===== */}
          <div style={{ marginBottom: "1rem" }}>
            <label htmlFor="days-select" style={{ marginRight: "0.5rem" }}>
              Select Days:
            </label>
            <select
              id="days-select"
              value={days}
              onChange={(e) => setDays(Number(e.target.value))}
              style={{
                padding: "0.3rem 0.6rem",
                borderRadius: "0.5rem",
                border: "1px solid #444",
                background: "#121212",
                color: "#e0e0e0",
              }}
            >
              <option value={7}>7 Days</option>
              
              <option value={30}>30 Days</option>
              <option value={90}>90 Days</option>
              
              <option value={365}>1 Year</option>
            </select>
          </div>

          <div className="coinpage-chart-wrapper">
            <LineChart
              chartData={chartData}
              priceType="prices"
              multiAxis={false}
            />
          </div>
        </div>
      )}

      {/* ===== OVERVIEW (AFTER CHART) ===== */}
      <div className="coinpage-description-wrapper">
        <h3>{coinData.name} Overview</h3>
        <p>
          {readMore ? (
            <>
              <span
                dangerouslySetInnerHTML={{ __html: coinData.desc }}
              />{" "}
              <span
                className="coinpage-readmore"
                onClick={() => setReadMore(false)}
              >
                Read Less
              </span>
            </>
          ) : (
            <>
              {shortText}{" "}
              <span
                className="coinpage-readmore"
                onClick={() => setReadMore(true)}
              >
                Read More..
              </span>
            </>
          )}
        </p>
      </div>
    </div>
  );
}

export default CoinPage;
