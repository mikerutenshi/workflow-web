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
const positiveNumberString = z
  .string()
  .trim()
  .refine((val) => !isNaN(Number(val)))
  .refine((num) => Number(num) > 0);

const orderNoSchema = z
  .string()
  .regex(/^([A-Z]{2,3}-[0-9]{6}-[0-9]{4}|[0-9]+)$/);

const discounts = z
  .array(
    z.string().refine((val) => /^\d+(\.\d{1,4})?$/.test(val), {
      params: { i18n: 'zodI18n.errors.decimal_number' },
    }),
  )
  .default([]);

export const AuthSchema = z.object({
  email: z.string().email().trim(),
  password: z.string().min(8).trim(),
});

export const RegisterSchema = z
  .object({
    roleId: positiveNumberString,
    email: z.string().email().trim(),
    firstName: z.string().min(1).trim(),
    lastName: z.string().trim().optional().nullable(),
    password: z.string().min(8).trim(),
    repeatPassword: z.string().min(8).trim(),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.repeatPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['repeatPassword'],
        params: { i18n: 'zodI18n.errors.repeat_password_mismatch' },
      });
    }
  });

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
  drawUpper: z.number().min(100).optional().nullable(),
  drawLining: z.number().min(100).optional().nullable(),
  stitchUpper: z.number().min(100).optional().nullable(),
  stitchOutsole: z.number().min(100).optional().nullable(),
  stitchInsole: z.number().min(100).optional().nullable(),
  last: z.number().min(100).optional().nullable(),
});

export const ProductSchema = z.object({
  productGroupId: positiveNumberString,
  sku: z
    .string()
    .regex(/^[A-Z]{1,2}[A-Za-z0-9]{5,7}-[a-zA-Z.\s]+(\/[a-zA-Z.\s]*)*$/),
  colorIds: z.array(positiveNumberString),
  createdBy: positiveNumberString,
  updatedBy: positiveNumberString.optional(),
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
  msrp: z.number().min(100000).max(3000000).optional().nullable(),
  createdBy: positiveNumberString,
  updatedBy: positiveNumberString.optional(),
});

export const WorkSchema = z.object({
  date: z.string().datetime(),
  orderNo: orderNoSchema,
  productId: positiveNumberString,
  workSizes: z.array(
    z.object({
      id: positiveNumberString,
      quantity: z.number().min(1),
    }),
  ),
  note: z.string().max(255).trim().nullable().optional(),
  createdBy: positiveNumberString,
  updatedBy: positiveNumberString.optional().nullable(),
});

export function createTaskSchema(
  minDate: string,
  maxDate: string,
  isCleared: boolean,
) {
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
                params: { i18n: 'zodI18n.errors.date_outside_range' },
              });
            }
          }),
      ),
    });
  }
}

export const InventorySchema = z.object({
  name: z.string().min(3).max(50).trim(),
  address: z.string().min(5).max(50).trim(),
  city: z.enum([...Cities.map((c) => c.title)] as [string, ...string[]]),
  province: z.enum([...Provinces.map((c) => c.title)] as [string, ...string[]]),
  type: z.nativeEnum(InvType),
  priceFormula: z.object({
    offset: z.number().optional().nullable(),
    multiplier: z
      .string()
      .regex(/^\d+(\.\d{1,2})?$/, {
        message: 'Must be a number with up to 2 decimal places',
      })
      .optional()
      .nullable(),
    profitMargins: discounts,
  }),
});

export const InvTrfSchema = z.object({
  trfDate: z.string().datetime(),
  trfNo: z.string().regex(/^[A-Z]{2,3}-[0-9]{6}-[0-9]{4}$/),
  fromInvId: positiveNumberString,
  toInvId: positiveNumberString,
  progress: z.nativeEnum(Progress),
  createdBy: positiveNumberString,
  invTrfItemIds: z.array(positiveNumberString).nonempty(),
  note: z.string().max(255).trim().nullable().optional(),
  updatedBy: positiveNumberString.optional().nullable(),
});

export const InvTrfUpdateProgressSchema = z.object({
  id: positiveNumberString,
  progress: z.nativeEnum(Progress),
  updatedBy: positiveNumberString,
});

export const InvTrfItemSchema = z.object({
  fromInvId: positiveNumberString,
  toInvId: positiveNumberString,
  createdBy: positiveNumberString,
  productId: positiveNumberString,
  discounts: discounts,
  invTrfItemSizes: z.array(
    z.object({
      sizeId: positiveNumberString,
      quantity: z.number().min(0),
    }),
  ),
  totalQty: z.number().min(1),
});

export const InvProductUpdateDiscSchema = z.object({
  invId: positiveNumberString,
  productId: positiveNumberString,
  discounts: discounts,
});

export const SaleItemSchema = z.object({
  productId: positiveNumberString,
  saleItemSizes: z.array(
    z.object({
      sizeId: positiveNumberString,
      eu: z.string(),
      quantity: z.number(),
    }),
  ),
  totalQty: z.number().min(1),
});

export const SaleSchema = z.object({
  saleNo: z.string().regex(/^[A-Z]{2,3}-[0-9]{6}-[0-9]{4}$/),
  date: z.string().datetime(),
  saleItems: z.array(SaleItemSchema).nonempty(),
  note: z.string().max(255).trim().nullable().optional(),
  createdBy: positiveNumberString,
  updatedBy: positiveNumberString.optional().nullable(),
});

// const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1MB
const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1MB
const ACCEPTED_FILE_TYPES = [
  'text/csv',
  'application/vnd.ms-excel',
  'text/plain',
];

export const fileSchema = z.object({
  csvFile: z
    .union([z.null(), z.instanceof(File)])
    .optional()
    .refine(
      (file) => file == null || file.size <= MAX_FILE_SIZE,
      `Max file size is 1MB.`,
    )
    .refine(
      (file) => file == null || ACCEPTED_FILE_TYPES.includes(file.type),
      'Only CSV files are supported.',
    ),
});

export const UserSchema = z.object({
  roleId: positiveNumberString,
  isActive: z.boolean(),
  invIds: z.array(positiveNumberString),
  updatedBy: positiveNumberString,
  approvedBy: positiveNumberString.optional().nullable(),
});
