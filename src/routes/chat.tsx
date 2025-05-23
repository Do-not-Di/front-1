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

const ChatPage = () => {
  const [messages, setMessages] = useState<
    { userName: string; message: string }[]
  >([]);
  const { sendMessage } = useMessage({
    userId: 'user',
    onMessage: (userName, message) =>
      setMessages((prev) => [...prev, { userName, message }]),
  });

  const form = useForm({
    defaultValues: {
      message: '',
    },
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: z.infer<typeof schema>) => {
    sendMessage(data.message);
    setMessages((prev) => [...prev, { userName: 'me', message: data.message }]);
    form.reset();
  };

  return (
    <div className='flex flex-col h-full'>
      <div className='sticky top-0 z-10 pt-3 pb-6  bg-white flex justify-center items-center'>
        <div className='w-[335px] flex items-center gap-3 p-4 rounded-2xl border'>
          <img
            src='https://randomuser.me/api/portraits/men/32.jpg' // TODO: 유저 프로필 피그마랑 맞춰서 이미지 추가헤야함
            alt='James'
            className='w-12 h-12 rounded-full object-cover'
          />
          <div>
            <div className='font-semibold text-base'>James</div>
            <div className='text-[#4AA63C] text-xs flex items-center gap-1'>
              <span className='w-2 h-2 bg-[#4AA63C] rounded-full inline-block'></span>
              온라인
            </div>
          </div>
        </div>
      </div>

      <div className='flex-1 overflow-y-auto p-4 space-y-4 bg-gray-100'>
        {messages.map(({ userName, message }, index) => (
          <div
            key={index}
            className={`flex ${
              userName === 'me' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                userName === 'me'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-800'
              }`}
            >
              <div className='text-sm font-medium mb-1'>{userName}</div>
              <div>{message}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Input Form */}
      <div className='sticky bottom-0 bg-white border-t p-4'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='flex gap-2'>
            <FormField
              control={form.control}
              name='message'
              render={({ field }) => (
                <Input
                  {...field}
                  className='flex-1'
                  placeholder='메시지를 입력하세요...'
                />
              )}
            />
            <button
              type='submit'
              className='bg-blue-500 w-[73px] h-[52px] text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors'
            >
              전송
            </button>
          </form>
        </Form>
        {/* <div className='mt-2'>
          <MicRecorder
            onStartRecording={(starter) => {
              starter({
                lang: 'ko-KR',
                callback: (result) => {
                  console.log(result, '<<result');
                },
              });
            }}
          />
        </div> */}
      </div>
    </div>
  );
};

export default ChatPage;
