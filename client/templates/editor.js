Template.editor.helpers({
  today: function() {
    return moment(Date.now()).format("DD MMMM YYYY");
  },
  schema: function() {
    return new SimpleSchema({
      title: {
        type: String,
        max: 155,
        instructions: "Put the Title Here!"
      },
      content: {
        type: String,
        instructions: "Write your awesome content here!"
      },
      tags: {
        type: String,
        instructions: "Comma separated tags"
      }
    });
  },
  action: function() {
    return function(elements, callbacks, changed) {
      var postId  = this._id;
      var tags    = this.tags;
      var title   = this.title;
      var content = elements[2].value;

      var saveCallback = function(error, result) {
        if (error) {
          callbacks.failed();
        } else {
          callbacks.success();
          callbacks.reset(true);
        }
      };

      Meteor.call('savePost', postId, title, content, tags, saveCallback);
    }
  }
});

