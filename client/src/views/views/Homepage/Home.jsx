import React from 'react';
import CardsContainer from '../../../components/CardsContainercarp/cardscontainerr';
import styles from "../Homepage/home.module.css"

function HomePage() {
  return (
    <div className={styles.homePage}>

      <CardsContainer />
      <div className={styles.searchBarContainer}>
        
      </div>
    </div>
  );
}

export default HomePage;
