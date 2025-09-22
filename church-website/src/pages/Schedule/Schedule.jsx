import "./Schedule.css";
import { useTranslation } from 'react-i18next';

export default function Schedule() {
  const { t } = useTranslation();
  
  return (
    <div className="schedule">
      <h2 className="schedule-title">{t('scheduleTitle')}</h2>

      {/* Sunday Service */}
      <div className="schedule-card">
        <h3>{t('sundayService')}</h3>
        <p>📅 <strong>{t('everySunday')}</strong></p>
        <p>🕙 <strong>{t('startsAt')}</strong></p>
        <p>📍 <strong>{t('location')}</strong></p>
      </div>

      {/* Note about changes */}
      <div className="schedule-card">
        <h3>{t('otherServices')}</h3>
        <p>
      {t('note')}
        </p>
        <p>
         {t('followUs')}
        </p>
        <div className="social-links">
          <a href="https://facebook.com" target="_blank" rel="noreferrer">Facebook</a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a>
          <a href="https://t.me" target="_blank" rel="noreferrer">Telegram</a>
        </div>
      </div>

      {/* Spiritual verse */}
      <div className="schedule-verse">
        <p>{t('verse-1')}</p>
      </div>
    </div>
  );
}
