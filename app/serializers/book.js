import DS from 'ember-data';
export default DS.RESTSerializer.extend(DS.EmbeddedRecordsMixin, {
  attr: {
    category: { embeded: 'always' }
  },
  primaryKey: '_id'
});
