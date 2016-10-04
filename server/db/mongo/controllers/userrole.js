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

import Role from '../models/role';
import UserRole from '../models/userrole';

const respondWithResult = (res, statusCode) => {
  return entity => {
    if (entity) {
      res.status(statusCode || 200).json(entity);
    }
  };
};

const saveUpdates = (updates) => {
  return entity => {
    const updated = _.merge(entity, updates);
    return updated.save()
      .then(result => {
        return result;
      });
  };
};

const removeEntity = (res) => {
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
};

const handleRoleNotFound = () => {
  return entity => {
    if (!entity) {
      return null;
    }
    return entity;
  };
};

const handleEntityNotFound = (res) => {
  return entity => {
    if (!entity) {
      // return res.send(JSON.stringify({ result: false }));
      res.status(404).end();
      return null;
    }
    return entity._id;
  };
};

const handleError = (res, statusCode) => {
  return err => {
    res.status(statusCode || 500).send(err);
  };
};

export function showRoles(req, res) {
  return UserRole.find()
    .deepPopulate('user role')
      .exec()
      .then(handleEntityNotFound(res))
      .then(() => res.send(JSON.stringify({ result: true })))
      .catch(handleError(res));
}

export const getRoleId = description => Role.findOne({ description });

export const checkRole = (user, role) => UserRole.findOne({ user, role });

export function assignRole(req, res) {
  return UserRole.create({ user: req.body.user, role: req.body.role })
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

export function addRole(req, res) {
  console.log(req.body);
  return Role.create({ description: req.body.role })
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

export function showRole(req, res) {
  return Role.findById(req.params.id)
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

export default {
  showRole,
  addRole,
  checkRole,
  assignRole,
  showRoles,
  getRoleId,
};
