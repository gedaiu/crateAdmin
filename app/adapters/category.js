import DS from 'ember-data';
import AppRestAdapter from '../mixins/app-rest-adapter';

export default DS.JSONAPIAdapter.extend(AppRestAdapter);
