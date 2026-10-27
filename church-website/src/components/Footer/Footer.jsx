import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./Footer.css"; // імпорт стилів

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="footer">
      <p>{t("churchAddress")}</p>
      <p className="footer-small">
        © {new Date().getFullYear()} {t("footerText")} · <Link to="/admin">{t("admin.title")}</Link>
      </p>
    </footer>
  );
}
