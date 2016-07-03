import DS from 'ember-data';
import Ember from 'ember'; 

var inflector = Ember.Inflector.inflector; 

inflector.irregular('comment', 'comments'); 

export default DS.Model.extend({
    message: DS.attr('string'), 
});
