import { useContext } from "react";
import AuthContext from "../context/AuthProvider";
import axios from "../api/axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FieldValues, SubmitHandler, useForm, Validate } from "react-hook-form";
import { isCorrectEmailFormat } from "../utils/validators";
import MyButton from "../components/MyButton";
import { AxiosError } from "axios";

interface IFormInputs {
  userEmail: string;
  password: string;
}
export interface IFormFields {
  name: keyof IFormInputs;
  displayName: string;
  defaultValue: string;
  validationOptions: {
    required: boolean;
    validate?: Validate<string> | Record<string, Validate<string>>;
  };
  errMsgs: {
    [key: string]: string;
  };
}

const initialFormValues = {
  userEmail: "tony@stark.com",
  password: "123456789",
};
export const formFields: IFormFields[] = [
  {
    name: "userEmail",
    displayName: "Email",
    defaultValue: initialFormValues.userEmail,
    validationOptions: {
      required: true,
      validate: {
        validEmailFormat: (value: string) => isCorrectEmailFormat(value),
      },
    },
    errMsgs: {
      required: "Email is required",
      validEmailFormat: "Email format is invalid",
    },
  },
  {
    name: "password",
    displayName: "Password",
    defaultValue: initialFormValues.password,
    validationOptions: {
      required: true,
    },
    errMsgs: {
      required: "Password is required",
    },
  },
];

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const { setAuth } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLogin: SubmitHandler<FieldValues> = async (formFields) => {
    const { userEmail, password } = formFields;

    try {
      const response = await axios.post("/api/Auth/login", {
        userEmail,
        password,
      });
      const accessToken = response?.data?.token;
      const user = response?.data?.user;
      setAuth({ user, accessToken });
      navigate(from || "/", { replace: true });
    } catch (err) {
      const errMessage = (err as AxiosError)?.response?.data;
      if (errMessage) {
        alert(errMessage);
      } else {
        alert("Something went wrong");
      }
    }
  };

  return (
    <section>
      <div className="px-6 h-full text-gray-800 mt-6">
        <div className="flex justify-center items-center flex-wrap g-6 ">
          <form onSubmit={handleSubmit(handleLogin)} className="shadow-md p-6">
            <p className="text-lg text-center mb-2 font-bold">Login</p>
            {formFields.map((field) => {
              const {
                name,
                defaultValue,
                validationOptions,
                errMsgs,
                displayName,
              } = field;

              return (
                <div key={`form-field-${name}`} className="mb-6">
                  <input
                    autoComplete="current-password"
                    id={name}
                    type={name === "password" ? "password" : "text"}
                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    placeholder={displayName}
                    defaultValue={defaultValue}
                    {...register(name, validationOptions)}
                  />
                  {errors[name] ? (
                    <p className="text-red-600">
                      {errMsgs[errors[name]?.type as string]}
                    </p>
                  ) : null}
                </div>
              );
            })}

            <div className="flex justify-between items-center mb-6">
              <a href="#!" className="text-gray-800">
                Forgot password?
              </a>
            </div>

            <div className="text-center">
              <MyButton type="submit">Login</MyButton>

              <p className="text-sm font-semibold mt-2 pt-1 mb-0">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out"
                >
                  Register
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
