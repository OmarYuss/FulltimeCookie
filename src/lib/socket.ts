export const socketServer = {
  emit: (channel: string, event: string) => {
    // TODO: Integrate with Socket.io server
    console.log(`Emit to ${channel}: ${event}`);
  }
}; 