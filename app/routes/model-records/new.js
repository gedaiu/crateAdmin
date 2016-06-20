import Ember from 'ember';
import WriteMixin from 'ember-admin/mixins/model-records/write';
import AdminItem from '../../mixins/admin-item';


const {
  Route
} = Ember;

export default Route.extend(WriteMixin, AdminItem, {
  model() {
    return this.admin.store.createRecord(this.paramsFor('model-records').name);
  },

  templateAdminPath: 'admin/new'
});
