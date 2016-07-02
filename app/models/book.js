import DS from 'ember-data';
import Ember from 'ember'; 

var inflector = Ember.Inflector.inflector; 

inflector.irregular('book', 'books'); 

export default DS.Model.extend({
  name: DS.attr('string'), 
  author: DS.attr('string'), 
  category: DS.hasMany('category'), 
  something: DS.attr('number'), 
  price: DS.attr('number'), 
  inStock: DS.attr('boolean'), 
  comments: DS.hasMany('comment'), 
});
