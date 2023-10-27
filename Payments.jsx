import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function PaymentForm() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isPremiumPurchased, setIsPremiumPurchased] = useState(false);
  const navigate = useNavigate();

  const handleOptionSelect = (option) => {
    setSelectedOption(option);

    if (option === 'free') {
      alert('Your free plan activated');
    }
  };

  const handlePurchase = () => {
    if (selectedOption === 'premium') {
      setIsPremiumPurchased(true);
    } else {
      alert('Please select the Premium option to make a purchase.');
    }
  };

  return (
    <div style={styles.container}>
      <h1>Welcome to Premium Access Of DevDeakin</h1>
      <div>
        <h2>Select a Payment Option:</h2>
        <div>
          <label>
            <input
              type="radio"
              name="paymentOption"
              value="free"
              checked={selectedOption === 'free'}
              onChange={() => handleOptionSelect('free')}
            />
            Free
          </label>
        </div>
        <div>
          <label>
            <input
              type="radio"
              name="paymentOption"
              value="premium"
              checked={selectedOption === 'premium'}
              onChange={() => handleOptionSelect('premium')}
            />
            Premium (Rs. 4999)
          </label>
        </div>
      </div>

      {selectedOption === 'premium' && !isPremiumPurchased && (
        <div>
          <Link to="https://buy.stripe.com/test_00gcPC3m48OT0RW000">
            <button>
              Get Access To Premium
            </button>
          </Link>
        </div>
      )}

      {isPremiumPurchased && (
        <div style={styles.successMessage}>
          Congratulations! You've purchased the Premium of DevDeakin.
          <br></br>
          <button onClick={() => navigate('/')}>Go to Home</button>
        </div>
      )}
    </div>
  );
}

const styles = {
container: {
    maxWidth: '500px',
    margin: '100px auto',
    padding: '20px',
    border: '2px solid #4CAF50',
    borderRadius: '10px',
    backgroundColor: '#f0f0f0',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  },
  header: {
    fontSize: '28px',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '20px',
    color: '#4CAF50',
  },
  optionContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  optionLabel: {
    marginBottom: '10px',
    fontSize: '20px',
    color: '#333',
  },
  optionInput: {
    width: '18px',
    height: '18px',
    margin: '0 10px 0 0',
  },
  premiumOption: {
    backgroundColor: '#4CAF50',
    color: '#fff',
    padding: '10px 20px',
    borderRadius: '5px',
    fontSize: '20px',
    cursor: 'pointer',
  },
  premiumOptionSelected: {
    backgroundColor: '#45A049',
  },
  successMessage: {
    color: '#4CAF50',
    fontWeight: 'bold',
    marginTop: '20px',
    textAlign: 'center',
  },
  purchaseButton: {
    textDecoration: 'none',
    display: 'inline-block',
    backgroundColor: '#4CAF50',
    color: '#fff',
    padding: '15px 30px',
    borderRadius: '5px',
    fontSize: '20px',
    textAlign: 'center',
    margin: '20px auto',
    cursor: 'pointer',
  },
};

export default PaymentForm;



