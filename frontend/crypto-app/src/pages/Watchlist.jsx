import React, { useEffect, useState } from "react";
import CoinCompareCard from "../components/Compare/CoinCompareCard";
import Header from "../components/Common/Header";

function Watchlist() {
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("watchlist")) || [];
    setWatchlist(saved);
  }, []);

  if (!watchlist.length) {
    return (
      <>
        <Header />
        <h2 style={{ textAlign: "center", marginTop: "3rem" }}>
          No coins in watchlist ⭐
        </h2>
      </>
    );
  }

  return (
    <>
      {/* Header stays full width */}
      <Header />

      {/* Page content */}
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Title */}
        <h2
          style={{
            margin: "1.5rem 0 2rem",
            textAlign: "center",
            fontWeight: 600,
          }}
        >
          Your Watchlist ⭐
        </h2>

        {/* Cards container */}
        <div
          style={{
            width: "100%",
            maxWidth: "1200px",
            padding: "0 1rem",
            boxSizing: "border-box",
          }}
        >
          {watchlist.map((coin) => (
            <CoinCompareCard key={coin.id} coin={coin} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Watchlist;
