import React from 'react';

import TaxFreeAmount from '../TaxFreeAmount';
import Shares from '../Shares';

const App = () => {
  return (
    <div className="App">
      <h1>Sparer-Pauschbetrag durch ETF-Verkauf ausnutzen</h1>
      <TaxFreeAmount />
      <Shares />
    </div>
  );
};

export default App;
