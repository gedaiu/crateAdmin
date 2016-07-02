import Ember from 'ember';

const {
  get
} = Ember;

export default Ember.Mixin.create({
  setupController(controller, model) {
    this._super(controller, model);

    this.get('parentController').set('list-model', false);
    controller.set('current-model', this.paramsFor('model-records').name);
  },

  parentController: Ember.computed( function() {
    return this.controllerFor('admin');
  }),

  actions: {
    cancel() {
      this.transitionTo('model-records', this.paramsFor('model-records').name);
    },

    save() {
      const promise = get(this, 'controller.model').save();

      promise.then(() => {
        this.transitionTo('model-records', this.paramsFor('model-records').name);
      });
    },
  }
});
