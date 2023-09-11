import { TypeOf, object, string } from "zod";

export const createUserSchema = object({
  body: object({
    name: string({
      required_error: "Name is required",
    }),
    password: string({
      required_error: "Password is required",
    }).min(8, "password is too short"),
    passwordConfirmation: string({
      required_error: "passwordconfirmation is required",
    }),
    email: string({
      required_error: "email is required",
    }).email("not a valid Email"),
  }).refine((data) => data.password === data.passwordConfirmation, {
    message: "password do not match",
    path: ["passwordConfirmation"],
  }),
});

export type CreateUserInput = Omit<
  TypeOf<typeof createUserSchema>,
  "body.passwordConfirmation"
>;
