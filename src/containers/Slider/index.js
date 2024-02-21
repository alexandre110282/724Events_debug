import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const byDateDesc = data?.focus.sort((evtA, evtB) =>
    new Date(evtA.date) < new Date(evtB.date) ? -1 : 1
  );
  
 // Fonction pour passer à la carte suivante
  const nextCard = () => {
    setIndex(prevIndex => (prevIndex < byDateDesc.length - 1 ? prevIndex + 1 : 0));
  };

  // Utilisation de useEffect pour démarrer un intervalle de 5 secondes pour le changement automatique de carte
  useEffect(() => {
    const intervalId = setInterval(nextCard, 5000); // Démarre un intervalle qui appelle nextCard toutes les 5 secondes

    // Fonction de retour de useEffect pour nettoyer l'intervalle lorsque le composant est démonté ou lorsque l'index change
    return () => clearInterval(intervalId); // Nettoie l'intervalle pour éviter les fuites de mémoire
  }, []); // Utilisation d'un tableau de dépendances vide pour que l'effet ne se déclenche qu'une seule fois à l'initialisation du composant

  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        <>
          <div
            key={event.title}
            className={`SlideCard SlideCard--${
              index === idx ? "display" : "hide"
            }`}
          >
            <img src={event.cover} alt="forum" />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
              {byDateDesc.map((_, radioIdx) => (
                <input
                  key={`${event.id}`}
                  type="radio"
                  name="radio-button"
                  checked={idx === radioIdx}
                />
              ))}
            </div>
          </div>
        </>
      ))}
    </div>
  );
};

export default Slider;
