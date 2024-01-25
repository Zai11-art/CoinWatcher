import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { IoSwapHorizontalOutline } from "react-icons/io5";

import { RootState } from "../../../state";
import CurrencyInput from "./currency-input";

const ExchangeComponent = (): JSX.Element => {
  const mode = useSelector((state: RootState) => state.mode);
  const [amount1, setAmount1] = useState<number>(0);
  const [amount2, setAmount2] = useState<number>(0);
  const [currency1, setCurrency1] = useState<string>("USD");
  const [currency2, setCurrency2] = useState<string>("EUR");
  const [rates, setRates] = useState<Record<string, number>>({});
  const [changeCalc, setchangeCalc] = useState<boolean>(false);

  useEffect(() => {
    fetch(
      "https://v6.exchangerate-api.com/v6/b51a7bc71ceacdda84823787/latest/USD"
    )
      .then((response) => response.json())
      .then((data) => data.conversion_rates)
      .then((data) => {
        setRates(data);
      })
      .catch((error) => console.log(error));
  }, []);

  function format(number: number): string {
    return number.toFixed(4);
  }

  function handleAmount1Change(amount1: number): void {
    setAmount2(
      parseFloat(format((amount1 * rates[currency2]) / rates[currency1]))
    );
    setAmount1(amount1);
  }

  function handleCurrency1Change(currency1: string): void {
    setAmount2(
      parseFloat(format((amount1 * rates[currency2]) / rates[currency1]))
    );
    setCurrency1(currency1);
  }

  function handleAmount2Change(amount2: number): void {
    setAmount1(
      parseFloat(format((amount2 * rates[currency1]) / rates[currency2]))
    );
    setAmount2(amount2);
  }

  function handleCurrency2Change(currency2: string): void {
    setAmount1(
      parseFloat(format((amount2 * rates[currency1]) / rates[currency2]))
    );
    setCurrency2(currency2);
  }

  return (
    <div
      className={`flex ${
        changeCalc ? "flex-row" : "flex-row-reverse"
      } my-2 w-full flex-nowrap items-center justify-around lg:flex-nowrap `}
    >
      <CurrencyInput
        onAmountChange={handleAmount1Change}
        onCurrencyChange={handleCurrency1Change}
        currencies={Object.keys(rates)}
        amount={amount1}
        currency={currency1}
      />
      <div
        className={`flex cursor-pointer flex-col items-center justify-center
          text-5xl duration-200 hover:scale-[1.1] md:text-6xl
          lg:text-7xl ${
            changeCalc
              ? `${mode === "light" ? "text-[#d82e2e]" : "text-[#ff6666]"} `
              : `${mode === "light" ? "text-[#28a733]" : "text-[#2ae937]"} `
          }`}
      >
        <IoSwapHorizontalOutline onClick={() => setchangeCalc(!changeCalc)} />
      </div>
      <CurrencyInput
        onAmountChange={handleAmount2Change}
        onCurrencyChange={handleCurrency2Change}
        currencies={Object.keys(rates)}
        amount={amount2}
        currency={currency2}
      />
    </div>
  );
};

export default ExchangeComponent;
