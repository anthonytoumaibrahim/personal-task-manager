// React stuff
import { useState } from "react";
import { useRequest } from "../../../core/hooks/useRequest";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

// Components
import Input from "../../../components/Input";
import Button from "../../../components/Button";

const AuthenticationForm = () => {
  const sendRequest = useRequest();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const submit = async (data) => {
    setIsLoading(true);
    const path = "/auth" + (isLogin ? "/login" : "/register");
    await sendRequest("POST", path, data)
      .then((response) => {})
      .catch((error) => toast.error("Sorry, something went wrong."))
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
          <div className="w-full">
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
              <span className="text-red-600 font-medium text-sm">
                Please enter your full name.
              </span>
            )}
          </div>
        )}
        <Input type="email" placeholder="Enter your email" />
        <Input type="password" placeholder="Enter your password" />
        {!isLogin && (
          <small>
            By signing up, I accept the Terms of Services and acknowledge the
            Privacy Policy.
          </small>
        )}
        <Button type="submit" className="mt-2" loading={isLoading}>
          {isLogin ? "Login" : "Sign up"}
        </Button>
      </form>
      <Button
        link={true}
        className="text-sm"
        onClick={() => setIsLogin(!isLogin)}
      >
        {isLogin ? "Don't have an account?" : "Already have an account?"}
      </Button>
    </>
  );
};

export default AuthenticationForm;
