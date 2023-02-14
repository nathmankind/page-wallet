import clsx from "clsx";

export const Label = (props: {
  label?: string;
  required?: boolean;
  floating?: boolean;
  inputInFocus?: boolean;
}) => {
  const { label, required, floating, inputInFocus } = props;
  return label ? (
    <label
      className={clsx(
        "leading-4 h-4 text-zp-placehold mb-[4px] block text-gm-blue-main font-normal",
        !floating && "text-sm",
        floating && "absolute z-[1] left-4 transition-all duration-300",
        floating &&
          (inputInFocus
            ? "text-[11px] font-normal top-1.5"
            : "top-1/2 -translate-y-1/2 pointer-events-none")
      )}
    >
      <span>
        {label}
        {(!floating && required) || (required && floating && inputInFocus) ? (
          <span className="text-red-500">*</span>
        ) : null}
      </span>
    </label>
  ) : (
    <></>
  );
};
