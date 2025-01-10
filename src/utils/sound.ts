// Sound utility functions
export const playSound = (soundFile: string) => {
  const audio = new Audio(soundFile);
  audio.play().catch(error => {
    console.log('Audio playback failed:', error);
  });
};
