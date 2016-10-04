/**
 * Defining a User Model in mongoose
 * Code modified from https://github.com/sahat/hackathon-starter
 */

import mongoose, { Schema } from 'mongoose';

const deepPopulate = require('mongoose-deep-populate')(mongoose);

// Other oauthtypes to be added

/*
 User Schema
 */

const UserRoleSchema = new mongoose.Schema({
    user: { type: Schema.ObjectId, ref: 'User' },
    role: { type: Schema.ObjectId, ref: 'Role' },
});

UserRoleSchema.plugin(deepPopulate, {});

export default mongoose.model('UserRole', UserRoleSchema);
