/** Rewrite operator RPC hostname for browser reachability. */
export function resolveOperatorRpc(raw: string): string {
  if (typeof window === 'undefined') return raw;
  const withProto = raw.includes('://') ? raw : `http://${raw}`;
  try {
    const url = new URL(withProto);
    const pageHost = window.location.hostname;
    const isNonRoutable =
      url.hostname.endsWith('.local') ||
      !url.hostname.includes('.') ||
      url.hostname === '127.0.0.1' ||
      url.hostname === 'localhost';
    if (isNonRoutable && pageHost !== url.hostname) {
      url.hostname = pageHost;
    }
    return url.toString().replace(/\/$/, '');
  } catch {
    return withProto;
  }
}
