import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Navbar.css";

const Navbar = () => {
    const { user, isAuthenticated, logout } = useAuth();
    const location = useLocation();

    if (!isAuthenticated) {
        return null; // Don't show navbar for unauthenticated users
    }

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="navbar">
            <div className="nav-container">
                <div className="nav-brand">
                    <div><img src={`${process.env.PUBLIC_URL}/logo.png`} alt="Logo" className="logo-nav" /></div>
                    <Link to="/dashboard">MindMirror</Link>
                </div>
                
                <ul className="nav-links">
                    <li>
                        <Link to="/" className={isActive('/') ? 'active' : ''}>
                            My Journals
                        </Link>
                    </li>
                    <li>
                        <Link to="/create" className={isActive('/create') ? 'active' : ''}>
                            Create
                        </Link>
                    </li>
                    <li>
                        <Link to="/search" className={isActive('/search') ? 'active' : ''}>
                            Search
                        </Link>
                    </li>
                </ul>
                
                <div className="nav-user">
                    {user && (
                        <div className="user-menu">
                            <img 
                                src={user.picture} 
                                alt={user.name} 
                                className="user-avatar-small"
                            />
                            <span className="user-name">{user.name}</span>
                            <button onClick={logout} className="logout-btn-nav">
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;