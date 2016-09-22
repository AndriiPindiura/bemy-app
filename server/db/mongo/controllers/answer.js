/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/answers              ->  index
 * POST    /api/answers              ->  create
 * GET     /api/answers/:id          ->  show
 * PUT     /api/answers/:id          ->  update
 * DELETE  /api/answers/:id          ->  destroy
 */

import _ from 'lodash';
import Answer from '../models/answer';
// import User from '../models/user';
// import Question from '../models/question';

function respondWithResult(res, statusCode) {
  return entity => {
    if (entity) {
      res.status(statusCode || 200).json(entity);
    }
  };
}

function saveUpdates(updates) {
  return entity => {
    const updated = _.merge(entity, updates);
    return updated.save()
      .then(result => {
        return result;
      });
  };
}

function removeEntity(res) {
  return entity => {
    if (entity) {
      return entity.remove()
        .then(() => {
          res.status(204).end();
          // return true;
        });
    }
    // this is HACK
    return true;
    // this is HACK
  };
}

function handleEntityNotFound(res) {
  return entity => {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  return err => {
    res.status(statusCode || 500).send(err);
  };
}

// Gets a list of Answers
export function index(req, res) {
  return Answer.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Answer from the DB
export function show(req, res) {
  // .populate('userId').populate('answers:question')
  return Answer.findById(req.params.id)
  .deepPopulate('user answers.question')
    // .populate('user')
    // .populate('answers:question')
    .exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Answer in the DB
export function create(req, res) {
  return Answer.create({
    userId: req.user._id,
    answers: req.body.answers
  })
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Answer in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return Answer.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Answer from the DB
export function destroy(req, res) {
  return Answer.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}

export function wipe(req, res) {
  return Answer.remove().then(() => res.sendStatus(204), () => res.sendStatus(500));
}


export default {
  index,
  show,
  create,
  update,
  destroy,
  wipe
};
