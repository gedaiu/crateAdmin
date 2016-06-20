import Ember from 'ember';
import WriteMixin from 'ember-admin/mixins/model-records/write';
import AdminItem from '../../mixins/admin-item';

const {
  get,
  Route,
  RSVP: { Promise }
} = Ember;

export default Route.extend(WriteMixin, AdminItem, {
  model(params) {
    return this.admin.store.find(this.paramsFor('model-records').name, params.id);
  },

  parentController: Ember.computed( function() {
    return this.controllerFor('admin');
  }),

  templateAdminPath: 'admin/edit'
});
