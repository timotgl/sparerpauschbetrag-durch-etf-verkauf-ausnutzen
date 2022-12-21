export const CURRENT_YEAR = new Date().getFullYear();

export const SHARE_DECIMAL_PLACES = 4;
export const CURRENCY_DECIMAL_PLACES = 2;

// https://de.wikipedia.org/wiki/Sparer-Pauschbetrag
const taxFreeAmountsForYear: {
  [key: number]: { single: number; double: number };
} = {
  2022: {
    single: 801,
    double: 1602,
  },
  2023: {
    single: 1000,
    double: 2000,
  },
};

const taxFreeAmounts =
  taxFreeAmountsForYear[CURRENT_YEAR] || taxFreeAmountsForYear[2023];

export const TAX_FREE_AMOUNT_SINGLE = taxFreeAmounts.single;
export const TAX_FREE_AMOUNT_DOUBLE = taxFreeAmounts.double;

/*
 * Capital yields tax only applies to a certain percentage of the profits from
 * stocks-based capital.
 *
 * "Steuerfrei sind bei in Aktienfonds investierten Privatanlegern, Lebens- und
 * Krankenversicherungsunternehmen und bei Fondsanteile im Handelsbuchbestand
 * haltenden Kreditinstituten 30 % der Erträge (Aktienteilfreistellung)".
 *
 * Source: https://de.wikipedia.org/wiki/Investmentsteuergesetz_(Deutschland)#Investmentsteuergesetz_ab_dem_1._Januar_2018_(Art._1_G._vom_19._Juli_2016)
 */
export const STOCKS_TAX_EXEMPTION_FACTOR = 0.7;

// https://de.wikipedia.org/wiki/Kapitalertragsteuer_(Deutschland)#Bemessung_der_Kapitalertragsteuer
export const CAPITAL_YIELDS_TAX_RATE = 0.25;
export const SOLIDARITY_TAX_RATE = 0.055;

// https://de.wikipedia.org/wiki/Kirchensteuer_(Deutschland)#Steuers%C3%A4tze
export const CHURCH_TAX_RATE_BAVARIA = 0.08;
export const CHURCH_TAX_RATE_OTHER = 0.09;
