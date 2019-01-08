import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Comments, { schema } from './model'

const router = new Router()
const { article_id, comment, likes, dislikes } = schema.tree

/**
 * @api {post} /comments Create comments
 * @apiName CreateComments
 * @apiGroup Comments
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam article_id Comments's article_id.
 * @apiParam comment Comments's comment.
 * @apiParam likes Comments's likes.
 * @apiParam dislikes Comments's dislikes.
 * @apiSuccess {Object} comments Comments's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Comments not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true }),
  body({ article_id, comment, likes, dislikes }),
  create)

/**
 * @api {get} /comments Retrieve comments
 * @apiName RetrieveComments
 * @apiGroup Comments
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of comments.
 * @apiSuccess {Object[]} rows List of comments.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /comments/:id Retrieve comments
 * @apiName RetrieveComments
 * @apiGroup Comments
 * @apiSuccess {Object} comments Comments's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Comments not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /comments/:id Update comments
 * @apiName UpdateComments
 * @apiGroup Comments
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam article_id Comments's article_id.
 * @apiParam comment Comments's comment.
 * @apiParam likes Comments's likes.
 * @apiParam dislikes Comments's dislikes.
 * @apiSuccess {Object} comments Comments's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Comments not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({ required: true }),
  body({ article_id, comment, likes, dislikes }),
  update)

/**
 * @api {post} /comments/:id Delete comments
 * @apiName DeleteComments
 * @apiGroup Comments
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Comments not found.
 * @apiError 401 user access only.
 */
router.post('/:id',
  token({ required: true }),
  destroy)

export default router
