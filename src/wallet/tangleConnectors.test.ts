import { describe, expect, it } from 'vitest';
import type { CreateConnectorFn } from 'wagmi';

import { tangleBlueprintConnectors } from './tangleConnectors';

// jsdom: window.parent === window (not iframed) → no trusted parent → the
// helper must hand back the app's own standalone connectors unchanged. The
// embedded branch needs a real cross-origin referrer and is covered by the
// connector's own integration tests.
describe('tangleBlueprintConnectors', () => {
  it('returns the standalone connectors when not embedded', () => {
    const a = (() => ({})) as unknown as CreateConnectorFn;
    const b = (() => ({})) as unknown as CreateConnectorFn;
    expect(
      tangleBlueprintConnectors({ appId: 'my-app', standalone: [a, b] }),
    ).toEqual([a, b]);
  });
});
