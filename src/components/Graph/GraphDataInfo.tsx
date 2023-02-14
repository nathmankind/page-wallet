

export interface InfoProps {
  header: string;
  value?: string;
  percentage?: string;
  decoratorColor?: string;
  noOfPersons?: string;
}
export const GraphDataInfo = ({
  header,
  value,
  percentage = "",
  decoratorColor,
  noOfPersons,
}: InfoProps) => {
  return (
    <div className={`flex gap-2`}>
      <div className={`h-2 w-2 mt-2 rounded-full bg-[${decoratorColor}]`}></div>
      <div>
        <h3 className="font-normal text-gray-500 text-base mb-1">{header}</h3>
        <div className="mb-1 flex flex-row justify-between items-center">
          {value && (
            <h2 className="font-medium text-black text-2xl ">{value}</h2>
          )}
        </div>

       
      </div>
    </div>
  );
};
