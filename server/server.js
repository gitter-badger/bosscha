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

  Posts._ensureIndex({ authorId: 1, shortCode: 1 });
});

Accounts.onCreateUser(function (options, user) {
  if (options.profile) {
    user.profile = options.profile;
    user.profile.username = user.services.github.username;
    user.profile.email = user.services.github.email;
  }

  user.roles = [ROLES.user];

  return user;
});

Accounts.validateLoginAttempt(function(info) {
  if (!info.allowed) {
    return false;
  }

  Meteor.users.update(
    { _id: info.user._id },
    {
      $set: {
        'profile.username': info.user.services.github.username,
        'profile.email': info.user.services.github.email,
        'profile.lastLoginAt': Date.now(),
        'profile.lastLoginAddress': info.connection.clientAddress
      }
    }
  );

  return true;
});
