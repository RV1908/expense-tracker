import './TransactionSummary.css';

function TransactionSummary({ transactions }) {
  const income = transactions.filter(t => t.price > 0).reduce((sum, t) => sum + t.price, 0);
  const expenses = transactions.filter(t => t.price < 0).reduce((sum, t) => sum + Math.abs(t.price), 0);
  const balance = income - expenses;

  return (
    <div className="transaction-summary">
      <h2 className="balance">Balance: <span>{balance}</span></h2>
      <p className="income">Income: <span>{income}</span></p>
      <p className="expenses">Expenses: <span>{expenses}</span></p>
    </div>
  );
}

export default TransactionSummary;
