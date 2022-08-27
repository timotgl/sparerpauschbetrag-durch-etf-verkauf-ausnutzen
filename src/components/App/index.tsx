import React from 'react';

import TaxFreeAmount from '../TaxFreeAmount';
import Shares from '../Shares';
import Prices from '../Prices';
import SaleSimulation from '../SaleSimulation';

const App = () => {
  return (
    <div className="App">
      <h1>Sparer-Pauschbetrag durch ETF-Verkauf ausnutzen</h1>
      <TaxFreeAmount />
      <Shares />
      <Prices />
      <SaleSimulation />
    </div>
  );
};

export default App;
