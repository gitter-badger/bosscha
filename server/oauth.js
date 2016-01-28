ServiceConfiguration.configurations.upsert(
  { service: "github" },
  {
    $set: {
      loginStyle: "redirect",
      requestPermissions: ["user:email"],
      clientId: Meteor.settings.github.clientId,
      secret: Meteor.settings.github.secret
    }
  }
)
