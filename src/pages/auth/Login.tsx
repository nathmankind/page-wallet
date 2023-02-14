import React from "react";
import { Button } from "../../components/Button/Button";
import { useMutation } from "react-query";
import { AuthService } from "../../services/auth.service";
import { FormikProvider, useFormik } from "formik";
import { Asserts, object, string } from "yup";
import { TextInput } from "../../components/FormInputs/TextInput";
import { AuthActions } from "../../zustand/auth.store";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();
  const validationSchema = object({
    email: string().email().required().label("Email address"),
    password: string().required().label("Password"),
  });
  const form = useFormik<Asserts<typeof validationSchema>>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      submitLogin.mutate(values);
    },
  });

  const submitLogin = useMutation(
    async (values: { email: string; password: string }) => {
      // AuthActions.setToken(values);
      console.log("VLUES+=======", values);
      return await AuthService.login(values);
    },
    {
      onSuccess: (response) => {
        console.log("LOGIN RES", response);
        AuthActions.setToken(response.data.data.token);
        AuthActions.setProfile(response.data.data.user);
        requestAnimationFrame(() => {
          navigate("/");
        });
      },
      onError: (err: any) => {
        console.log("ERROR", err.response);
      },
    }
  );
  return (
    <div>
      <div className="card bg-white rounded-md p-9">
        <div className="my-8 text-center">
          <h3 className="text-center font-bold">Welcome Back!</h3>
          <p className="text-gray-400 text-[14px]">
            Securely login into your Persent account
          </p>
        </div>
        <div>
          <FormikProvider value={form}>
            <form onSubmit={form.handleSubmit}>
              <div className="mt-4 w-80">
                <TextInput
                  type="text"
                  label="Phone / Email address"
                  {...form.getFieldProps("email")}
                  placeholder="Enter phone or email"
                  context
                />
              </div>
              <div className="mt-4 ">
                <TextInput
                  type="password"
                  label="Password"
                  {...form.getFieldProps("password")}
                  placeholder="Enter Password"
                  context
                />

                <div className="my-6 flex justify-between">
                  <div className="flex gap-2">
                    <input
                      type="checkbox"
                      name="remember_user"
                      aria-label="remember_user"
                      id=""
                    />
                    Remember me
                  </div>
                  <a href="/forgot-password" className="-">
                    <p className="text-sm text-blue-500 text-center">
                      Forgot Password ?
                    </p>
                  </a>
                </div>
              </div>
              <div className="my-4">
                <Button
                  label="Login"
                  fullWidth
                  isLoading={submitLogin.isLoading}
                  type="submit"
                  disabled={false}
                />
              </div>
              <div className="text-[#1F28EB] text-center">
                Don't have an account?
                <a href="/register" className="underline text-black">
                  {" "}
                  Sign Up
                </a>
              </div>
            </form>
          </FormikProvider>
        </div>
      </div>
    </div>
  );
};
