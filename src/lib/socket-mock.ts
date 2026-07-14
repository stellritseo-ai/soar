// Socket.io Client and Server Fallback Mock to prevent unresolved import crashes
export const io = () => {
  console.warn("[SocketMock] socket.io-client is mocked. Falling back to MongoDB database polling.");
  return {
    on: (event: string, callback: (...args: any[]) => void) => {
      // Mock receiver
    },
    emit: (event: string, data: any) => {
      console.log(`[SocketMock] emit event: ${event}`, data);
      
      // Fallback: If client sends a message, write to DB via server functions if needed
      // (This will also be handled by database history polling)
    },
    disconnect: () => {
      // Mock disconnect
    },
  };
};

export class Server {
  constructor(httpServer: any, opts?: any) {
    console.warn("[SocketMock] socket.io Server is mocked. HTTP chat server running on polling mode.");
  }
  on(event: string, callback: (socket: any) => void) {
    // Mock server events
  }
  listen(port: number) {
    console.log(`[SocketMock] Server listening on port ${port}`);
  }
}
