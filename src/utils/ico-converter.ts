export async function svgToIco(svgString: string): Promise<Blob> {
    const sizes = [16, 32, 48, 64];
    const images: Blob[] = [];
  
    // 1. Convert SVG to PNG Blobs for each size
    for (const size of sizes) {
      const canvas = document.createElement('canvas');
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Canvas not supported');
  
      const img = new Image();
      // Safe SVG encoding
      const svg64 = btoa(unescape(encodeURIComponent(svgString)));
      const b64Start = 'data:image/svg+xml;base64,';
      const image64 = b64Start + svg64;
  
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject(new Error("Failed to render SVG. proper XML format with a single root <svg> tag?"));
        img.src = image64;
      });
  
      ctx.drawImage(img, 0, 0, size, size);
      
      // Use PNG format within ICO for better compression and transparency support
      // (Modern Windows/Browsers support PNG in ICO)
      const blob = await new Promise<Blob | null>(resolve => canvas.toBlob(resolve, 'image/png'));
      if (blob) images.push(blob);
    }
  
    if (images.length === 0) throw new Error('Failed to generate images');
  
    // 2. Construct ICO Binary
    return createIcoFromPngs(images, sizes);
  }
  
  async function createIcoFromPngs(pngBlobs: Blob[], sizes: number[]): Promise<Blob> {
    const headerSize = 6;
    const directorySize = 16;
    const numImages = pngBlobs.length;
    
    // Calculate total size
    let offset = headerSize + (numImages * directorySize);
    
    const header = new DataView(new ArrayBuffer(headerSize));
    header.setUint16(0, 0, true); // Reserved
    header.setUint16(2, 1, true); // Type (1 = ICO)
    header.setUint16(4, numImages, true); // Number of images
  
    const directories: DataView[] = [];
    const pngBuffers: ArrayBuffer[] = [];
  
    for (let i = 0; i < numImages; i++) {
        const pngBuf = await pngBlobs[i].arrayBuffer();
        pngBuffers.push(pngBuf);
        const size = sizes[i];
  
        const dir = new DataView(new ArrayBuffer(directorySize));
        dir.setUint8(0, size);      // Width
        dir.setUint8(1, size);      // Height
        dir.setUint8(2, 0);         // Palette (0 = none)
        dir.setUint8(3, 0);         // Reserved
        dir.setUint16(4, 1, true);  // Color planes
        dir.setUint16(6, 32, true); // Bits per pixel
        dir.setUint32(8, pngBuf.byteLength, true); // Image size
        dir.setUint32(12, offset, true); // Offset
  
        directories.push(dir);
        offset += pngBuf.byteLength;
    }
  
    // Combine all parts
    const parts = [header, ...directories, ...pngBuffers] as BlobPart[];
    return new Blob(parts, { type: 'image/x-icon' });
  }
