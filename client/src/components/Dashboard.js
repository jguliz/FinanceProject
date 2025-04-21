// src/components/Dashboard.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PlaidLinkComponent from "./PlaidLinkComponent";

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [isBankConnected, setIsBankConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Check if bank is already connected (in a real app, you'd check this from your server)
  useEffect(() => {
    const checkBankConnection = async () => {
      // This is a mock check - in a real app you'd verify with your backend
      const hasAccessToken = localStorage.getItem("plaidAccessToken");
      setIsBankConnected(!!hasAccessToken);

      if (hasAccessToken) {
        try {
          setIsLoading(true);
          // In a real app, you'd fetch this from your server using the stored access token
          const response = await axios.post("/api/transactions", {
            access_token: hasAccessToken,
          });

          setTransactions(response.data.transactions);
          setIsLoading(false);
        } catch (err) {
          console.error("Error fetching transactions:", err);
          setIsLoading(false);
        }
      }
    };

    checkBankConnection();
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userId");
    localStorage.removeItem("plaidAccessToken");
    navigate("/");
  };

  // Function to handle successful bank connection
  const handleBankConnected = (accessToken, newTransactions) => {
    localStorage.setItem("plaidAccessToken", accessToken);
    setIsBankConnected(true);
    setTransactions(newTransactions);
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Financial Dashboard</h1>
        <button className="signout-button" onClick={handleSignOut}>
          Sign Out
        </button>
      </header>

      {!isBankConnected ? (
        <div className="bank-connect-section">
          <h2>Connect Your Bank Account</h2>
          <p>
            To view your financial insights, connect your bank account using
            Plaid.
          </p>
          <PlaidLinkComponent onSuccess={handleBankConnected} />
        </div>
      ) : (
        <div className="dashboard-content">
          <div className="dashboard-summary">
            <h2>Financial Summary</h2>
            {isLoading ? (
              <p>Loading your financial data...</p>
            ) : (
              <>
                <div className="summary-stats">
                  <div className="stat-card">
                    <h3>Transactions</h3>
                    <p className="stat-value">{transactions.length}</p>
                  </div>
                  <div className="stat-card">
                    <h3>Total Spending</h3>
                    <p className="stat-value">
                      $
                      {transactions
                        .reduce((sum, t) => sum + Math.max(0, t.amount), 0)
                        .toFixed(2)}
                    </p>
                  </div>
                  <div className="stat-card">
                    <h3>Total Income</h3>
                    <p className="stat-value">
                      $
                      {transactions
                        .reduce((sum, t) => sum + Math.min(0, -t.amount), 0)
                        .toFixed(2)}
                    </p>
                  </div>
                </div>

                <div className="transactions-section">
                  <h3>Recent Transactions</h3>
                  {transactions.length > 0 ? (
                    <div className="transactions-list">
                      {transactions.slice(0, 10).map((transaction) => (
                        <div key={transaction.id} className="transaction-item">
                          <div className="transaction-info">
                            <p className="transaction-name">
                              {transaction.name}
                            </p>
                            <p className="transaction-category">
                              {transaction.category}
                            </p>
                          </div>
                          <p
                            className={`transaction-amount ${
                              transaction.amount > 0 ? "expense" : "income"
                            }`}
                          >
                            {transaction.amount > 0 ? "-" : "+"}$
                            {Math.abs(transaction.amount).toFixed(2)}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p>No transactions found.</p>
                  )}
                </div>

                <button
                  className="export-button"
                  onClick={() => {
                    // In a real app, this would trigger your export function
                    alert("Exporting to Power BI...");
                  }}
                >
                  Export to Power BI
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
