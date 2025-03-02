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

const placeholderImage = "https://cdn.discordapp.com/attachments/755242650684096612/1345750289373986936/IMG_3941.png?ex=67c5af1f&is=67c45d9f&hm=45eab3427fca9896d05f15850e7df4a37af40b4d08ff05b17f97c5505c004aa3&";
const placeholderLink = "https://getcoxed.org/";
const placeholderPrice = 10000;

export function Welcome() {
  const [budget, setBudget] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [isBudgetFocused, setIsBudgetFocused] = useState(false);
  const [isZipCodeFocused, setIsZipCodeFocused] = useState(false);
  const [deals, setDeals] = useState<Listing[]>([]);
  const [openDealIndex, setOpenDealIndex] = useState<number | null>(null);

  const toggleDropdown = (index: number) => {
    setOpenDealIndex(openDealIndex === index ? null : index);
  };

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

      <style>
        {`
          .input::placeholder {
            color: var(--clr-muted);
            opacity: 1;
          }
        `}
      </style>

      <div className="input-button-wrapper">

         {/* Budget Input */}
       <input
        type="number"
        placeholder={isBudgetFocused ? "" : "Highest Price (USD)"}
        value={budget}
        onChange={(e) => setBudget(e.target.value)}
        className={`input ${isBudgetFocused ? "input-focused" : ""}`}
        onFocus={() => setIsBudgetFocused(true)}
        onBlur={() => setIsBudgetFocused(budget !== "")}
      />

      {/* Submit Button */}
      <button className="button" onClick={handleFindDeals}>
        Find Deals
      </button>

      </div>

      {/* Display Deals */}
      <div className="deals-container">
        {deals.map((deal, index) => (
          <div key={index} className="deal-item">
            <div className="left-deal-items">
              {/* 1st Div: Image */}
              <div className="deal-image-container">
                <img
                  src={deal.image_url}
                  alt={deal.title}
                  className="deal-image"
                />
              </div>

            {/* 2nd Div: Price & Profit */}
            <div className="deal-price-container">
                <p className="deal-profit">Est Profit: ${deal.profit}</p>
                <p className="deal-price">Price: ${deal.price}</p>
              </div>
            </div>

          {/* 3rd Div: Item Details */}
          <div className="right-deal-items">
            <div className="deal-info">
              <p className="deal-title">
                <button
                  className="deal-button"
                  onClick={() => window.open(deal.product_url, "_blank", "noopener,noreferrer")}
                >
                  {"Buy Now"}
                </button>
              </p>
            </div>

              {/* 4th Div: Dropdown Button */}
              <div className="deal-dropdown">
              <button className="dropdown-button" onClick={() => toggleDropdown(index)}>
                Details
              </button>
            </div>
          </div>

          {/* Dropdown content (appears below the row) */}
          {/* Dropdown content (Replaces normal info when opened) */}
                  {openDealIndex === index && (
          <div className="dropdown-content">
            {/* GPU */}
            <div className="dropdown-item">
              <img src={placeholderImage} alt="GPU" className="dropdown-image" />
              <p className="dropdown-price">Price: ${placeholderPrice}</p>
              <button
              className="dropdown-button"
              onClick={() => window.open(placeholderLink, "_blank", "noopener,noreferrer")}
            >
              View GPU
            </button>
            </div>

            {/* CPU */}
            <div className="dropdown-item">
              <img src={placeholderImage} alt="CPU" className="dropdown-image" />
              <p className="dropdown-price">Price: ${placeholderPrice}</p>
              <button
              className="dropdown-button"
              onClick={() => window.open(placeholderLink, "_blank", "noopener,noreferrer")}
            >
              View CPU
            </button>
            </div>

            {/* Memory */}
            <div className="dropdown-item">
              <img src={placeholderImage} alt="Memory" className="dropdown-image" />
              <p className="dropdown-price">Price: ${placeholderPrice}</p>
              <button
              className="dropdown-button"
              onClick={() => window.open(placeholderLink, "_blank", "noopener,noreferrer")}
            >
              View Mem
            </button>
            </div>

            {/* RAM */}
            <div className="dropdown-item">
              <img src={placeholderImage} alt="RAM" className="dropdown-image" />
              <p className="dropdown-price">Price: ${placeholderPrice}</p>
              <button
              className="dropdown-button"
              onClick={() => window.open(placeholderLink, "_blank", "noopener,noreferrer")}
            >
              View RAM
            </button>
            </div>

            {/* PSU */}
            <div className="dropdown-item">
              <img src={placeholderImage} alt="PSU" className="dropdown-image" />
              <p className="dropdown-price">Price: ${placeholderPrice}</p>
              <button
              className="dropdown-button"
              onClick={() => window.open(placeholderLink, "_blank", "noopener,noreferrer")}
            >
              View PSU
            </button>
            </div>
          </div>
        )}

          </div>
        ))}
      </div>
    </div>
  );
}

export default Welcome;
