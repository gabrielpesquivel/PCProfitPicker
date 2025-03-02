import { useState } from "react";
import { fetchDeals } from "../utils/api"; // Adjust the import path as needed
import "./welcome.css";

interface Listing {
  image_url: string;
  title: string;
  product_url: string;
  price: number;
  profit: number;
}

export function Welcome() {
  const [budget, setBudget] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [deals, setDeals] = useState<Listing[]>([]);

  const handleFindDeals = async () => {
    try {
      const fetchedDeals = await fetchDeals(budget, zipCode);
      setDeals(fetchedDeals.listings);
    } catch (error) {
      console.error("Error fetching deals:", error);
    }
  };

  return (
    <div className="welcome-container">
      <h1 className="welcome-title">Welcome to PC Part Flipper!</h1>

      {/* Budget Input */}
      <input
        type="number"
        placeholder="Enter your budget ($)"
        value={budget}
        onChange={(e) => setBudget(e.target.value)}
        className="input"
      />

      {/* ZIP Code Input */}
      <input
        type="text"
        placeholder="Enter your ZIP code"
        value={zipCode}
        onChange={(e) => setZipCode(e.target.value)}
        className="input"
      />

      {/* Submit Button */}
      <button className="button" onClick={handleFindDeals}>
        Find Deals
      </button>

      {/* Display Deals */}
      <div className="deals-container">
        {deals.map((deal, index) => (
          <div key={index} className="deal-item">
            {/* 1st Div: Image */}
            <div className="deal-image-container">
              <img
                src={deal.image_url}
                alt={deal.title}
                className="deal-image"
              />
            </div>

            {/* 2nd Div: Item Details */}
            <div className="deal-info">
              <p className="deal-title">
                <a
                  href={deal.product_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {deal.title}
                </a>
              </p>
            </div>

            {/* 3rd Div: Price & Profit */}
            <div className="deal-price-container">
              <p className="deal-price">Price: ${deal.price}</p>
              <p className="deal-profit">Profit: ${deal.profit}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Welcome;
