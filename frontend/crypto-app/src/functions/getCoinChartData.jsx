import axios from "axios";

export const getCoinChartData = async (id, days) => {
  try {
    const res = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${id}/market_chart`,
      {
        params: {
          vs_currency: "usd",
          days: days,
        },
      }
    );

    return res.data.prices;
  } catch (err) {
    console.error("Error fetching chart data", err);
    return [];
  }
};
