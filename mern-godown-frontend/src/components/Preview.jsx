import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import "../styles/preview.css";

const Preview = ({ item, onClose }) => {
  const [showMoreInfo, setShowMoreInfo] = useState(false);

  const toggleMoreInfo = () => {
    setShowMoreInfo(!showMoreInfo);
  };

  if (!item) {
    return null;
  }

  return (
    <div className="preview">
      <div className="preview-header">
        <FontAwesomeIcon
          icon={faTimes}
          className="close-icon"
          onClick={onClose}
        />
      </div>
      <div className="preview-content">
        <div className="image-moreinfo">
          <img src={item.image_url} alt={item.name} className="preview-image" />

          <div className={`more-info ${showMoreInfo ? 'show' : ''}`}>
            <div className="close-more-info" onClick={() => setShowMoreInfo(false)}>
              <FontAwesomeIcon icon={faTimes} />
            </div>
            <h3>
              <strong>More info:</strong>
            </h3>
            <ul>
              {Object.entries(item.attributes).map(([key, value]) => (
                <li key={key}>
                  <strong>{key}:</strong>{" "}
                  {value === true ? "Yes" : value === false ? "No" : value}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="preview-details">
          <div className="preview-title" style={{backgroundColor: item.status==='out_of_stock'? 'var(--red)' : 'var(--green)'}}>
            <h2>{item.name}</h2>
            <FontAwesomeIcon
              icon={faInfoCircle}
              className="info-icon"
              onClick={toggleMoreInfo}
            />
          </div>

          <div className="preview-description">
            <p><strong>Brand:</strong> {item.brand}</p>
            <p><strong>Category:</strong> {item.category}</p>
            <p><strong>Price:</strong> ${item.price}</p>
            <p style={{ color: item.status === 'out_of_stock' ? 'red' : 'green' }}>
              <strong>Status:</strong> {item.status}
            </p>
            <p><strong>Quantity:</strong> {item.quantity}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preview;