import { Fragment } from "react";

import "./Loader.scss";

interface Proptypes {
  type?: "ring" | "bar";
}
const Loader = ({ type = "ring" }: Proptypes) => {
  return (
    <Fragment>
      {type === "ring" && (
        <svg
          className="animate-spin h-5 w-5 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-100 stroke-white"
            cx="12"
            cy="12"
            r="10"
            strokeWidth="4"
          />
          <path
            className="opacity-80 fill-fara-blue/70"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {type === "bar" && (
        <div className="flex justify-center w-full opacity-60">
          <span className="bar" />
        </div>
      )}
    </Fragment>
  );
};

export default Loader;
