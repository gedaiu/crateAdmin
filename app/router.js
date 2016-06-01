import Ember from 'ember';
import adminRouter from 'ember-admin/router';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  adminRouter(this);
});

export default Router;
