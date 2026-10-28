/**
 * Server-side in-memory rate limiter & Origin CSRF verification helpers.
 * Note: In serverless deployments each cold instance maintains its own bucket;
 * this provides practical abuse throttling without external infrastructure.
 */

interface RateBucket {
  count: number;
  resetAt: number;
}

const buckets = new Map<string, RateBucket>();

function pruneExpiredBuckets(now: number) {
  if (buckets.size < 500) return;
  buckets.forEach((bucket, key) => {
    if (bucket.resetAt <= now) {
      buckets.delete(key);
    }
  });
}

export function getClientIdentifier(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    const firstIp = forwarded.split(',')[0]?.trim();
    if (firstIp) return firstIp;
  }
  const realIp = request.headers.get('x-real-ip')?.trim();
  if (realIp) return realIp;
  return 'local-client';
}

export function checkRateLimit(options: {
  key: string;
  limit: number;
  windowMs: number;
}): { allowed: boolean; remaining: number; retryAfterSeconds: number } {
  const now = Date.now();
  pruneExpiredBuckets(now);

  const existing = buckets.get(options.key);
  if (!existing || existing.resetAt <= now) {
    buckets.set(options.key, {
      count: 1,
      resetAt: now + options.windowMs,
    });
    return {
      allowed: true,
      remaining: Math.max(0, options.limit - 1),
      retryAfterSeconds: Math.ceil(options.windowMs / 1000),
    };
  }

  if (existing.count >= options.limit) {
    return {
      allowed: false,
      remaining: 0,
      retryAfterSeconds: Math.max(1, Math.ceil((existing.resetAt - now) / 1000)),
    };
  }

  existing.count += 1;
  buckets.set(options.key, existing);

  return {
    allowed: true,
    remaining: Math.max(0, options.limit - existing.count),
    retryAfterSeconds: Math.max(1, Math.ceil((existing.resetAt - now) / 1000)),
  };
}

export function resetRateLimit(key: string): void {
  buckets.delete(key);
}

/**
 * Verifies same-origin for state-changing requests (POST/PUT/PATCH/DELETE).
 */
export function verifySameOrigin(request: Request): boolean {
  const originHeader = request.headers.get('origin');
  const hostHeader =
    request.headers.get('x-forwarded-host') || request.headers.get('host');

  if (!originHeader) {
    // Allow same-origin requests from browsers/tests that omit Origin only when Sec-Fetch-Site is not cross-site
    const fetchSite = request.headers.get('sec-fetch-site');
    if (fetchSite && fetchSite !== 'same-origin' && fetchSite !== 'none') {
      return false;
    }
    return true;
  }

  if (!hostHeader) return false;

  try {
    const originUrl = new URL(originHeader);
    return originUrl.host.toLowerCase() === hostHeader.toLowerCase();
  } catch {
    return false;
  }
}
