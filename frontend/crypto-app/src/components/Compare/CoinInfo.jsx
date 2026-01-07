import React from "react";

function CoinInfo({ coin }) {
  if (!coin) return null;

  return (
    <div
      style={{
        backgroundColor: "#1a1a1a",
        padding: "1rem",
        borderRadius: "8px",
        width: "250px",
        color: "#fff",
      }}
    >
      <h3>{coin.name}</h3>
      <p>
        Price: ${coin.current_price ? coin.current_price.toFixed(2) : "N/A"}
      </p>
      <p>
        Market Cap: ${coin.market_cap ? coin.market_cap.toFixed(2) : "N/A"}
      </p>
      <p>
        Volume: ${coin.total_volume ? coin.total_volume.toFixed(2) : "N/A"}
      </p>
      <p>
        Rank: {coin.market_cap_rank || "N/A"}
      </p>
    </div>
  );
}

export default CoinInfo;
