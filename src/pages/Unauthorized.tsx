
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";

const Unauthorized = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-red-600 mb-2">Unauthorized Access</h1>
        <p className="text-xl text-gray-600 mb-8">
          You don't have permission to access this page
        </p>
        <Button asChild>
          <Link to="/dashboard">Return to Dashboard</Link>
        </Button>
      </div>
    </div>
  );
};

export default Unauthorized;
