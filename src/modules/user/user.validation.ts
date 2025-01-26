import { z } from 'zod';
const userValidationSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required',
    }),
    email: z
      .string({
        required_error: 'Email must be provided and must be a string',
        invalid_type_error: 'Invalid email format',
      })
      .email('Invalid email address'),
    password: z.string({
      required_error: 'Password is required', // Error if the password is missing
      invalid_type_error: 'Password must be a string', // Error if the input is not a string
    }),
    isBlocked: z.boolean().optional(),
    isPublished: z.boolean().optional(),
  }),
});
export const userValidation = {
  userValidationSchema,
};
