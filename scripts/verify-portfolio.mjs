#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const ALLOWED_STATUSES = new Set([
  'Verified Feature',
  'Interactive Demo',
  'Prototype',
  'In Development',
  'Live Product',
]);

const REQUIRED_DATE = '2026-10-28';

let errors = [];
let passedChecks = 0;

function pass(msg) {
  passedChecks++;
  console.log(`  ✓ ${msg}`);
}

function fail(msg) {
  errors.push(msg);
  console.error(`  ✗ ${msg}`);
}

console.log('=== RAY RAHARJA PORTFOLIO - AUTOMATED VERIFICATION ===\n');

// 1. Verify Web Projects Data & Screenshots
console.log('1. Checking Web Projects Data & Screenshots...');
const webDataPath = path.join(rootDir, 'src', 'lib', 'web-projects-data.ts');
if (!fs.existsSync(webDataPath)) {
  fail('src/lib/web-projects-data.ts not found');
} else {
  const content = fs.readFileSync(webDataPath, 'utf8');
  const expectedSlugs = [
    'leadkit-bakery',
    'arsiviz-pro',
    'symbioflow-enterprise',
    'sekolah-nusantara',
    'seumur-gerak',
  ];

  for (const slug of expectedSlugs) {
    if (content.includes(`slug: '${slug}'`)) {
      pass(`Web project found: ${slug}`);
    } else {
      fail(`Missing web project slug: ${slug}`);
    }
  }

  // Check verifiedAt
  const dateMatches = content.match(/verifiedAt:\s*'([^']+)'/g) || [];
  if (dateMatches.length >= 5) {
    let allValidDates = true;
    for (const dm of dateMatches) {
      if (!dm.includes(REQUIRED_DATE)) {
        allValidDates = false;
        fail(`Invalid verifiedAt date in: ${dm}`);
      }
    }
    if (allValidDates) {
      pass(`All verifiedAt dates match required reference date: ${REQUIRED_DATE}`);
    }
  } else {
    fail(`Expected at least 5 verifiedAt fields, found ${dateMatches.length}`);
  }

  // Check screenshot files
  const screenshotDir = path.join(rootDir, 'public', 'images', 'projects');
  const expectedScreenshots = [
    'leadkit-bakery-desktop.png',
    'leadkit-bakery-catalog.png',
    'leadkit-bakery-mobile.png',
    'arsiviz-pro-desktop.png',
    'arsiviz-pro-cutaway.png',
    'arsiviz-pro-mobile.png',
    'symbioflow-enterprise-desktop.png',
    'symbioflow-enterprise-bursa.png',
    'symbioflow-enterprise-mobile.png',
    'sekolah-nusantara-desktop.png',
    'sekolah-nusantara-ppdb.png',
    'sekolah-nusantara-mobile.png',
    'seumur-gerak-desktop.png',
    'seumur-gerak-hero.png',
    'seumur-gerak-mobile.png',
  ];

  for (const shot of expectedScreenshots) {
    const fullPath = path.join(screenshotDir, shot);
    if (!fs.existsSync(fullPath)) {
      fail(`Missing screenshot: public/images/projects/${shot}`);
    } else {
      const stats = fs.statSync(fullPath);
      if (stats.size < 10000) {
        fail(`Screenshot too small (<10KB): ${shot} (${stats.size} bytes)`);
      } else {
        pass(`Screenshot verified: ${shot} (${Math.round(stats.size / 1024)} KB)`);
      }
    }
  }
}

// 2. Verify Visual Works Media Files
console.log('\n2. Checking Visual Works Media Files (public/works/)...');
const seedDataPath = path.join(rootDir, 'src', 'lib', 'seed-data.ts');
if (fs.existsSync(seedDataPath)) {
  const seedContent = fs.readFileSync(seedDataPath, 'utf8');
  const mediaMatches = seedContent.match(/\/works\/[^"']+/g) || [];
  const uniqueMedia = [...new Set(mediaMatches)];
  for (const m of uniqueMedia) {
    const filePath = path.join(rootDir, 'public', m.replace(/^\//, ''));
    if (!fs.existsSync(filePath)) {
      fail(`Missing visual work media: ${m}`);
    } else {
      const stats = fs.statSync(filePath);
      pass(`Visual media verified: ${m} (${Math.round(stats.size / 1024)} KB)`);
    }
  }
}

// 3. Antislop Em Dash Verification (Zero em dash rule)
console.log('\n3. Checking for forbidden em dashes (— / \\u2014) in source files...');
const dirsToCheck = [
  path.join(rootDir, 'src', 'app'),
  path.join(rootDir, 'src', 'components'),
  path.join(rootDir, 'src', 'lib'),
];

function checkEmDashes(dir) {
  if (!fs.existsSync(dir)) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      checkEmDashes(fullPath);
    } else if (/\.(tsx?|jsx?|json|md)$/.test(entry.name)) {
      const code = fs.readFileSync(fullPath, 'utf8');
      if (code.includes('—') || code.includes('\u2014')) {
        fail(`Em dash found in: ${path.relative(rootDir, fullPath)}`);
      }
    }
  }
}

for (const d of dirsToCheck) {
  checkEmDashes(d);
}
pass('Em dash check complete across all source files');

// 4. Security & Environment Hygiene
console.log('\n4. Checking Security & Environment Hygiene...');
const envExamplePath = path.join(rootDir, '.env.example');
if (fs.existsSync(envExamplePath)) {
  const envContent = fs.readFileSync(envExamplePath, 'utf8');
  if (
    /eyJ[A-Za-z0-9_-]{20,}/.test(envContent) ||
    /ADMIN_PASSWORD=.+/.test(envContent) && !/ADMIN_PASSWORD=\s*$/.test(envContent)
  ) {
    fail('.env.example contains actual secrets or non-empty passwords');
  } else {
    pass('.env.example is clean with zero hardcoded secret values');
  }
}

// Check client bundles if .next exists
const staticDir = path.join(rootDir, '.next', 'static');
if (fs.existsSync(staticDir)) {
  console.log('\n5. Checking compiled client bundle for leaked secrets...');
  function checkBundleForSecrets(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        checkBundleForSecrets(fullPath);
      } else if (entry.name.endsWith('.js')) {
        const bundle = fs.readFileSync(fullPath, 'utf8');
        if (bundle.includes('SUPABASE_SERVICE_ROLE_KEY')) {
          fail(`Client bundle exposes SUPABASE_SERVICE_ROLE_KEY: ${entry.name}`);
        }
        if (bundle.includes('ADMIN_SESSION_SECRET')) {
          fail(`Client bundle exposes ADMIN_SESSION_SECRET: ${entry.name}`);
        }
      }
    }
  }
  checkBundleForSecrets(staticDir);
  pass('Client bundles verified free of server-side secret keys');
}

console.log('\n======================================================');
console.log(`Verification Summary: ${passedChecks} checks PASSED, ${errors.length} FAILED.`);
if (errors.length > 0) {
  console.error('\nFAILURES:');
  errors.forEach((e) => console.error(` - ${e}`));
  process.exit(1);
} else {
  console.log('\nALL CHECKS PASSED SUCCESSFULLY!\n');
  process.exit(0);
}
