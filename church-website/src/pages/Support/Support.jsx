import React from "react";
import "./Support.css";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';

const Support = () => {

const { t } = useTranslation();

  return (
    <div className="support-page">
      <div className="half-page">
        <h2 className="card-title">{t("Church Reconstruction")}</h2>
           <p className="desc">
          {t(
            "Help rebuild our church so it remains a place of worship and community."
          )}
        </p>
        <div className="card-container">
          <div className="card-support">
            <div className="card-bg"></div>
            <div className="card-content">
              <div className="card-chip"></div>
              <div className="card-logo">BANK</div>
              <div className="card-iban">
                FR76 3000 6000 0112 3456 7890 189
              </div>
              <div className="card-info">
                <div className="card-name">CHURCH FUND</div>
                <div className="card-valid">
                  {t("Valid Thru")} <span>12/27</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="half-page">
        <h2 className="card-title">{t("Support UK Soldiers")}</h2>
             <p className="desc">
          {t(
            "Support our soldiers in the UK to provide safety and essential aid."
          )}
        </p>
        <div className="card-container">
          <div className="card-support">
            <div className="card-bg"></div>
            <div className="card-content">
              <div className="card-chip"></div>
              <div className="card-logo">BANK</div>
              <div className="card-iban">
                GB29 NWBK 6016 1331 9268 19
              </div>
              <div className="card-info">
                <div className="card-name">UK SOLDIERS FUND</div>
                <div className="card-valid">
                  {t("Valid Thru")} <span>11/26</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


       <div className="support-footer">
        {t("For more info, you can")}{" "} <Link to="/contacts">{t("contact the priest")}</Link>.
      </div>
    </div>
  );
};

export default Support;
