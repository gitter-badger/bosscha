Meteor.startup(function() {
  Avatar.setOptions({
    generateCSS: false, // TODO: https://github.com/meteor-utilities/avatar/issues/47
    gravatarDefault: "retro"
  });
});
