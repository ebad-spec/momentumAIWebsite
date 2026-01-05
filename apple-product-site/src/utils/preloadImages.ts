const createImagePromise = (src: string) => {
  return new Promise<void>((resolve) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => resolve();
    img.src = src;
  });
};

export const preloadImages = (sources: string[]): Promise<void> => {
  const uniqueSources = Array.from(new Set(sources)).filter(Boolean);
  return Promise.all(uniqueSources.map(createImagePromise)).then(() => undefined);
};



