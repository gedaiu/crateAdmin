import Ember from 'ember';
import DS from 'ember-data';

const {
  computed,
  Component
} = Ember;

export default Component.extend({

  isAsync: function() {
    let model = this.get("model");
    let relationship = this.get("relationship");
    let columnValue = relationship.name;
    var isAsync = true;

    model.eachRelationship(function(key, relationship) {

      if(key === columnValue) {
        if(relationship.options.async === false) {
          isAsync = false;
        }
      }
    });

    return isAsync;
  }.property("relationship", "model"),
});
