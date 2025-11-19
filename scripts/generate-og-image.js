const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');
const path = require('path');

async function generateOGImage() {
  const width = 1200;
  const height = 630;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // Fondo degradado
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, '#3B82F6');  // blue-500
  gradient.addColorStop(1, '#1E40AF');  // blue-800
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  // Cargar y dibujar el logo
  try {
    const logo = await loadImage(path.join(__dirname, '../public/buho-pandora.png'));
    const logoSize = 280;
    const logoX = 80;
    const logoY = (height - logoSize) / 2;
    ctx.drawImage(logo, logoX, logoY, logoSize, logoSize);
  } catch (err) {
    console.log('Logo not found, skipping...');
  }

  // Texto principal
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 72px Arial, sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText('Mundo Pandora', 420, 260);

  // Subtítulo
  ctx.font = '36px Arial, sans-serif';
  ctx.fillStyle = '#E0E7FF'; // blue-100
  ctx.fillText('Retos y aventuras educativas', 420, 320);

  // Texto adicional
  ctx.font = '28px Arial, sans-serif';
  ctx.fillStyle = '#DBEAFE'; // blue-50
  ctx.fillText('Matemáticas • Lectura crítica • Juegos', 420, 380);

  // Guardar imagen
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(path.join(__dirname, '../public/og-image.png'), buffer);
  console.log('OG image generated: public/og-image.png');
}

generateOGImage().catch(console.error);
