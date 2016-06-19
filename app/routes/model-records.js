import Ember from 'ember';

const {
  set,
  Route
} = Ember;

export default Route.extend({

  deactivate: function() {
    this.get('parentController').set('isPrintable', true);
  }
});
