const mongoose = require('mongoose');
const PermissionsSchema = require('../../schema/system/permissions');
const Permission = mongoose.model('permission',PermissionsSchema);
module.exports = Permission;