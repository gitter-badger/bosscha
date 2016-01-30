ROLES = { user: "user" }

Meteor.startup(function() {
  marked.setOptions({
    langPrefix: "hljs ",
    highlight: function (code) {
      return hljs.highlightAuto(code).value;
    }
  });
});
