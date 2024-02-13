import React from 'react';
import CardsContainer from '../../../components/CardsContainercarp/cardscontainerr';
import styles from "../Homepage/home.module.css"

function HomePage() {
  return (
    <div className={styles.homePage}>
      <h1>Welcome to the HOME Page</h1>
      {/* Renderiza CardsContainer en la página de inicio */}
      <CardsContainer />
    </div>
  );
}

export default HomePage;
