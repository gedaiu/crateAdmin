import Ember from 'ember';
import WriteMixin from 'ember-admin/mixins/model-records/write';

const {
  get,
  Route,
  RSVP: { Promise }
} = Ember;

export default Route.extend(WriteMixin, {
  setupController(controller, model) {
    this._super(controller, model);

    this.get('parentController').set('list-model', false);
    this.get('parentController').set('item-model', true);
  },

  model(params) {
    return this.admin.store.find(this.paramsFor('model-records').name, params.id);
  },

  parentController: Ember.computed( function() {
    return this.controllerFor('admin');
  }),

  templateAdminPath: 'admin/edit',

  actions: {
    destroyRecord(callback) {
      const canDestroy = window.confirm('Are you sure you want to destroy this record?');
      let promise;

      if (canDestroy) {
        promise = get(this, 'controller.model').destroyRecord();
        callback(promise);

        promise.then(() => {
          this.transitionTo('model-records', this.paramsFor('model-records').name);
        });
      } else {
        promise = new Promise(function(resolve, reject) {
          reject();
        });
        callback(promise);
      }
    }
  }
});
