import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../state";
import { IoHelpCircleOutline } from "react-icons/io5";

const LeverageCalculator = () => {
    
    const mode = useSelector((state: RootState) => state.mode)
    const [currentInitial,setcurrentInitial]=useState<number>(0);
    const [currentPrice,setcurrentPrice]=useState<number>(0);
    const [currentSell,seturrentSell]=useState<number>(0);
    const [leverage,setLeverage]=useState<number>(0);
    const [exitFee,setExitFee]=useState<number>(0);
    const [total, setTotal] = useState<number>(0);
    const [finaltotal, setfinalTotal] = useState<number>(0);
    const [long, setLong] = useState<boolean>(false)
    const [short, setshort] = useState<boolean>(false)

    const [multiplier, setmuitiplier] = useState<number>(0);

    const switchL = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setLong(true)
        setshort(false)
    }
    const switchS = (e: { preventDefault: () => void; })  => {
        e.preventDefault();
        setshort(true)
        setLong(false)

    }

    const handleSubmit = (e: { preventDefault: () => void;})  => {
        const x = ((total+currentInitial)/currentInitial);
        const y = ((((currentSell) - (currentPrice))*(currentInitial)*(leverage))/currentInitial);
        e.preventDefault();
        
        setTotal(((((currentSell) - (currentPrice))*(currentInitial)*(leverage))-currentInitial));

        if (!currentInitial || !currentPrice || !currentSell || !exitFee) {
            setmuitiplier(0)
            setfinalTotal(0)
        } else {
            setmuitiplier(y)
            setfinalTotal((((currentSell) - (currentPrice))*(currentInitial)*(leverage))-exitFee)
        }

        setcurrentInitial(currentInitial)
        setcurrentPrice(currentPrice)
        seturrentSell(currentSell)
        setExitFee(exitFee)
        
    }

    const handleReset = (e: { preventDefault: () => void;}) => {
        e.preventDefault()
        setLeverage(0)
        setfinalTotal(0)
        setmuitiplier(0)
        setcurrentInitial(0)
        setcurrentPrice(0)
        seturrentSell(0)
        setExitFee(0)
        setTotal(0)
    }


    return (
        <div className={`
        lg:mt-[265px] md:mt-[280px] mt-[290px]
        lg:w-[1000px] lg:h-[525px]
        md:w-[700px] md:h-[470px]
        sm:w-[700px] sm:h-[470px]
        w-[100%] h-[100%]
        rounded-lg p-6
        ${mode === "light" ? "headCard-filter-light text-blue-900 text-glow" : "headCard-filter text-white"}
        pb-4 
        flex  flex-col 
        shadow-2xl
        mb-12
        `}>
            <form>
            <div className="flex flex-row items-center justify-between w-full">
                <h1 className="text-3xl uppercase font-bold  mt-2 ">Futures Calculator {long ? <span className={` ${mode === "light" ? "text-[#28a733]" : "text-[#2ae937]"}  text-3xl`}>Long</span> : 
                <span className={` ${mode === 'light' ? 'text-[#d82e2e]' : 'text-[#ff6666]'} text-3xl`}>Short</span>} </h1>
                
                <div className="lg:text-sm text-[11px] italic  mt-2 flex flex-row items-center justify-center">
                    <div className="text-lg">
                    <IoHelpCircleOutline />
                    </div>
                    
                    <span>
                     Take into account the fees and volatility might vary overtime.
                    </span>
                    
                </div>
            </div>
            
            <div className="flex flex-col items-between mt-4">
                <div className="flex flex-row  my-2 w-full flex-wrap">
                    {[
                        {label: "Cost / Margin:", value: currentInitial, funcT: (e: React.ChangeEvent<HTMLInputElement>)=>setcurrentInitial(parseFloat(e.target.value))},
                        {label: "Buy Price:: ", value: currentPrice, funcT: (e: React.ChangeEvent<HTMLInputElement>)=>setcurrentPrice(parseFloat(e.target.value))},
                        {label: "Sell Price:", value: currentSell, funcT: (e: React.ChangeEvent<HTMLInputElement>)=>seturrentSell(parseFloat(e.target.value))},
                        {label: "Leverage:", value: leverage, funcT: (e: React.ChangeEvent<HTMLInputElement>)=>setLeverage(parseFloat(e.target.value))},
                        {label: "Costs Fee:", value: exitFee, funcT: (e: React.ChangeEvent<HTMLInputElement>)=>setExitFee(parseFloat(e.target.value))},
                    ].map((data) => 
                    <div className="flex flex-col lg:w-[300px] md:w-[200px] w-[150px] mb-6">
                        <label htmlFor="" className="  lg:text-lg font-semibold text-md mb-3">{data.label}</label>
                        <div className="flex">
                            <span className="inline-flex items-center px-3 lg:text-xl text-md
                            text-gray-900   bg-[#9ccddc] border border-r-0 border-gray-300 
                            rounded-l-md ">
                            $
                            </span>
                            <input min="0" onChange={data.funcT} value={data.value}
                            type="number" className={`border-[1px] border-[#9ccddc] 
                            lg:w-[170px] lg:h-[35px] 
                            w-[105px] h-[30px] 
                            lg:text-xl md:text-lg text-md
                            rounded-sm ${mode === 'light' ? "bg-slate-200/90" : "bg-[#02121c]"}  p-1 `} />
                        </div>
                    </div>
                    )}
                    <div className={`w-full lg:h-[125px] md:h-[100px] h-[100%] mt-3 
                        ${mode === 'light' ? "bg-slate-200/50" : "bg-[#02121c]"} rounded-xl`}>
                    <div className="flex flex-row justify-around flex-wrap lg:mt-2 md:mt-1 mt-1">
                        {[
                            {label: "Contract quantity:", logic: currentPrice && leverage ? 
                            <h1 className={`lg:text-2xl md:text-xl text-[16px] text-glow font-semibold ${mode === 'light' ? "text-blue-900" : "text-blue-300"}`}>
                                {((currentInitial*leverage)/currentPrice).toFixed(2)}
                            </h1>
                            : 
                            <h1 className={`lg:text-2xl md:text-xl text-[16px] text-glow font-semibold ${mode === 'light' ? "text-blue-900" : "text-blue-300"}`}>
                            0
                            </h1>},
                            {label: "Profit / Loss:", logic: long ? (
                                <h1 className={`lg:text-2xl md:text-xl text-[16px] text-glow font-semibold 
                                ${(finaltotal > currentInitial || total == 0) ?  `${mode === "light" ? "text-[#28a733]" : "text-[#2ae937]"}` : `${mode === 'light' ? 'text-[#d82e2e]' : 'text-[#ff6666]'}`}`
                                }>
                                  ${exitFee ? (long && finaltotal >= 0 ? (Math.abs((finaltotal))).toLocaleString() : (Math.abs((finaltotal))).toLocaleString())
                                  :
                                  (total.toFixed(2))}
                                </h1>
                            ) : (
                                <h1 className={`lg:text-2xl md:text-xl text-[16px] text-glow font-semibold 
                                ${(finaltotal > currentInitial || total == 0) ?  `${mode === 'light' ? 'text-[#d82e2e]' : 'text-[#ff6666]'}` : `${mode === "light" ? "text-[#28a733]" : "text-[#2ae937]"}`}`
                                }>
                                  ${exitFee ? (short && finaltotal <= 0 ? (Math.abs((finaltotal))).toLocaleString() : (Math.abs((finaltotal))).toLocaleString())
                                  :
                                  (total.toFixed(2))}
                                </h1>
                            )},
                            {label: "Multipler:", logic: long ? (
                                <h1 className={`lg:text-2xl md:text-xl text-[16px] text-glow font-semibold 
                                ${finaltotal > currentInitial || total == 0 ?  `${mode === "light" ? "text-[#28a733]" : "text-[#2ae937]"}` : `${mode === 'light' ? 'text-[#d82e2e]' : 'text-[#ff6666]'}`}`
                                }>
                                    {long && multiplier > 0 ? (Math.abs((multiplier))).toLocaleString() :(Math.abs((multiplier))).toLocaleString()} x
                               </h1>
                            ) : (
                                <h1 className={`lg:text-2xl md:text-xl text-[16px] text-glow font-semibold 
                                ${finaltotal > currentInitial || total == 0 ?  `${mode === 'light' ? 'text-[#d82e2e]' : 'text-[#ff6666]'}` : `${mode === "light" ? "text-[#28a733]" : "text-[#2ae937]"}`}`
                                }>
                                    {short && multiplier < 0 ?(Math.abs((multiplier))).toLocaleString() :(Math.abs((multiplier))).toLocaleString()} x
                               </h1>
                            )},
                            {label: "Liquidation price::", logic: long ? (currentPrice && leverage && currentInitial && long ? 
                                <h1 className={`lg:text-2xl md:text-xl text-[16px] text-glow font-semibold ${mode === 'light' ? "text-blue-900" : "text-blue-300"}`}>
                                    ${((currentPrice - (100/leverage)/100*currentPrice) + currentPrice*(0.004)).toFixed(2)}
                                </h1>
                                : 
                                <h1 className={`lg:text-2xl md:text-xl text-[16px] text-glow font-semibold ${mode === 'light' ? "text-blue-900" : "text-blue-300"}`
                                }> 0 </h1>
                              ) : (
                                currentPrice && leverage && currentInitial && short ? <h1 className={`lg:text-2xl md:text-xl text-[16px] text-glow font-semibold 
                                ${mode === 'light' ? "text-blue-900" : "text-blue-300"}`
                                }>
                                    ${((currentPrice + (100/leverage)/100*currentPrice) + currentPrice*(0.004)).toFixed(2)}
                                </h1>
                                : 
                                <h1 className={`lg:text-2xl md:text-xl text-[16px] text-glow font-semibold ${mode === 'light' ? "text-blue-900" : "text-blue-300"}`
                                }> 0</h1>
                            )}].map((data) => 
                            <div className="flex flex-col items-center">
                                <h1 className=" text-glow font-bold
                                lg:text-lg md:text-md text-[11px]">{data.label}</h1>
                                <div className={`rounded-xl ${mode === 'light' ? "newscard-filter-light" : "bg-[#040d11]"} 
                                lg:w-[120px] lg:h-[60px] 
                                md:w-[110px] md:h-[50px] 
                                w-[150px] h-[55px] 
                                my-1 flex items-center justify-center`}>
                                   {data.logic}
                                </div>
                            </div>
                        )}

             
                    </div>    
                 </div>
                    <div className="flex flex-row lg:w-[300px] md:w-[200px] w-[100%] lg:mb-6 md:mb-6 mb-1 mt-5 lg:ml-1 md:ml-0 ml-0">
                        <div className="flex items-center justify-center w-[100%]">
                            {[
                                {funcT: handleSubmit, label: "Calculate"},
                                {funcT: handleReset, label: "Reset"},
                                {funcT: switchL, label: "Long"},
                                {funcT: switchS, label: "Short"},
                            ].map((data) => 
                            <button onClick={data.funcT} className={`lg:text-lg font-semibold
                            lg:w-[100px] w-[25%]  lg:h-[40px] h-[36px] px-1 mx-1   border-[1px] rounded-lg duration-200 ease-in-out hover:scale-[1.04]
                            ${
                                mode === "light"
                                  ? "border-[#0b2027] newscard-filter-light font-semibold text-blue-900 hover:bg-[#274163] hover:text-white focus:outline-none focus:ring focus:ring-[#a2e9ff] active:bg-[#b0ecff]"
                                  : "border-[#9ccddc] bg-[#062c43] text-white hover:bg-[#ced7e0] focus:outline-none focus:ring focus:ring-[#9ccddc] active:bg-[#9ccddc]"
                              }
                            `}>{data.label}</button>
                            )}
                        </div>
                    </div>                        
                </div>
            </div>
        </form>    
    </div>
    )
}
export default LeverageCalculator;