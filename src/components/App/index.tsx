import React from 'react';
import { useTranslation } from 'react-i18next';

import Header from '../Header';
import TaxFreeAmount from '../TaxFreeAmount';
import ChurchTax from '../ChurchTax';
import Shares from '../Shares';
import Prices from '../Prices';
import SaleSimulation from '../SaleSimulation';

const App = () => {
  const { t } = useTranslation();
  return (
    <div>
      <Header />
      <h1>{t('app.title')}</h1>
      <Shares />
      <TaxFreeAmount />
      <ChurchTax />
      <Prices />
      <SaleSimulation />
    </div>
  );
};

export default App;
