import { Article } from '.'

let article

beforeEach(async () => {
  article = await Article.create({ name: 'test', header_content: 'test', content: 'test', imgUrl: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = article.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(article.id)
    expect(view.name).toBe(article.name)
    expect(view.header_content).toBe(article.header_content)
    expect(view.content).toBe(article.content)
    expect(view.imgUrl).toBe(article.imgUrl)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = article.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(article.id)
    expect(view.name).toBe(article.name)
    expect(view.header_content).toBe(article.header_content)
    expect(view.content).toBe(article.content)
    expect(view.imgUrl).toBe(article.imgUrl)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
