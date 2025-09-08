#!/usr/bin/env node
// Converts all .webp in public (recursively) to .webp and deletes the original .webp after success
// Usage: node scripts/optimise-images.mjs [--quality=90]

import { promises as fs } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const IMAGES_ROOT = path.resolve(process.cwd(), "public");

function parseQualityArg(defaultQuality = 90) {
  const qArg = process.argv.find((a) => a.startsWith("--quality="));
  if (!qArg) return defaultQuality;
  const val = Number(qArg.split("=")[1]);
  return Number.isFinite(val) && val >= 1 && val <= 100 ? val : defaultQuality;
}

async function* walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      yield* walk(fullPath);
    } else {
      yield fullPath;
    }
  }
}

async function convertPngToWebp(filePath, quality) {
  const ext = path.extname(filePath).toLowerCase();
  if (ext !== ".webp") return false;
  const outPath = filePath.slice(0, -4) + ".webp";
  // Skip if .webp already exists
  try {
    await fs.access(outPath);
    console.log(
      `➡️  Skipping existing: ${path.relative(IMAGES_ROOT, outPath)}`
    );
    return false;
  } catch {}
  try {
    await sharp(filePath).webp({ quality, effort: 6 }).toFile(outPath);
    console.log(
      `✅ Converted: ${path.relative(IMAGES_ROOT, filePath)} → ${path.relative(
        IMAGES_ROOT,
        outPath
      )}`
    );
    // Delete original PNG after successful conversion
    await fs.unlink(filePath);
    console.log(`🗑️  Deleted PNG: ${path.relative(IMAGES_ROOT, filePath)}`);
    return true;
  } catch (err) {
    console.error(`❌ Failed converting ${filePath}:`, err?.message || err);
    return false;
  }
}

async function main() {
  const quality = parseQualityArg(90);
  console.log(`📁 Scanning: ${IMAGES_ROOT}`);
  console.log(`🎯 Quality: ${quality}`);

  try {
    await fs.access(IMAGES_ROOT);
  } catch {
    console.error(`Images folder not found: ${IMAGES_ROOT}`);
    process.exit(1);
  }

  let converted = 0;
  for await (const file of walk(IMAGES_ROOT)) {
    const ok = await convertPngToWebp(file, quality);
    if (ok) converted += 1;
  }
  console.log(`🌟 Done. Converted ${converted} file(s).`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
