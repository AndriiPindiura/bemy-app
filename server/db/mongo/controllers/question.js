/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/questions              ->  index
 * POST    /api/questions              ->  create
 * GET     /api/questions/:id          ->  show
 * PUT     /api/questions/:id          ->  update
 * DELETE  /api/questions/:id          ->  destroy
 */

import _ from 'lodash';
import mongoose from 'mongoose';

import Question from '../models/question';

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

// Gets a list of Questions
export function forTest(req, res) {
  return Question.find().exec()
    .then((questions) => {
      const result = _.reduce(questions, (resultQuestions, question) => {
        const resultQuestion = {
          text: question.text,
          answers: _.chain(question.answers).shuffle().head().value()
        };
        // console.log(_.shuffle(question.answers)[0]);
        resultQuestions.push(resultQuestion);
        return resultQuestions;
      }, []);
      // console.log(result);
      return result;
    })
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a list of Questions
export function index(req, res) {
  return Question.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Question from the DB
export function show(req, res) {
  return Question.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Question in the DB
export function create(req, res) {
  return Question.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

export function upload(req, res) {
  // console.log(req.body);
  const questions = req.body;
  for (let i = 0, l = questions.length; i < l; i++) {
    for (let j = 0, a = questions[i].answers.length; j < a; j++) {
      questions[i].answers[j]._id = mongoose.Types.ObjectId();
    }
    Question.create(questions[i]);
    // console.log(questions[i]);
  }
  // questions.forEach(question => console.log(question));
  // const questions = JSON.parse(req.body);
  // console.log(questions);
  return res.sendStatus(201);
  // return Question.create(req.body)
  //   .then(respondWithResult(res, 201))
  //   .catch(handleError(res));
}

export function getQuestionsByType(req, res) {
  // console.log(req.params.type);
  return Question.find({ socionicType: req.params.type}).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Updates an existing Question in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return Question.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Question from the DB
export function destroy(req, res) {
  return Question.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}

export function getQuestionsTypes(req, res) {
  return Question.find().distinct('socionicType')
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// export function wipe(req, res) {
//   return Question.remove().then(() => res.sendStatus(204), () => res.sendStatus(500));
// }

export default {
  index,
  show,
  create,
  update,
  destroy,
  upload,
  getQuestionsByType,
  getQuestionsTypes
  // wipe
};
