import { Comments } from '.'
import { User } from '../user'

let user, comments

beforeEach(async () => {
  user = await User.create({ email: 'a@a.com', password: '123456' })
  comments = await Comments.create({ user, article_id: 'test', comment: 'test', likes: 'test', dislikes: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = comments.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(comments.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.article_id).toBe(comments.article_id)
    expect(view.comment).toBe(comments.comment)
    expect(view.likes).toBe(comments.likes)
    expect(view.dislikes).toBe(comments.dislikes)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = comments.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(comments.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.article_id).toBe(comments.article_id)
    expect(view.comment).toBe(comments.comment)
    expect(view.likes).toBe(comments.likes)
    expect(view.dislikes).toBe(comments.dislikes)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
