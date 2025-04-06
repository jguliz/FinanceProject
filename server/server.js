// Express server for Plaid API integration
const express = require("express");
const bodyParser = require("body-parser");
const { Configuration, PlaidApi, PlaidEnvironments } = require("plaid");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

// Plaid client configuration
const configuration = new Configuration({
  basePath: PlaidEnvironments.sandbox, // Use 'development' or 'production' for real usage
  baseOptions: {
    headers: {
      "PLAID-CLIENT-ID": process.env.PLAID_CLIENT_ID,
      "PLAID-SECRET": process.env.PLAID_SECRET,
    },
  },
});

const plaidClient = new PlaidApi(configuration);

// Set up Express
const app = express();
app.use(bodyParser.json());

// Create a link token
app.post("/api/create_link_token", async (req, res) => {
  try {
    const tokenResponse = await plaidClient.linkTokenCreate({
      user: { client_user_id: req.body.userId || "user-id" },
      client_name: "Your Finance App",
      products: ["transactions"],
      country_codes: ["US"],
      language: "en",
    });

    res.json({ link_token: tokenResponse.data.link_token });
  } catch (error) {
    console.error("Error creating link token:", error);
    res.status(500).json({ error: error.message });
  }
});

// Exchange public token for access token
app.post("/api/exchange_public_token", async (req, res) => {
  try {
    const exchangeResponse = await plaidClient.itemPublicTokenExchange({
      public_token: req.body.public_token,
    });

    const accessToken = exchangeResponse.data.access_token;
    const itemId = exchangeResponse.data.item_id;

    // In a real app, store these securely in your database
    console.log("Access token:", accessToken);
    console.log("Item ID:", itemId);

    res.json({
      access_token: accessToken,
      item_id: itemId,
    });
  } catch (error) {
    console.error("Error exchanging public token:", error);
    res.status(500).json({ error: error.message });
  }
});

// Fetch transactions
app.post("/api/transactions", async (req, res) => {
  try {
    const { access_token } = req.body;

    // Get transactions for the last 30 days
    const now = new Date();
    const thirtyDaysAgo = new Date(now);
    thirtyDaysAgo.setDate(now.getDate() - 30);

    const startDate = thirtyDaysAgo.toISOString().split("T")[0];
    const endDate = now.toISOString().split("T")[0];

    const transactionsResponse = await plaidClient.transactionsGet({
      access_token,
      start_date: startDate,
      end_date: endDate,
    });

    const transactions = transactionsResponse.data.transactions;

    // Process transactions into a format suitable for Power BI
    const processedData = transactions.map((transaction) => ({
      id: transaction.transaction_id,
      date: transaction.date,
      name: transaction.name,
      amount: transaction.amount,
      category: transaction.category
        ? transaction.category[0]
        : "Uncategorized",
      subcategory: transaction.category
        ? transaction.category[1] || "None"
        : "None",
      account_id: transaction.account_id,
      pending: transaction.pending,
    }));

    // Export data to a format compatible with Power BI
    res.json({ transactions: processedData });
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({ error: error.message });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
