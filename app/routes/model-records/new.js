import Ember from 'ember';
import WriteMixin from 'ember-admin/mixins/model-records/write';

const {
  Route
} = Ember;

export default Route.extend(WriteMixin, {
  setupController(controller, model) {
    this._super(controller, model);

    this.get('parentController').set('list-model', false);
    this.get('parentController').set('item-model', true);
  },

  parentController: Ember.computed( function() {
    return this.controllerFor('admin');
  }),

  model() {
    return this.admin.store.createRecord(this.paramsFor('model-records').name);
  },

  templateAdminPath: 'admin/new'
});
