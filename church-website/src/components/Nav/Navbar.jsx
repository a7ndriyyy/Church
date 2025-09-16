import { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"; // імпорт стилів

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1 className="logo">ÉGLISE UKRAINIENNE ORTHODOXE AUTOCÉPHALE</h1>

        {/* Desktop menu */}
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About Us</Link></li>
          <li><Link to="/schedule">Schedule</Link></li>
          <li><Link to="/contacts">Contacts</Link></li>
          <li><Link to="/support">Support</Link></li>
        </ul>

        {/* Burger button */}
        <button 
          className="burger" 
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile dropdown */}
      {isOpen && (
        <ul className="mobile-menu">
          <li><Link to="/" onClick={() => setIsOpen(false)}>Home</Link></li>
          <li><Link to="/about" onClick={() => setIsOpen(false)}>About</Link></li>
          <li><Link to="/schedule" onClick={() => setIsOpen(false)}>Schedule</Link></li>
          <li><Link to="/contacts" onClick={() => setIsOpen(false)}>Contacts</Link></li>
          <li><Link to="/support" onClick={() => setIsOpen(false)}>Support</Link></li>
        </ul>
      )}
    </nav>
  );
}

