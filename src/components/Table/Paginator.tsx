import clsx from "clsx";
import { useMemo } from "react";



interface ITmpPaginator {
    page: number;
    setPage?: (page: number) => void;
    pageSize: number;
    totalRows?: number;
    currentLength: number;
    loading: boolean;
  }
  const LEFT_PAGE = "LEFT";
  const RIGHT_PAGE = "RIGHT";
  const pageNeighbours = 0;
  type PageNumber = "LEFT" | "RIGHT" | number;
  
 export const Paginator = ({
    page = 1,
    pageSize = 1,
    setPage,
    loading = false,
    totalRows = 0,
    currentLength,
  }: ITmpPaginator) => {
    const pageNumbers = useMemo<PageNumber[]>(() => {
      const totalPages = totalRows ? Math.ceil(totalRows / pageSize) : 0;
      const totalNumbers = pageNeighbours * 2 + 3;
      const totalBlocks = totalNumbers + 2;
      if (totalPages > totalBlocks) {
        const startPage = Math.max(2, page - pageNeighbours);
        const endPage = Math.min(totalPages - 1, page + pageNeighbours);
  
        let pages: Array<PageNumber> = numberRange(startPage, endPage);
  
        const hasLeftSpill = startPage > 2;
        const hasRightSpill = totalPages - endPage > 1;
        const spillOffset = totalNumbers - (pages.length + 1);
        switch (true) {
          // handle: (1) ... {5 6} [7] {8 9} (10)
          case hasLeftSpill && !hasRightSpill: {
            const extraPages = numberRange(
              startPage - spillOffset,
              startPage - 1
            );
            pages = [LEFT_PAGE, ...extraPages, ...pages];
            break;
          }
  
          // handle: (1) {2 3} [4] {5 6} ... (10)
          case !hasLeftSpill && hasRightSpill: {
            const extraPages = numberRange(endPage + 1, endPage + spillOffset);
            pages = [...pages, ...extraPages, RIGHT_PAGE];
            break;
          }
  
          // handle: (1) ... {4 5} [6] {7 8} ... (10)
          case hasLeftSpill && hasRightSpill:
          default: {
            pages = [LEFT_PAGE, ...pages, RIGHT_PAGE];
            break;
          }
        }
  
        return [1, ...pages, totalPages];
      }
      return numberRange(1, totalPages);
    }, [page, totalRows, pageSize]);
    const getRemainingPageNums = (index: number) => {
      const lowerBound = Number(pageNumbers[index - 1]);
      const upperBound = Number(pageNumbers[index + 1]);
      return numberRange(lowerBound + 1, upperBound - 1);
    };
    const isActivePage = (p: number) => {
      return page === p;
    };
    const leftArrowDisabled = page === 1 || loading;
  
    const rightArrowDisabled = page * pageSize >= (totalRows ?? 1) || loading;
  
    const btnPrevClick = () => setPage?.(page - 1);
  
    const btnNextClick = () => setPage?.(page + 1);
    const classes = {
      paginator: "flex items-center text-sm",
      btnClass: "h-9 min-w-[2.25rem] mx-1 rounded focus:outline-none disabled:text-zp-line",
      btnNext: "inline-flex items-center justify-center",
      btnPrev: "inline-flex items-center justify-center",
      item: " h-9 min-w-[2.25rem] bg-primary-light px-3 py-1 cursor-pointer text-primary",
      itemActive: "!text-white !bg-primary-color px-4",
      dropDown: "dropdown-dots relative inline-block !bg-transparent [&>ul]:hover:visible",
      dropdownMenu: clsx(
        "invisible",
        "absolute rounded-md bottom-1 transform origin-center",
        "bg-white px-4 max-h-56 overflow-y-auto overflow-x-hidden w-full",
        "flex flex-col justify-center items-center",
        "text-gray-100 shadow"
      ),
      dropDownbtnClass:clsx("!bg-transparent"),
      dropdownMenuItem: clsx(
        "hover:bg-gray-100 text-zp-placehold  rounded-md cursor-pointer px-3 py-2"
      ),
    };
    return (
      <div className={clsx(classes.paginator)}>
        <button
          title="Previous"
          onClick={btnPrevClick}
          disabled={leftArrowDisabled}
          className={clsx([
            classes.btnClass,
            classes.btnPrev,
            leftArrowDisabled
              ? "cursor-not-allowed text-gray-500"
              : "cursor-pointer text-primary",
          ])}
        >
          Prev
        </button>
  
        {pageNumbers.map((pageNum, index) => {
          const getPageNum = getRemainingPageNums(index);
          const isPageNum = isPageNumber(pageNum);
          if (isPageNum || getPageNum.length === 1) {
            return (
              <button
                disabled={loading}
                onClick={() =>
                  setPage?.(Number(isPageNum ? pageNum : getPageNum[0]))
                }
                key={`table-paginator-item_${index}`}
                className={clsx(
                  classes.item,
                  classes.btnClass,
                  isActivePage((isPageNum ? pageNum : getPageNum[0]) as number) &&
                    classes.itemActive
                )}
              >
                {isPageNum ? pageNum : getPageNum[0]}
              </button>
            );
          }
          return (
            <div key={"item_" + index} className={clsx(classes.dropDown)}>
              <button className={clsx(classes.btnClass, classes.item, classes.dropDownbtnClass)}>
                ...
              </button>
              <ul className={clsx(classes.dropdownMenu)}>
                {getRemainingPageNums(index).map(
                  (otherPageNum, otherPageIndex) => (
                    <li
                      onClick={() => setPage?.(otherPageNum)}
                      key={`hellip${otherPageIndex}`}
                      className={clsx(classes.dropdownMenuItem)}
                    >
                      {otherPageNum}
                    </li>
                  )
                )}
              </ul>
            </div>
          );
        })}
  
        <button
          title="Next"
          onClick={btnNextClick}
          disabled={rightArrowDisabled}
          className={clsx([
            classes.btnClass,
            classes.btnNext,
            rightArrowDisabled
              ? "cursor-not-allowed text-gray-500"
              : "cursor-pointer text-primary",
          ])}
        >
         Next
        </button>
      </div>
    );
  };
  
  const numberRange = (start: number, end: number): number[] => {
    const numbers: number[] = [];
    for (let i = start; i <= end; i++) {
      numbers.push(i);
    }
    return numbers;
  };
  const isPageNumber = (pageNum: string | number): boolean => {
    const allowed: Array<string | number> = [LEFT_PAGE, RIGHT_PAGE];
    return !allowed.includes(pageNum);
  };
  