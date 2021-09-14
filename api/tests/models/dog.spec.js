const { Dog, conn } = require('../../src/db.js');
const  expect  = require('chai').expect;

describe('Dog model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Dog.sync({ force: true }));
    describe('error', () => {
      it('Deberia dar error si no se pasa el name', async function() {
        try{
         await Dog.create({ weight: "15 - 22",
        height: "10 - 25"})}
        catch(error) { 
          expect(error.message).to.be.equals("notNull Violation: dog.name cannot be null")}
      });
      it('Deberia dar error si no se pasa el weight', async function() {
        try{
         await Dog.create({ name: "Pug",
        height: "10 - 25"})}
        catch(error) { 
          expect(error.message).to.be.equals("notNull Violation: dog.weight cannot be null")}
      });
      it('Deberia dar error si no se pasa el height', async function() {
        try{
        await Dog.create({ name: "Pug",
        weight: "10 - 25"})}
        catch(error) { 
          expect(error.message).to.be.equals("notNull Violation: dog.height cannot be null")}
      });
      it('Deberia dar error si se pasa un objeto vacio', async function() {
        try{
         await Dog.create({})}
        catch(error) { 
          expect(typeof error).to.be.equals("object");}
      });
      it('Deberia dar error si se pasa una raza de perro con el mismo name', async function() {
        
        try{
       var response = await Dog.create({ name: "Pug",
        weight: "10 - 25",
        height: "20 - 30"})
        await Dog.create({ name: "Pug",
         weight: "15 - 26",
        height: "24 - 33"})
        }
        catch(error) {
          expect(error.message).to.be.equals("llave duplicada viola restricción de unicidad «dogs_name_key»");
        }
      });
     
    });
    describe('succefully', () => {
      it('Deberia crear dog', async function() {
          var response = await Dog.create({ name: "Henry",
           weight: "10 - 25",
           height: "20 - 30"})
      
      expect(response.dataValues).to.be.an("Object");
      expect(response.dataValues.name).to.be.equal("Henry")
      expect(response.dataValues.weight).to.be.equal("10 - 25")
      expect(response.dataValues.height).to.be.equal("20 - 30")
      
        
      });
    })
  });
});
