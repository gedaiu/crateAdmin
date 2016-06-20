import Ember from 'ember';
import WriteMixin from 'ember-admin/mixins/model-records/write';
import AdminItem from '../../mixins/admin-item';


const {
  Route
} = Ember;

export default Route.extend(WriteMixin, AdminItem, {
  setupController(controller, model) {
    this._super(controller, model);

    this.get('parentController').set('list-model', false);
    controller.set('current-model', this.paramsFor('model-records').name);
  },

  parentController: Ember.computed( function() {
    return this.controllerFor('admin');
  }),

  model() {
    return this.admin.store.createRecord(this.paramsFor('model-records').name);
  },

  templateAdminPath: 'admin/new'
});
