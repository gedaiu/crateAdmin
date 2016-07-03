import Ember from 'ember';
import config from '../config/environment';

export default Ember.Mixin.create({
  host: config.apiUrl
});
