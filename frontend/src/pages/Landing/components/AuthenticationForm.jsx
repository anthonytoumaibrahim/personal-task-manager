// React stuff
import { useState } from "react";
import { useRequest } from "../../../core/hooks/useRequest";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

// Components
import Input from "../../../components/Input";
import Button from "../../../components/Button";

const AuthenticationForm = () => {
  const sendRequest = useRequest();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const submit = async (data) => {
    setIsLoading(true);
    const path = "/auth" + (isLogin ? "/login" : "/register");
    await sendRequest("POST", path, data)
      .then((response) => {
        const { user, token } = response?.data || {};
        if (user) {
          dispatch({
            type: "userSlice/addUser",
            payload: {
              token: token,
            },
          });
          navigate("/");
        }
      })
      .catch((error) => {
        const message = error?.response?.data?.message;
        toast.error(message ?? "Sorry, something went wrong.");
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <>
      <h5 className="font-medium text-center">
        {isLogin ? "Login" : "Sign up"} to continue
      </h5>
      <form
        action=""
        className="flex flex-col gap-2"
        onSubmit={handleSubmit(submit)}
      >
        {!isLogin && (
          <div>
            <Input
              type="text"
              placeholder="Enter your full name"
              {...register("fullName", {
                required: true,
              })}
              className="w-full"
              error={errors.fullName}
            />
            {errors.fullName && (
              <span className="text-rose-600 font-medium text-sm">
                Please enter your full name.
              </span>
            )}
          </div>
        )}
        <div>
          <Input
            className="w-full"
            type="email"
            placeholder="Enter your email"
            error={errors.email}
            {...register("email", {
              required: true,
              pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/i,
            })}
          />
          {errors.email && (
            <span className="text-rose-600 font-medium text-sm">
              Please enter a valid email address.
            </span>
          )}
        </div>
        <div>
          <Input
            className="w-full"
            type="password"
            placeholder="Enter your password"
            error={errors.password}
            {...register("password", {
              required: true,
              minLength: 8,
            })}
          />
          {errors.password && (
            <span className="text-rose-600 font-medium text-sm">
              Password must be at least 8 characters long.
            </span>
          )}
        </div>
        <Button type="submit" className="mt-2" loading={isLoading}>
          {isLogin ? "Login" : "Sign up"}
        </Button>
      </form>
      <Button
        link={true}
        className="text-sm"
        onClick={() => {
          setIsLogin(!isLogin);
          reset();
        }}
      >
        {isLogin ? "Don't have an account?" : "Already have an account?"}
      </Button>
    </>
  );
};

export default AuthenticationForm;
