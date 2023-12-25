import React, { ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';

import classNames from './CsvImport.module.css';
import { readFileAsText, readSharesFromCsvString } from '../../utils';
import { useAppDispatch } from '../../redux/hooks';
import { actions } from '../../redux/shares/reducer';

const CsvImport = ({}) => {
  const [t] = useTranslation();
  const dispatch = useAppDispatch();

  const importCsvFile = async (changeEvent: ChangeEvent<HTMLInputElement>) => {
    const { files } = changeEvent.target;
    if (!files || files.length !== 1) {
      alert(t('shares.errors.import_only_one_file'));
      return;
    }
    const csv = await readFileAsText(files[0]);
    const parsedShares = readSharesFromCsvString(csv);
    dispatch(actions.replace(parsedShares));
  };

  return (
    <div>
      <p>
        <label className={classNames.ImportCsv}>
          {t('shares.import_file_button_label')}:&nbsp;
          <input
            type="file"
            onChange={importCsvFile}
            className={classNames.ImportCsvButton}
          />
        </label>
      </p>
      <p className={classNames.CsvFormatInfo}>
        <h3>{t('shares.csv_format_heading')}</h3>
        <ol>
          <li>{t('shares.csv_format_restrictions.no_heading')}</li>
          <li>{t('shares.csv_format_restrictions.lines_order')}</li>
          <li>{t('shares.csv_format_restrictions.separator')}</li>
          <li>{t('shares.csv_format_restrictions.no_string_delim')}</li>
          <li>{t('shares.csv_format_restrictions.decimal_separator')}</li>
          <li>{t('shares.csv_format_restrictions.order')}</li>
        </ol>
        {t('shares.csv_format_restrictions.example')}
      </p>
    </div>
  );
};

export default CsvImport;
