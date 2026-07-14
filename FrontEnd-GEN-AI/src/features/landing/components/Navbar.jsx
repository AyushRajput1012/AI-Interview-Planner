import { Link } from "react-router";
import "../style/landing.scss";

const Navbar = () => {
    return (
        <nav className="landing-navbar">

            <div className="logo">
                HireForge AI
            </div>

            <ul className="nav-links">

                <li>
                    <a href="#features">
                        Features
                    </a>
                </li>

                <li>
                    <a href="#how-it-works">
                        How It Works
                    </a>
                </li>

            </ul>

            <div className="nav-buttons">

                <Link
                    to="/login"
                    className="login-btn"
                >
                    Login
                </Link>

                <Link
                    to="/register"
                    className="register-btn"
                >
                    Register
                </Link>

            </div>

        </nav>
    );
};

export default Navbar;