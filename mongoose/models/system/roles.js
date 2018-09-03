const mongoose = require('mongoose');
const roleSchema = require('../../schema/system/roles');
const Role = mongoose.model('role',roleSchema);
module.exports = Role;