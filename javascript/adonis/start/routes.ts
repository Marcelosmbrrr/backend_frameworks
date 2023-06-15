import Route from '@ioc:Adonis/Core/Route';

Route.group(() => {

  Route.post('/auth/signin', "AuthController.signIn").namespace("App/Controllers/Http/Auth");
  Route.post('/auth/signup', "AuthController.signUp").namespace("App/Controllers/Http/Auth");

  Route.group(() => {
    Route.post('/auth/signout', "AuthController.signOut").namespace("App/Controllers/Http/Auth");
    Route.get('/auth/refresh-data', "AuthController.refreshAndVerifyAuthentication").namespace("App/Controllers/Http/Auth");
    Route.get('/dashboard', "Modules/Dashboard/DashboardController");
    Route.resource('/users', "Modules/Users/UsersController").apiOnly();
    Route.resource('/posts', "Modules/Roles/RolesController").apiOnly();
  }).middleware('auth');

}).prefix("/api");







