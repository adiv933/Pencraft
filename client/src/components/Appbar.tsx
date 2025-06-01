import { Avatar } from "./PostCard";
import { Link } from "react-router-dom";

export const Appbar = () => {
    return (
        <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
            <div className="max-w-screen-xl mx-auto px-6 py-4 flex items-center justify-between">
                {/* Logo */}
                <Link to="/posts" className="text-2xl font-bold text-gray-800 hover:text-gray-900 transition">
                    Pencraft
                </Link>

                {/* Right actions */}
                <div className="flex items-center space-x-4">
                    <Link to="/publish">
                        <button
                            type="button"
                            className="text-white bg-green-600 hover:bg-green-700 transition-all duration-200 font-medium rounded-full text-sm px-5 py-2.5 shadow-sm"
                        >
                            + New Post
                        </button>
                    </Link>

                    <Avatar size="big" name="aditya" />
                </div>
            </div>
        </header>
    );
};
