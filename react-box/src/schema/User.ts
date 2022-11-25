import { object, string, number, date, InferType } from "yup"

export const userSchema = object({
  name: string().required(),
  phone: string(),
  email: string().email(),
  salary: number()
  // website: string().url().nullable(),
  // createdOn: date().default(() => new Date()),
})

export type User = InferType<typeof userSchema>

// parse and assert validity
