import React, { useEffect, useState } from "react";
import { getAllDrivers } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import Card from "../Card/card";
import styles from "../CardsContainercarp/cardscontainerr.module.css";

const CardsContainer = () => {
  const dispatch = useDispatch();
  const { allDrivers, nameDrivers } = useSelector((state) => state);
  const [currentPage, setCurrentPage] = useState(1);
  const driversPerPage = 9;
  const totalPages = Math.ceil(
    (nameDrivers.length > 0 ? nameDrivers.length : allDrivers.length) /
      driversPerPage
  );
  const maxDisplayedPages = 5; // Define el número máximo de páginas a mostrar

  useEffect(() => {
    dispatch(getAllDrivers());
  }, [dispatch]);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const resetPagination = () => {
    setCurrentPage(1); // Reinicia la página actual a 1
  };

  const calculateDisplayedPages = () => {
    const midPoint = Math.ceil(maxDisplayedPages / 2);
    let startPage = currentPage - midPoint + 1;
    if (startPage < 1) {
      startPage = 1;
    }
    let endPage = startPage + maxDisplayedPages - 1;
    if (endPage > totalPages) {
      endPage = totalPages;
    }
    return Array.from(
      { length: endPage - startPage + 1 },
      (_, index) => startPage + index
    );
  };

  const driversToRender = nameDrivers.length > 0 ? nameDrivers : allDrivers;
  let currentDrivers = [];

  if (Array.isArray(driversToRender)) {
    const indexOfLastDriver = currentPage * driversPerPage;
    const indexOfFirstDriver = indexOfLastDriver - driversPerPage;
    currentDrivers = driversToRender.slice(
      indexOfFirstDriver,
      indexOfLastDriver
    );
  } else {
    console.error("Error: driversToRender is not an array");
  }

  return (
    <div>
      <div className={styles.container}>
        {currentDrivers.map((driver) => (
          <Card key={driver.driverId} driver={driver} />
        ))}
      </div>
      <div className={styles.paginationContainer}>
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Previous Page
        </button>
        {calculateDisplayedPages().map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => handlePageChange(pageNumber)}
            className={
              currentPage === pageNumber ? styles.activePage : styles.pageNumber
            }
          >
            {pageNumber}
          </button>
        ))}
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next Page
        </button>
      </div>
    </div>
  );
};

export default CardsContainer;
