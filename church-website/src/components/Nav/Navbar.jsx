import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';



import "./Navbar.css"; // імпорт стилів

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const {t,i18n } = useTranslation();

   const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo-title">
        <img className="logo-cross " id="Logocross" height={70} width={60} src="/images/Logocross.png" alt="Church Logo"/>
        <h1 className="logo">УKRAЇНСЬKA AВTOKEФAЛЬНA ПРAВOСЛAВНA ЦEРKВA</h1>
        </div>

        {/* Desktop menu */}
        <ul className="nav-links">
          <li><Link to="/">{t('home')}</Link></li>
          <li><Link to="/about">{t('about Us')}</Link></li>
          <li><Link to="/schedule">{t('schedule')}</Link></li>
          <li><Link to="/contacts">{t('contacts')}</Link></li>
          <li><Link to="/support">{t('support')}</Link></li>
        </ul>

            <select
          className="language-select"
          value={i18n.language}
          onChange={(e) => changeLanguage(e.target.value)}
        >
          <option value="fr">Français</option>
          <option value="uk">Українська</option>
          <option value="en">English</option>
        </select>

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
          <li><Link to="/" onClick={() => setIsOpen(false)}>{t('home')}</Link></li>
          <li><Link to="/about" onClick={() => setIsOpen(false)}>{t('about Us')}</Link></li>
          <li><Link to="/schedule" onClick={() => setIsOpen(false)}>{t('schedule')}</Link></li>
          <li><Link to="/contacts" onClick={() => setIsOpen(false)}>{t('contacts')}</Link></li>
          <li><Link to="/support" onClick={() => setIsOpen(false)}>{t('support')}</Link></li>
        </ul>
      )}
    </nav>
  );
}

