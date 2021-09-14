import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getDog } from "../Actions/index"
import styles from "./Dog.module.css"



function Dog(props) {


  useEffect(() => {
    props.getDog(props.match.params.id)
    return () => props.getDog()
  }, [props.getDog])

  if (props.dog.length > 0) {
    if(!props.dog[0].image) {

      props.dog[0].image = "https://cdn.pixabay.com/photo/2020/07/11/11/49/lacy-5393747_1280.png";
    } 
  }


  return (
    <div className={styles.body}>
      {typeof props.dog[0] === "object" ?
        <div className={styles.info}>
          <h2 className={styles.name}>{props.dog[0]?.name}</h2>
          <img className={styles.img} src={props.dog[0]?.image} alt="perro" width="400px" height="400px" />
          <div className={styles.descripcion}>
            <h4>Temperament: {props.dog[0] ? (!props.dog[0].db ? props.dog[0].temperament : props.dog[0].temperaments?.map(d => d.name + ", ")) : "ok"} </h4>
            <h4>Weight: {props.dog[0]?.weight} kgs</h4>
            <h4>Heihht: {props.dog[0]?.height} cms</h4>
            <h4>Life Span: {props.dog[0]?.life_span}</h4>
          </div>
        </div> :

        <h5 className={styles.error}>{props.dog}</h5>
      }
    </div>
  )
}

function mapStateToProps(state) {
  return {
    dog: state.dog
  };
}


export default connect(mapStateToProps, { getDog })(
  Dog
);