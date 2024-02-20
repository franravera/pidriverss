import React from "react";
import { Link } from "react-router-dom";
import style from "../Landingpage/landingPage.module.css";
function LandingPage() {
  return (
    <div className={style.container1}>
      <Link to="/home">
        <button className={style.buttonGo}>GO!</button>
      </Link>
    </div>
  );
}

export default LandingPage;
