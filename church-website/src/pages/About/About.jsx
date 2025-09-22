import { useState } from "react";
import "./About.css";
import { useTranslation } from "react-i18next";

export default function About() {
  const [modalOpen, setModalOpen] = useState(false);
  const { t } = useTranslation();

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  return (
    <div className="about-page container">
      <section className="container-history">
        <div className="container-wrap">
        <h1 className="title-history">{t("Ukrainian Autocephalous Orthodox Church (UAOC)")}</h1>
        <p className="text-history">
          {t("aboutHistoryText")}
        </p>
        </div>

        <button className="btn btn-primary" onClick={toggleModal}>{t("Learn More")}</button>

        {modalOpen && (
          <div className="modal">
            <div className="modal-content">
              <span className="close-btn" onClick={toggleModal}>&times;</span>
              <h2>{t("Download Files")}</h2>
              <ul className="file-list">
                <li><a href="./downloads/УАПЦ історія 1998.pdf" download>УАПЦ історія 1998</a></li>
                <li><a href="./downloads/шлях_перемоги_01051960_звернення_у_справі_будови.pdf" download>шлях_перемоги_01051960_звернення_у_справі_будови</a></li>
                <li><a href="./downloads/установчі_збори_братства_Св_Симона_1964 (2).pdf" download>установчі_збори_братства_Св_Симона_1964</a></li>
                <li><a href="./downloads/УАПЦ нарис історії. 16 p -1924-1947pp. (2).pdf" download>УАПЦ нарис історії. 16 p -1924-1947pp.</a></li>
                <li><a href="./downloads/УАПЦ історичний огляд 3 page.pdf" download>УАПЦ історичний огляд 3 page</a></li>
                <li><a href="./downloads/УАПЦ заклик.pdf" download>УАПЦ заклик</a></li>
                <li><a href="./downloads/статут УАПЦ на еміграції проєкт.pdf" download>статут УАПЦ на еміграції проєкт</a></li>
                <li><a href="./downloads/vie du St apôtre Simon le Zelote.pdf" download>vie du St apôtre Simon le Zelote</a></li>
                <li><a href="./downloads/Statut_для_укр_прав_парафій_УАПЦ_на_еміграції_1949.pdf" download>Statut_для_укр_прав_парафій_УАПЦ_на_еміграції_1949</a></li>
                <li><a href="./downloads/statut paroisse 1953 domiciliation lhomond.pdf" download>statut paroisse 1953 domiciliation lhomond</a></li>
                <li><a href="./downloads/statut paroise ukr dom Lhomond.pdf" download>statut paroise ukr dom Lhomond</a></li>
                <li><a href="./downloads/paroisse, batiments histoire une page français.pdf" download>paroisse, batiments histoire une page français</a></li>
                <li><a href="./downloads/l'église orthodoxe ukrainienne en France doc 4 pages.pdf" download>l'église orthodoxe ukrainienne en France doc 4 pages</a></li>
                <li><a href="./downloads/extrait de statut paroisse 1953.pdf" download>extrait de statut paroisse 1953</a></li>
                <li><a href="./downloads/encyclopédie QUID.pdf" download>encyclopédie QUID</a></li>
                <li><a href="./downloads/achats ventes des bâtiments ukrainiens -6 rue de Palestine.pdf" download>achats ventes des bâtiments українців</a></li>
              </ul>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
