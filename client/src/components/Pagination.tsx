import { useSelector } from "react-redux";
import { RootState } from "../state";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";

interface Pagination {
  totalPosts: number;
  postsPerPage: number;
  setCurrentPage: (page: number) => void;
  currentPage: number;
}

const Pagination = ({
  totalPosts,
  postsPerPage,
  setCurrentPage,
  currentPage,
}: Pagination) => {
  const mode = useSelector((state: RootState) => state.mode);

  let pages = [];
  const totalPages = Math.ceil(totalPosts / postsPerPage);
  const maxPagesToShow = 4; // Number of nearest pages to show

  let startPage = currentPage - Math.floor(maxPagesToShow / 2);
  if (startPage < 1) {
    startPage = 1;
  }
  let endPage = startPage + maxPagesToShow - 1;
  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = endPage - maxPagesToShow + 1;
    if (startPage < 1) {
      startPage = 1;
    }
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <div className="pagination my-2 flex flex-row flex-wrap items-center justify-center">
      {currentPage > 1 && (
        <button
          aria-label="back button"
          className={`p-1 ${
            mode === "light"
              ? "newscard-filter-light text-[#054569]"
              : "bg-[#054569] text-[#ced7e0]"
          } mx-[2px] my-[2px] rounded-md px-2 text-[15px] duration-200  hover:scale-[1.1] md:mx-[5px] md:text-[12px] lg:mx-[5px] lg:text-[15px]`}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          <IoChevronBackOutline />
        </button>
      )}
      {startPage > 1 && (
        <button
          className={`p-1 ${
            mode === "light"
              ? "newscard-filter-light text-[#080e11]"
              : "bg-[#054569] text-[#ced7e0]"
          } mx-[2px] my-[2px] rounded-md px-2  duration-200  hover:scale-[1.1] md:mx-[5px] text-sm `}
          onClick={() => setCurrentPage(1)}
        >
          First
        </button>
      )}
      {pages.map((page, index) => (
        <button
          className={`p-1 ${
            mode === "light"
              ? "newscard-filter-light text-[#054569]"
              : "bg-[#054569] text-[#ced7e0]"
          } mx-[2px] my-[2px] rounded-md px-2 duration-200  hover:scale-[1.1] md:mx-[5px] text-xs lg:mx-[5px] ${
            page === currentPage ? "active" : ""
          }`}
          key={index}
          onClick={() => setCurrentPage(page)}
        >
          {page}
        </button>
      ))}
      {endPage < totalPages && (
        <button
          className={`p-1 ${
            mode === "light"
              ? "newscard-filter-light text-[#054569]"
              : "bg-[#054569] text-[#ced7e0]"
          } mx-[2px] my-[2px] rounded-md px-2 text-[15px] duration-200  hover:scale-[1.1] md:mx-[5px] md:text-[12px] lg:mx-[5px] lg:text-[15px]`}
          onClick={() => setCurrentPage(totalPages)}
        >
          Last
        </button>
      )}
      {currentPage < totalPages && (
        <button
          aria-label="next button"
          className={`p-1 ${
            mode === "light"
              ? "newscard-filter-light text-[#054569]"
              : "bg-[#054569] text-[#ced7e0]"
          } mx-[2px] my-[2px] rounded-md px-2 text-[15px] duration-200  hover:scale-[1.1] md:mx-[5px] md:text-[12px] lg:mx-[5px] lg:text-[15px]`}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          <IoChevronForwardOutline />
        </button>
      )}
    </div>
  );
};

export default Pagination;

// HEX CODES:
// #062c43
// #054569
// #5591a9
// #9ccddc
// #ced7e0
