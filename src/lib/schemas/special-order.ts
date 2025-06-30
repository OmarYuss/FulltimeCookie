import { z } from 'zod';
import { ORDER_STATUSES } from '@/lib/types';

export const SpecialOrderInputSchema = z.object({
  type: z.string().describe("The type of baked good requested (e.g., Cake, Cookies)."),
  contains: z.string().optional().describe("Specific ingredients or flavors the user wants."),
  description: z.string().describe("A detailed description of the special order."),
  inspirationLink: z.string().optional().describe("An optional URL to an image for inspiration."),
});
export type SpecialOrderInput = z.infer<typeof SpecialOrderInputSchema>;


export const SpecialOrderRequestSchema = SpecialOrderInputSchema.extend({
    id: z.string(),
    status: z.enum(ORDER_STATUSES),
});
export type SpecialOrderRequest = z.infer<typeof SpecialOrderRequestSchema>;


export const SpecialOrderResponseSchema = z.object({
  success: z.boolean().describe("Whether the submission was processed successfully."),
  message: z.string().describe("A confirmation message for the user."),
  orderRequest: SpecialOrderRequestSchema.optional().describe("The created order request details."),
});
export type SpecialOrderResponse = z.infer<typeof SpecialOrderResponseSchema>;
