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
    this.get('parentController').set('childController', controller);
    this.get('parentController').set('indexController', this.controllerFor('model-records/index'));

    this.get('parentController').set('list-model', true);
  },

  parentController: Ember.computed( function() {
    return this.controllerFor('admin');
  }),

  deactivate: function() {
    this.get('parentController').set('isPrintable', true);
  }
});
