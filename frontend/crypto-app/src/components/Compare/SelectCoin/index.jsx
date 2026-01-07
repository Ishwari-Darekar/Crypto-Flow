import React from "react";

function SelectCoins({
  crypto1,
  crypto2,
  days,
  setDays,
  handleCoinChange,
  allCoins,
}) {
  return (
    <div
      style={{
        display: "flex",
        gap: "1.5rem",
        alignItems: "center",
        marginTop: "1rem",
        flexWrap: "wrap",
      }}
    >
      {/* Coin 1 */}
      <div>
        <label style={{ color: "#fff", marginRight: "0.5rem" }}>
          Coin 1:
        </label>
        <select
          value={crypto1}
          onChange={(e) => handleCoinChange(e, false)}
          style={selectStyle}
        >
          {allCoins.map((coin) => (
            <option key={coin.id} value={coin.id}>
              {coin.name}
            </option>
          ))}
        </select>
      </div>

      {/* Coin 2 */}
      <div>
        <label style={{ color: "#fff", marginRight: "0.5rem" }}>
          Coin 2:
        </label>
        <select
          value={crypto2}
          onChange={(e) => handleCoinChange(e, true)}
          style={selectStyle}
        >
          {allCoins.map((coin) => (
            <option key={coin.id} value={coin.id}>
              {coin.name}
            </option>
          ))}
        </select>
      </div>

      {/* Days selector (ONLY 7, 30, 90, 1Y) */}
      <div>
        <label style={{ color: "#fff", marginRight: "0.5rem" }}>
          Days:
        </label>
        <select
          value={days}
          onChange={(e) => setDays(Number(e.target.value))}
          style={selectStyle}
        >
          <option value={7}>7 Days</option>
          <option value={30}>30 Days</option>
          <option value={90}>90 Days</option>
          <option value={365}>1 Year</option>
        </select>
      </div>
    </div>
  );
}

const selectStyle = {
  padding: "0.45rem 0.7rem",
  borderRadius: "6px",
  background: "#111",
  color: "#fff",
  border: "1px solid #333",
};

export default SelectCoins;
