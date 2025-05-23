import { Form, FormField } from '@/components/ui/form';
import MicRecorder from '@/components/ui/mic-recorder';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMessage } from '@/hooks/use-message';
import { useState } from 'react';

const schema = z.object({
  message: z.string().min(1),
});

const HomePage = () => {
  const [messages, setMessages] = useState<{ userName: string; message: string }[]>([]);
  const { sendMessage } = useMessage({
    userId: 'user',
    onMessage: (userName, message) => setMessages(prev => [...prev, { userName, message }]),
  });

  const form = useForm({
    defaultValues: {
      message: '',
    },
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: z.infer<typeof schema>) => {
    sendMessage(data.message);
    setMessages(prev => [...prev, { userName: 'me', message: data.message }]);
    form.reset();
  };

  return (
    <div>
      {messages.map(({ userName, message }) => (
        <div key={userName}>
          <span>{userName}</span>
          <span>{message}</span>
        </div>
      ))}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField control={form.control} name="message" render={({ field }) => <Input {...field} />} />
          <button type="submit">Send</button>
        </form>
      </Form>
      <MicRecorder
        onStartRecording={starter => {
          starter({
            lang: 'ko-KR',
            callback: result => {
              console.log(result, '<<result');
            },
          });
        }}
      />
    </div>
  );
};

export default HomePage;
