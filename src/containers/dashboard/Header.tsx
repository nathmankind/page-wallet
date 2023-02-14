import { useAuth } from "../../zustand/auth.store";
import { Button } from "../../components/Button/Button";

const DashboardHeader = () => {
  const userProfile = useAuth.getState().profile as any;

  return (
    <header className="h-20 w-full sticky top-0 bg-white shadow-sm z-50 overflow-hidden">
      <div className="px-6 h-full flex justify-between items-center">
        <div>
          <Button label="+ Add Money" />
        </div>
        <div className="flex items-center">
          <div className="px-6 flex border-r items-center border-gray-400">
            <img src="" className="w-5 cursor-pointer mr-7" alt="" />
            <div className="px-6 flex font-normal inactive-nav items-center cursor:pointer">
              <img src="" className="w-5 cursor-pointer mr-4" alt="" />
            </div>
          </div>

          <div className="flex items-center">
            <div className="relative">
            <img src="/icons/bell.svg" className="w-6 h-6" alt="" />
            <img src="/icons/notify.svg" className="w-4 h-4 bg-white border-2 rounded-full border-white absolute bottom-[12px] left-[12px] " alt="" />
            </div>
           
          
            <span className="w-16 h-16 rounded-full flex items-center justify-center">
              <img src="/images/avatar.svg" className="h-10 w-10" alt="" />
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
