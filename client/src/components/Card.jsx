import React from "react";
import { Link } from "react-router-dom"
import styles from "./Card.module.css"




function Card({ id, image, name, temperament, weight }) {

  if (!image) image = "https://cdn.pixabay.com/photo/2020/07/11/11/49/lacy-5393747_1280.png"
  if (temperament) {
    if (typeof temperament !== "string") {
      if (temperament.length > 0) {
        let s = ""
        for (let i = 0; i < temperament.length; i++) {
          s = s + temperament[i].name + ", ";
        }
        temperament = s;
      }
    }
  }
  return (

    <div className={styles.card} >
      <Link className={styles.link} to={`/home/${id}`}><h3 className={styles.name}>{name}</h3></Link>
      <Link className={styles.link} to={`/home/${id}`}><img src={image} alt="perro" width="220px" height="150px" /></Link>
      <h5 className={styles.temperamentos}>{temperament}</h5>
      <h5 className={styles.peso}>Weight: {weight}</h5>
    </div>

  );
}

export default Card;
