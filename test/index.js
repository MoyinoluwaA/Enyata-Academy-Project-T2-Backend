/* eslint-disable no-undef */
const { expect } = require('chai')
const request = require('supertest')
const faker = require('faker')
const app = require('../src/index')
require('dotenv').config()

const { USER_TOKEN, ADMIN_TOKEN } = process.env

describe('enyata academy', () => {
	it('baseroute', (done) => {
		request(app)
			.get('/')
			.expect(200)
			.end((err, res) => {
				expect(res.body.message).to.equal('Welcome to Enyata Academy API')
				expect(res.body.code).to.equal(200)
				done()
			})
	})

	it('createUser', (done) => {
		request(app)
			.post('/api/users/register')
			.send({
				first_name: faker.name.firstName(),
				last_name: faker.name.lastName(),
				email: faker.internet.email(),
				password: 'password',
				phone: faker.phone.phoneNumber(),
			})
			.expect(201)
			.end((err, res) => {
				expect(res.body.message).to.equal('User added successfully')
				expect(res.body.code).to.equal(201)
				expect(res.body.status).to.equal('success')
				expect(res.body.data).to.be.an('object')
				expect(res.body.data).to.have.property('id')
				expect(res.body.data).to.have.property('first_name')
				expect(res.body.data).to.have.property('last_name')
				expect(res.body.data).to.have.property('email')
				expect(res.body.data).to.have.property('phone')
				done()
			})
	})

	it('loginUser', (done) => {
		request(app)
			.post('/api/users/login')
			.send({
				email: 'dayoh14+2@gmail.com',
				password: 'password',
			})
			.expect(200)
			.end((err, res) => {
				expect(res.body.message).to.equal('User logged in successfully')
				expect(res.body.code).to.equal(200)
				expect(res.body.status).to.equal('success')
				expect(res.body.data).to.be.an('object')
				expect(res.body.data).to.have.property('role')
				expect(res.body.data).to.have.property('token')
				done()
			})
	})

	it('loginAdmin', (done) => {
		request(app)
			.post('/api/users/admin/login')
			.send({
				email: 'dayoh14+10@gmail.com',
				password: 'Password@2021',
			})
			.expect(200)
			.end((err, res) => {
				expect(res.body.message).to.equal('User logged in successfully')
				expect(res.body.code).to.equal(200)
				expect(res.body.status).to.equal('success')
				expect(res.body.data).to.be.an('object')
				expect(res.body.data).to.have.property('role')
				expect(res.body.data).to.have.property('token')
				done()
			})
	})

	it('updateAdminInfo', (done) => {
		request(app)
			.put('/api/users/admin/update')
			.set('Authorization', `Bearer ${ADMIN_TOKEN}`)
			.send({
				first_name: faker.name.firstName(),
			})
			.expect(200)
			.end((err, res) => {
				expect(res.body.message).to.equal('User details updated successfully')
				expect(res.body.code).to.equal(200)
				expect(res.body.status).to.equal('success')
				expect(res.body.data).to.be.an('object')
				expect(res.body.data).to.have.property('id')
				expect(res.body.data).to.have.property('first_name')
				expect(res.body.data).to.have.property('last_name')
				expect(res.body.data).to.have.property('email')
				expect(res.body.data).to.have.property('phone')
				expect(res.body.data).to.have.property('address')
				expect(res.body.data).to.have.property('country')
				done()
			})
	})

	it('userDetails', (done) => {
		request(app)
			.get('/api/users/details')
			.set('Authorization', `Bearer ${USER_TOKEN}`)
			.expect(200)
			.end((err, res) => {
				expect(res.body.message).to.equal('User details fetched successfully')
				expect(res.body.code).to.equal(200)
				expect(res.body.status).to.equal('success')
				expect(res.body.data).to.be.an('object')
				expect(res.body.data).to.have.property('id')
				expect(res.body.data).to.have.property('first_name')
				expect(res.body.data).to.have.property('last_name')
				expect(res.body.data).to.have.property('email')
				expect(res.body.data).to.have.property('phone')
				expect(res.body.data).to.have.property('picture')
				expect(res.body.data).to.have.property('address')
				expect(res.body.data).to.have.property('country')
				done()
			})
	})

	it('forgotPassword', (done) => {
		request(app)
			.post('/api/users/forgot_password')
			.send({
				email: 'dayoh14+2@gmail.com',
			})
			.expect(200)
			.end((err, res) => {
				expect(res.body.message).to.equal('Password reset link sent to mail successfully')
				expect(res.body.code).to.equal(200)
				expect(res.body.status).to.equal('success')
				expect(res.body.data).to.be.an('array')
				done()
			})
	})
})
