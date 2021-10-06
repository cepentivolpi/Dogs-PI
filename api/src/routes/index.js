require('dotenv').config();
const { Router } = require('express');
const axios = require("axios").default;
const { Dog, Temperament } = require('../db')
const {
    API_KEY
  } = process.env;
  
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const re = [];
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/dogs", async (req, res) => {
    nameQuery = req.query.name;
    
    try{

        const d = await axios.get(`https://api.thedogapi.com/v1/breeds/${API_KEY}` ) 
        
        const re = await d.data.map(r=>{
            return {
                id: r.id,
                image : r.image.url,
                name: r.name,
                temperament: r.temperament,
                weight : r.weight.metric,
                db: r.db
            }
        }) ;
        
        const rdb = await Dog.findAll({
            include: {
                model : Temperament,
                attributes : ["name"],
                through: {
                    attributes : [],
                }
            }
        })
        
        let dogsTotales = re.concat(rdb)
        if(nameQuery){
            let porNombre = await dogsTotales.filter(r => r.name.toLowerCase().includes(nameQuery.toLowerCase()));
            porNombre.length ? res.status(200).json(porNombre) : res.status(404).send("Not found dog");
        }else {res.status(200).send(dogsTotales)}
    }
    catch (error) {
        if (error.response?.status === 404) {
          res.status(404).send("Not found");
        } else res.status(500).send("Error");
      }
    });
  
  router.get("/dogs/:idraza", async (req, res) => {
      const id = req.params.idraza;
      
      try{

        const d = await axios.get(`https://api.thedogapi.com/v1/breeds/${API_KEY}` ) 
        const re = await d.data.map(r=>{
            return {
                id: r.id,
                name: r.name,
                image : r.image.url,
                height : r.height.metric,
                weight : r.weight.metric,
                temperament: r.temperament,
                life_span: r.life_span,
                db: r.db
            }
        }) ;
        
        const rdb = await Dog.findAll({
            include: {
                model : Temperament,
                attributes : ["name"],
                through: {
                    attributes : [],
                }
            }
        })
        let dogsTotales = re.concat(rdb)
        
        if(id){
            let idEncontrado = await dogsTotales.filter( r => r.id == id)
            idEncontrado.length ? res.status(200).send(idEncontrado) : res.status(404).send("Not found id dog" );
        }
      } catch (error) {
        if (error.response?.status === 404) {
          res.status(404).send("Not found id dog" );
        } else res.status(500).json("Error");
      }
  });

  router.get("/temperament", async (req, res) => {  
      try {
  const response = await axios.get(`https://api.thedogapi.com/v1/breeds/${API_KEY}`)
  const temperaments = response.data.map(r =>  r.temperament)
  let temp = temperaments[0];
  for(let i = 1; i < temperaments.length; i++){
    temp = temp +","+ temperaments[i]
  }
  temp = temp.replaceAll(", ", ",")
  temp = temp.split(",")
    temp.forEach(r => {
       Temperament.findOrCreate({
           where: { name : r}
       })
   });
   const temperamentosTotal = await Temperament.findAll();  
      res.status(200).send(temperamentosTotal);
    } catch (error) {
       res.status(500).send(error.response.data);
    }
});

router.post("/dog", async (req, res) => {  
    
    try {
        let {name, weight, height, temperament, life_span} = req.body;
          
        
              let dog = await Dog.create({
                  name,
                  weight,
                  height,
                  life_span
                  
                })
                
                
               

                  let temperamentoDatos = await Temperament.findAll({
                    where: {name : temperament}
                  })
                
                dog.addTemperament(temperamentoDatos)
                res.send("Successfully created")
  } catch {
     res.status(500).send("Error created");
  }
});

module.exports = router;
