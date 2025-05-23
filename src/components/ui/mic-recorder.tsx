'use client';
import useVoice from '@/hooks/use-voice';
import type { Recorder } from '@/lib/recorder';
import { cn } from '@/lib/utils';
import * as LucideIcons from 'lucide-react';
interface MicRecorderProps {
  className?: string;
  onStartRecording?: (starter: Recorder['start']) => void;
}

const MicRecorder = ({ className, onStartRecording }: MicRecorderProps) => {
  const { isRecording, recorder } = useVoice();

  return (
    <div className={cn('flex justify-center items-center', className)}>
      {isRecording ? (
        <div>recording</div>
      ) : (
        <button type="button" className="w-full h-full" onClick={() => onStartRecording?.(recorder.start)}>
          <LucideIcons.Mic />
        </button>
      )}
    </div>
  );
};

export default MicRecorder;
