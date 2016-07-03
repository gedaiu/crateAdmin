import DS from 'ember-data'
import AppAdapter from '../mixins/app-adapter'

export default DS.RESTAdapter.extend(AppAdapter);
