import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import Transaction from './models/Transaction.js';
import connectDB from '../config/connectdb.js';

// Initialize dotenv to load environment variables
dotenv.config(); 

const app = express();
const PORT = process.env.PORT || 4040;
const DATABASE_URL = process.env.DATABASE_URL || "mongodb://localhost:27017";

app.use(cors());
app.use(express.json());

// Connect to the database once when the server starts
connectDB(DATABASE_URL);

app.get("/api/test", (req, res) => {
    res.json('test ok1');
});

// Route to add a new transaction
app.post('/api/transaction', async (req, res) => {
    // console.log('Request body:', req.body);
    try {
        const { price, name, description, datetime } = req.body;
        const transaction = await Transaction.create({ price, name, description, datetime });
        res.json(transaction);
    } catch (error) {
        console.error("Error adding transaction:", error);
        res.status(500).json({ message: "Failed to add transaction" });
    }
});

// Route to get all transactions
app.get('/api/transactions', async (req, res) => {
    try {
        const transactions = await Transaction.find();
        res.json(transactions);
    } catch (error) {
        console.error("Error fetching transactions:", error);
        res.status(500).json({ message: "Failed to fetch transactions" });
    }
});

// Route to delete a transaction by ID
app.delete('/api/transaction/:id', async (req, res) => {
    try {
        const { id } = req.params;
        console.log("Deleting transaction with ID:", id); // Debugging line
        const transaction = await Transaction.findByIdAndDelete(id);

        if (!transaction) {
            return res.status(404).json({ message: "Transaction not found" });
        }

        res.json({ message: "Transaction deleted successfully", transaction });
    } catch (error) {
        console.error("Error deleting transaction:", error);
        res.status(500).json({ message: "Failed to delete transaction" });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at ${DATABASE_URL}`);
    console.log(`App listening on port ${PORT}`);
});
