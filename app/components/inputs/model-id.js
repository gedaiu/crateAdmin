import Ember from 'ember';

const {
  get,
  set,
  PromiseProxyMixin,
  ObjectProxy
} = Ember;

var PromiseObjectProxy = ObjectProxy.extend(PromiseProxyMixin);

export default Ember.Component.extend({
  tagName: 'select',
  classNames: 'form-control',
  _options: null,

  change: function() {
    const type = get(this, "type");
    const id = this.$(this.element).val();
    const columnValue = get(this, "columnValue");
    const model = get(this, "model");

    return this.admin.store.findRecord(type, id).then((record) => {
      set(model, columnValue, record);

      console.log("1 => ", get(record, "id"));
    });
  },

  records: function() {
    return PromiseObjectProxy.create({ promise: get(this, "getRecords") });
  }.property("type", "value"),

  getRecords: function() {
    const type = get(this, "type");

    return this.admin.store.findAll(type).then(function(records) {
      return records.filter(function(item) {
        return !get(item, 'isNew');
      });
    });
  }.property("type", "value"),

  value: function() {
    const model = get(this, "model");
    const columnValue = get(this, "columnValue");

    return get(model, columnValue);
  }.property("model", "columnValue"),

  options: function() {
    const value = get(this, "value");
    const id = get(value, "id");
    const records = get(this, "records");

    var list = [];

    records.content.forEach((item) => {
      list.push({
        value: {
          name: get(item, "name"),
          id: get(item, "id")
        },

        selected: id === get(item, "id") ? "selected" : ""
      });
    });

    return list;
  }.property("type", "value")
});
