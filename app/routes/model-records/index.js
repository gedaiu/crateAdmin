import Ember from 'ember';

const {
  set,
  get,
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
    this.get('parentController').set('item-model', false);
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
    destroyRecord(id) {
      let modelName = this.paramsFor('model-records').name;

      this.admin.store.findRecord(modelName, id).then((item) => {
        item.destroyRecord().then(() => {
          this.refresh();
        });
      });
    }
  }
});
