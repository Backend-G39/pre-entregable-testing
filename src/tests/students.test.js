require('../models')
const app = require('../app')
const request = require('supertest')
const BASE_URL = '/api/v1/students'


const students = {
  firstName: 'Ivan',
  lastName: 'Arteaga',
  birthday: '2022-10-09',
  program: 'Ing. software'
}

let studentId

const studentUpdate = {
  firstName: 'Juan',
}

//! test del post
test("POST -> 'BASE_URL',should return status code 201, and res.body to be defined, res.body.firstName === students.firstName", async () => {

  const res = await request(app)
    .post(BASE_URL)
    .send(students)

  studentId = res.body.id

  expect(res.statusCode).toBe(201)
  expect(res.body).toBeDefined()
  expect(res.body.firstName).toBe(students.firstName)
})

//! test del getAll
test("GET -> 'BASE_URL', should return statusCode 200, and res.body.length === 1", async () => {

  const res = await request(app)
    .get(BASE_URL)

  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body).toHaveLength(1)
  expect(res.body.length).toBe(1)

  expect(res.body[0].courses).toBeDefined()
  expect(res.body[0].courses).toHaveLength(0)
})

//! test getOne
test("GET -> 'BASE_URL/:id' should return status code 200, and res.body.firstName === student.firstName", async () => {
  const res = await request(app)
    .get(`${BASE_URL}/${studentId}`);

  // console.log(res.body)


  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body.firstName).toBe(students.firstName);
  expect(res.body.id).toBe(studentId);

  expect(res.body.courses).toBeDefined()
  expect(res.body.courses).toHaveLength(0)
});


// //! test del update
test("UPDATE -> 'BASE_URL/:id', should return status code 200 and res.body.firstName to be studentUpdate.firstName ", async () => {
  const res = await request(app)
    .put(`${BASE_URL}/${studentId}`)
    .send(studentUpdate)

  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body.firstName).toBe(studentUpdate.firstName)
  expect(res.body.id).toBe(studentId)
})


//! test del remove

test("Delete -> 'BASE_URL/:id', should return status code 204", async () => {
  const res = await request(app)
    .delete(`${BASE_URL}/${studentId}`)

  expect(res.statusCode).toBe(204)
})


