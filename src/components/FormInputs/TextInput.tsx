import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { useRef, useState } from "react";
import { ErrorWrapper } from "./ErrorWrapper";
import { Label } from "./Label";

interface ITextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  floating?: boolean;
  required?: boolean;
  error?: string;
  type?: "text" | "number" | "password" | "email" | "tel" | "color" | "date";
  variant?: "outline" | "filled";
  context?: boolean;
  icon?: string;
  
  action?: React.ReactNode;
}

export const TextInput = ({
  variant = "outline",
  label = "",
  required = true,
  error = "",
  context = false,
  floating = false,
  icon,
  action,
  ...props
}: ITextInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [_focused, setFocused] = useState(false);
  const [_showText, setShowText] = useState(false);



  return (
    <ErrorWrapper show={context} name={props.name}>
      <div className="flex flex-col relative">
        <Label
          label={label}
          required={required}
          floating={floating}
          inputInFocus={_focused || Boolean(props.value)}
        />
        
        {icon && !floating && (
          <img
            className={clsx(
              "h-4 w-4 absolute left-3",
              label ? "top-[41px]" : " top-[18px]"
            )}
            alt=""
            src={icon}
          />
        )}
        <input
          ref={inputRef}
          className={clsx(
            variant === "filled" && "bg-[#F7F7FC]",
           
            "form-control",
            icon && !floating && "!pl-9",
            props.type === "color" && "w-full",
            (props.readOnly || props.disabled) && "bg-gray-100"
          )}
          {...props}
          type={props.type === "password" && _showText ? "text" : props.type}
          onFocus={(e) => {
            setFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            props.onBlur?.(e);
          }}
          onAnimationStart={(e) => {
            if (e.animationName === "onAutoFillStart") {
              setFocused(true);
            }
          }}
        />

        {action && (
          <div className="flex cursor-pointer absolute top-1/2 -translate-y-1/2 right-0">
            {action}
          </div>
        )}
      </div>
    </ErrorWrapper>
  );
};
