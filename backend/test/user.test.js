//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let should = chai.should();
const jwt = require('jsonwebtoken');
require('dotenv').config();

chai.use(chaiHttp);

describe('Express API Testing', () => {


  describe('user API Testing', () => {

    it('it should GET job by id: 1002', (done) => {
      const token = jwt.sign({ userId: 101, role: "User" }, process.env.JWT_SECRETKEY);
      chai.request(server)
        .get('/userApi/jobId/1002')
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          console.log(res.body);
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql(true);
          done();
        });
    });

    it('it should GET job by loc: hyd', (done) => {
      const token = jwt.sign({ userId: 101 }, process.env.JWT_SECRETKEY);
      chai.request(server)
        .get('/userApi/jobLoc/hyd')
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(200);
          //res.body.should.be.a('array');
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql(true);
          //res.body.should.have.property('status').eql(true);
          done();
        });
    });

    it('it should GET job by industry: it', (done) => {
      const token = jwt.sign({ userId: 101 }, process.env.JWT_SECRETKEY);
      chai.request(server)
        .get('/userApi/jobInd/it')
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          //console.log(res.body);
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql(true);
          done();
        });
    });
    it('it should GET job by industry: it', (done) => {
      const token = jwt.sign({ userId: 101 }, process.env.JWT_SECRETKEY);
      chai.request(server)
        .get('/userApi/jobInd/it')
        //.set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          //console.log(res.body);
          res.should.have.status(401);
          res.body.should.be.a('object');
          res.body.should.have.property('success').eql(false);
          res.body.should.have.property('message').eql("Authorization Failed. No Access Token");
          done();
        });
    });
    it('it should GET resume by userid: 101', (done) => {
      const token = jwt.sign({ userId: 101 }, process.env.JWT_SECRETKEY);
      chai.request(server)
        .get('/resumeApi/getResumeByUserId/101')
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql(true);
          done();
        });
    });
    it('it should GET resume by userid: 1001', (done) => {
      const token = jwt.sign({ userId: 101 }, process.env.JWT_SECRETKEY);
      chai.request(server)
        .get('/resumeApi/getResumeByUserId/1001')
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          console.log(res.body);
          res.should.have.status(422);
          res.body.should.be.a('object');
          res.body.should.have.property('success').eql(false);
          res.body.should.have.property('msg')
          done();
        });
    });
    // it.skip('it should POST the dept object', (done) => {
    //   var deptObj = { deptno: 898, dname: 'TestDept', loc: 'TestLoc' };
    //   chai.request(server)
    //     .post('/deptapi/Depts')
    //     .send(deptObj)
    //     .end((err, res) => {
    //       console.log(res.body);
    //       res.should.have.status(200);
    //       res.body.should.have.property('message').eql('Dept details are inserted');
    //       done();
    //     });
    // });

  });
});