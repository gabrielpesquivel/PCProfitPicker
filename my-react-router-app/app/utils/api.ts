import axios from "axios";

const API_BASE_URL = "http://10.203.139.170:8000/scrapers/flips_test/"; // Fixed formatting

export const fetchDeals = async (budget: string, zipCode: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}`, {
      params: { budget, zipCode }, // Send parameters as query params
    });

    return response.data; // Expected to return { listings: [...] }
  } catch (error) {
    console.error("Error fetching deals:", error);
    throw new Error("Failed to fetch deals. Please try again.");
  }
};
