import React from "react";
import { Button } from "../../components/Button/Button";
import { useMutation } from "react-query";
import { AuthService } from "../../services/auth.service";
import { FormikProvider, useFormik } from "formik";
import { Asserts, object, string } from "yup";
import { TextInput } from "../../components/FormInputs/TextInput";
import { AuthActions } from "../../zustand/auth.store";
import { useNavigate } from "react-router-dom";
import OtpInput from "react18-input-otp";
import { useSingleState } from "../../hooks/useSingleState";
import { toast } from "react-hot-toast";

export const CreatePIN = () => {
  const navigate = useNavigate();
  const otp = useSingleState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    submitLogin.mutate();
  };

  const submitLogin = useMutation(
    async () => {
      return await AuthService.setPin({ pin: otp.get });
    },
    {
      onSuccess: (response) => {
        toast.success("Pin created successfuly");
      },
      onError: (err: any) => {
        console.log("ERROR", err.response);
        toast.error("An error occured");
      },
    }
  );
  return (
    <div>
      <div className="card bg-white rounded-md p-9">
        <div className="text-center mb-5 mt-2">
          <h4 className=" font-bold leading-10">Create PIN</h4>
          <p className="text-[#83879B] text-[14px]">
            Transaction PIN is a 4-digit, which will be used to authorize <br />{" "}
            your transactions
          </p>
        </div>
        <div>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="shadow rounded-lg -grey-200 p-6">
              <OtpInput
                value={otp.get}
                onChange={otp.set}
                numInputs={4}
                isInputNum
                isInputSecure
                //   disabledStyle={validateOtp.isLoading}
                separator={<span className="h-0.5 w-5 bg-rp-grey-3 block " />}
                inputStyle="!h-[70px] rounded-[14px] !w-[70px] flex-shrink-0 flex-1 w-full  !bg-[#F9F9F9] block rounded-md text-2xl text-center"
                focusStyle="border-2 border-rp-orange outline-none"
                containerStyle="w-full flex justify-center"
              />
              <div className=" text-gray-500 my-4">
                Provide your secret transaction pin
              </div>
              <div className="mt-4">
                <Button
                  label="Done"
                  className="justify-center"
                  fullWidth
                  isLoading={submitLogin.isLoading}
                  type="submit"
                  disabled={false}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
