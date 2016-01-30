Meteor.startup(function() {
  // roles
  _.forEach(_.values(ROLES), function (role) {
    if (!Meteor.roles.findOne({name: role})) {
      Roles.createRole(role);
    }
  });

  // indexes
  Meteor.users._ensureIndex('services.github.username', { unique: 1, sparse: 1});
  Meteor.users._ensureIndex('services.github.email', { unique: 1, sparse: 1});

  Posts._ensureIndex({ authorId: 1 });
});

Accounts.onCreateUser(function (options, user) {
  if (options.profile) {
    user.profile = options.profile;
  }

  user.roles = [ROLES.user];

  return user;
});

