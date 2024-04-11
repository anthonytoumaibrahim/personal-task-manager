import Button from "../../components/Button";
import NotFoundVector from "./vectors/NotFound";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <main className="min-w-screen min-h-screen bg-primary-50 flex flex-col gap-10 items-center justify-center">
      <NotFoundVector className="w-full max-w-lg" />
      <h1 className="text-5xl font-medium">Page not found</h1>
      <Link to="/">
        <Button>Back to homepage</Button>
      </Link>
    </main>
  );
};

export default NotFound;
