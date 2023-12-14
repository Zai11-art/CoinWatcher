import { useState } from "react";
import { IoClose, IoEyeOutline } from "react-icons/io5";
import AiChatComponent from "./AiChatComponent";


const AiWidget = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="z-[0]">
      <div className="fixed bottom-[-250px] right-1 z-[101] duration-150 ease-in-out hover:scale-[1.02] cursor-pointer">
        <div
          onClick={() => setOpen(!open)}
          className="bg-[#9ccddc] 
                md:h-[50px] md:w-[50px] 
                h-[50px] w-[50px]
                lg:right-[19px] lg:top-[-360px] 
                md:right-[19px] md:top-[-355px] 
                right-[10px] top-[-350px]
                z-[2] 
                rounded-full absolute 
                 "
        ></div>
        <div
          className="absolute 
                lg:right-[26px] lg:top-[-353px] 
                md:right-[26px] md:top-[-347px] 
                right-[19px] top-[-340px]
                md:text-4xl text-3xl 
                text-[#062c43] z-[100]
                hover:text-[white] 
                duration-150 ease-in-out hover:scale-[1.04] cursor-pointer"
        >
          <div onClick={() => setOpen(!open)}>
            {open ? <IoClose/> : <IoEyeOutline/>}
          </div>
        </div>
      </div>
      <div
        className={` fixed bottom-[140px] z-[100]
            ${open ? "right-6 " : "right-[-500px] "}  
            duration-300 ease-in-out`}
      >
         <AiChatComponent /> 
      </div>
    </div>
  );
};

export default AiWidget;

// HEX CODES:
// #062c43
// #054569
// #5591a9
// #9ccddc
// #ced7e0
