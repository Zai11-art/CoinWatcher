import { Link } from "react-router-dom";
import { useState } from "react";
import { sectionLinks } from "../../data/learnData";
import { useId } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../state";
import { IoClose, IoCodeWorking, IoListOutline, IoLogoBitcoin, IoPrismOutline } from "react-icons/io5";

const faq = [
  {
    id: 0,
    question: "What is cryptocurrency?:",
    answer:
      "This section provides a concise definition of cryptocurrency, highlighting its digital nature and cryptographic security features.",
  },
  {
    id: 1,
    question: "How does cryptocurrency work?:",
    answer:
      "Here, you can explain the fundamental workings of cryptocurrencies, focusing on concepts like blockchain, consensus mechanisms, and transaction verification.",
  },
  {
    id: 2,
    question: "Advantages and disadvantages of cryptocurrencies?:",
    answer:
      "Discuss the benefits of cryptocurrencies such as fast and borderless transactions, financial inclusivity, and potential for innovation. Also, address the drawbacks like price volatility, lack of mainstream adoption, and the potential for scams.",
  },
  {
    id: 3,
    question: "Key terms and concepts?:",
    answer:
      " Introduce essential terms and concepts related to cryptocurrencies, such as blockchain, decentralization, cryptography, public and private keys, and wallets. Explain these concepts in simple language to help beginners grasp the fundamental ideas.",
  },
];

const LearnPage = () => {
  const mode = useSelector((state : RootState) => state.mode);
  const id = useId();
  const [open, setOpen] = useState(false);

  return (
    <div className={`h-[100%] w-[100%] xl:pb-[0%] lg:pb-[0%] md:pb-[0%] pb-[23%] ${mode === "light" ? "bg-slate-200" : "bg-[#050e13]"}`}>
      {/* Bar */}
      <div className={`top-[60px] left-0 shadow-2xl w-full sticky ${mode === 'light' ? "bg-blue-200 text-blue-900 font-semibold" : "bg-[#062436] text-white"}  h-10 z-[50] flex flex-row items-center`}>
        <div
          onClick={() => setOpen(!open)}
          className={`text-3xl w-[45px] ${mode === 'light' ? "bg-blue-200 text-blue-900 " : "bg-[#062436] text-white"}  pl-2  mt-1 hover:text-blue-100 transition-all md:hidden
             duration-150 ease-in-out hover:scale-[1.04] cursor-pointer`}
        >
          <div onClick={() => setOpen(!open)}>
            {open ? <IoClose/> : <IoListOutline/>}
          </div>
        </div>

        <span className="text-glow w-[50px] ml-7 ">Learn</span>
      </div>

      <div className={`flex h-[100%] ${mode === 'light' ? "bg-slate-200 text-blue-900 font-semibold " : "bg-[#062436] text-white"}`}>
        {/* SIDEBAR */}
        <div
          className={`xl:h-relative lg:h-relative md:h-relative 
          xl:h-[1700px] lg:h-[1720px] md:h-[1890px] sm:h-[2000px] h-[2370px]
        md:w-[250px] w-[200px] 
        left-0 
        top-25 
        xl:sticky lg:sticky md:sticky absolute 
        shadow-2xl transition-all ease-in-out z-[30]
        ${mode === 'light' ? "glass-v2-light text-slate-900" : "glass-v2 text-white"}
        ${open ? "left-[50] " : "left-[-360px]"}
        `}
        >
          <ul className="mt-16 px-6 sticky left-4 top-32">
            <div className="flex items-center ">
              <span className="text-2xl">
                <IoCodeWorking />
              </span>
              <span className="  text-xl mb-1 font-bold  ml-1">
                Introduction
              </span>
            </div>
            {sectionLinks.slice(0, 6).map((section, index) => (
              <li
                key={`${id}-${index}-${section.id}`}
                className=" text-md my-2.5 font-normal
              hover:scale-[1.05] cursor-pointer transition-all ease-in-out"
              >
                <Link to={`/Learn/${section.link}`}>{section.name}</Link>
                <div className={`${mode === 'light' ? "bg-blue-900 h-[2px]" : "bg-blue-300 h-[0.9px]"}  w-full  my-2 opacity-20`} />
              </li>
            ))}

            <div className="flex mt-12">
              <span className=" text-2xl">
                <IoPrismOutline />
              </span>
              <span className="  text-xl font-bold mb-2 ml-1">
                Guides
              </span>
            </div>
            {sectionLinks.slice(6).map((section, index) => (
              <li
                key={`${id}-${index}-${section.id}`}
                className=" text-md my-3 font-normal
              hover:scale-[1.05] cursor-pointer transition-all ease-in-out"
              >
                <Link to={`/Learn/${section.link}`}>{section.name}</Link>
                <div className={`${mode === 'light' ? "bg-blue-900 h-[2px]" : "bg-blue-300 h-[0.9px]"}  w-full  my-2 opacity-20`} />
              </li>
            ))}
          </ul>
        </div>

        <div className=" bg-[red] flex flex-col w-full h-[100%]">
          <div
            className={`w-full h-[500px] ${mode === 'light' ? "learn-banner-light text-[#1b4169] text-glow-light" : "learn-banner"}   flex md:flex-row flex-col 
          xl:items-center lg:items-center md:items-center 
          justify-around 
          xl:px-[16%] lg:px-[12%] md:px-[10%] px-[10%]`}
          >
            <div className="flex flex-col w-[50%]">
              <h1 className="text-6xl font-bold  mb-2">
                LEARN CRYPTO.
              </h1>
              <p className="text-md ">
                LFG? learn the meaning of that here anon.
              </p>
              <button
                className={`${mode === 'light' ? "newscard-filter-light text-slate-800 hover:text-slate-200 hover:scale-[1.05]" : "bg-blue-500 hover:bg-blue-200 hover:text-blue-800"}  mt-4 py-1 w-32 font-bold rounded-lg text-sm
             transition-all ease-in-out duration-100
          `}
              >
                Read More
              </button>
            </div>

            <div className="flex flex-col w-[50%]">
              <h1 className="text-6xl font-bold text-center mb-2">
                CRYPTO.
              </h1>
            </div>
          </div>

          {/* <div className="bg-[yellow] h-[2000px]"></div> */}

          <div className={`${mode === 'light' ? "bg-slate-200 text-slate-900" : "bg-[#061016]"}  h-[100%] w-[100%] xl:px-[16%] lg:px-[12%] md:px-[10%] px-[10%]`}>
            <div
              className=" 
          w-[100%]
          h-[100%]
          justify-center flex   
          xl:flex-row lg:flex-row md:flex-row flex-col mt-8"
            >
              <div
                className=" 
          xl:w-[60%] xl:h-[80%] 
          lg:w-[60%] lg:h-[80%] 
          md:w-[50%] md:h-[50%] 
          w-[100%] h-[50%] 
          "
              >
                <h1 className="text-3xl font-bold  mb-4">
                  Introduction
                </h1>
                <p
                  className="
            xl:text-[1.1rem] lg:text-[1.05rem]
            md:text-[0.90rem] text-[0.9rem] 
             mb-2 mr-7"
                >
                  Welcome to the Learning Section of our cryptocurrency website!
                  Here, you'll find a wealth of knowledge and resources to help
                  you navigate the exciting world of cryptocurrencies. Whether
                  you're new to cryptocurrencies or looking to expand your
                  existing knowledge, our comprehensive learning materials will
                  equip you with the essential information needed to understand,
                  invest, and participate in the cryptocurrency ecosystem.
                </p>
              </div>
              <div
                className={` 
          xl:w-[40%] xl:h-[250px] 
          lg:w-[40%] lg:h-[275px] 
          md:w-[50%] md:h-[400px] 
          w-[100%] h-[250px] rounded-xl
          md:my-0 my-6 flex items-center justify-center
           hover:scale-[1.01]  ${mode === 'light' ? "learn-card-banner-light hover:shadow-blue-100/90 shadow-blue-500/90" : "learn-card-banner hover:shadow-yellow-100/50 shadow-yellow-400/50"}
           shadow-xl transition-all ease-in-out`}
              >
                <div
                  className={`text-7xl w-32 h-32 border-[5px] 
              hover:border-[8px] 
             transition-all ease-in-out
            rounded-full btc-card-circle-gradient flex items-center justify-center 
            hover:rotate-[360deg]  ${mode === 'light' ? "text-blue-200 border-blue-300 hover:border-blue-100 hover:text-blue-100" : "text-yellow-200 border-yellow-300 hover:border-yellow-100 hover:text-yellow-100"}` }
                >
                  <IoLogoBitcoin />
                </div>
              </div>
            </div>
            <div
              className=" 
          w-[100%]
          h-[100%]
          justify-center flex   
          xl:flex-row lg:flex-row md:flex-row flex-col mt-8"
            >
              <div
                className=" 
          xl:w-[100%] xl:h-[80%] 
          lg:w-[100%] lg:h-[80%] 
          md:w-[100%] md:h-[50%] 
          w-[100%] h-[50%] 
          "
              >
                <h1 className="text-3xl font-bold  mb-4">
                  Objective
                </h1>
                <p
                  className="
            xl:text-[1.1rem] lg:text-[1.05rem]
            md:text-[0.90rem] text-[0.9rem] 
             mb-2 mr-7"
                >
                  We're committed to providing you with accurate, reliable, and
                  up-to-date information to empower you on your cryptocurrency
                  journey. So, dive in, explore the learning materials, and
                  embark on your path to becoming a knowledgeable participant in
                  the exciting world of cryptocurrencies. Let's get started!
                </p>
              </div>
            </div>

            <div
              className=" 
       
        w-[100%]  h-[100%]
        justify-center flex   
        xl:flex-row lg:flex-row md:flex-row flex-col mt-12"
            >
              <div
                className=" 
        
          w-[100%] h-[50%] 
          "
              >
                <h1 className="text-2xl font-bold  mb-4">
                  Frequently Asked Questions
                </h1>

                <p
                  className="
            xl:text-[1rem] lg:text-[1rem]
            md:text-[0.92rem] text-[0.9rem] 
             mb-7 mr-7"
                >
                  Most common questions asked in and about crypto. Check it out
                  below:
                </p>
                <ul>
                  {faq.map((faq, index) => (
                    <li
                      key={`${faq.id}-${index}-${id}`}
                      className="xl:text-[1rem] lg:text-[1rem]
                    md:text-[0.92rem] text-[0.9rem]  
                 mb-8"
                    >
                      <span className="font-bold mr-2 md:text-lg text-md">
                        {faq.question}
                      </span>

                      <div className="bg-blue-300 w-full h-[0.9px] my-2 opacity-40" />

                      <p
                        className="italic
                  xl:text-[0.93rem] lg:text-[0.9rem]
                  md:text-[0.92rem] text-[0.9rem]"
                      >
                        - {faq.answer}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearnPage;

// HEX CODES:
// #051925
// #062c43
// #054569
// #5591a9
// #9ccddc
// #ced7e0
