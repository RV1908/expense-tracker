import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => (
  <div className="sidebar">
    <Link to="/" className="sidebar-link">
      <button>All Transactions</button>
    </Link>
    <Link to="/today" className="sidebar-link">
      <button>Today</button>
    </Link>
    <Link to="/TransactionSummary" className="sidebar-link">
      <button>Transaction Summary</button>
    </Link>
  </div>
);

export default Sidebar;
