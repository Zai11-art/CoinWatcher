import { useSelector } from "react-redux";

import { RootState } from "../state";

const Loader = () => {
  const mode = useSelector((state: RootState) => state.mode);

  return (
    <div className="flex justify-center items-center">
      <div
        className={`flex items-center justify-center absolute text-sm ${
          mode === "light" ? "text-blue-900" : "text-[#c6f2ff]"
        }  text-glow`}
      >
        <h1 className="text-md text-[#c6f2ff]">Loading Data...</h1>
      </div>
      <div
        className={`animate-spin rounded-full h-32 w-32 border-b-2 ${
          mode === "light" ? "border-blue-400" : ""
        } border-[#9ccddc]`}
      />
    </div>
  );
};

export default Loader;
