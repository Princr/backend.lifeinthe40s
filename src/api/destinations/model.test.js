import { Destinations } from '.'

let destinations

beforeEach(async () => {
  destinations = await Destinations.create({ name: 'test', location: 'test', imgUrl: 'test', description: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = destinations.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(destinations.id)
    expect(view.name).toBe(destinations.name)
    expect(view.location).toBe(destinations.location)
    expect(view.imgUrl).toBe(destinations.imgUrl)
    expect(view.description).toBe(destinations.description)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = destinations.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(destinations.id)
    expect(view.name).toBe(destinations.name)
    expect(view.location).toBe(destinations.location)
    expect(view.imgUrl).toBe(destinations.imgUrl)
    expect(view.description).toBe(destinations.description)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
