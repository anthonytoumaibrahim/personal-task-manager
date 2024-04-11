// React stuff
import { useState } from "react";
import { useRequest } from "../../../core/hooks/useRequest";

// Components
import Input from "../../../components/Input";
import Button from "../../../components/Button";

const AuthenticationForm = () => {
  const sendRequest = useRequest();
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const submit = (e) => {
    e.preventDefault();

    setIsLoading(true);
  };

  return (
    <>
      <h5 className="font-medium text-center">
        {isLogin ? "Login" : "Sign up"} to continue
      </h5>
      <form action="" className="flex flex-col gap-2" onSubmit={submit}>
        {!isLogin && <Input type="text" placeholder="Enter your name" />}
        <Input type="email" placeholder="Enter your email" />
        <Input type="password" placeholder="Enter your password" />
        {!isLogin && (
          <small>
            By signing up, I accept the Terms of Services and acknowledge the
            Privacy Policy.
          </small>
        )}
        <Button type="submit" className="mt-2">
          {isLogin ? "Login" : "Sign up"}
        </Button>
      </form>
      <Button
        link={true}
        className="text-sm"
        onClick={() => setIsLogin(!isLogin)}
        loading={isLoading}
      >
        {isLogin ? "Don't have an account?" : "Already have an account?"}
      </Button>
    </>
  );
};

export default AuthenticationForm;
