import { useEffect, useRef, useState } from "react";
import "./Contacts.css";
import { useTranslation } from 'react-i18next';

export default function Contacts() {
  const { t } = useTranslation();
  const contacts = [
    {
      role: t('priest'),
      name: t('namePriest'),
      phone: "+33 6 68 71 38 12",
      photo: `${process.env.PUBLIC_URL}/images/priest-vasyl.jpg`,
      // zoom in on the face in the wide photo
      photoSize: "320%",
      photoPosition: "64% 34%",
    },
    {
      role: t('parishHead'),
      name: t('nameParisHead'),
      phone: "+33 7 53 30 59 41",
      photo: `${process.env.PUBLIC_URL}/images/pasha.jpg`,
    },
    {
      role: t('brotherhoodHead'),
      name: t('nameBrotherHead'),
      phone: "+33 6 18 19 45 89",
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
    <div className="contacts-page">
      <h2 className="section-title">{t('contactsTitle')}</h2>

      <div className="cards-container">
        {contacts.map((person, index) => (
          <div
            className={`contact-card ${visibleCards.includes(index) ? "visible" : ""}`}
            key={index}
            ref={(el) => (cardRefs.current[index] = el)}
            data-index={index}
            style={{ transitionDelay: `${index * 0.2}s` }}
          >
            {person.photo ? (
              <div
                className="contact-photo"
                role="img"
                aria-label={person.name}
                style={{
                  backgroundImage: `url("${person.photo}")`,
                  backgroundSize: person.photoSize || "cover",
                  backgroundPosition: person.photoPosition || "center",
                }}
              />
            ) : (
              <div className="contact-photo contact-initials" aria-hidden="true">
                {person.name.split(" ").map((part) => part[0]).join("").slice(0, 2)}
              </div>
            )}
            <h3>{person.role}</h3>
            <p className="contact-name">{person.name}</p>
            <a className="contact-phone" href={`tel:${person.phone.replace(/\s/g, "")}`}>
              {person.phone}
            </a>
          </div>
        ))}
      </div>

      <div className="church-info">
        <h3>{t('churchAddressTitle')}</h3>
        <p>{t('churchAddress')}</p>

        <h3>{t('workingHoursTitle')}</h3>
        <p>{t('workingHours')}</p>

        <h3>{t('followUsTitle')}</h3>
        <div className="social-links">
          <a href="https://facebook.com" target="_blank" rel="noreferrer">Facebook</a>
          <a href="https://www.instagram.com/eglise_orthodoxe_ukrainienne_?igsh=ZXk4N2J2Zmp6OGxm&utm_source=qr" target="_blank" rel="noreferrer">Instagram</a>
        </div>

        <h3>{t('locationOnMap')}</h3>
        <div className="map-container">
          <iframe
            title="Church Location"
            src="https://www.google.com/maps?q=6+rue+palestine+75019+paris&output=embed"
            width="100%"
            height="300"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
