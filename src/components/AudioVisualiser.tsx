import { VFC, useEffect, useRef } from 'react';

type Props = {
  audioData: Uint8Array;
  width: number;
};

export const AudioVisualiser: VFC<Props> = ({ audioData, width }) => {
  const canvas = useRef<HTMLCanvasElement>(null);
  const currentCanvas = canvas.current;

  useEffect(() => {
    if (currentCanvas === null) return;

    const height = currentCanvas.height;
    const width = currentCanvas.width;
    const context = currentCanvas.getContext('2d') as CanvasRenderingContext2D;
    let x = 0;
    const sliceWidth = (width * 1.0) / audioData.length;

    context.lineWidth = 2;
    context.strokeStyle = 'red';
    context.clearRect(0, 0, width, height);

    context.beginPath();
    context.moveTo(0, height / 2);
    for (const item of audioData as unknown as any[]) {
      const y = (item / 255.0) * height;
      context.lineTo(x, y);
      x += sliceWidth;
    }
    context.lineTo(x, height / 2);
    context.stroke();
  });

  return <canvas width={width} height='60' ref={canvas} />;
};
