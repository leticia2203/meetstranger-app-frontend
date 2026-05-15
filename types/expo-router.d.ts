declare module 'expo-router' {
  import * as React from 'react';
  export type RouterLocation = string | { pathname: string; params?: Record<string, string | number | undefined> };
  export function useRouter(): { push: (location: RouterLocation) => void; replace: (location: RouterLocation) => void; back: () => void };
  export function useLocalSearchParams<T extends Record<string, string | undefined>>(): T;
  export const Stack: any;
  const _default: any;
  export default _default;
}
