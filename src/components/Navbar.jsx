import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img
          src="https://cdn-icons-png.flaticon.com/512/888/888879.png"
          alt="logo"
        />
        <Link to="/">Mi Blog Técnico</Link>
      </div>
    </nav>
  );
}

export default Navbar;
