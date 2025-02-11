import Link from "next/link";
import { FaUser, FaCog, FaHome } from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className="bg-glassmorphism  min-h-screen p-4 rounded-xl">
      <ul className="space-y-4">
        <li>
          <Link
            href="/dashboard"
            className="flex items-center space-x-2 p-3 rounded-md  text-white"
          >
            <FaHome className="h-5 w-5" />
            <span>Dashboard</span>
          </Link>
        </li>
        <li>
          <Link
            href="/dashboard/blogs"
            className="flex items-center space-x-2 p-3 rounded-md  text-white"
          >
            <FaUser className="h-5 w-5" />
            <span>Blog Operations</span>
          </Link>
        </li>
        <li>
          <Link
            href="/dashboard/projects"
            className="flex items-center space-x-2 p-3 rounded-md  text-white"
          >
            <FaCog className="h-5 w-5" />
            <span>Project Operations</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;



