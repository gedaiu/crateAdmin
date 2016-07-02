import Ember from 'ember';

const {
  set,
  get,
  Route
} = Ember;

export default Route.extend({
  setupController(controller, model) {
    this._super(controller, model);

    this.get('parentController').set('list-model', true);
  },

  parentController: Ember.computed( function() {
    return this.controllerFor('admin');
  }),

  model() {
    return this.admin.store.findAll(this.paramsFor('model-records').name, { reload: true }).then(function(records) {
      return records.filter(function(item) {
        return !get(item, 'isNew');
      });
    });
  },

  actions: {
    deleteRecord: function(id) {
      const canDestroy = window.confirm('Are you sure you want to destroy this record?');
      let promise;

      if (canDestroy) {
        this.controller.get('model').findBy("id", id).destroyRecord().then(() => {
          this.refresh();
        });
      }
    }
  }
});
