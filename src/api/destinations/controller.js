import { success, notFound } from '../../services/response/'
import { Destinations } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Destinations.create(body)
    .then((destinations) => destinations.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Destinations.count(query)
    .then(count => Destinations.find(query, select, cursor)
      .then((destinations) => ({
        count,
        rows: destinations.map((destinations) => destinations.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Destinations.findById(params.id)
    .then(notFound(res))
    .then((destinations) => destinations ? destinations.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Destinations.findById(params.id)
    .then(notFound(res))
    .then((destinations) => destinations ? Object.assign(destinations, body).save() : null)
    .then((destinations) => destinations ? destinations.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Destinations.findById(params.id)
    .then(notFound(res))
    .then((destinations) => destinations ? destinations.remove() : null)
    .then(success(res, 204))
    .catch(next)
