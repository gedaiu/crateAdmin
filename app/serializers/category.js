import DS from 'ember-data';
export default DS.RESTSerializer.extend(DS.EmbeddedRecordsMixin, {
  attr: {

  },
  primaryKey: '_id'
});
