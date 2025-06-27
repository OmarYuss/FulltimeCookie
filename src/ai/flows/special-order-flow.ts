'use server';
/**
 * @fileOverview Handles special order requests.
 * This flow models the first step of the special order process.
 * 
 * The full workflow is:
 * 1. User submits a request, which is marked as 'Pending'.
 * 2. An admin reviews the request, accepts it, and provides a price.
 * 3. The user is notified with the price offer.
 * 4. If the user accepts, the order becomes 'Accepted' and enters the regular creation flow.
 * 5. If the user rejects, they are prompted to start a WhatsApp conversation with an admin.
 * 
 * This flow handles step 1. In a real application, this would save the
 * request to a database and notify an admin.
 */

import { ai } from '@/ai/genkit';
import { 
    SpecialOrderInputSchema, 
    type SpecialOrderInput, 
    SpecialOrderOutputSchema, 
    type SpecialOrderOutput 
} from '@/ai/schemas';

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
    // In a real app, you'd save this to a database with status 'Pending'.
    console.log("New Special Order Request Received (Status: Pending):", input);
    
    // Simulate a successful submission.
    return {
      success: true,
      message: "Your request has been submitted successfully!",
      orderId: `SO-${Date.now()}` // Simulate a unique ID
    };
  }
);
