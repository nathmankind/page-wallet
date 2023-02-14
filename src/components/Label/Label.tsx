import { type } from '@testing-library/user-event/dist/type';
import React from 'react'



export const Label = ({
    label,
    variant ="success",
  }: {
    label?: string,
    variant?:"danger" | "success" | "warning" | "primary"| "default",
  }) => {
  return (
    <label className={
        `${variant === "danger" && "pc-text-danger pc-danger-shade"}
        ${variant === "success" && "pc-text-success pc-success-shade"}
        ${variant === "warning" && "pc-text-warning pc-warning-shade"}
        ${variant === "primary" && "pc-text-primary pc-primary-shade"}
        ${variant === "default" && "pc-text-gray pc-gray-shade"}
         w-auto px-3 py-1 text-center rounded-lg font-normal pb-1 text-sm whitespace-nowrap`
    }>
        {label}
    </label>
  )
}

