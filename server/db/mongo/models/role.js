/**
 * Defining a User Model in mongoose
 * Code modified from https://github.com/sahat/hackathon-starter
 */

import mongoose from 'mongoose';

// Other oauthtypes to be added

/*
 User Schema
 */

const RoleSchema = new mongoose.Schema({
    description: String,
});


export default mongoose.model('Role', RoleSchema);
