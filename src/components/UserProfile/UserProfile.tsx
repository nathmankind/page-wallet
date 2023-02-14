import { Button } from "../Button/Button";

interface IUserProfile {
  userDetails: { label: string; value: string }[];
  actions: React.ReactNode;
}

export const UserProfile = ({ userDetails, actions }: IUserProfile) => {
  return (
    <div className="bg-white p-6 rounded-2xl w-2/3">
      <div className="flex justify-end">
        <div className="flex gap-3">
          <div className="text-pc-lightblue">Edit Information</div>
          <img src="/icons/pen.svg" alt="" />
        </div>
      </div>
      <div className="mx-auto">
        <img
          src="/images/avatar.svg"
          className="mx-auto rounded-[30%] border border-grey-200 w-[200px] h-[200px]"
          alt=""
        />
      </div>

      {userDetails.map((info, i) => (
        <div
          key={i}
          className="flex justify-between py-4 border-b border-grey-100"
        >
          <div className="text-gray-500">{info.label}</div>
          <div className="font-semibold">{info.value}</div>
        </div>
      ))}

      <div className="flex gap-5 justify-center mt-8 mb-4">{actions}</div>
    </div>
  );
};
