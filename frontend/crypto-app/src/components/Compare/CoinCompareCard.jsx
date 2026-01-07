import React, { useEffect, useState } from "react";
import Tooltip from "@mui/material/Tooltip";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import TrendingDownRoundedIcon from "@mui/icons-material/TrendingDownRounded";
import "./coinCompareCard.css";

function CoinCompareCard({ coin }) {
  if (!coin?.id) return null;

  const profit = coin.price_change_percentage_24h >= 0;
  const [isFav, setIsFav] = useState(false);

  // Check if coin already in watchlist
  useEffect(() => {
    const watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
    setIsFav(watchlist.some((c) => c.id === coin.id));
  }, [coin.id]);

  // ⭐ Toggle favorite
  const toggleFavorite = () => {
    let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];

    if (watchlist.some((c) => c.id === coin.id)) {
      watchlist = watchlist.filter((c) => c.id !== coin.id);
      setIsFav(false);
    } else {
      watchlist.push(coin); // ✅ save FULL coin object
      setIsFav(true);
    }

    localStorage.setItem("watchlist", JSON.stringify(watchlist));
  };

  return (
    <div className="compare-card">
      {/* Coin Info */}
      <div className="coin-info">
        <img src={coin.image} alt={coin.name} />
        <div>
          <div className="symbol">{coin.symbol.toUpperCase()}</div>
          <div className="name">{coin.name}</div>
        </div>
      </div>

      {/* 24h Change */}
      <div className={`percent ${profit ? "green" : "red"}`}>
        {coin.price_change_percentage_24h?.toFixed(2)}%
      </div>

      {/* Price */}
      <div className="price">
        <div className={`trend-circle ${profit ? "green" : "red"}`}>
          {profit ? (
            <TrendingUpRoundedIcon fontSize="small" />
          ) : (
            <TrendingDownRoundedIcon fontSize="small" />
          )}
        </div>
        ${coin.current_price.toLocaleString()}
      </div>

      {/* Volume */}
      <Tooltip title="Total trading volume in last 24h" arrow>
        <span>${coin.total_volume.toLocaleString()}</span>
      </Tooltip>

      {/* Market Cap */}
      <Tooltip title="Market Capitalization" arrow>
        <span>${coin.market_cap.toLocaleString()}</span>
      </Tooltip>

      {/* ⭐ Favorite */}
      <Tooltip title={isFav ? "Remove from Watchlist" : "Add to Watchlist"} arrow>
        <div
          className={`star ${isFav ? "active" : ""}`}
          onClick={toggleFavorite}
        >
          ★
        </div>
      </Tooltip>
    </div>
  );
}

export default CoinCompareCard;
