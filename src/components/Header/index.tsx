import React from 'react';

import SwitchLanguage from '../SwitchLanguage';
import classNames from './Header.module.css';

const Header = () => (
  <div className={classNames.Container}>
    <SwitchLanguage />
    <p>
      <a href="https://github.com/timotgl/sparerpauschbetrag-durch-etf-verkauf-ausnutzen">
        GitHub repo
      </a>{' '}
      | <a href="https://timotaglieber.de/">Author's homepage</a>
    </p>
  </div>
);

export default Header;
