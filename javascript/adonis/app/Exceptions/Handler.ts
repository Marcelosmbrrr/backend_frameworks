/*
|--------------------------------------------------------------------------
| Http Exception Handler
|--------------------------------------------------------------------------
|
| AdonisJs will forward all exceptions occurred during an HTTP request to
| the following class. You can learn more about exception handling by
| reading docs.
|
| The exception handler extends a base `HttpExceptionHandler` which is not
| mandatory, however it can do lot of heavy lifting to handle the errors
| properly.
|
*/

import Logger from '@ioc:Adonis/Core/Logger'
import HttpExceptionHandler from '@ioc:Adonis/Core/HttpExceptionHandler'

export default class ExceptionHandler extends HttpExceptionHandler {
  async handle(error, context) {
    if (error.status >= 500) {
      Logger.error(error.message, error.stack)
    }

    const { request, response } = context

    const status = error.status || 500
    const message = error.message || 'Internal Server Error'

    return response.status(status).send({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url(),
      message,
    })
  }
}
