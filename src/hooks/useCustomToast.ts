import { useToast } from "@chakra-ui/react";

/**
 *
 * Usage:
 *
 * ```javascript
 * import { useCustomToast } from './path/to/customToast';
 *
 * function MyComponent() {
 *   const toast = useCustomToast();
 *
 *   const showToast = () => {
 *     toast({
 *       title: "Notification",
 *       description: "This is a custom toast notification",
 *       status: "success",
 *     });
 *   };
 *
 *   return (
 *     <button onClick={showToast}>Show Toast</button>
 *   );
 * }
 * ```
 *
 * Customization:
 * - The hook is pre-configured with the following default options:
 *   - `isClosable`: true (The toast can be manually closed by the user)
 *   - `variant`: "subtle" (The toast appearance is subtle)
 *   - `position`: "top" (The toast appears at the top of the screen)
 *   - `duration`: 3000 (The toast automatically disappears after 3000 milliseconds)
 *
 * These defaults can be overridden by passing different values when calling the `toast` function.
 *
 * @example
 * toast({
 *   title: "Error",
 *   description: "An error occurred.",
 *   status: "error",
 *   duration: 5000, // Overrides the default duration
 * });
 */

export function useCustomToast() {
  return useToast({
    isClosable: true,
    variant: "subtle",
    position: "top",
    duration: 3000,
  });
}
