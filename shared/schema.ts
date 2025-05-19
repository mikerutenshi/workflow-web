import { z } from "zod";

export const AuthSchema = z.object({
  email: z.string().email().trim(),
  password: z.string().min(8).trim(),
});

const JobEnum = z.enum([
  "DRAW_UPPER",
  "DRAW_LINING",
  "STITCH_UPPER",
  "STITCH_OUTSOLE",
  "STITCH_INSOLE",
  "LAST",
]);
const positiveNumberString = z
  .string()
  .refine((val) => !isNaN(Number(val)))
  .refine((num) => Number(num) > 0);

export const ArtisanSchema = z.object({
  firstName: z.string().min(1).trim(),
  lastName: z.string().trim().optional().nullable(),
  jobs: JobEnum.array().nonempty(),
  createdBy: positiveNumberString,
  updatedBy: positiveNumberString.optional().nullable(),
});

export const LaborCostSchema = z.object({
  productGroupId: positiveNumberString,
  createdBy: positiveNumberString,
  updatedBy: positiveNumberString,
  drawUpper: z.number().min(100).nullable().optional(),
  drawLining: z.number().min(100).nullable().optional(),
  stitchUpper: z.number().min(100).nullable().optional(),
  stitchOutsole: z.number().min(100).nullable().optional(),
  stitchInsole: z.number().min(100).nullable().optional(),
  last: z.number().min(100).nullable().optional(),
});
