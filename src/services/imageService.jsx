// ChatGPT

export function resizeImage(file, maxWidth = 1200, quality = 0.8) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      let width = img.width;
      let height = img.height;

      // Redimensionnement proportionnel
      if (width > maxWidth) {
        height = Math.round((height * maxWidth) / width);
        width = maxWidth;
      }
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, width, height);
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error("Erreur conversion image"));
            return;
          }
          const newFile = new File(
            [blob],
            file.name.replace(/\.[^/.]+$/, ".webp"),
            {
              type: "image/webp",
            },
          );
          resolve(newFile);
        },
        "image/webp",
        quality,
      );
      URL.revokeObjectURL(objectUrl);
    };
    img.onerror = () => {
      reject(new Error("Impossible de charger l'image"));
    };
    const objectUrl = URL.createObjectURL(file);
    img.src = objectUrl;
  });
}
