import Ember from 'ember';
import RecordTypeMixin from 'ember-admin/mixins/model-records/model-record';
import { contains } from 'ember-admin/utils/array';

const {
  get,
  computed,
  computed: { filter }
} = Ember;


export default Ember.Mixin.create(RecordTypeMixin, {
  columns: computed('model', function() {
    const container = get(this, 'container');
    const adapter = container.lookup('data-adapter:main');
    const recordType = this.get('recordType');
    const type = adapter.getModelTypes().findBy('name', recordType);
    const { klass } = type;

    const keys = Ember.A(['id']);

    klass.eachAttribute(function(key) {
      keys.push(key);
    });

    klass.eachRelationship(function(key) {
      keys.push(key);
    });

    return keys;
  }),

  filteredColumns: filter('columns', function(name) {
    return true;
  })
});
