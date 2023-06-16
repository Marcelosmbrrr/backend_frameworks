import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class CreateRoleValidator {
  constructor(protected ctx: HttpContextContract) { }

  public schema = schema.create({
    name: schema.string({}, [
      rules.minLength(3),
      rules.maxLength(100)
    ]),
    modules: schema.object()
  });

  public messages: CustomMessages = {}
}
