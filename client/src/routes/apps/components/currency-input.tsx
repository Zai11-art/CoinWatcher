import PropTypes from "prop-types";
import { useSelector } from "react-redux";

import { RootState } from "../../../state";

const CurrencyInput = (props: {
  amount: number;
  currency: string;
  currencies: string[];
  onCurrencyChange: (currency: string) => void;
  onAmountChange: (value: number) => void;
}): JSX.Element => {
  console.log("props here");
  console.log(props.currencies);
  const mode = useSelector((state: RootState) => state.mode);

  return (
    <div className="flex flex-col">
      <select
        className={`select-currency h-[40px] 
            w-[130px] rounded-md 
            border-[1px] border-[#9ccddc] 
            text-[20px] md:h-[55px] md:w-[250px]
            md:text-lg lg:h-[50px] lg:w-[300px]
            lg:text-xl  ${
              mode === "light" ? "bg-slate-200/90" : "bg-[#02121c]"
            }  mb-3 p-1 `}
        value={props.currency}
        onChange={(ev) => props.onCurrencyChange(ev.target.value)}
      >
        {props.currencies.map((currency) => (
          <option key={currency} value={`${currency}`}>
            {currency}
          </option>
        ))}
      </select>
      <input
        className={`
          text-glow h-[40px] 
          w-[130px] bg-gray-900 
          text-[20px] md:h-[50px] 
          md:w-[250px] rounded-md
          lg:h-[50px] lg:w-[300px] ${
            mode === "light" ? "bg-slate-200/90" : "bg-[#02121c]"
          } p-2`}
        placeholder="Enter Value"
        type="text"
        value={props.amount}
        onChange={(ev) => props.onAmountChange(parseFloat(ev.target.value))}
      />
    </div>
  );
};

CurrencyInput.propTypes = {
  amount: PropTypes?.number?.isRequired,
  currency: PropTypes?.string?.isRequired,
  currencies: PropTypes?.array,
  onAmountChange: PropTypes?.func,
  onCurrencyChange: PropTypes?.func,
};

export default CurrencyInput;
