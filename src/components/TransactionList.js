function TransactionList({ transactions, deleteTransaction }) {
    const groupByDate = (transactions) => {
      // Sort transactions by date first
      const sortedTransactions = transactions.sort((a, b) => new Date(b.datetime) - new Date(a.datetime));
  
      // Then group them by date
      return sortedTransactions.reduce((groups, transaction) => {
        const date = new Date(transaction.datetime).toDateString();
        if (!groups[date]) {
          groups[date] = [];
        }
        groups[date].push(transaction);
        return groups;
      }, {});
    };
  
    const groupedTransactions = groupByDate(transactions);
  
    return (
      <div className="transactions">
        {Object.keys(groupedTransactions).map((date) => (
          <div key={date} className="transaction-group">
            <h3>{date}</h3>
            {groupedTransactions[date].map((transaction) => (
              <div className="transaction" key={transaction._id}>
                <div className="left">
                  <div className="name">{transaction.name}</div>
                  <div className="description">{transaction.description}</div>
                </div>
                <div className="right">
                  <div className={`price ${transaction.price < 0 ? 'red' : 'green'}`}>
                    {transaction.price}
                  </div>
                  <button 
                    className="delete-button" 
                    onClick={() => deleteTransaction(transaction._id)}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  }
  
  export default TransactionList;
  