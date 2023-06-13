import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class SignUpValidator {
  constructor(protected ctx: HttpContextContract) { }

  public schema = schema.create({
    name: schema.string({}, [
      rules.minLength(3),
      rules.maxLength(100)
    ]),
    email: schema.string({}, [
      rules.email(),
      rules.maxLength(254)
    ]),
    password: schema.string({}, [
      rules.confirmed(),
      rules.maxLength(100)
    ])
  });

  public messages: CustomMessages = {}
}
