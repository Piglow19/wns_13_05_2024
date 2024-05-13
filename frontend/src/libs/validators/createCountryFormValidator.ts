import { z } from 'zod'

/* -------------------------------------------------------------------------- */
/*                        CREATE COUNTRY FORM VALIDATOR                       */
/* -------------------------------------------------------------------------- */
export const createCountryFormValidator = z.object({
  name: z.string().min(3, {
    message: 'Le nom du pays doit contenir au moins 3 caractères',
  }),
  emoji: z.string().min(1, {
    message: "L'emoji du pays doit contenir au moins 1 caractère",
  }),
  code: z.string().length(2, {
    message: 'Le code du pays doit contenir exactement 2 caractères',
  })
})
export type CreateCountryFormValidator = z.infer<typeof createCountryFormValidator>