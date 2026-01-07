import axios from "axios";

export async function getHistoricalData(id, days) {
  const res = await axios.get(
    `https://api.coingecko.com/api/v3/coins/${id}/market_chart`,
    {
      params: {
        vs_currency: "usd",
        days,
      },
    }
  );

  return res.data.prices.map((item) => ({
    date: new Date(item[0]).toLocaleDateString(),
    value: item[1],
  }));
}
