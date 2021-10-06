import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom"
import styles from "./Nav.module.css"
import { FcSearch } from "react-icons/fc";
import { dogsMatch } from "../Actions/index"


function Nav(props) {

  const [raza, setRaza] = React.useState({
    name: '',
  })

  React.useEffect(() => {
    props.dogsMatch(raza)
}, [dogsMatch])

  function handleChange(e) {
    setRaza({
      ...setRaza,
      [e.target.name]: e.target.value
    });
  }

  function handleOnClick(e) {
    e.preventDefault();
    props.getDogs(raza.name);
    props.setPaginaActual(1);
    setRaza({ name: "" })


  }

  return (
    <nav className={styles.nav}>
      <div>
      <form autocomplete="off"> <input className={styles.search} list="languages" type="search" name="name" placeholder="Enter breed..." onChange={handleChange} value={raza.name}/>
      <datalist id="languages">
      { props.dogM?.map(t => {
                            return <option key={t.name} value={t.name}></option>} )}
  </datalist>
        <button className={styles.buttonSearch} onClick={e => { handleOnClick(e) }}>Search <FcSearch /></button>
        <Link to="/dog"><button className={styles.buttonCrear}>Create breed</button></Link>
        </form>
      </div>
    </nav>
  );
}

function mapStateToProps(state) {
  return {
      dogM: state.dogM
  };
}

export default connect(mapStateToProps, { dogsMatch })(
  Nav
)