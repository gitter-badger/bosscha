// post: kodepot.com/+mDvh2NpwsswJhZfgc
// user: kodepot.com/subosito
// tag:  kodepot.com/$meteor

Router.plugin('dataNotFound', { notFoundTemplate: 'notFound' });

Router.plugin('auth', {
  authenticate: {
    route: 'home'
  },
  except: [
    "home",
    "post.show",
    "user.show"
  ]
});

Router.plugin('seo', {
  defaults: {
    suffix: 'Kodepot',
    separator: ' - '
  }
});

Router.route("/", {
  name: 'home',
  layoutTemplate: 'layout',
  subscriptions: function() {
    return PostSubs.subscribe('recentPosts');
  },
  data: function() {
    return Posts.find({}, { sort: { createdAt: -1 } });
  },
  action: function() {
    this.render();
  },
  seo: {
    title: function() {
      return "Bicara <kode>, bicara Indonesia";
    }
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
  template: 'post',
  loadingTemplate: 'loading',
  layoutTemplate: 'layout',
  subscriptions: function() {
    return PostSubs.subscribe('post', this.params._id);
  },
  data: function() {
    return Posts.findOne({_id: this.params._id});
  },
  action: function() {
    this.render();
  },
  seo: {
    title: function() {
      return this.data().title;
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
      PostSubs.subscribe('userPosts', this.params.username)
    ];
  },
  data: function() {
    return Meteor.users.findOne({ 'services.github.username': this.params.username });
  },
  action: function() {
    this.render();
  },
  seo: {
    title: function() {
      var fullName = this.data().profile.name;
      var username = this.data().services.github.username;

      return fullName + ' (' + username + ') ';
    }
  }
});

