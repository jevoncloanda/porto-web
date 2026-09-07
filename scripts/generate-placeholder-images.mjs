/**
 * Generates the neutral placeholder images shipped with Phase 1.
 *
 * These are abstract, self-generated gradients — never screenshots of real
 * systems. Replace them with your own artwork and delete this script once the
 * portfolio holds real content.
 *
 *   node scripts/generate-placeholder-images.mjs
 */
import { deflateSync } from "node:zlib";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

const CRC_TABLE = Array.from({ length: 256 }, (_, n) => {
  let c = n;
  for (let k = 0; k < 8; k += 1) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  return c >>> 0;
});

function crc32(buf) {
  let c = 0xffffffff;
  for (const byte of buf) c = CRC_TABLE[(c ^ byte) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const length = Buffer.alloc(4);
  length.writeUInt32BE(data.length);
  const body = Buffer.concat([Buffer.from(type, "ascii"), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(body));
  return Buffer.concat([length, body, crc]);
}

function encodePng(width, height, pixels) {
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 2; // colour type: truecolour
  const stride = width * 3;

  // Sub filter keeps horizontal gradients cheap to compress.
  const raw = Buffer.alloc((stride + 1) * height);
  for (let y = 0; y < height; y += 1) {
    const rowStart = y * (stride + 1);
    raw[rowStart] = 1;
    for (let i = 0; i < stride; i += 1) {
      const value = pixels[y * stride + i];
      const left = i >= 3 ? pixels[y * stride + i - 3] : 0;
      raw[rowStart + 1 + i] = (value - left) & 0xff;
    }
  }

  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk("IHDR", ihdr),
    chunk("IDAT", deflateSync(raw, { level: 9 })),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

const mix = (a, b, t) => a + (b - a) * Math.min(Math.max(t, 0), 1);

/**
 * Abstract navy surface: diagonal gradient, hairline grid, one soft amber
 * light. `variant` shifts the light so the placeholders are distinguishable.
 */
function render(width, height, variant = 0) {
  const pixels = new Uint8Array(width * height * 3);
  const glowX = width * (0.26 + 0.2 * variant);
  const glowY = height * (0.74 - 0.14 * variant);
  const glowRadius = Math.max(width, height) * 0.66;
  const grid = Math.round(Math.max(width, height) / 20);

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const diagonal = (x / width) * 0.5 + (y / height) * 0.5;
      // Base: --color-bg (#2a2e42) to --color-surface-2 (#3b4059)
      let r = mix(42, 59, diagonal);
      let g = mix(46, 64, diagonal);
      let b = mix(66, 89, diagonal);

      if (x % grid === 0 || y % grid === 0) {
        r += 8;
        g += 8;
        b += 10;
      }

      // Accent light: --color-accent (#f5a623)
      const glow = Math.max(0, 1 - Math.hypot(x - glowX, y - glowY) / glowRadius) ** 2.8;
      r += glow * 104;
      g += glow * 62;
      b += glow * 6;

      const i = (y * width + x) * 3;
      pixels[i] = Math.round(Math.min(r, 255));
      pixels[i + 1] = Math.round(Math.min(g, 255));
      pixels[i + 2] = Math.round(Math.min(b, 255));
    }
  }

  return encodePng(width, height, pixels);
}

const targets = [
  { file: "public/profile/portrait.png", width: 720, height: 900, variant: 0.5 },
  { file: "public/projects/placeholder-project/cover.png", width: 1200, height: 750, variant: 0 },
  { file: "public/projects/placeholder-project/interface.png", width: 1200, height: 750, variant: 0.7 },
  { file: "public/projects/placeholder-project/architecture.png", width: 1200, height: 750, variant: 1 },
  { file: "public/projects/placeholder-confidential-project/cover.png", width: 1200, height: 750, variant: 0.35 },
];

for (const { file, width, height, variant } of targets) {
  const outPath = resolve(process.cwd(), file);
  mkdirSync(dirname(outPath), { recursive: true });
  const png = render(width, height, variant);
  writeFileSync(outPath, png);
  console.log(`${file} — ${(png.length / 1024).toFixed(1)} KB`);
}
