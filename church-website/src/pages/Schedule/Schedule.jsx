import "./Schedule.css";

export default function Schedule() {
  return (
    <div className="schedule">
      <h2 className="schedule-title">Розклад Богослужінь</h2>

      {/* Sunday Service */}
      <div className="schedule-card">
        <h3>Божественна Літургія</h3>
        <p>📅 Кожної <strong>неділі</strong></p>
        <p>🕙 Початок о <strong>10:00</strong></p>
        <p>📍 У храмі</p>
      </div>

      {/* Note about changes */}
      <div className="schedule-card">
        <h3>Інші Богослужіння</h3>
        <p>
          Розклад святкових і буденних богослужінь може змінюватися
          залежно від церковного календаря.
        </p>
        <p>
          Слідкуйте за актуальною інформацією у наших соціальних мережах:
        </p>
        <div className="social-links">
          <a href="https://facebook.com" target="_blank" rel="noreferrer">Facebook</a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a>
          <a href="https://t.me" target="_blank" rel="noreferrer">Telegram</a>
        </div>
      </div>

      {/* Spiritual verse */}
      <div className="schedule-verse">
        <p>“Прийдіть і побачите.” — Ів. 1:39</p>
      </div>
    </div>
  );
}
