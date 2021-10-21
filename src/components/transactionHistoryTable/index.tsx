import React from 'react';

/** Image(s) */
import Invoice from '../../assets/images/invoice.svg';

const TransactionHistoryTable = (): JSX.Element => (
  <section className="transaction-sec">
    <h2 className="title">Transaction History</h2>
    <div className="info">
      <img src={Invoice} alt="Invoice" className="icon" />
      <h3 className="title">No transactions</h3>
      <p className="description">Top up your pension account or make a wallet transaction to see activity here</p>
    </div>
  </section>
);

export default TransactionHistoryTable;
