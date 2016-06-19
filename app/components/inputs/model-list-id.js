import Ember from 'ember';

const {
  get,
  set,
  PromiseProxyMixin,
  ObjectProxy
} = Ember;

var PromiseObjectProxy = ObjectProxy.extend(PromiseProxyMixin);

export default Ember.Component.extend({
  _options: null,
  classNames: "form-inline",

  records: function() {
    return PromiseObjectProxy.create({ promise: get(this, "getRecords") });
  }.property("type", "value"),

  getRecords: function() {
    const type = get(this, "type");

    return this.admin.store.findAll(type, {reload: true}).then(function(records) {
      return records.filter(function(item) {
        return !get(item, 'isNew');
      });
    });

  }.property("type", "value"),

  newRecord: function() {
    const type = get(this, "type");

    return this.admin.store.createRecord(type, { });
  }.property("getRecords"),

  values: function() {
    const model = get(this, "model");
    const columnValue = get(this, "columnValue");
    const items = get(model, columnValue);

    var list = [];

    items.forEach((item) => {
      list.push(get(item, "id"));
    });

    return list;
  }.property("model", "columnValue"),

  options: function() {
    let model = get(this, "model");
    const columnValue = get(this, "columnValue");
    const values = get(model, columnValue);
    const records = get(this, "records");

    var list = [];

    values.forEach((item) => {
      let id = item.get("id");
      var optionItem = [];

      records.content.forEach((item, index) => {
        const recordId = get(item, "id");
        const name = get(item, "name");

        optionItem.push({
          value: {
            name: name,
            id: recordId
          },

          selected: recordId === id ? "selected" : ""
        });
      });

      list.push(optionItem);
    });

    return list;
  }.property("type", "value"),

  actions:{
    change: function(index) {
      const columnValue = get(this, "columnValue");
      const id = this.$("select:eq(" + index + ")").val();
      const type = get(this, "type");
      const records = get(this, "records.content");
      const model = get(this, "model");

      console.log(records);

      return this.admin.store.findRecord(type, id).then((record) => {
        records[index] = record;
        set(model, columnValue, records);
      });
    },

    add: function() {
      let newList = [];
      let model = get(this, "model");
      const columnValue = get(this, "columnValue");
      const value = get(model, columnValue).slice(0);
      const newRecord = get(this, "newRecord");

      value.forEach(function(item) {
        newList.push(item);
      });

      model.get(columnValue).then((value) => {
        value.pushObject(newRecord);
        this.notifyPropertyChange("options");
      });
    }
  },
});
