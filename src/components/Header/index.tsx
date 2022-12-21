import React from 'react';
import { useTranslation } from 'react-i18next';

import SwitchLanguage from '../SwitchLanguage';
import classNames from './Header.module.css';
import project from '../../../package.json';

interface PackageJson {
  author: {
    url: string;
  };
  repository: {
    url: string;
  };
}

const Header = () => {
  const [t] = useTranslation();
  return (
    <div className={classNames.Container}>
      <SwitchLanguage />
      <p>
        <a href={(project as PackageJson).repository.url}>
          {t('app.repo_url_label')}
        </a>{' '}
        | <a href={project.author.url}>{t('app.author_homepage_url_label')}</a>
      </p>
    </div>
  );
};

export default Header;
