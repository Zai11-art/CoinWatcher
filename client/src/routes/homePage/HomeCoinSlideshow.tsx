import React, { useEffect, useState } from "react";
import classNames from "classnames";

interface CoinSlideShowData {
  name: string;
  image: string;
}

interface CoinSlideShowType {
  images: CoinSlideShowData[];
}

const CoinSlideShow : React.FC<CoinSlideShowType> = ({images}) => {
  const coinImage = images;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, [images.length]);

  return (
    <div
      className="slideshow-container flex-col  w-[100%] h-[220px] 
    absolute z-[2] lg:mt-[500px] md:mt-[400px] mt-[350px] "
    >
      <div className=" slideshow flex flex-row mb-64">
        {coinImage?.map((image, index) => (
          <img
            key={image.name}
            src={image.image}
            alt={image.name}
            className={classNames(
              "blueFilter absolute xl:w-48 xl:h-48 md:h-32 md:w-32 sm:w-24 sm:h-24 w-16 h-16  object-cover transition-transform duration-200 rounded-full shadow-xl shadow-blue-400/30 cursor-pointer ",
              {
                "translate-x-0 ": index === currentImageIndex,
                "translate-x-full ": index !== currentImageIndex,
              }
            )}
            style={{ left: `${index * 300}px` }}
          />
        ))}
      </div>
    </div>
  );
};

export default CoinSlideShow;

{
  /* <div className="w-[1000px] h-[500px] relative overflow-hidden bg-[yellow]">
  {images.map((image, index) => (
    <img
      key={image.name}
      src={image.image}
      //   alt={image.alt}
      className={classNames(
        "absolute w-12 h-12 object-cover transition-transform duration-500",
        {
          "translate-x-0": index === currentImageIndex,
          "translate-x-full": index !== currentImageIndex,
        }
      )}
      style={{ left: `${index * 300}px` }}
    />
  ))}
</div>; */
}
