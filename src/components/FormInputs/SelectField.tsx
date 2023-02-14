import React from "react";
import ReactSelect from "react-select";
import clsx from "clsx";
import { Label } from "./Label";
import { ErrorWrapper } from "./ErrorWrapper";
import { useDebouncedCallback } from "use-debounce";
import { useSingleState } from "../../hooks/useSingleState";
interface SelectProps {
  label?: string;
  options?: Array<
    | {
        label: string | React.ReactNode;
        value: string | number;
        isDisabled?: boolean;
      }
    | string
  >;
  required?: boolean;
  value?: Array<string | number> | string | number;
  onChange?: (value: Array<string | number> | string | number) => void;
  error?: string | boolean;
  placeholder?: string;
  className?: string;
  readonly?: boolean;
  isLoading?: boolean;
  context?: boolean;
  name?: string;
  isSearchable?: boolean;
  floating?: boolean;
  onInputChange?: (newValue: string) => void;
  onFocus?: () => void;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  DropDownIndicator?: React.FC;
  multiple?: boolean;
  noOptionsMessage?: string;
}

export const SelectField = ({
  label,
  options = [],
  value,
  onChange,
  error,
  className,
  readonly = false,
  isSearchable = true,
  context = true,
  floating = true,
  required = true,
  multiple,
  ...props
}: SelectProps) => {
  const selectOptions = options.map((opt) => ({
    label: typeof opt === "string" ? opt : opt.label,
    value: typeof opt === "string" ? opt : opt.value,
    isDisabled: typeof opt === "string" ? undefined : opt.isDisabled,
  }));
  const focused = useSingleState(false);
  const debounce = useDebouncedCallback((value: string) => {
    props.onInputChange?.(value);
  }, 700);
  return (
    <ErrorWrapper show={context} name={props?.name}>
      <div className="flex flex-col relative">
        <Label
          label={label}
          required={required}
          floating={floating}
          inputInFocus={
            !!value?.toString() || !!props.placeholder || focused.get
          }
        />
        <div
          className={clsx([
            "w-full whitespace-nowrap min-w-[150px]",
            multiple ? " min-h-[56px]" : floating ? "h-14" : "h-12",
            className,
          ])}
        >
          <ReactSelect
            name=""
            onInputChange={(e) => debounce(e)}
            isSearchable={isSearchable}
            onFocus={(e) => {
              props.onFocus?.();
              focused.set(true);
            }}
            isMulti={multiple}
            onBlur={(e) => {
              props.onBlur?.(e);
              focused.set(false);
            }}
            filterOption={props.onInputChange ? () => true : undefined}
            isLoading={props.isLoading}
            isDisabled={readonly}
            options={selectOptions}
            placeholder={props.placeholder ?? ""}
            menuPortalTarget={document.body}
            noOptionsMessage={
              props.noOptionsMessage ? () => props.noOptionsMessage : undefined
            }
            menuShouldBlockScroll
            value={
              !value
                ? null
                : multiple && Array.isArray(value)
                ? selectOptions.filter((v) => value?.includes(v.value))
                : selectOptions.find((v) => v.value === value)
            }
            onChange={(value) => {
              if (multiple && Array.isArray(value)) {
                onChange?.(
                  ((value ?? []) as { label: string; value: any }[])?.map(
                    (v) => v.value
                  ) as unknown as string[]
                );
              } else if (value) {
                onChange?.((value as { label: string; value: any }).value);
              }
            }}
            components={{
              IndicatorSeparator: () => null,
              ...(props.DropDownIndicator
                ? {
                    DropdownIndicator: props.DropDownIndicator ?? undefined,
                  }
                : {}),
            }}
            menuPosition={"fixed"}
            menuPlacement={"auto"}
            styles={{
              option: (provided, state) => ({
                ...provided,
                paddingTop: "10px",
                paddingBottom: "10px",
                backgroundColor: state.isSelected ? "#0166FF" : "transparent",
                color: state.isDisabled
                  ? "#aaa"
                  : state.isSelected
                  ? "white"
                  : "#1B1B1B",
                ":hover": {
                  backgroundColor: !state.isDisabled ? "#0166FF11" : undefined,
                  color: !state.isDisabled ? "black" : undefined,
                  cursor: state.isDisabled ? "not-allowed" : "pointer",
                },
              }),
              menuPortal: (base) => ({
                ...base,
                zIndex: 999,
              }),
              valueContainer: (provided, state) => ({
                ...provided,
                height: "100%",
                borderRadius: "4px",
                minWidth: "300",
                paddingLeft: "14px",
                paddingTop: !floating
                  ? "0px"
                  : !!value || !!props.placeholder
                  ? multiple
                    ? "24px"
                    : "14px"
                  : "",
              }),
              control: (provided, state) => ({
                ...provided,
                height: "100%",
                borderRadius: "4px",
                boxShadow: "none",
                border: state.isFocused
                  ? "1px solid #0166FF"
                  : "1px solid #EAECF0",
                "&:hover": {
                  border: state.isFocused
                    ? "1px solid rgb(108 63 188)"
                    : "1px solid rgb(112 112 112 / 0.5)",
                },
              }),
              container: (provided, state) => ({
                ...provided,
                height: "100%",
              }),

              dropdownIndicator: (provided, state) => ({
                ...provided,
                rotate: state.isFocused ? "180deg" : "0deg",
              }),
            }}
          />
        </div>

        {error && <span className="text-xs text-kRed mt-1">{error}</span>}
      </div>
    </ErrorWrapper>
  );
};
