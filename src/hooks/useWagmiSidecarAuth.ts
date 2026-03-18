import { useSignMessage } from 'wagmi';
import { useSidecarAuth } from './useSidecarAuth';

export function useWagmiSidecarAuth(resourceId: string, apiUrl: string) {
  const { signMessageAsync } = useSignMessage();
  return useSidecarAuth({
    resourceId,
    apiUrl,
    signMessage: (msg: string) => signMessageAsync({ message: msg }),
  });
}
