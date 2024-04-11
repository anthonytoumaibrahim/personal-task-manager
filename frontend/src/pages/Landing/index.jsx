// Vectors
import Chart from "./vectors/Chart";

// Components
import AuthenticationForm from "./components/AuthenticationForm";
import Logo from "../../components/Logo";

const Landing = () => {
  return (
    <main className="min-w-screen min-h-screen bg-primary-50 flex items-center justify-center relative">
      <Chart className="absolute lg:w-80 xl:w-96 bottom-0 left-0 hidden lg:flex" />
      <div className="bg-white p-10 w-full max-w-sm shadow-lg rounded flex flex-col gap-4">
        <Logo className="text-center" />
        <AuthenticationForm />
      </div>
    </main>
  );
};

export default Landing;
