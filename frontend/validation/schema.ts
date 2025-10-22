import { z } from 'zod';
import { Cities } from '#imports';
import { Provinces } from '#imports';
import { InvType, Job, Gender, Progress } from '~/api/generated/types';

// export function setZodLocale(locale: string) {
//   if (locale == "en") {
//     z.config(z.locales.en());
//   } else {
//     z.config(z.locales.id());
//   }
// }

export const AuthSchema = z.object({
  email: z.string().email().trim(),
  password: z.string().min(8).trim(),
});

const positiveNumberString = z
  .string()
  .trim()
  .refine((val) => !isNaN(Number(val)))
  .refine((num) => Number(num) > 0);

export const ArtisanSchema = z.object({
  firstName: z.string().min(1).trim(),
  lastName: z.string().trim().optional().nullable(),
  jobs: z.nativeEnum(Job).array(),
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

export const ProductSchema = z.object({
  productGroupId: positiveNumberString,
  sku: z
    .string()
    .regex(/^[A-Z]{1,2}[A-Za-z0-9]{5,7}-[a-zA-Z.\s]+(\/[a-zA-Z.\s]*)*$/),
  colorIds: positiveNumberString.array(),
  createdBy: positiveNumberString,
  updatedBy: positiveNumberString.optional().nullable(),
});

export const ColorSchema = z.object({
  name: z.string().min(1).trim(),
  hexCode: z.string().min(1).trim(),
});

export const ProductCategorySchema = z.object({
  name: z.string().min(1).trim(),
  gender: z.nativeEnum(Gender),
});

export const ProductGroupSchema = z.object({
  skuNumeric: z.string().max(7).min(5),
  productCategoryId: positiveNumberString,
  name: z.string().min(1).trim().optional().nullable(),
  createdBy: positiveNumberString,
  updatedBy: positiveNumberString.optional().nullable(),
});

export const WorkSchema = z.object({
  date: z.string().datetime(),
  orderNo: positiveNumberString,
  productId: positiveNumberString,
  workSizes: z.array(
    z.object({
      id: positiveNumberString,
      quantity: z.number().min(1),
    }),
  ),
  createdBy: positiveNumberString,
  updatedBy: positiveNumberString.optional().nullable(),
});

export function createTaskSchema(
  minDate: string,
  maxDate: string,
  isCleared: boolean,
) {
  console.log(`Schema: ${minDate}, ${maxDate}, ${isCleared}`);
  if (isCleared) {
    return z.object({
      tasks: z
        .object({
          id: positiveNumberString,
          artisanId: positiveNumberString.optional().nullable(),
          doneAt: z.string().datetime().optional().nullable(),
          updatedBy: positiveNumberString,
          isValidDate: z.boolean(),
        })
        .array(),
    });
  } else {
    return z.object({
      tasks: z.array(
        z
          .object({
            id: positiveNumberString,
            artisanId: positiveNumberString.optional().nullable(),
            doneAt: z.string().datetime().optional().nullable(),
            updatedBy: positiveNumberString,
            isValidDate: z.boolean(),
          })
          .superRefine((data, ctx) => {
            if (data.doneAt !== null && data.isValidDate !== true) {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: undefined,
                path: ['doneAt'],
              });
            }
          }),
      ),
    });
  }
}

export const InventorySchema = z.object({
  name: z.string().min(3).max(100).trim(),
  address: z.string().min(5).max(255).trim(),
  city: z.enum([...Cities.map((c) => c.title)] as [string, ...string[]]),
  province: z.enum([...Provinces.map((c) => c.title)] as [string, ...string[]]),
  type: z.nativeEnum(InvType),
});

export const InvTrfSchema = z.object({
  trfDate: z.string().datetime(),
  // trfNo: z.string().regex(/^[A-Z]{2,3}-[0-9]{6}-[0-9]{4}$/),
  trfNo: z.string(),
  fromInvId: positiveNumberString,
  toInvId: positiveNumberString,
  progress: z.nativeEnum(Progress),
  createdBy: positiveNumberString,
  invTrfItemIds: z.array(positiveNumberString),
  updatedBy: positiveNumberString.optional().nullable(),
});

export const InvTrfItemSchema = z.object({
  fromInvId: positiveNumberString,
  toInvId: positiveNumberString,
  createdBy: positiveNumberString,
  productId: positiveNumberString,
  invTrfItemSizes: z.array(
    z.object({
      sizeId: positiveNumberString,
      quantity: z.number().min(0),
    }),
  ),
});
