import React from "react";
import { useState } from "react";
import { IoCalculatorOutline, IoClose } from "react-icons/io5";

const CalculatorWidget = () => {
  const [open, setOpen] = useState(false);

  const [currentInitial, setcurrentInitial] = useState<number>(0);
  const [currentPrice, setcurrentPrice] = useState<number>(0);
  const [currentSell, seturrentSell] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (!currentInitial || !currentPrice || !currentSell) {
      setTotal(0);
    } else {
      setTotal(
        (((currentSell) - (currentPrice)) /
          (currentPrice)) *
          (currentInitial)
      );
    }

    setcurrentInitial(currentInitial);
    setcurrentPrice(currentPrice);
    seturrentSell(currentSell);
  };

  const handleReset = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setcurrentInitial(0);
    setcurrentPrice(0);
    seturrentSell(0);
    setTotal(0);
  };

  return (
    <div className="z-[2]">
      <div className="fixed left-[90px] top-[475px] z-[101] cursor-pointer duration-150 ease-in-out hover:scale-[1.02]">
        <div
          onClick={() => setOpen(!open)}
          className="absolute 
                right-[10px] top-[-350px] 
                z-[2] h-[50px]
                w-[50px] rounded-full 
                bg-[#9ccddc] md:right-[19px] 
                md:top-[-355px] md:h-[50px]
                md:w-[50px] 
                lg:right-[19px] lg:top-[-360px] 
                 "
        ></div>
        <div
          className="absolute 
                right-[19px] top-[-340px] 
                z-[100] cursor-pointer 
                text-3xl text-[#062c43]
                duration-150 ease-in-out 
                hover:scale-[1.04] hover:text-[white]
                md:right-[26px] 
                md:top-[-347px] md:text-4xl lg:right-[26px] lg:top-[-353px]"
        >
          <div onClick={() => setOpen(!open)}>
            {open ? <IoClose/> : <IoCalculatorOutline/>}
          </div>
        </div>
      </div>

      <div
        className={` left fixed top-[140px] z-[100]
            ${open ? "left-[0px] " : "left-[-500px] "}  
            duration-300 ease-in-out`}
      >
        <div
          className={`
                mx-3 mt-12
                flex h-[425px]
                w-[400px] flex-col
                items-center rounded-lg
                border-[2px] border-[#094663] bg-[#052330]
                px-4
                pb-6 md:h-[425px]
                md:w-[400px]  lg:h-[425px] lg:w-[325px]
            
                `}
        >
          <form>
            <h1 className="mt-7 text-center text-2xl  font-semibold uppercase text-white ">
              Profit Calculator
            </h1>
            <div className="items-between mx-5 mb-3 mt-4 flex flex-col">
              <div className="mx-6 my-2 flex flex-row justify-between">
                <label htmlFor="" className=" pr-5 text-white">
                  Investment:{" "}
                </label>
                <input
                  aria-label="investment variable"
                  min="0"
                  onChange={(e) =>
                    setcurrentInitial(parseFloat(e.target.value))
                  }
                  value={currentInitial}
                  type="number"
                  className="rounded-sm border-[1px] border-[#9ccddc] bg-[#062c43] p-1  text-[white] "
                />
              </div>
              <div className="mx-6 my-2 flex flex-row justify-between">
                <label htmlFor="" className=" pr-5 text-white">
                  Price:{" "}
                </label>
                <input
                  aria-label="Current Crypto price"
                  min="0"
                  onChange={(e) => setcurrentPrice(parseFloat(e.target.value))}
                  value={currentPrice}
                  type="number"
                  className="rounded-sm border-[1px] border-[#9ccddc] bg-[#062c43] p-1  text-[white] "
                />
              </div>
              <div className="mx-6 my-2 flex flex-row justify-between">
                <label htmlFor="" className=" pr-5 text-white">
                  Sell Price:{" "}
                </label>
                <input
                  aria-label="Selling Price"
                  min="0"
                  onChange={(e) => seturrentSell(parseFloat(e.target.value))}
                  value={currentSell}
                  type="number"
                  className="rounded-sm border-[1px] border-[#9ccddc] bg-[#062c43] p-1  text-[white] "
                />
              </div>
              <div className="mx-6 mt-6 flex flex-row justify-around">
                <button
                  aria-label="calculate"
                  onClick={handleSubmit}
                  className="w-[100px] rounded-lg border-[2px] border-[#9ccddc]  bg-[#062c43] p-1  text-[white] "
                >
                  Calculate
                </button>
                <button
                  aria-label="reset values"
                  onClick={handleReset}
                  className="] w-[100px] rounded-lg border-[2px]  border-[#9ccddc] bg-[#062c43] p-1 text-[white] "
                >
                  Reset
                </button>
              </div>
              <div className=" ml-5 mt-5 flex w-[300px] flex-col rounded-lg bg-[#062c43] p-2 ">
                <span className="mx-4 text-white">
                  Investment Amount: {`$${currentInitial}`}
                </span>
                <span
                  className={`${
                    total > currentInitial
                      ? "text-green-300"
                      : total < currentInitial
                      ? "text-[red]"
                      : "text-white"
                  } mx-4`}
                >
                  Profit / Loss Amount: {`$${total.toFixed(2)}`}
                </span>
                <span
                  className={`${
                    total > currentInitial
                      ? "text-green-300"
                      : total < currentInitial
                      ? "text-[red]"
                      : "text-white"
                  } mx-4`}
                >
                  Exit Total: {`$${(total + currentInitial).toFixed(2)}`}
                </span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CalculatorWidget;
