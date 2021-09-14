/* eslint-disable import/no-extraneous-dependencies */
const expect = require('chai').expect;
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Dog, conn } = require('../../src/db.js');



const agent = session(app);
const dogone = {
  name: 'Ronaldinho',
  weight: "15 - 22",
  height: "10 - 25"
};
const dogtwo = {
  name: 'Ronaldo',
  weight: "25 - 35",
  height: "20 - 30"
};

describe('Videogame routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Dog.sync({ force: true }))
    //.then(() => Dog.create(dog)));
  describe('GET /dogs', () => {
    it('GET solo responde con los perros de la api', async function(){
      var response = await agent.get('/dogs');
      expect(response.status).to.be.equal(200);
      expect(response.body.length).to.be.equal(172);
      expect(response).to.be.an("Object");
   
  });

    it('GET responde 404 si se ingresa otra', async function(){
      var response = await agent.get('/dogss');
      expect(response.status).to.be.equal(404);
      
  });

  it('GET responde sumando los perros creados', async function(){
    await Dog.create(dogone);
    await Dog.create(dogtwo);
    var response = await agent.get('/dogs');
    expect(response.status).to.be.equal(200);
    expect(response.body.length).to.be.equal(174);
    expect(response).to.be.an("Object");
 
});

it('GET devuelve los perros creados que coincidan con el nombre pasado por query', async function(){
    await Dog.create(dogone);
    await Dog.create(dogtwo);
    var response = await agent.get('/dogs?name=Ronaldi');
    expect(response.status).to.be.equal(200);
    expect(response).to.be.an("Object");
    expect(response.body[0].name).to.be.equal("Ronaldinho");
    expect(response.body.length).to.be.equal(1);
 
});

it('GET devuelve los perros de la api que coincidan con el nombre pasado por query', async function(){
  var response = await agent.get('/dogs?name=bull');
  expect(response.status).to.be.equal(200);
  expect(response.body.length).to.be.equal(10);
  expect(response.body[4].name).to.be.equal("Bull Terrier");
  expect(response).to.be.an("Object");

});

it('GET devuelve 404 cuando no se encuentran coincidencias', async function(){
  var response = await agent.get('/dogs?name=messi');
  expect(response.status).to.be.equal(404);
  expect(response).to.be.an("Object");

});
    


});
})