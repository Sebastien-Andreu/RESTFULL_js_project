var server = require('../server.js');
var request = require('supertest');
var DAOuser = require('../DAO/DAOUsers')
var User = require('../class/Users')
var token = "";


describe('Authed Routes - get /Users', () => {
  before(function(done) {
    request('http://localhost:3000')
      .post('/auth')
      .send({username: "admin",password: "admin"})
      .end(function(err, res){
        token = res.text;
        done();
      });
    });
  it('get /Users', function(done) {
    request("http://localhost:3000")
      .get('/Users')
      .set("Authorization", "Bearer " + token)
      .set('Accept', 'application/json; charset=utf-8')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});

describe('get /Users/:id', () => {
  it('get /Users/:id', function(done) {
    request("http://localhost:3000")
      .get('/Users/3')
      .set("Authorization", "Bearer " + token)
      .set('Accept', 'application/json; charset=utf-8')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});


describe('add new User', () => {
  it('add new User', function(done) {
    request("http://localhost:3000")
      .post('/Users')
      .send({name: "nameTest",surname: "surnameTest"})
      .set("Authorization", "Bearer " + token)
      .set('Accept', 'application/text/plain; charset=utf-8')
      .expect('Content-Type', "text/plain; charset=utf-8")
      .expect(200, done);
  });
});

describe('Authed Routes', () => {
  it('Update new User', async() => {
        return new Promise(async(resolve, reject) => {
            try {
                let user = await DAOuser.otherFind("nameTest", "surnameTest");
                let idUser = user[0].ID;

                request("http://localhost:3000")
                  .put('/Users/' + idUser)
                  .send({name: "nameTestUpdate",surname: "surnameTestUpdate"})
                  .set("Authorization", "Bearer " + token)
                  .set('Accept', 'application/text/plain; charset=utf-8')
                  .expect('Content-Type', "text/plain; charset=utf-8")
                  .expect(200, resolve);
            } catch (e) {
                console.error(e);
            }
        });
    });
});

describe('Authed Routes', () => {
  it('Delete new User', async() => {
        return new Promise(async(resolve, reject) => {
            try {
                let user = await DAOuser.otherFind("nameTestUpdate", "surnameTestUpdate");
                let idUser = user[0].ID;

                request("http://localhost:3000")
                    .delete('/Users/' + idUser)
                    .set("Authorization", "Bearer " + token)
                    .set('Accept', 'application/json; charset=utf-8')
                    .expect('Content-Type', /json/)
                    .expect(200, resolve);
            } catch (e) {
                console.error(e);
            }
        });
    });
});
