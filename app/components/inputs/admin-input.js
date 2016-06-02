import Ember from 'ember';

const {
  get,
  set,
  computed,
  Component
} = Ember;

export default Component.extend({
  type: computed('columnValue', {
    get() {
      const columnValue = get(this, 'columnValue');
      const model = get(this, "model");
      let type = "";

      model.eachAttribute((name, meta) => {
        if(name === columnValue) {
          type = get(meta, "type");
        }
      });

      return type;
    },
  }),

  isDefault: computed('columnValue', {
    get() {
      return !(get(this, "isNumeric") || get(this, "isBoolean"));
    }
  }),

  isNumeric: computed('columnValue', {
    get() {
      return get(this, "type") === "number";
    }
  }),

  isBoolean: computed('columnValue', {
    get() {
      return get(this, "type") === "boolean";
    }
  }),

  value: computed('columnValue', {
    get() {
      const columnValue = get(this, 'columnValue');
      const model = get(this, "model");
      return get(model, columnValue);
    },

    set(key, value) {
      const columnValue = get(this, 'columnValue');
      const model = get(this, "model");

      set(model, columnValue, value);
      return value;
    }
  })
});
