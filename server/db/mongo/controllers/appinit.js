import Answer from '../models/answer';
import Question from '../models/question';
// import User from '../models/user';
// import Question from '../models/question';

function respondWithResult(res, statusCode) {
  return entity => {
    if (entity) {
      res.status(statusCode || 200).json(entity);
    }
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
export const appinit = (req, res) => {
  if (!req.user) {
    return res.sendStatus(401);
  }
  return Answer.findOne({ user: req.user._id })
    .then(user => {
      if (user) {
        return res.sendStatus(204);
      }
      return Question.find()
        .then(handleEntityNotFound(res))
        .then(respondWithResult(res))
        .catch(handleError(res));
    })
    .catch(handleError(res));
};

export default {
  appinit
};
