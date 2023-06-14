import Route from '@ioc:Adonis/Core/Route';
// Custom
import AuthController from 'App/Controllers/Http/Auth/AuthController';

Route.group(() => {

  Route.post('/auth/signin', new AuthController().signIn);
  Route.post('/auth/signup', new AuthController().signUp);

  Route.group(() => {
    Route.post('/auth/signout', new AuthController().signOut);
    Route.get('/auth/refresh-data', new AuthController().refreshAndVerifyAuthentication);
    Route.get('/dashboard', "Modules/Dashboard/DashboardController");
    Route.resource('/users', "Modules/Users/UsersController").apiOnly();
    Route.resource('/posts', "Modules/Roles/RolesController").apiOnly();
  }).middleware('auth');

}).prefix("/api");







