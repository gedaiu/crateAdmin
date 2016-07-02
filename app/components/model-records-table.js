import Ember from 'ember';
import ColumnsMixin from '../mixins/columns';

const {
  get,
  isNone,
  computed,
  getOwner,
  Component
} = Ember;

export default Component.extend(ColumnsMixin, {
  includedColumns: ['id'],
  layout: computed(function() {
    let templatePath = `admin/index/${get(this, 'recordType')}`;
    if (!getOwner(this).lookup(`template:${templatePath}`)) {
      templatePath = 'admin/index/default';
    }

    return getOwner(this).lookup(`template:${templatePath}`);
  }),

  filteredRecords: computed('records', 'filter', function() {
    if (Ember.isBlank(get(this, 'filter'))) {
      return get(this, 'records');
    } else {
      const filter = get(this, 'filter').toLowerCase();
      const columns = get(this, 'filteredColumns');
      return get(this, 'records').filter(function(record) {
        let value;

        for (let i = 0; i < columns.length; i++) {
          value = (get(record, columns[i]) || '').toString().toLowerCase();

          if (value.indexOf(filter) > -1) {
            return true;
          }
        }
      });
    }
  }),

  actions: {
    deleteRecord: function(id) {
      this.sendAction('deleteRecord', id);
    }
  }
});
