let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let should = chai.should();
const jwt = require('jsonwebtoken');
require('dotenv').config();

chai.use(chaiHttp);

describe('Express API Testing', () => {


    describe('admin API Testing', () => {
  
      it('it should GET job by id: 1040', (done) => {
        const token = jwt.sign({ adminId: 112 }, process.env.JWT_SECRETKEY);
        chai.request(server)
          .get('/empApi/job/1040')
          .set('Authorization', `Bearer ${token}`)
          .end((err, res) => {
            console.log(res.body);
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('status').eql(true);
            done();
          });
      });
      it('it should GET job by employee_id: 112', (done) => {
        const token = jwt.sign({ adminId: 112 }, process.env.JWT_SECRETKEY);
        chai.request(server)
          .get('/empApi/jobs/employee/112')
          .set('Authorization', `Bearer ${token}`)
          .end((err, res) => {
            console.log(res.body);
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('status').eql(true);
            done();
          });
      });
      it('it should GET Applications', (done) => {
        const token = jwt.sign({ adminId: 112 }, process.env.JWT_SECRETKEY);
        chai.request(server)
          .get('/empApi/applications')
          .set('Authorization', `Bearer ${token}`)
          .end((err, res) => {
            console.log(res.body);
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('status').eql(true);
            done();
          });
      });
      it('it should GET resume by userid:103', (done) => {
        const token = jwt.sign({ adminId: 112 }, process.env.JWT_SECRETKEY);
        chai.request(server)
          .get('/empApi/getResumeByUserId/103')
          .set('Authorization', `Bearer ${token}`)
          .end((err, res) => {
            console.log(res.body);
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('status').eql(true);
            done();
          });
      });
      it('it should GET Applications by id:502', (done) => {
        const token = jwt.sign({ adminId: 112 }, process.env.JWT_SECRETKEY);
        chai.request(server)
          .get('/empApi/application/502')
          .set('Authorization', `Bearer ${token}`)
          .end((err, res) => {
            console.log(res.body);
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('status').eql(true);
            done();
          });
      });
      
    });
});