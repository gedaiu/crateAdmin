import Ember from 'ember';

const {
  set,
  Route
} = Ember;

export default Route.extend({
  setupController(controller, model) {
    this._super(controller, model);

    set(controller, 'recordType', this.paramsFor('model-records').name);
    this.get('parentController').set('current-model', this.paramsFor('model-records').name);
  },

  parentController: Ember.computed( function() {
    return this.controllerFor('admin');
  }),

  deactivate: function() {
    this.get('parentController').set('isPrintable', true);
  }
});
