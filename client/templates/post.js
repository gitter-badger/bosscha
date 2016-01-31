Template.editor.events({
  'submit .new-post': function(event) {
    event.preventDefault();

    var title = event.target.title.value;
    var content = event.target.content.value;

    var callback = function(error, result) {
      event.target.title.value = '';
      event.target.content.value = '';

      $('#markdown-preview').html("");

      editor = $('#markdown-editor').next('.CodeMirror')[0].CodeMirror;
      editor.setValue('');
      editor.clearHistory();
    };

    Meteor.call('savePost', title, content, callback);
  }
});

Template.editor.onRendered(function() {
  var editor = CodeMirror.fromTextArea(this.find('#markdown-editor'), {
    lineNumbers: true,
    autofocus: true,
    mode: "gfm",
    theme: "paraiso-dark"
  });

  editor.on("change", function(object) {
    $('#markdown-preview').html(marked(object.getValue()));
  });
});

Template.postList.helpers({
  isRemovable: function() {
    return this.authorId == Meteor.userId();
  }
});

Template.postList.events({
  'click .action-post-show': function() {
    FlowRouter.go("post.show", { id: this._id });
  }
});

Template.postRemove.events({
  'click .remove-post': function() {
    var postId = this._id;

    swal({
      title: "Are you sure?",
      text: "You will not be able to recover post!",
      type: "warning",
      showCancelButton: true,
      closeOnConfirm: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Yes, delete it!"
    }, function(){
      Meteor.call('removePost', postId);
    });
  }
});

Template.postNew.onRendered(function() {
  DocHead.setTitle("Postingan Baru - Kodepot");
});

Template.post.onCreated(function() {
  var self = this;
  self.ready = new ReactiveVar();
  self.postReady = function() {
    return self.ready.get();
  };
  self.autorun(function() {
    var postId = FlowRouter.getParam('id');
    var handle = PostSubs.subscribe('post', postId);
    self.ready.set(handle.ready());
  });
});

Template.post.onRendered(function() {
  if (this.postReady()) {
    var post = Posts.findOne({_id: FlowRouter.getParam('id')}, { fields: { title: 1}});
    DocHead.setTitle(post.title + " - Kodepot");
  }
});

Template.post.helpers({
  postReady: function() {
    return Template.instance().postReady();
  },
  post: function() {
    return Posts.findOne({_id: FlowRouter.getParam('id')});
  }
});
