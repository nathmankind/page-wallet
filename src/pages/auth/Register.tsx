import { Button } from "../../components/Button/Button";
import { useMutation } from "react-query";
import { AuthService } from "../../services/auth.service";
import { FormikProvider, useFormik } from "formik";
import { Asserts, object, string } from "yup";
import { TextInput } from "../../components/FormInputs/TextInput";
import { AuthActions } from "../../zustand/auth.store";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export const Register = () => {
  const navigate = useNavigate();
  const validationSchema = object({
    business_name: string().required().label("Business"),
    firstname: string().required().label("Firstname"),
    lastname: string().required().label("Lastname"),
    phone_number: string().required().label("Phone number"),
    email: string().email().required().label("Email address"),
    password: string().required().label("Password"),
  });
  const form = useFormik<Asserts<typeof validationSchema>>({
    initialValues: {
      business_name: "",
      firstname: "",
      lastname: "",
      email: "",
      phone_number: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      register.mutate({
        ...values,
        name: `${values.firstname} ${values.lastname}`,
      });
    },
  });

  const register = useMutation(
    async (values: any) => {
      return await AuthService.register(values);
    },
    {
      onSuccess: (response) => {

        console.log(" RESPONSE", response);
        toast.success("Registration successfull")
      },
      onError: (err: any) => {
        console.log("ERROR", err.response);
      },
    }
  );
  return (
    <div>
      <div className="card bg-white rounded-[10px] p-9">
        <div className="my-6">
          <h4 className="text font-bold">Register your account</h4>
        </div>
        <div>
          <FormikProvider value={form}>
            <form onSubmit={form.handleSubmit}>
              <div className="mb-4">
                <TextInput
                  type="text"
                  label="Business Name"
                  {...form.getFieldProps("business_name")}
                  placeholder="Enter text"
                  context
                />
              </div>

              <div className="grid grid-cols-2 gap-x-5 mb-4">
                <TextInput
                  type="text"
                  label="First Name"
                  {...form.getFieldProps("firstname")}
                  placeholder="Enter firstname"
                  context
                />
                <TextInput
                  type="text"
                  label="Last Name"
                  {...form.getFieldProps("lastname")}
                  placeholder="Enter lastname"
                  context
                />
              </div>

              <div className="mb-4">
                <TextInput
                  type="text"
                  label="Email"
                  {...form.getFieldProps("email")}
                  placeholder="Enter email address"
                  context
                />
              </div>
              <div className="mb-4">
                <TextInput
                  type="text"
                  label="Phone Number"
                  {...form.getFieldProps("phone_number")}
                  placeholder="2347036448000"
                  context
                />
              </div>

              <div className="mb-4 ">
                <TextInput
                  type="password"
                  label="Create Password"
                  {...form.getFieldProps("password")}
                  placeholder="Enter Password"
                  context
                />
              </div>

              <div className="flex gap-5 my-5">
                <input
                  type="checkbox"
                  name="remember_user"
                  aria-label="remember_user"
                  id=""
                />

                <div className="text-[12px] ">
                  I consent to the collection and processing of my personal data{" "}
                  <br /> in line with the data regulations as described in
                  Persent’s <strong>Privacy Policy</strong>
                </div>
              </div>
              <div className="mt-4">
                <Button
                  label="Sign up"
                  className="justify-center"
                  fullWidth
                  isLoading={register.isLoading}
                  type="submit"
                  disabled={false}
                />
              </div>

              <div className="text-[12px] my-6 text-center">
                By clicking the “Sign up” button, you agree to Persent’s{" "}
                <strong>Terms</strong> .
              </div>

              <div className="text-gray-500 text-center">
                Already a user?{" "}
                <a href="/login" className="underline text-black">
                  {" "}
                  Login
                </a>
              </div>
            </form>
          </FormikProvider>
        </div>
      </div>
    </div>
  );
};
