import axios from "axios";

export const getCoinPrices = async (id, days) => {
  try {
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}&interval=daily`,
      {
        params: {
          vs_currency: "usd",
          days,
          interval: "daily",
        },
      }
    );
    return response.data.prices;
  } catch (error) {
    console.error("Error fetching market chart:", error);
    return [];
  }
};
