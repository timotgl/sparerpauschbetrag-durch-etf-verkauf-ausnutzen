import React from 'react';
import { useTranslation } from 'react-i18next';

import SwitchLanguage from '../SwitchLanguage';
import TaxFreeAmount from '../TaxFreeAmount';
import Shares from '../Shares';
import Prices from '../Prices';
import SaleSimulation from '../SaleSimulation';

const App = () => {
  const { t } = useTranslation();
  return (
    <div>
      <SwitchLanguage />
      <h1>{t('app.title')}</h1>
      <TaxFreeAmount />
      <Shares />
      <Prices />
      <SaleSimulation />
    </div>
  );
};

export default App;
