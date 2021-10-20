//const supertest = require('supertest')
const app = require('../../dist/backend/src/app/app').default
const request =  require('supertest')

  const api = request(app)


  describe('Route testing', () => {
    it('Should return an http 200 and a "message" property (route: GET /)', async () => {
      const res = await request(app).get('/')
  expect(res.status).toEqual(200)
      expect(res.body.name).toBe('tobi')
    }),
  it('Should return an http 200 and a "message" property (route: GET /)', async () => {
      const res = await request(app).get('/user')
  expect(res.status).toEqual(200)
      expect(res.body.name).toBe('pedro')
    })
})

