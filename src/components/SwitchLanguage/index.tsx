import React from 'react';
import { useTranslation } from 'react-i18next';

import { locales } from '../../i18n';
import classNames from './SwitchLanguage.module.css'

const SwitchLanguage = () => {
  const [t, i18n] = useTranslation();
  const changeLanguage = (
    changeEvent: React.ChangeEvent<HTMLSelectElement>
  ) => {
    i18n.changeLanguage(changeEvent.currentTarget.value)
  };
  return (
    <div className={classNames.Container}>
      <p>
        <label>
          {t('switch_language.prompt')}&nbsp;
          <select onChange={changeLanguage}>
            {locales.map((locale) => (
              <option key={locale} value={locale}>
                {t(`switch_language.locales.${locale}`)}
              </option>
            ))}
          </select>
        </label>
      </p>
    </div>
  );
};

export default SwitchLanguage;
