// post: kodepot.com/+mDvh2NpwsswJhZfgc
// user: kodepot.com/subosito
// tag:  kodepot.com/$meteor

Router.plugin('dataNotFound', { notFoundTemplate: 'notFound' });

Router.route("/", {
  name: 'home',
  layoutTemplate: 'layout',
  subscriptions: function() {
    return Meteor.subscribe('recentPosts');
  },
  data: function() {
    return Posts.find({}, { sort: { createdAt: -1 } });
  },
  action: function() {
    this.render();
  }
});

Router.route("/new", {
  name: 'post.new',
  template: 'postNew',
  layoutTemplate: 'layout',
  action: function() {
    this.render();
  }
});

Router.route("/+:_id", {
  name: 'post.show',
  layoutTemplate: 'layout',
  subscriptions: function() {
    return Meteor.subscribe('post', this.params._id);
  },
  data: function() {
    return Posts.findOne({_id: this.params._id});
  },
  action: function() {
    if (this.ready()) {
      this.render('post');
    } else {
      this.render('loading');
    }
  }
});

Router.route("/:username", {
  name: 'user.show',
  template: 'user',
  loadingTemplate: 'loading',
  layoutTemplate: 'layout',
  waitOn: function() {
    return [
      Meteor.subscribe('user', this.params.username),
      Meteor.subscribe('userPosts', this.params.username)
    ];
  },
  data: function() {
    return Meteor.users.findOne({ 'services.github.username': this.params.username });
  },
  action: function() {
    this.render();
  }
});

