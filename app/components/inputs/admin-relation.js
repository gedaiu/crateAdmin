import Ember from 'ember';
import DS from 'ember-data';

const {
  get,
  computed,
  Component
} = Ember;

export default Component.extend({

  type: computed('columnValue', {
    get() {
      const relationship = get(this, "relationship");

      let relationshipType = 'belongsTo';
      if(relationship.records instanceof DS.ManyArray || relationship.records instanceof DS.PromiseManyArray) {
        relationshipType = 'hasMany';
      }

      return get(relationship, "type");
    },
  }),

  columnValue: function() {
    return get(this, "relationship.name");
  }.property("relationship"),

  relationshipType: computed('columnValue', {
    get() {
      const relationship = get(this, "relationship");
      var relationshipType = 'belongsTo';

      if(relationship.records instanceof DS.ManyArray || relationship.records instanceof DS.PromiseManyArray) {
        relationshipType = 'hasMany';
      }

      return relationshipType;
    }
  }),

  hasMany: computed('columnValue', function() {
    return get(this, "relationshipType") === "hasMany";
  }),

  belongsTo: computed('columnValue', function() {
    return get(this, "relationshipType") === "belongsTo";
  })
});
