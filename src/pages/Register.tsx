import { AxiosError } from "axios";
import { FieldValues, SubmitHandler, useForm, Validate } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import MyButton from "../components/MyButton";
import axios from "../api/axios";
import { isCorrectEmailFormat } from "../utils/validators";
interface IFormInputs {
  userEmail: string;
  userName: string;
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
  userEmail: "",
  userName: "",
  password: "",
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
    name: "userName",
    displayName: "User Name",
    defaultValue: initialFormValues.userName,
    validationOptions: {
      required: true,
    },
    errMsgs: {
      required: "Username is required",
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

const Register = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleRegister: SubmitHandler<FieldValues> = async (formFields) => {
    const { userEmail, userName, password } = formFields;

    try {
      const response = await axios.post("/api/Auth/register", {
        userEmail,
        userName,
        password,
      });
      navigate("/login", { replace: true });
    } catch (err) {
      if ((err as AxiosError)?.response?.data === "User already exists") {
        alert("User already exists");
      } else {
        alert("Something went wrong");
      }
    }
  };

  return (
    <section className="">
      <div className="px-6 h-full text-gray-800 mt-6">
        <div className="flex justify-center items-center flex-wrap g-6 ">
          <form
            onSubmit={handleSubmit(handleRegister)}
            className="shadow-md p-6"
          >
            <p className="text-lg text-center mb-2 font-bold">
              Create an account
            </p>
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
                    autoComplete={name === "password" ? "new-password" : "off"}
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

            <div className="text-center">
              <MyButton type="submit">REGISTER</MyButton>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Register;
