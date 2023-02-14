import clsx from "clsx";
import { ErrorMessage } from "formik";

export const ErrorWrapper = (props: {
  children: React.ReactNode;
  show: boolean;
  name?: string;
  errorClassName?: string;
}) => {
  return (
    <div className="flex flex-col">
      {props.children}
      {props.show && props?.name && (
        <ErrorMessage name={props.name}>
          {(msg) =>
            msg ? (
              <span
                className={clsx(
                  props.errorClassName,
                  "text-xs text-red-400 mt-0.5"
                )}
              >
                {msg}
              </span>
            ) : (
              <></>
            )
          }
        </ErrorMessage>
      )}
    </div>
  );
};
