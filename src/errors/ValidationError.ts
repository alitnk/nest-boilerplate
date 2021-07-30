export interface ValidationFields {
  [validationField: string]: string[];
}

export class ValidationError extends Error {
  constructor(
    fields: ValidationFields,
    message = 'Please check your fields, there is a validation error.',
  ) {
    super(message);

    Object.defineProperty(this, 'name', { value: 'ValidationError' });
    Object.defineProperty(this, 'code', { value: 'VALIDATION_ERROR' });
    Object.defineProperty(this, 'fields', fields);
  }
}
