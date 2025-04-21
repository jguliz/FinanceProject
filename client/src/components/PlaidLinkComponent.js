// src/components/PlaidLinkComponent.js
import React, { useState, useEffect, useCallback } from "react";
import { usePlaidLink } from "react-plaid-link";
import axios from "axios";
import "./SignIn.css"; // Import the CSS for styling

const PlaidLinkComponent = ({ onSuccess }) => {
  const [linkToken, setLinkToken] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Get a link token when the component mounts
  useEffect(() => {
    const fetchLinkToken = async () => {
      try {
        const userId = localStorage.getItem("userId") || "unique-user-id";
        const response = await axios.post("/api/create_link_token", {
          userId,
        });
        setLinkToken(response.data.link_token);
      } catch (err) {
        setError("Failed to fetch link token");
        console.error(err);
      }
    };

    fetchLinkToken();
  }, []);

  // Handle the successful connection to a bank account
  const handleSuccess = useCallback(
    async (public_token, metadata) => {
      try {
        setIsLoading(true);
        const exchangeResponse = await axios.post(
          "/api/exchange_public_token",
          {
            public_token,
          }
        );

        const accessTokenValue = exchangeResponse.data.access_token;
        setAccessToken(accessTokenValue);

        // Now fetch transactions
        const transactionsResponse = await axios.post("/api/transactions", {
          access_token: accessTokenValue,
        });

        const transactionsData = transactionsResponse.data.transactions;
        setTransactions(transactionsData);

        // If onSuccess callback is provided (from Dashboard), call it
        if (onSuccess && typeof onSuccess === "function") {
          onSuccess(accessTokenValue, transactionsData);
        }

        console.log("Bank connected successfully!");
        setIsLoading(false);
      } catch (err) {
        setError("Failed to connect bank account");
        setIsLoading(false);
        console.error(err);
      }
    },
    [onSuccess]
  );

  // Configure the Plaid Link
  const { open, ready } = usePlaidLink({
    token: linkToken,
    onSuccess: handleSuccess,
    onExit: (err, metadata) => {
      if (err) {
        setError("Link exit error: " + err.message);
      }
    },
  });

  // Export transactions to CSV for Power BI
  const exportToCSV = () => {
    if (transactions.length === 0) {
      setError("No transactions to export");
      return;
    }

    // Get the headers
    const headers = Object.keys(transactions[0]).join(",");

    // Get the rows
    const rows = transactions
      .map((transaction) =>
        Object.values(transaction)
          .map((value) => (typeof value === "string" ? `"${value}"` : value))
          .join(",")
      )
      .join("\n");

    // Combine headers and rows
    const csv = headers + "\n" + rows;

    // Create a download link
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.setAttribute("hidden", "");
    a.setAttribute("href", url);
    a.setAttribute("download", "transactions.csv");
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="plaid-container">
      {error && <div className="error-message">{error}</div>}

      {!accessToken ? (
        <button
          onClick={() => open()}
          disabled={!ready || isLoading}
          className="connect-button"
        >
          {isLoading ? "Connecting..." : "Connect a bank account"}
        </button>
      ) : (
        <div className="success-container">
          <p className="success-message">
            Bank account connected successfully!
          </p>
          <p>Retrieved {transactions.length} transactions.</p>

          <button
            onClick={exportToCSV}
            className="export-button"
            disabled={transactions.length === 0}
          >
            Export to CSV for Power BI
          </button>
        </div>
      )}
    </div>
  );
};

export default PlaidLinkComponent;
