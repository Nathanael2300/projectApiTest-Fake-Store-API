import { userSchema } from "./user.schema";

export const usersSchema = {
  type: "array",
  items: userSchema,
};
