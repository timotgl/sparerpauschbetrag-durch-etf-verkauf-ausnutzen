import { CAPITAL_YIELDS_TAX_RATE, SOLIDARITY_TAX_RATE } from './constants';
import { Share } from './redux/shares/reducer';

export const taxCapitalYields = (
  yields: number,
  churchTaxRate: number
): number => {
  const capitalYieldsTax = yields * CAPITAL_YIELDS_TAX_RATE;
  const solidarityTax = capitalYieldsTax * SOLIDARITY_TAX_RATE;
  const churchTax = capitalYieldsTax * churchTaxRate;

  return capitalYieldsTax + solidarityTax + churchTax;
};

export const readFileAsText = (file: File): Promise<string> =>
  new Promise((resolve) => {
    const reader = new FileReader();

    reader.onload = (progressEvent: ProgressEvent<FileReader>) => {
      resolve(progressEvent.target?.result as string);
    };

    reader.readAsText(file);
  });

const CSV_SEPARATOR = ';';

export const readSharesFromCsvString = (csv: string): Array<Share> =>
  csv
    .split('\n')
    .filter((line) => line.length >= 1)
    .map((line) => {
      const [date, amountPurchased, amountSold, price] = line
        .split(CSV_SEPARATOR)
        .filter((cell) => cell.length >= 1);
      return {
        date,
        amountPurchased: parseFloat(amountPurchased),
        amountSold: parseFloat(amountSold),
        price: parseFloat(price),
      } as Share;
    });
