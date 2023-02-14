import { ChevronDownIcon } from "@heroicons/react/24/solid";
import React from "react";

export interface IGraphWrapperProps {
  graphTitle: string;
  children: React.ReactNode;
  extraHeader?: React.ReactNode;
}
export const GraphWrapper = ({
  graphTitle,
  children,
  extraHeader,
}: IGraphWrapperProps) => {
  return (
    <div className="w-full bg-white rounded-lg p-6">
      <div className=" pb-5 border-b">
        <div className="flex justify-between">
          <h4>{graphTitle}</h4>

          <button className="block flex items-center gap-x-4 bg-gray-200 p-2 rounded">
            <p className="block text-sm text-gray-600">2022</p>
            <ChevronDownIcon className="my-auto text-gray-600 text-xs w-5" />
          </button>
        </div>
        {extraHeader}
      </div>

      <div className="h-80 overflow-y-auto py-2">{children}</div>
    </div>
  );
};
