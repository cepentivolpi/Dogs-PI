import React from "react"
import styles from "./Pages.module.css"

export default function Pages({ dogsPorPagina, dogs, paginado }) {


    let cantPaginas = []
    let paginas = Math.ceil(dogs / dogsPorPagina)

    for (let i = 0; i < paginas; i++) {
        cantPaginas[i] = i + 1
    }

    return (
        <div className={styles.paginas}>
            <ul>
                {cantPaginas && cantPaginas.map(n => (
                    <li className={styles.numeros} key={n}>
                        <button className={styles.button} onClick={() => paginado(n)}>{n}</button>
                    </li>
                ))}
            </ul>

        </div>
    )
}