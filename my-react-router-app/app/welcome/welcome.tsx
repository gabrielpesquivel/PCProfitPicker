import { useState, useEffect } from "react";
import { fetchDeals } from "../utils/api";
import "./welcome.css";

interface Component {
  title: string;
  price: number;
  image_url: string;
  product_url: string;
}

interface DealData {
  title: string;
  price: string;
  image_url: string;
  product_url: string;
  profit: number;
  components: Record<string, Component>;
}

export function Welcome() {
  const [budget, setBudget] = useState("");
  const [dealData, setDealData] = useState<DealData | null>(null);
  const [openDealIndex, setOpenDealIndex] = useState<boolean>(false);

  const handleFindDeals = async () => {
    try {
      const fetchedData: DealData = await fetchDeals(budget);
      setDealData(fetchedData);
    } catch (error) {
      console.error("Error fetching deal data:", error);
    }
  };

  const toggleDropdown = () => {
    setOpenDealIndex(!openDealIndex);
  };

  return (
    <div className="welcome-container">
      <h1 className="welcome-title">Welcome to PC Part Flipper!</h1>

      <div className="input-button-wrapper">
        <input
          type="number"
          placeholder="Highest Price (USD)"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          className="input"
        />
        <button className="button" onClick={handleFindDeals}>
          Find Deals
        </button>
      </div>

      {dealData ? (
        <div className="deals-container">
          <div className="deal-item">
            <div className="left-deal-items">
              <div className="deal-image-container">
                <img
                  src={dealData.image_url}
                  alt={dealData.title}
                  className="deal-image"
                />
              </div>

              <div className="deal-price-container">
                <p className="deal-profit">Est Profit: ${dealData.profit.toFixed(2)}</p>
                <p className="deal-price">Price: ${dealData.price}</p>
              </div>
            </div>

            <div className="right-deal-items">
              <div className="deal-info">
                <p className="deal-title">
                  <button
                    className="deal-button"
                    onClick={() => window.open(dealData.product_url, "_blank", "noopener,noreferrer")}
                  >
                    Buy Now
                  </button>
                </p>
              </div>

              <div className="deal-dropdown">
                <button className="dropdown-button" onClick={toggleDropdown}>
                  Details
                </button>
              </div>
            </div>

            {openDealIndex && (
              <div className="dropdown-content">
                {Object.entries(dealData.components).map(([key, component]) => (
                  <div key={key} className="dropdown-item">
                    <img src={component.image_url} alt={component.title} className="dropdown-image" />
                    <p className="dropdown-title">{component.title}</p>
                    <p className="dropdown-price">Price: ${component.price}</p>
                    <button
                      className="dropdown-button"
                      onClick={() => window.open(component.product_url, "_blank", "noopener,noreferrer")}
                    >
                      View {key.replace("-", " ").toUpperCase()}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : (
        <p>No deals found. Enter a budget and click "Find Deals".</p>
      )}
    </div>
  );
}

export default Welcome;