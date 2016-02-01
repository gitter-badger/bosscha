// post: kodepot.com/+mDvh2NpwsswJhZfgc
// user: kodepot.com/subosito
// tag:  kodepot.com/$meteor

FlowRouter.notFound = {
  action: function() {
    BlazeLayout.render("mainLayout", { content: "notFound" });
  }
};

FlowRouter.route('/', {
  name: 'home',
  action: function(params, queryParams) {
    BlazeLayout.render("mainLayout", { content: "home" });
  },
  subscriptions: function(params){
    this.register('recentPosts', Meteor.subscribe('recentPosts'));
  },
  triggersEnter: [function(context) {
    DocHead.setTitle("Kodepot: bicara <kode>, bicara Indonesia");
  }]
});

FlowRouter.route('/new', {
  name: 'post.new',
  action: function() {
    BlazeLayout.render("mainLayout", { content: 'postNew' });
  },
  triggersEnter: [function(context) {
    DocHead.setTitle("Postingan Baru - Kodepot");
  }]
});

FlowRouter.route('/+:_id', {
  name: 'post.show',
  action: function() {
    BlazeLayout.render("mainLayout", { content: 'post' });
  },
  subscriptions: function(params) {
    this.register('post', Meteor.subscribe('post', params._id));
  },
  triggersEnter: [function(context) {
    if (FlowRouter.subsReady()) {
      var _id = context.params._id

      var post = Posts.findOne({_id: _id }, { fields: { title: 1 } });
      DocHead.setTitle(post.title + " - Kodepot");
    }
  }]
});

FlowRouter.route('/:username', {
  name: 'user.show',
  action: function() {
    BlazeLayout.render("mainLayout", { content: 'user' });
  },
  subscriptions: function(params) {
    var username = params.username;

    this.register('user', Meteor.subscribe('user', username));
    this.register('userPosts', Meteor.subscribe("userPosts", username));
  },
  triggersEnter: [function(context) {
    if (FlowRouter.subsReady()) {
      var username = context.params.username;
      var user = Meteor.users.findOne(
                   { 'profile.username': username },
                   { fields: { 'profile.name': 1, 'profile.username': 1 } }
                 );

      if (user !== undefined) {
        DocHead.setTitle(user.profile.name + ' (' + user.profile.username + ") - Kodepot");
      }
    };
  }]
});
