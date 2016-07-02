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
  }.property("type"),

  getRecords: function() {
    const type = get(this, "type");

    return this.admin.store.findAll(type, {reload: true}).then(function(records) {
      return records.filter(function(item) {
        return !get(item, 'isNew');
      });
    });

  }.property("type"),

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
    const records = get(this, "records").content.slice();

    var list = [];
    var added = {};

    values.forEach((item) => {
      let id = item.get("id");
      var optionItem = [];

      records.forEach((item) => {
        const recordId = get(item, "id");
        const name = get(item, "name");

        if(!added[recordId]) {
          optionItem.push({
            value: {
              name: name,
              id: recordId
            },

            selected: recordId === id ? "selected" : ""
          });
        }

        if(recordId === id) {
          added[recordId] = true;
        }
      });

      list.push(optionItem);
    });

    return list;
  }.property("type"),

  canAdd: function() {
    const records = get(this, "records");
    const options = get(this, "options");
    let _this = this;
    var hasNull = false;

    this.$("select").each(function() {
      if(_this.$(this).val() === "not set") {
        hasNull = true;
      }
    });

    return !hasNull && records.get("length") !== options.length;
  }.property("options"),

  actions:{
    change: function(index) {
      const columnValue = get(this, "columnValue");
      const id = this.$("select:eq(" + index + ")").val();
      const type = get(this, "type");
      const model = get(this, "model");
      const value = get(model, columnValue).slice(0);

      if(id === "not set") {
        value.splice(index, 1);
        set(model, columnValue, value);

        this.notifyPropertyChange("options");
      } else {
        return this.admin.store.findRecord(type, id).then((record) => {
          value[index] = record;
          set(model, columnValue, value);

          this.notifyPropertyChange("options");
        });
      }
    },

    add: function() {
      if(!this.get("canAdd")) {
        return;
      }

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
