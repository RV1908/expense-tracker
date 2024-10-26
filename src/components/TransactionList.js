function TransactionList({ transactions, deleteTransaction }) {
    const groupByDate = (transactions) => {
      return transactions.reduce((groups, transaction) => {
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
                  {/* <div className="datetime">{transaction.datetime}</div> */}
                  {/* Delete button */}
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
  