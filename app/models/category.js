import DS from 'ember-data';
import Ember from 'ember';

var inflector = Ember.Inflector.inflector;

inflector.irregular('category', 'categories');

export default DS.Model.extend({
  name: DS.attr('string'),
  color: DS.attr('string'),
});
