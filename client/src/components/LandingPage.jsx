import React from "react"
import { Link } from "react-router-dom"
import styles from "./LandingPage.module.css"

export default function LandingPage() {
    return (
        <div className={styles.body}>
            <div className={styles.dogsApp}>
                <h1 className={styles.tittle}>DOGS APP</h1>
                <Link className={styles.link} to="/home"><div className={styles.img}>

                    <p className={styles.button}>ENTER</p>
                    <img className={styles.imagen} src="https://cdn.pixabay.com/photo/2016/03/31/17/37/animal-1293792_1280.png" alt="pata perro" width="50px" height="50px" />
                </div></Link>

            </div>
        </div>
    )
}