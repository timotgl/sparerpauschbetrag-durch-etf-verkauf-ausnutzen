import React from 'react';

import TaxFreeAmount from '../TaxFreeAmount';
import Shares from '../Shares';

const App = () => {
  return (
    <div className="App">
      <h1>Sparerpauschbetrag durch ETF-Verkauf ausnutzen</h1>
      <TaxFreeAmount />
      <Shares />
    </div>
  );
};

export default App;
