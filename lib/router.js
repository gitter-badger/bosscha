// post: kodepot.com/+mDvh2NpwsswJhZfgc
// user: kodepot.com/subosito
// tag:  kodepot.com/$meteor

Router.plugin('dataNotFound', { notFoundTemplate: 'notFound' });
Router.plugin('loading', { loadingTemplate: 'Loading' });

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

if (Meteor.isClient) {
  Router.plugin('seo', {
    defaults: {
      suffix: 'Kodepot',
      separator: ' - '
    }
  });
}

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
      return "Bicara <kode> Indonesia";
    }
  },
  fastRender: true
});

// TODO: remove this later!
Router.route("/ruby-refinements-ec463989b82e", {
  action: function() {
    this.redirect("/+ct99k2C7hpLQ2TuNM");
  }
});

Router.route("/new", {
  name: 'post.new',
  template: 'postNew',
  layoutTemplate: 'layout',
  action: function() {
    this.render();
  },
  seo: {
    title: function() {
      return "New Post";
    }
  }
});

Router.route("/+:_id", {
  name: 'post.show',
  template: 'post',
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
      if (this.data() === undefined) {
        return "404";
      } else {
        return this.data().title;
      }
    }
  },
  fastRender: true
});

Router.route("/:username", {
  name: 'user.show',
  template: 'user',
  layoutTemplate: 'layout',
  waitOn: function() {
    return [
      Meteor.subscribe('user', this.params.username),
      PostSubs.subscribe('userPosts', this.params.username)
    ];
  },
  data: function() {
    return Meteor.users.findOne({ 'profile.username': this.params.username });
  },
  action: function() {
    this.render();
  },
  seo: {
    title: function() {
      if (this.data() === undefined) {
        return "404";
      }

      var fullName = this.data().profile.name;
      var username = this.data().profile.username;

      return fullName + ' (' + username + ') ';
    }
  },
  fastRender: true
});

