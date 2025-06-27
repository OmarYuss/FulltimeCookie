import { z } from 'zod';

export const SpecialOrderInputSchema = z.object({
  type: z.string().describe("The type of baked good requested (e.g., Cake, Cookies)."),
  contains: z.string().optional().describe("Specific ingredients or flavors the user wants."),
  description: z.string().describe("A detailed description of the special order."),
  inspirationLink: z.string().optional().describe("An optional URL to an image for inspiration."),
});
export type SpecialOrderInput = z.infer<typeof SpecialOrderInputSchema>;

export const SpecialOrderOutputSchema = z.object({
  success: z.boolean().describe("Whether the submission was processed successfully."),
  message: z.string().describe("A confirmation message for the user."),
  orderId: z.string().optional().describe("A unique ID for the created order request."),
});
export type SpecialOrderOutput = z.infer<typeof SpecialOrderOutputSchema>;
