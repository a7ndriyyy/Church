import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { FaChurch, FaFlag } from "react-icons/fa";
import "./Support.css";

export default function Support() {
  const supports = [
    {
      type: "Церква",
      icon: <FaChurch />,
      cardTitle: "Пожертва на храм",
      cardData: {
        cardNumber: "1234 5678 9012 3456",
        bank: "Універсальна Банк",
        name: "Парафія Святої Трійці",
      },
      description: "Кошти підуть на розбудову храму та розвиток парафії.",
      styleClass: "church-card",
    },
    {
      type: "Волонтери",
      icon: <FaFlag />,
      cardTitle: "Допомога Україні",
      cardData: {
        cardNumber: "9876 5432 1098 7654",
        bank: "Благодійний Фонд",
        name: "Бригада Добровольців",
      },
      description: "Пожертви підуть на машини та допомогу бригаді, яка допомагає Україні.",
      styleClass: "ukraine-card",
    },
  ];

  const cardRefs = useRef([]);
  const [visibleCards, setVisibleCards] = useState([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.dataset.index);
            if (!visibleCards.includes(index)) {
              setVisibleCards((prev) => [...prev, index]);
            }
          }
        });
      },
      { threshold: 0.2 }
    );

    cardRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [visibleCards]);

  return (
    <div className="support-page">
      <h2 className="support-title">Підтримати нас</h2>

      <div className="cards-container">
        {supports.map((item, index) => (
          <div
            className={`support-card ${item.styleClass} ${visibleCards.includes(index) ? "visible" : ""}`}
            key={index}
            ref={(el) => (cardRefs.current[index] = el)}
            data-index={index}
            style={{ transitionDelay: `${index * 0.3}s` }}
          >
            <div className="card-inner">
              <div className="card-front">
                <div className="card-icon">{item.icon}</div>
                <h3>{item.cardTitle}</h3>
                <p className="card-number">{item.cardData.cardNumber}</p>
                <p className="card-bank">{item.cardData.bank}</p>
                <p className="card-name">{item.cardData.name}</p>
              </div>
              <div className="card-back">
                <p>{item.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="support-note">
        <p>
          Щоб знати точніше, куди йдуть ваші пожертви, ви можете зв'язатися з нашим священником: {" "}
          <Link to="/contacts">Сторінка контактів</Link>
        </p>
      </div>
    </div>
  );
}
