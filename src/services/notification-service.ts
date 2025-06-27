
'use server';

import type { SpecialOrderRequest } from '@/lib/types';

// In a real app, this would be stored in a database or a config file.
const adminPreferences = {
  'admin1': { whatsApp: true, sms: true, number: '15551234567' },
  'admin2': { whatsApp: true, sms: false, number: '15557654321' },
};

/**
 * Notifies all relevant admins about a new special order request.
 * @param order - The special order request details.
 */
export async function notifyAdminOfNewOrder(order: SpecialOrderRequest): Promise<void> {
  console.log(`--- Notifying Admins for Order #${order.id} ---`);

  const message = `New special order request. ID: ${order.id}. Type: ${order.type}. Desc: ${order.description.substring(0, 50)}...`;

  for (const [admin, prefs] of Object.entries(adminPreferences)) {
    console.log(`Notifying ${admin} based on preferences...`);
    if (prefs.whatsApp) {
      // In a real app, you would integrate with the WhatsApp Business API.
      const whatsappUrl = `https://wa.me/${prefs.number}?text=${encodeURIComponent(message)}`;
      console.log(`  -> SIMULATING WhatsApp notification to ${prefs.number}.`);
    }
    if (prefs.sms) {
      // In a real app, you would use an SMS gateway service like Twilio.
      console.log(`  -> SIMULATING SMS notification to ${prefs.number}: "${message}"`);
    }
  }
  console.log(`--- End Notification ---`);
}
