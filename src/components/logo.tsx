import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <div className="font-bold text-3xl">
      <Link to="." className="link" aria-label="Logo" title="Logo">
        fiverr
      </Link>

      <span className="text-green-400">.</span>
    </div>
  );
};

export default Logo;
