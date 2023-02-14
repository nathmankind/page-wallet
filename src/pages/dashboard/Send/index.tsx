import { FormikProvider, useFormik } from "formik";
import { BreadCrumb } from "../../../components/Breadcrumb";
import { TextInput } from "../../../components/FormInputs/TextInput";
import { ProgressTrail } from "../../../containers/ProgressTrail";
import { Asserts, object, string } from "yup";
import { SelectField } from "../../../components/FormInputs/SelectField";
import { TextAreaInput } from "../../../components/FormInputs/TextArea";
import { Button } from "../../../components/Button/Button";
import { useSingleState } from "../../../hooks/useSingleState";
import OtpInput from "react18-input-otp";
import { currencyFormat } from "../../../utils/helpers";

const Send = () => {
  const step = useSingleState<0 | 1 | 2 | 3>(0);

  const transactionPin = useSingleState("");
  const validationSchema = object({
    from: string().required().label("From"),
    amount: string().required().label("Amount"),
    destination: string().required().label("Destination"),
    account_name: string().required().label("Account name"),
    account_number: string().required().label("Username"),
    description: string().required().label("Description"),
  });
  const form = useFormik<Asserts<typeof validationSchema>>({
    initialValues: {
      from: "",
      amount: "",
      destination: "",
      account_name: "",
      account_number: "",
      description: "",
    },
    validationSchema,
    onSubmit: (values) => {
      step.set(1);
    },
  });

  const Stage = {
    0: "Details",
    1: "Summary",
    2: "",
    3: "",
  };
  return (
    <div>
      <BreadCrumb
        currentPath="Local"
        handleBackAction={() => {}}
        backText="Send"
      />

      {step.get > 2 ? (
        <>
          <div className="mx-auto w-1/2 text-center my-8">
            <h5 className="mb-4 font-bold">Transfer Successful</h5>
            <div className="rounded-lg bg-black text-white p-8">
              <img src="/icons/green-circle.svg" className="mx-auto" alt="" />

              <h6 className="text-white mt-4 ">
                Congratulations your transfer is succesful
              </h6>
              <p>Below is transfer summary</p>

              <div className="border w-fit border-dashed mx-auto border-white rounded-lg p-4 my-6">
                <div className="grid grid-cols-2  gap-x-40 gap-y-5 text-left mb-4">
                  <div className="">
                    <div className="font-semibold">Withdrawal amount</div>
                    <div>N 500000</div>
                  </div>
                  <div>
                    <div className="font-semibold">Name</div>
                    <div>N 500000</div>
                  </div>
                  <div className="">
                    <div className="font-semibold">Account Number</div>
                    <div>06543356766</div>
                  </div>
                  <div>
                    <div className="font-semibold">Destination Bank</div>
                    <div>Access Bank</div>
                  </div>
                </div>
                
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <ProgressTrail />

          <div
            className={`mt-16  mx-auto ${step.get == 2 ? "w-fit" : "w-2/4"}`}
          >
            <div className="card rounded-lg bg-white p-6">
              <h2>{Stage[step.get]}</h2>

              {step.get === 0 && (
                <FormikProvider value={form}>
                  <form onSubmit={form.handleSubmit}>
                    <div className="my-4">
                      <SelectField
                        label="From"
                        placeholder="Select account to debit "
                        options={["0140044833"].map((option) => ({
                          value: option,
                          label: option,
                        }))}
                        floating={false}
                        {...form.getFieldProps("from")}
                        onChange={(val) => form.setFieldValue("from", val)}
                      />
                    </div>

                    <div className="mb-4">
                      <TextInput
                        type="text"
                        label="Amount"
                        {...form.getFieldProps("amount")}
                        placeholder="Enter amount"
                        context
                      />
                    </div>

                    <div className="mb-4">
                      <TextInput
                        type="text"
                        label="Destination Bank"
                        {...form.getFieldProps("destination")}
                        placeholder="Enter amount"
                        context
                      />
                    </div>

                    <div className="mb-4">
                      <TextInput
                        type="text"
                        label="Account Number"
                        {...form.getFieldProps("account_number")}
                        placeholder="Enter amount"
                        context
                      />
                    </div>

                    <div className="mb-4">
                      <TextInput
                        type="text"
                        label="Account Name"
                        {...form.getFieldProps("account_name")}
                        placeholder="Enter amount"
                        context
                      />
                    </div>
                    <div className="mb-6">
                      <TextAreaInput
                        label="Description"
                        {...form.getFieldProps("description")}
                        placeholder="Enter description"
                      />
                    </div>

                    <Button
                      label="Procced"
                      type="submit"
                      className="w-full mt-4"
                      onClick={() => step.set(1)}
                    />
                  </form>
                </FormikProvider>
              )}

              {step.get === 1 && (
                <div className="">
                  <div className="bg-[#FAFAFA] p-4 my-3 rounded-lg">
                    <div className="flex justify-between">
                      <h6 className="font-bold text-normal">
                        Destination Details:
                      </h6>
                      <div className="flex gap-2" onClick={() => step.set(0)}>
                        <img src="/icons/pen.svg" className="w-1/3" alt="" />
                        <span className="text-blue-500">Edit</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-x-16">
                      <div className="text-gray-500">Amount:</div>
                      <div>{currencyFormat(form.values.amount)}</div>
                    </div>
                    <div className="grid grid-cols-2 gap-x-16">
                      <div className="text-gray-500">Bank:</div>
                      <div>{form.values.destination}</div>
                    </div>
                    <div className="grid grid-cols-2 gap-x-16">
                      <div className="text-gray-500">Account Number:</div>
                      <div>015432587618</div>
                    </div>
                    <div className="grid grid-cols-2 gap-x-16">
                      <div className="text-gray-500">Account Name:</div>
                      <div>Ayodeji Fakalawo</div>
                    </div>
                    <div className="grid grid-cols-2 gap-x-16">
                      <div className="text-gray-500">Description:</div>
                      <div>Nil</div>
                    </div>
                  </div>

                  <div className="bg-[#FAFAFA] p-4 my-3 rounded-lg">
                    <div className="flex justify-between">
                      <h6 className="font-bold text-normal">
                        Transaction Details:
                      </h6>
                    </div>
                    <div className="grid grid-cols-2 gap-x-16">
                      <div className="text-gray-500">Transaction Fee:</div>
                      <div>N100</div>
                    </div>
                    <div className="grid grid-cols-2 gap-x-16">
                      <div className="text-gray-500">Total:</div>
                      <div>N 23,100</div>
                    </div>
                  </div>
                  <div className="my-4">
                    <Button
                      label="Confirm and Send"
                      className="w-full mt-4 font-bold py-6"
                      onClick={() => step.set(2)}
                    />
                  </div>
                </div>
              )}

              {step.get == 2 && (
                <div className="">
                  <OtpInput
                    value={transactionPin.get}
                    onChange={transactionPin.set}
                    numInputs={4}
                    isInputNum
                    //   disabledStyle={validateOtp.isLoading}
                    separator={
                      <span className="h-0.5 w-5 bg-rp-grey-3 block " />
                    }
                    inputStyle="!h-[70px] rounded-[14px] !w-[70px] flex-shrink-0 flex-1 w-full  !bg-[#F9F9F9] block rounded-md text-2xl text-center"
                    focusStyle="border-2 border-rp-orange outline-none"
                    containerStyle="w-full flex justify-center"
                  />
                  <p className="text-[14px] text-gray-500 my-4">
                    Provide your secret transaction pin
                  </p>
                  <div className="my-4">
                    <Button
                      label="Confirm"
                      onClick={() => step.set(3)}
                      className="w-full mt-4 font-bold py-6"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Send;
