// post: kodepot.com/+mDvh2NpwsswJhZfgc
// user: kodepot.com/subosito
// tag:  kodepot.com/$meteor

if (Meteor.isClient) {
  FlowRouter.notFound = {
    action: function() {
      BlazeLayout.render("mainLayout", { content: "notFound" });
    }
  };

  FlowRouter.route('/', {
    name: 'home',
    action: function(params, queryParams) {
      BlazeLayout.render("mainLayout", { content: "home" });
    }
  });

  FlowRouter.route('/new', {
    name: 'post.new',
    action: function() {
      BlazeLayout.render("mainLayout", { content: 'postNew' });
    }
  });

  FlowRouter.route('/+:id', {
    name: 'post.show',
    action: function() {
      BlazeLayout.render("mainLayout", { content: 'post' });
    }
  });

  FlowRouter.route('/:username', {
    name: 'user.show',
    action: function() {
      BlazeLayout.render("mainLayout", { content: 'user' });
    }
  });
}
