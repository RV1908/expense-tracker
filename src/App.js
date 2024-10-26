import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [name, setName] = useState("");
  const [datetime, setDatetime] = useState("");
  const [description, setDescription] = useState("");
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    getTransactions().then(setTransactions);
  }, []);

  async function getTransactions() {
    const url = process.env.REACT_APP_API_URL + '/transactions';
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Failed to fetch transactions:", error);
      return [];
    }
  }

  function addNewTransaction(e) {
    e.preventDefault();
    const url = process.env.REACT_APP_API_URL + '/transaction';
    const price = name.split(' ')[0];

    fetch(url, {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        price,
        name: name.substring(price.length + 1),
        description,
        datetime,
      })
    }).then(res => {
      res.json().then(newTransaction => {
        setName("");
        setDatetime("");
        setDescription("");
        setTransactions(prevTransactions => [newTransaction, ...prevTransactions]);
      });
    });
  }

  function deleteTransaction(id) {
    const url = `${process.env.REACT_APP_API_URL}/transaction/${id}`;
    
    fetch(url, {
      method: 'DELETE',
    }).then(() => {
      setTransactions(prevTransactions =>
        prevTransactions.filter(transaction => transaction._id !== id)
      );
    }).catch(error => console.error("Failed to delete transaction:", error));
  }

  let balance = 0;
  for (const transaction of transactions) {
    balance = balance + transaction.price;
  }
  balance = balance.toFixed(2);
  const fraction = balance.split('.')[1];
  balance = balance.split('.')[0];

  return (
    <main>
      <h1>Rs {balance}<span>.{fraction}</span></h1>
      <form onSubmit={addNewTransaction}>
        <div className="basic">
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder={'+200 new samsung tv'}
          />
          <input
            type="datetime-local"
            value={datetime}
            onChange={e => setDatetime(e.target.value)}
          />
        </div>
        <div className="description">
          <input
            type="text"
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder={'description'}
          />
        </div>
        <button type="submit">Add new transaction</button>
      </form>

      <div className="transactions">
        {transactions.length > 0 && transactions.map((transaction, index) => (
          <div className="transaction" key={transaction._id}>
            <div className="left">
              <div className="name">{transaction.name}</div>
              <div className="description">{transaction.description}</div>
            </div>
            <div className="right">
              <div className={"price " + (transaction.price < 0 ? 'red' : 'green')}>
                {transaction.price}
              </div>
              <div className="datetime">{transaction.datetime}</div>
              <button onClick={() => deleteTransaction(transaction._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default App;
