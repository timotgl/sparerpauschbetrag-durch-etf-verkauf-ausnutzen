# Sparer-Pauschbetrag durch ETF-Verkauf ausnutzen

Or in English: Optimally capitalize on tax-free allowance by selling shares.

![Screenshot of app](public/screenshot.Xpng 'Screenshot of app')

A React app that calculates how many shares (of stocks, ETFs, etc.) you need to sell to take advantage of the [tax free amount for capital gains](https://de.wikipedia.org/wiki/Sparer-Pauschbetrag) as regulated in the german income tax law.

## Usage

 1. Clone this repo and run `npm install`
 1. Edit `src/redux/shares/initialState.json` so that it contains the complete purchase history of the shares you want to sell. The file contains an array of objects, your purchase history in chronological order (oldest shares first). Each object has four mandatory keys:
  * date (string): The date of the purchase, in the format `YYYY-MM-DD`.
  * amountPurchased (number): states how many shares were purchased, a number.
  * price (number): The execution rate/price of one share at the time of purchase.
  * amountSold (number): states how many shares of this position have been sold already. Enter `0` if none have been sold so far.
 1. Run `npm start` and open `http://localhost:3000/` in your browser.
 1. Configure the tax parameters as they apply to you (wether or not you have to pay church tax in Germany etc.) and enter the current bid price of one share that should be used for the sale simulation.
 1. The simulation runs automatically as soon as any input changes.

## Caveats

 * Everything this app does is hardcoded for the specific income tax situation in Germany in the year 2022. You can find the tax rates etc. in `src/constants.ts`.
 * The difference between bid and ask price (spread) is not considered by this app.
 * The strategy this app employs is to approximate but not exceed the tax free amount (Sparerpauschbetrag).
