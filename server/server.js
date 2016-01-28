Meteor.startup(function() {
  // roles
  _.forEach(_.values(ROLES), function (role) {
    if (!Meteor.roles.findOne({name: role})) {
      Roles.createRole(role);
    }
  });

  // indexes
  Meteor.users._ensureIndex('profile.username', { unique: 1, sparse: 1});
  Meteor.users._ensureIndex('profile.email', { unique: 1, sparse: 1});
});

Accounts.onCreateUser(function (options, user) {
  if (options.profile) {
    user.profile = options.profile;
  }

  user.roles = [ROLES.user];

  return user;
});

