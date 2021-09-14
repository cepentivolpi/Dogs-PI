import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Nav from "./Nav"
import Card from "./Card"
import Pages from "./Pages"
import { getDogs, filterTemperaments, filterTemperamentsAction, orden } from "../Actions/index"
import styles from "./Home.module.css"



function Home({ dogs, temperaments, getDogs, filterTemperaments, filterTemperamentsAction, orden }) {

    const [paginaActual, setPaginaActual] = useState(1)
    const [filtrado, setFiltrado] = useState({
        DBoPi: "",
        temp: ""
    })
    const [ordenar, setOrdenar] = useState("")
    const dogsPorPagina = 8;
    const ultimo = paginaActual * dogsPorPagina;
    const primero = ultimo - dogsPorPagina;
    const divisionDogs = dogs?.slice(primero, ultimo)

    const paginado = (pagina) => {
        setPaginaActual(pagina)
    }


    useEffect(() => {
        getDogs()
        filterTemperaments()
    }, [getDogs, filterTemperaments])

    function hanleOrden(e) {
        e.preventDefault();
        orden(e.target.value);
        setPaginaActual(1);
        setOrdenar("Ordenado " + e.target.value)

    }

    function handleOnClick(e) {
        e.preventDefault();
        getDogs()
    }

    function handleTemperament(e) {
        e.preventDefault()
        e.preventDefault()
        setFiltrado({ ...filtrado, temp: e.target.value })
    }

    function handleBDoAPI(e) {
        e.preventDefault()
        setFiltrado({ ...filtrado, DBoPi: e.target.value })

    }

    function handleFiltrado(e) {
        e.preventDefault()
        filterTemperamentsAction(filtrado);
        setPaginaActual(1);
        setOrdenar("Ordenado " + e.target.value)
    }
    return (
        <div className={styles.body}>
            <Nav getDogs={getDogs} />


            <div className={styles.filtrado}>
                <span>Filters: </span>
                <div>
                    <select className={styles.select} onChange={e => handleBDoAPI(e)}>
                        <option value="">Existing/Created</option>
                        <option value="todos">All</option>
                        <option value="existente">Existing</option>
                        <option value="creada">Created</option>
                    </select>



                    <select className={styles.select} onChange={e => handleTemperament(e)}>

                       <option value="">Temperaments</option>  
                       {temperaments.length && <option value="todos">All</option>}

                        {typeof temperaments[0] === "object" ? temperaments?.map(t => {
                            return <option key={t.name} value={t.name}>{t.name}</option>
                        }) : <option>ERROR</option>
                        }
                        

                    </select>

                    <button className={styles.buttonFilter} onClick={e => { handleFiltrado(e) }}>Filter</button>
                </div>
            </div>
            <Pages dogsPorPagina={dogsPorPagina} dogs={dogs?.length} paginado={paginado} />
            <div className={styles.orden}>
                <span className={styles.span}>Order: </span>
                <select className={styles.select} onChange={e => hanleOrden(e)}>
                    <option className={styles.option} value="">Choose...</option>
                    <option value="ascendente">A-Z</option>
                    <option value="descendente">Z-A</option>
                    <option value="menor-mayor">Weight Maximun less-higher</option>
                    <option value="mayor-menor">Weight Maximun higher-less</option>
                </select>
            </div>
            <div className={styles.cards}>

            {divisionDogs.length &&   divisionDogs?.map(d => {

                    return (<Card key={d.name} id={d.id} name={d.name} image={d.image} weight={d.weight} temperament={!d.db ? d.temperament : d.temperaments} />)
                })
                }
            </div>
            <div className={styles.cargar}>
                <button className={styles.button} onClick={e => { handleOnClick(e) }}>Recharge All</button>
            </div>
        </div>
    )
}
function mapStateToProps(state) {
    return {
        dogs: state.dogs,
        temperaments: state.temperaments
    };
}
export default connect(mapStateToProps, { getDogs, filterTemperaments, filterTemperamentsAction, orden })(
    Home
);

