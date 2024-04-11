// Components
import Logo from "../../components/Logo";
import Input from "../../components/Input";
import Button from "../../components/Button";

const Landing = () => {
  return (
    <main className="w-screen h-screen bg-primary-50 flex items-center justify-center">
      <div className="bg-white p-10 w-full max-w-sm shadow-lg rounded flex flex-col gap-4">
        <Logo className="text-center" />
        <h5 className="font-medium text-center">Sign up to continue</h5>

        <form action="" className="flex flex-col gap-2">
          <Input type="text" placeholder="Enter your name" />
          <Input type="email" placeholder="Enter your email" />
          <Input type="password" placeholder="Enter a password" />
          <small>
            By signing up, I accept the Terms of Services and acknowledge the
            Privacy Policy.
          </small>
          <Button className="mt-2">Sign up</Button>
        </form>

        <Button link={true} className="text-sm">
          Already have an account?
        </Button>
      </div>
    </main>
  );
};

export default Landing;
