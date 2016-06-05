import Ember from 'ember';
import RecordTypeMixin from 'ember-admin/mixins/model-records/record-type';
import ColumnsMixin from 'ember-admin/mixins/model-records/columns';
import RelationshipsMixin from 'ember-admin/mixins/model-records/relationships';

const {
  Controller
} = Ember;

export default Controller.extend(RecordTypeMixin, ColumnsMixin, RelationshipsMixin, {
  excludedColumns: ['id']
});
