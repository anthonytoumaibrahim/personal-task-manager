// React stuff
import { useState } from "react";
import { useRequest } from "../../../core/hooks/useRequest";
import { toast } from "react-toastify";

// Components
import Input from "../../../components/Input";
import Button from "../../../components/Button";

const AuthenticationForm = () => {
  const sendRequest = useRequest();
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [authInfo, setAuthInfo] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const handleInput = (type, value) => {
    setAuthInfo({
      ...authInfo,
      [type]: value,
    });
  };

  const submit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const path = "/auth" + (isLogin ? "/login" : "/register");
    await sendRequest("POST", path, authInfo)
      .then((response) => {})
      .catch((error) => {
        toast.error("Sorry, something went wrong.");
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <>
      <h5 className="font-medium text-center">
        {isLogin ? "Login" : "Sign up"} to continue
      </h5>
      <form action="" className="flex flex-col gap-2" onSubmit={submit}>
        {!isLogin && (
          <Input
            type="text"
            placeholder="Enter your full name"
            value={authInfo.fullName}
            onChange={(value) => handleInput("fullName", value)}
          />
        )}
        <Input
          type="email"
          placeholder="Enter your email"
          value={authInfo.email}
          onChange={(value) => handleInput("email", value)}
        />
        <Input
          type="password"
          placeholder="Enter your password"
          value={authInfo.password}
          onChange={(value) => handleInput("password", value)}
        />
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
