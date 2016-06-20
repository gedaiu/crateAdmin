import Ember from 'ember';

const {
  get,
  set,
  computed,
  Component
} = Ember;

export default Component.extend({

  actions: {
    save: function() {
      this.sendAction('save');
    },

    cancel: function() {
      this.sendAction('cancel');
    }
  }
});
