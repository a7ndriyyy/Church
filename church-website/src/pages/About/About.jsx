import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import "./About.css";
import { useTranslation } from "react-i18next";

// file: name in public/downloads, label: what visitors see
const files = [
  { file: "УАПЦ історія 1998.pdf", label: "УАПЦ — історія (1998)" },
  { file: "шлях_перемоги_01051960_звернення_у_справі_будови.pdf", label: "«Шлях перемоги», 01.05.1960 — звернення у справі будови" },
  { file: "установчі_збори_братства_Св_Симона_1964.pdf", label: "Установчі збори братства Св. Симона (1964)" },
  { file: "УАПЦ нарис історії.  16 p -1924-1947pp..pdf", label: "УАПЦ — нарис історії 1924–1947 (16 с.)" },
  { file: "УАПЦ історичний огляд 3 page.pdf", label: "УАПЦ — історичний огляд (3 с.)" },
  { file: "УАПЦ заклик.pdf", label: "УАПЦ — заклик" },
  { file: "статут УАПЦ на еміграції проєкт.pdf", label: "Статут УАПЦ на еміграції — проєкт" },
  { file: "Statut_для_укр_прав_парафій_УАПЦ_на_еміграції_1949.pdf", label: "Статут для українських православних парафій УАПЦ на еміграції (1949)" },
  { file: "vie du St apôtre Simon le Zelote.pdf", label: "Vie du saint apôtre Simon le Zélote" },
  { file: "statut paroisse 1953 domiciliation lhomond.pdf", label: "Statut de la paroisse 1953 — domiciliation Lhomond" },
  { file: "statut paroise ukr dom Lhomond.pdf", label: "Statut de la paroisse ukrainienne — domiciliation Lhomond" },
  { file: "extrait de statut paroisse 1953.pdf", label: "Extrait du statut de la paroisse (1953)" },
  { file: "paroisse, batiments histoire une page français.pdf", label: "La paroisse et ses bâtiments — histoire (1 page)" },
  { file: "l'église orthodoxe ukrainienne en France doc 4 pages.pdf", label: "L'Église orthodoxe ukrainienne en France (4 pages)" },
  { file: "La paroisse de l'EUOA en France 1 page.pdf", label: "La paroisse de l'EUOA en France (1 page)" },
  { file: "achats ventes des bâtiments ukrainiens -6 rue de Palestine.pdf", label: "Achats et ventes des bâtiments ukrainiens — 6 rue de Palestine" },
  { file: "encyclopédie QUID.pdf", label: "Encyclopédie QUID" },
];

export default function About() {
  const [modalOpen, setModalOpen] = useState(false);
  const { t } = useTranslation();

  // close with Escape and stop the page behind from scrolling
  useEffect(() => {
    if (!modalOpen) return;
    const onKey = (e) => e.key === "Escape" && setModalOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [modalOpen]);

  return (
    <div className="about-page container">
      <section className="container-history">
        <div className="container-wrap">
        <h1 className="title-history">{t("Ukrainian Autocephalous Orthodox Church (UAOC)")}</h1>
        <p className="text-history">
          {t("aboutHistoryText")}
        </p>
        </div>

        <button className="btn btn-primary" onClick={() => setModalOpen(true)}>{t("Learn More")}</button>
      </section>

      {/* Rendered on <body> so the sticky menu and page animations can't cover it */}
      {modalOpen && createPortal(
        <div className="modal" onClick={() => setModalOpen(false)}>
          <div className="modal-content" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" aria-label="Close" onClick={() => setModalOpen(false)}>&times;</button>
            <h2>{t("Download Files")}</h2>
            <ul className="file-list">
              {files.map(({ file, label }) => (
                <li key={file}>
                  <a href={`${process.env.PUBLIC_URL}/downloads/${encodeURIComponent(file)}`} download={file}>
                    <span className="file-badge">PDF</span>
                    <span>{label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
