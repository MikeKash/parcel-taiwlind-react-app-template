import { useContext } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import MyButton from "../components/MyButton";
import AuthContext from "../context/AuthProvider";
import { isCorrectEmailFormat } from "../utils/validators";

const errMsgs = {
  required: "Email is required",
  validEmailFormat: "Email format is invalid",
};

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const { setAuth } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLogin = async () => {
    alert("Restore password");
  };

  return (
    <section>
      <div className="px-6 h-full text-gray-800 mt-6">
        <div className="flex justify-center items-center flex-wrap g-6 ">
          <form onSubmit={handleSubmit(handleLogin)} className="shadow-md p-6">
            <p className="text-lg text-center mb-2 font-bold">Reset Password</p>
            <div className="mb-6">
              <input
                type="text"
                className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                placeholder="Email"
                defaultValue=""
                {...register("Email", {
                  required: true,
                  validate: {
                    validEmailFormat: (value: string) =>
                      isCorrectEmailFormat(value),
                  },
                })}
              />
              {errors["Email"] ? (
                <p className="text-red-600">
                  {
                    errMsgs[
                      errors["Email"]?.type as "required" | "validEmailFormat"
                    ]
                  }
                </p>
              ) : null}
            </div>

            <div className="flex justify-between items-center mb-6">
              <a href="#!" className="text-gray-800">
                Forgot password?
              </a>
            </div>

            <div className="text-center">
              <MyButton type="submit">Send me link</MyButton>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ResetPassword;
