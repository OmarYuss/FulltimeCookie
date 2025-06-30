'use server';
/**
 * @fileOverview Handles special order requests.
 * This service handles the first step of the special order process.
 * 
 * The full workflow is:
 * 1. User submits a request, which is marked as 'Pending'.
 * 2. An admin reviews the request, accepts it, and provides a price.
 * 3. The user is notified with the price offer.
 * 4. If the user accepts, the order becomes 'Accepted' and enters the regular creation flow.
 * 5. If the user rejects, they are prompted to start a WhatsApp conversation with an admin.
 * 
 * This service handles step 1. In a real application, this would save the
 * request to a database and notify an admin.
 */

import { notifyAdminOfNewOrder } from '@/services/notification-service';
import { 
    SpecialOrderInputSchema, 
    type SpecialOrderInput, 
    type SpecialOrderRequest,
    type SpecialOrderResponse,
} from '@/lib/schemas/special-order';

// Export a wrapper function that can be called from client components.
export async function handleSpecialOrder(input: SpecialOrderInput): Promise<SpecialOrderResponse> {
  try {
    // Validate input
    const validatedInput = SpecialOrderInputSchema.parse(input);
    
    // Create the order request object with 'Pending' status.
    const newOrderRequest: SpecialOrderRequest = {
      ...validatedInput,
      id: `SO-${Date.now()}`,
      status: 'Pending',
    };
    
    // In a real app, you'd save this to a database here.
    console.log("New Special Order Request Created (Status: Pending):", newOrderRequest);
    
    // Trigger notifications to admins.
    await notifyAdminOfNewOrder(newOrderRequest);

    return {
      success: true,
      message: "Your request has been submitted successfully and is now pending review.",
      orderRequest: newOrderRequest,
    };
  } catch (error) {
    console.error("Error in special order service:", error);
    return {
      success: false,
      message: "An error occurred while submitting your request. Please try again later.",
    };
  }
}
