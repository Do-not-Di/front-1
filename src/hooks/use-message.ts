import { useEffect, useRef } from 'react';

interface UseMessageOption {
  userId?: string;
  onMessage: (userName: string, message: string) => void;
}

const useMessage = ({ userId, onMessage }: UseMessageOption) => {
  const socket = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (!userId) return;
    socket.current = new WebSocket(`ws://192.168.0.199:8080/ws/chat?userId=${userId}`);

    socket.current.addEventListener('open', () => {
      console.log('connected');
    });

    socket.current.addEventListener('close', () => {
      console.log('disconnected');
    });

    socket.current.addEventListener('message', receiveMessage => {
      const [userName, message] = receiveMessage.data.split('|');
      onMessage(userName, message);
    });

    socket.current.addEventListener('error', error => {
      console.log(error, '<<error');
    });

    return () => {
      socket.current?.close();
    };
  }, [userId, onMessage]);

  const sendMessage = (message: string) => {
    socket.current?.send(
      JSON.stringify({
        senderId: userId,
        receiverId: 'host',
        message,
      }),
    );
  };

  return {
    sendMessage,
  };
};

export { useMessage };
