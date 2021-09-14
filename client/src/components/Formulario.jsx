import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { filterTemperaments, postDog } from "../Actions/index"
import FormItem from "./FormItem";
import styles from "./Formulario.module.css"

function validate(data) {
  const errors = {};
  if (!data.name) errors.name = "Debe ingresar una raza";
  if (data.name.length < 2) errors.name = "Debe ingresar una raza con al menos dos letras";
  if (!(/^[a-z]+$/g.test(data.name))) errors.name = "Debe ingresar solo letras"
  if (!data.weightmin) errors.weightmin = "Debe ingresar un peso mínimo";
  if (parseInt(data.weightmin) <= 0) errors.weightmin = "Debe ingresar un peso mínimo mayor a 0 kg";
  if (parseInt(data.weightmin) >= 100) errors.weightmin = "Debe ingresar un peso mínimo menor a 100 kg";
  if (!data.weightmax) errors.weightmax = "Debe ingresar un peso máximo";
  if (parseInt(data.weightmax) <= 1) errors.weightmax = "Debe ingresar un peso máximo mayor a 1 kg";
  if (parseInt(data.weightmax) >= 120) errors.weightmax = "Debe ingresar un peso máximo menor a 120 kg";
  if (!data.heightmin) errors.heightmin = "Debe ingresar una altura mínmima";
  if (parseInt(data.heightmin) <= 5) errors.heightmin = "Debe ingresar un altura mínima mayor a 5 cm";
  if (parseInt(data.heightmin) >= 100) errors.heightmin = "Debe ingresar un altura mínima menor a 100 cm";
  if (!data.heightmax) errors.heightmax = "Debe ingresar una altura máxima";
  if (parseInt(data.heightmax) <= 10) errors.heightmax = "Debe ingresar un altura máxima mayor a 10 cm";
  if (parseInt(data.heightmax) >= 120) errors.heightmax = "Debe ingresar un altura máxima menor a 120 cm";
  if (parseInt(data.life_spanmin) <= 7) errors.life_spanmin = "Debe ingresar un número mayor a 7";
  if (parseInt(data.life_spanmin) >= 15) errors.life_spanmin = "Debe ingresar un número menor a 15";
  if (parseInt(data.life_spanmax) <= 9) errors.life_spanmax = "Debe ingresar un número mayor a 9";
  if (parseInt(data.life_spanmax) >= 21) errors.life_spanmax = "Debe ingresar un número menor a 21";

  return errors;
}

function Formulario({ filterTemperaments, postDog, temperaments }) {
  const [formData, setFormData] = React.useState({
    name: "",
    weightmin: "",
    weightmax: "",
    heightmin: "",
    heightmax: "",
    life_spanmin: "",
    life_spanmax: "",
    temperament: []
  });
  const history = new useHistory();
  const [errors, setErrors] = React.useState({ a: "" });

  useEffect(() => {
    filterTemperaments()
  }, [filterTemperaments])

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setErrors(validate({
      ...formData,
      [e.target.name]: e.target.value
    }))
  }

  function handleTemp(e) {
    setFormData({
      ...formData,
      temperament: [...formData.temperament, e.target.value]
    });

  }

  function handleSubmit(e) {
    e.preventDefault();
    if (Object.values(errors).length > 1)
      alert("Completa la informacion solicitada");
    else {

      postDog({ name: formData.name.toLocaleLowerCase().replace(/\b\w/g, a => a.toUpperCase()), weight: formData.weightmin + " - " + formData.weightmax, height: formData.heightmin + " - " + formData.heightmax, temperament: formData.temperament, life_span: formData.life_spanmin + " - " + formData.life_spanmax + " years" });
      //alert("Perro creado exitosamente!")
      setFormData({ name: "", weight: "", height: "", life_span: "" });
      history.push("/home");
    }
  }

  return (
    <div className={styles.body}>
      <form className={styles.form}
        onSubmit={handleSubmit}
        style={{ margin: "0 auto", width: "20rem" }}
      >
        <div className={styles.prop}>
          <h4 className={styles.h4}>BREED</h4>
          <FormItem

            type="text"
            name="name"
            value={formData.name}
            handleChange={handleChange}
            error={errors.name}
          />
        </div>
        <div className={styles.prop}>

          <h4 className={styles.h4}>WEIGHT</h4>
          <FormItem
            label="minimun:"
            type="number"
            name="weightmin"
            value={formData.weightmin}
            handleChange={handleChange}
            error={errors.weightmin}
          />


          <FormItem
            label="maximun:"
            type="number"
            name="weightmax"
            value={formData.weightmax}
            handleChange={handleChange}
            error={errors.weightmax}
          />

        </div>

        <div className={styles.prop}>
          <h4 className={styles.h4}>HEIGHT</h4>

          <FormItem
            label="minimun"
            type="number"
            name="heightmin"
            value={formData.heightmin}
            handleChange={handleChange}
            error={errors.heightmin}
          />
          <FormItem
            label="maximun:"
            type="number"
            name="heightmax"
            value={formData.heightmax}
            handleChange={handleChange}
            error={errors.heightmax}
          />
        </div>
        <div className={styles.prop}>

          <h4 className={styles.h4}>LIFE SPAN</h4>

          <FormItem
            label="minimun:"
            type="number"
            name="life_spanmin"
            value={formData.life_spanmin}
            handleChange={handleChange}
            error={errors.life_spanmin}
          />
          <FormItem
            label="minimun"
            type="number"
            name="life_spanmax"
            value={formData.life_spanmax}
            handleChange={handleChange}
            error={errors.life_spanmax}
          />
        </div>
        <div className={styles.temperament}>
          <span>Temperaments: </span>

          <select className={styles.select} onChange={(e) => handleTemp(e)}>
            <option value="">Choose...</option>
            {temperaments?.map(t => {
              return <option key={t.name} value={t.name}>{t.name}</option>
            })
            }
          </select>

          <ul className={styles.ul}><li>{formData.temperament?.map(t => t + ",  ")}</li></ul>

        </div>
        <input type="submit" value="Create" disabled={Object.values(errors).length > 0} />
      </form>

    </div>
  );
}



function mapStateToProps(state) {
  return {
    temperaments: state.temperaments
  };
}

export default connect(mapStateToProps, { filterTemperaments, postDog })(
  Formulario
);