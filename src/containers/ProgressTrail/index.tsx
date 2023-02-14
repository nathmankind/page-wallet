export const ProgressTrail = () => {
  return (
    <div className="mx-auto w-2/3 my-10">
      <div className="flex justify-center">
        <div className="relative">
          <div className="border border-[#0177FD] rounded-full">
            <div className="circle bg-[#0177FD] h-6 w-6 text-center text-white rounded-full m-[2px]">
              1
            </div>
          </div>
          <p className="absolute ml-[-20px]">Recipient</p>
        </div>

        <div className="border-r w-2/5 bg-[#0177FD] h-[1px] my-auto"></div>

        <div className="relative">
          <div className="border border-[#0177FD] rounded-full">
            <div className="circle bg-[#0177FD] h-6 w-6 text-center text-white rounded-full m-[2px]">
              2
            </div>
          </div>
          <p className="absolute ml-[-20px]">Summary</p>
        </div>
        <div className="border-r w-2/5 bg-[#0177FD] h-[1px] my-auto"></div>
        <div className="relative">
          <div className="border border-[#0177FD] rounded-full">
            <div className="circle bg-[#0177FD] h-6 w-6 text-center text-white rounded-full m-[2px]">
              3
            </div>
          </div>
          <p className="absolute ml-[-20px] whitespace-nowrap">Transaction Pin</p>
        </div>
      </div>
    </div>
  );
};
