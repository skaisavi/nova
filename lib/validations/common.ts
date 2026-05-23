import { z } from "zod";

export const requiredDate = z.preprocess((value) => {
  if (value === "") return undefined;
  return value;
}, z.coerce.date());

export const optionalDate = z.preprocess((value) => {
  if (value === "") return undefined;
  return value;
}, z.coerce.date().optional());

export const prioritySchema = z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"]);
