import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Destinations, { schema } from './model'

const router = new Router()
const { name, location, imgUrl, description } = schema.tree

/**
 * @api {post} /destinations Create destinations
 * @apiName CreateDestinations
 * @apiGroup Destinations
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam name Destinations's name.
 * @apiParam location Destinations's location.
 * @apiParam imgUrl Destinations's imgUrl.
 * @apiParam description Destinations's description.
 * @apiSuccess {Object} destinations Destinations's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Destinations not found.
 * @apiError 401 admin access only.
 */
router.post('/',
  token({ required: true, roles: ['admin'] }),
  body({ name, location, imgUrl, description }),
  create)

/**
 * @api {get} /destinations Retrieve destinations
 * @apiName RetrieveDestinations
 * @apiGroup Destinations
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of destinations.
 * @apiSuccess {Object[]} rows List of destinations.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/',
  token({ required: true }),
  query(),
  index)

/**
 * @api {get} /destinations/:id Retrieve destinations
 * @apiName RetrieveDestinations
 * @apiGroup Destinations
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} destinations Destinations's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Destinations not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  token({ required: true }),
  show)

/**
 * @api {put} /destinations/:id Update destinations
 * @apiName UpdateDestinations
 * @apiGroup Destinations
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam name Destinations's name.
 * @apiParam location Destinations's location.
 * @apiParam imgUrl Destinations's imgUrl.
 * @apiParam description Destinations's description.
 * @apiSuccess {Object} destinations Destinations's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Destinations not found.
 * @apiError 401 admin access only.
 */
router.put('/:id',
  token({ required: true, roles: ['admin'] }),
  body({ name, location, imgUrl, description }),
  update)

/**
 * @api {delete} /destinations/:id Delete destinations
 * @apiName DeleteDestinations
 * @apiGroup Destinations
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Destinations not found.
 * @apiError 401 admin access only.
 */
router.delete('/:id',
  token({ required: true, roles: ['admin'] }),
  destroy)

export default router
