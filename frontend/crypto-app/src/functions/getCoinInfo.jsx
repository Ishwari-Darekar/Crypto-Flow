// functions/getCoinInfo.js
export async function getCoinInfo(coinId) {
  try {
    const res = await fetch(
      `https://api.coingecko.com/api/v3/coins/${coinId}`
    );
    const data = await res.json();

    // Ensure description is not empty
    const descriptionText = data.description?.en?.trim();
    if (!descriptionText) {
      data.description = {
        en: "Description not available for this coin."
      };
    }

    return data;
  } catch (err) {
    console.error("Error fetching coin info:", err);
    return {
      name: coinId,
      description: { en: "Description not available due to an error." }
    };
  }
}
