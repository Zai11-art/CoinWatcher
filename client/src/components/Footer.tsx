import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useId } from "react";
import { IoLogoDiscord, IoLogoGithub, IoLogoInstagram, IoLogoTwitter } from "react-icons/io5";
import { RootState } from "../state";

const Footer = () => {
  const nameId = useId();
  const mode = useSelector((state : RootState) => state.mode);

  let footerLinks = [
    { name: "Home", link: "/Home", id: 1 },
    { name: "Apps", link: "/Apps", id: 2 },
    { name: "News", link: "/News", id: 3 },
    { name: "About", link: "/About", id: 4 },
  ];

  let iconLinks = [
    {
      icon: <IoLogoGithub />,
      link: "https://github.com/",
      id: 1,
    },
    {
      icon: <IoLogoTwitter />,
      link: "https://twitter.com/",
      id: 2,
    },
    {
      icon: <IoLogoDiscord />,
      link: "https://discord.com/",
      id: 3,
    },
    {
      icon: <IoLogoInstagram />,
      link: "https://instagram.com/",
      id: 4,
    },
  ];

  const textAnimation =
    "duration-150 ease-in-out hover:scale-[1.04] hover:text-[#c9f1fe]";
  return (
    <div className="absolute z-[50] w-full ">
      <div className="h-[2px] w-full bg-[#9ccddc]"></div>
      <footer
        className={`flex h-[180px] w-full flex-col items-center justify-center ${
          mode === "light" ? "bg-[#cee7ff]" : "bg-[#062c43]"
        } 
            md:h-[120px] md:flex-row md:justify-between md:py-3 `}
      >
        <div className="pboin-2 md:ml-7 md:pb-1">
          <h1
            className={`mb-4 text-2xl font-bold ${
              mode === "light" ? "text-[#3259af]" : "text-white"
            }`}
          >
            <span className="text-glow">CoinWatcher</span>
            <span className="span-material text-3xl">.Io</span>{" "}
          </h1>
        </div>
        <div className="pb-2 md:ml-[50px] md:pb-1">
          <ul className="flex flex-row ">
            {footerLinks.map((link) => (
              <li
                className={`md:text-md mx-4 text-sm font-semibold ${
                  mode === "light" ? "text-slate-900" : "text-white"
                } ${textAnimation}`}
                key={link.id}
              >
                <Link key={link.id} to={link.link}>
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="py-2 md:mr-7 md:py-1">
          <div className="flex flex-row ">
            {iconLinks.map((link, index) => (
              <a
                aria-label={`${index}-${nameId}`}
                className={`px-2 ${
                  mode === "light" ? "text-slate-900" : "text-white"
                } md:mr-5 md:text-lg ${textAnimation}`}
                href={link.link}
                key={link.id}
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
