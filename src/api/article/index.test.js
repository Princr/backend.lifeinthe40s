import request from 'supertest'
import { masterKey, apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Article } from '.'

const app = () => express(apiRoot, routes)

let article

beforeEach(async () => {
  article = await Article.create({})
})

test('POST /articles 201 (master)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: masterKey, name: 'test', header_content: 'test', content: 'test', imgUrl: 'test', likes: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.name).toEqual('test')
  expect(body.header_content).toEqual('test')
  expect(body.content).toEqual('test')
  expect(body.imgUrl).toEqual('test')
  expect(body.likes).toEqual('test')
})

test('POST /articles 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /articles 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /articles/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${article.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(article.id)
})

test('GET /articles/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /articles/:id 200 (master)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${article.id}`)
    .send({ access_token: masterKey, name: 'test', header_content: 'test', content: 'test', imgUrl: 'test', likes: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(article.id)
  expect(body.name).toEqual('test')
  expect(body.header_content).toEqual('test')
  expect(body.content).toEqual('test')
  expect(body.imgUrl).toEqual('test')
  expect(body.likes).toEqual('test')
})

test('PUT /articles/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${article.id}`)
  expect(status).toBe(401)
})

test('PUT /articles/:id 404 (master)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: masterKey, name: 'test', header_content: 'test', content: 'test', imgUrl: 'test', likes: 'test' })
  expect(status).toBe(404)
})

test('POST /articles/:id 204 (master)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${article.id}`)
    .query({ access_token: masterKey })
  expect(status).toBe(204)
})

test('POST /articles/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${article.id}`)
  expect(status).toBe(401)
})

test('POST /articles/:id 404 (master)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: masterKey })
  expect(status).toBe(404)
})
