Template.editor.helpers({
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
      }
    });
  },
  action: function() {
    return function(elements, callbacks, changed) {
      var postId  = this._id;
      var title   = elements[0].value;
      var content = elements[1].value;

      var saveCallback = function(error, result) {
        if (error) {
          callbacks.failed();
        } else {
          callbacks.success();
          callbacks.reset(true);
        }
      };

      Meteor.call('savePost', postId, title, content, saveCallback);
    }
  }
});

