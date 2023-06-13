import Route from '@ioc:Adonis/Core/Route';
// Custom
import AuthController from 'App/Controllers/Http/Auth/AuthController';

Route.group(() => {

  Route.group(() => {
    Route.post('/signin', new AuthController().signIn);
    Route.post('/signup', new AuthController().signUp);
    Route.post('/signout', new AuthController().signOut);
    Route.get('/refresh-data', new AuthController().refresh);
    Route.get('/verify-authentication', new AuthController().verifyAuthentication);
  }).prefix("/auth");

  Route.get('/dashboard', "Modules/Dashboard/DashboardController");
  Route.resource('/users', "Modules/Users/UsersController").apiOnly();
  Route.resource('/posts', "Modules/Roles/RolesController").apiOnly();

}).prefix("/api");







