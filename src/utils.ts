import { CAPITAL_YIELDS_TAX_RATE, SOLIDARITY_TAX_RATE } from './constants';

export const taxCapitalYields = (
  yields: number,
  churchTaxRate: number
): number => {
  const capitalYieldsTax = yields * CAPITAL_YIELDS_TAX_RATE;
  const solidarityTax = capitalYieldsTax * SOLIDARITY_TAX_RATE;
  const churchTax = capitalYieldsTax * churchTaxRate;

  return capitalYieldsTax + solidarityTax + churchTax;
};
