'use server';
/**
 * @fileOverview Handles special order requests.
 * In a real application, this flow would trigger a workflow:
 * 1. Save the request to a database with a 'pending' status.
 * 2. Notify an admin through email or a dashboard.
 * 3. Await admin action (setting a price, accepting/rejecting).
 * 4. Notify the user of the admin's decision.
 *
 * For now, this is a placeholder that simulates a successful submission.
 */

import { ai } from '@/ai/genkit';
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

// Export a wrapper function that can be called from client components.
export async function handleSpecialOrder(input: SpecialOrderInput): Promise<SpecialOrderOutput> {
  return specialOrderFlow(input);
}

const specialOrderFlow = ai.defineFlow(
  {
    name: 'specialOrderFlow',
    inputSchema: SpecialOrderInputSchema,
    outputSchema: SpecialOrderOutputSchema,
  },
  async (input) => {
    // In a real app, you'd have database logic here.
    // For now, we just log it to the server console.
    console.log('New Special Order Request:', input);
    
    // We can even use an LLM to generate a nice confirmation message.
    const { output } = await ai.generate({
        prompt: `A user has submitted a special order for a "${input.type}". Briefly and warmly confirm that their request has been received and that you will get back to them with a quote soon.`,
        output: {
            schema: z.object({ confirmationMessage: z.string() })
        }
    });

    return {
      success: true,
      message: output?.confirmationMessage || "Your request has been submitted successfully!",
      orderId: `SO-${Date.now()}` // Simulate a unique ID
    };
  }
);
