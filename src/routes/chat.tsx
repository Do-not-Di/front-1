import { Form, FormField } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMessage } from '@/hooks/use-message';
import { useEffect, useRef, useState } from 'react';

const schema = z.object({
  message: z.string().min(1),
});

const ChatPage = () => {
  const messageRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<
    { userName: string; message: string }[]
  >([]);
  const { sendMessage } = useMessage({
    userId: 'host',
    onMessage: (userName, message) => {
      setMessages((prev) => [...prev, { userName, message }]);
    },
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

  useEffect(() => {
    setTimeout(() => {
      messageRef.current?.scrollTo({
        top: messageRef.current?.scrollHeight,
        behavior: 'smooth',
      });
    }, 100);
  }, [messages]);

  return (
    <div className='flex flex-col h-dvh'>
      <header className='h-14 flex items-center px-4'>
        <svg
          width='28'
          height='28'
          viewBox='0 0 28 28'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M18.6673 23.3337L9.33398 14.0003L18.6673 4.66699'
            stroke='#111111'
            stroke-width='1.5'
            stroke-linecap='round'
            stroke-linejoin='round'
          />
        </svg>

        <h1 className='text-lg font-bold flex-1 text-center'>CONTACT</h1>
      </header>
      <div className='sticky top-0 z-10 pt-3 pb-6  bg-white flex justify-center items-center'>
        <div className='w-[335px] flex items-center gap-3 p-4 rounded-2xl border'>
          <img
            src='https://randomuser.me/api/portraits/men/32.jpg' // TODO: 유저 프로필 피그마랑 맞춰서 이미지 추가헤야함
            alt='James'
            className='w-12 h-12 rounded-full object-cover'
          />
          <div>
            <div className='font-semibold text-base'>제임스</div>
            <div className='text-[#767676] text-xs flex items-center gap-1'>
              <span className='w-2 h-2 bg-[#4AA63C] rounded-full inline-block'></span>
              온라인
            </div>
          </div>
        </div>
      </div>

      <div
        ref={messageRef}
        className='flex-1 overflow-y-auto p-4 space-y-4 bg-gray-100 flex-[1]'
      >
        {messages.map(({ userName, message }, index) => (
          <div
            key={index.toString()}
            className={`flex ${
              userName === 'me' ? 'justify-end flex gap-2' : 'justify-start'
            }`}
          >
            {/* TODO: 시간 추가해냐람 */}
            <span className='text-[#767676] font-sans text-[12px] font-normal leading-[18px] self-end ml-2'>
              {new Date()
                .toLocaleTimeString('en-US', {
                  hour: 'numeric',
                  minute: '2-digit',
                  hour12: true,
                })
                .toLowerCase()}
            </span>
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                userName === 'me'
                  ? 'bg-[#7A4C1E] text-white'
                  : 'bg-white text-[#505050]'
              }`}
            >
              {/* <div className='text-sm font-medium mb-1'>{userName}</div> */}
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
                  className='flex-1 h-[52px]'
                  placeholder='메시지를 입력하세요...'
                />
              )}
            />
            <button
              type='submit'
              className='bg-[#7A4C1E] w-[73px] h-[52px] text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors'
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
