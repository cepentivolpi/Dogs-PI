import React from "react";
import { Link } from "react-router-dom"
import styles from "./Nav.module.css"
import { FcSearch } from "react-icons/fc";



function Nav({ getDogs }) {

  const [raza, setRaza] = React.useState({
    name: '',
  })

  function handleChange(e) {
    setRaza({
      ...setRaza,
      [e.target.name]: e.target.value
    });
  }

  function handleOnClick(e) {
    e.preventDefault();
    getDogs(raza.name);
    setRaza({ name: "" })


  }

  return (
    <nav className={styles.nav}>
      <div>
        <input className={styles.search} type="search" name="name" placeholder="Enter breed..." onChange={handleChange} value={raza.name} />
        <button className={styles.buttonSearch} onClick={e => { handleOnClick(e) }}>Search <FcSearch /></button>
        <Link to="/dog"><button className={styles.buttonCrear}>Create breed</button></Link>
      </div>
    </nav>
  );
}

export default Nav;