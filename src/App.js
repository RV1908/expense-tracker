import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import './App.css';
import Sidebar from './components/Sidebar.js';
import TransactionForm from './components/TransactionForm.js';
import TransactionList from './components/TransactionList.js';
import TransactionSummary from './components/TransactionSummary.js';
import { useLocation } from 'react-router-dom';

function App() {
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(0);

  const fetchTransactions = useCallback(async () => {
    const url = process.env.REACT_APP_API_URL + '/transactions';
    try {
      const response = await fetch(url);
      const data = await response.json();
      setTransactions(data);
      calculateBalance(data);
    } catch (error) {
      console.error('Failed to fetch transactions:', error);
    }
  }, []); 

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]); 

  function calculateBalance(transactions) {
    let total = 0;
    transactions.forEach((transaction) => {
      total += transaction.price;
    });
    setBalance(total.toFixed(2));
  }

  async function deleteTransaction(id) {
    const url = `${process.env.REACT_APP_API_URL}/transaction/${id}`;
    try {
      const response = await fetch(url, {
        method: 'DELETE',
      });
      if (response.ok) {
        const updatedTransactions = transactions.filter(transaction => transaction._id !== id);
        setTransactions(updatedTransactions);
        calculateBalance(updatedTransactions);
      } else {
        console.error('Failed to delete transaction');
      }
    } catch (error) {
      console.error('Error deleting transaction:', error);
    }
  }

  return (
    <Router>
      <div className="App">
        <Sidebar />
        <main>
          <h1>
            Balance: {balance} <span>Rs</span>
          </h1>
          <MainContent 
            transactions={transactions} 
            fetchTransactions={fetchTransactions} 
            deleteTransaction={deleteTransaction} 
          />
        </main>
      </div>
    </Router>
  );
}

function MainContent({ transactions, fetchTransactions, deleteTransaction }) {
  const location = useLocation();

  return (
    <>
      {/* Render the form only if not on TransactionSummary page */}
      {location.pathname !== '/TransactionSummary' && (
        <TransactionForm fetchTransactions={fetchTransactions} />
      )}
      <Routes>
        <Route 
          path="/" 
          element={<TransactionList transactions={transactions} deleteTransaction={deleteTransaction} />} 
        />
        <Route 
          path="/today" 
          element={<TransactionList 
            transactions={transactions.filter(transaction => 
              new Date(transaction.datetime).toDateString() === new Date().toDateString()
            )} 
            deleteTransaction={deleteTransaction} 
          />} 
        />
        <Route 
          path="/TransactionSummary" 
          element={<TransactionSummary 
            transactions={transactions} 
          />} 
        />
      </Routes>
    </>
  );
}

export default App;
