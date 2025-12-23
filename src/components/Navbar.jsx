import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-gradient-to-r from-purple-600 to-indigo-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <Link to="/" className="text-white text-xl font-bold hover:text-purple-200 transition-colors">
              Student Dashboard
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <span className="text-white/90 text-sm">
                  Welcome, <span className="font-semibold">{user.name}</span>
                </span>
                <span className="px-3 py-1 bg-white/20 rounded-full text-white text-xs font-medium">
                  {user.role}
                </span>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 cursor-pointer bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all duration-200 font-medium"
                >
                  Logout
                </button>

              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-white hover:text-purple-200 transition-colors font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 bg-white text-purple-600 rounded-lg hover:bg-purple-50 transition-all duration-200 font-medium"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
