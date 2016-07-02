import Ember from 'ember';
import layout from '../templates/components/property-print';

const {
  on,
  get,
  set,
  observer,
  addObserver
} = Ember;

export default Ember.Component.extend({
  setupCellObsever: observer('record', 'column', on('init', function() {
    const record = get(this, 'record');
    const column = get(this, 'column');

    if (!record || !column) {
      return;
    }

    addObserver(this, `record.${column}`, this, this._updateCell);
    this._updateCell();
  })),

  _relationValue(result) {
    const record = get(this, 'record');
    const column = get(this, 'column');
    const value = get(record, column);

    if(result.get("length") == 1) {
      set(this, 'cellValue', "1 item");
    } else {
      set(this, 'cellValue', result.get("length") + " items");
    }
  },

  _updateCell() {
    const record = get(this, 'record');
    const column = get(this, 'column');
    const value = get(record, column);

    if(value && value.get) {
      set(this, 'cellValue', "Loading...");

      if(value.get("isPending")) {
        value.then((result) => {
          this._relationValue(result);
        });
      } else {
        this._relationValue(value);
      }
    } else {
      set(this, 'cellValue', value);
    }
  },

  layout
});
