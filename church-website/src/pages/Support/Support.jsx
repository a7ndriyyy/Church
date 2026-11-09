import React from "react";
import "./Support.css";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';

const donationLink = process.env.REACT_APP_STRIPE_DONATION_LINK;

const Support = () => {
  const { t } = useTranslation();

  return (
    <div className="support-page">
      <section className="donate-panel">
        <img src={`${process.env.PUBLIC_URL}/images/Logocross.png`} alt="" className="donate-cross" />
        <h1 className="section-title">{t("support-page.title")}</h1>
        <p className="donate-text">{t("support-page.text")}</p>

        {donationLink ? (
          <>
            <a className="btn btn-gold donate-btn" href={donationLink} target="_blank" rel="noopener noreferrer">
              {t("support-page.donate")}
            </a>
            <p className="donate-secure">{t("support-page.secure")}</p>
          </>
        ) : (
          // No online payments yet: donations go through one of the parish contacts
          <>
            <p className="donate-text donate-contact">{t("support-page.contactToDonate")}</p>
            <Link className="btn btn-gold donate-btn" to="/contacts">
              {t("support-page.seeContacts")}
            </Link>
          </>
        )}
      </section>

      <p className="soldiers-note">
        {t("support-page.soldiers")}{" "}
        <Link to="/contacts">{t("contact the priest")}</Link>.
      </p>
    </div>
  );
};

export default Support;
