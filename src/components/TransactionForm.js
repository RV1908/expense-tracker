import { useState } from 'react';

function TransactionForm({ fetchTransactions }) {
  const [pricee, setPricee] = useState('')
  const [name, setName] = useState('');
  const [datetime, setDatetime] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !datetime || !pricee) {
        alert("Transaction cannot be added as details are incomplete.");
        return;
      }
    const url = process.env.REACT_APP_API_URL + '/transaction';
    // const price = parseFloat(name.split(' ')[0]);
    const price = pricee;

    try {
      await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          // name: name.substring(price.toString().length + 1),  
          name,
          price,
          description,
          datetime,
        }),
      });
      setPricee('');
      setName('');
      setDatetime('');
      setDescription('');
      fetchTransactions();
    } catch (error) {
      console.error('Failed to add transaction:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="basic">
        <input
          type="text"
          value={pricee}
          onChange={(e) => setPricee(e.target.value)}
          placeholder="+20000"
        />
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="New TV"
        />
        <input
          type="datetime-local"
          value={datetime}
          onChange={(e) => setDatetime(e.target.value)}
        />
      </div>
      <div className="description">
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        />
      </div>
      <button type="submit">Add Transaction</button>
    </form>
  );
}

export default TransactionForm;
