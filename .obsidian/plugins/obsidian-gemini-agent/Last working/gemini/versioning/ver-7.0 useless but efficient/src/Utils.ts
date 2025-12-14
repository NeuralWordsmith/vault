/**
 * Makes an API call with a robust retry mechanism.
 * @param apiCall The asynchronous function to execute.
 * @param maxRetries The maximum number of times to retry.
 * @param initialDelay The initial delay in milliseconds.
 * @param progressCallback An optional function to call with status updates for the UI.
 * @returns The result of the apiCall.
 */
export async function makeApiCallWithRetry(
    apiCall: () => Promise<any>,
    maxRetries = 3,
    initialDelay = 2000,
    progressCallback?: (update: string) => void
): Promise<any> {
    let retries = 0;
    let delay = initialDelay;

    while (retries < maxRetries) {
        try {
            return await apiCall();
        } catch (error) {
            // Check for common, retryable server-side errors (5xx status codes)
            if (error.message && /\[5\d{2}\]/.test(error.message)) {
                retries++;
                if (retries >= maxRetries) {
                    throw error; // Rethrow after exhausting retries
                }

                // Add jitter: a small random delay to prevent thundering herd issues
                const jitter = Math.random() * delay * 0.2; // Add up to 20% jitter
                const totalDelay = delay + jitter;
                
                const waitSeconds = (totalDelay / 1000).toFixed(1);
                const message = `API is busy. Retrying in ${waitSeconds}s... (Attempt ${retries}/${maxRetries})`;
                
                console.warn(message);
                if (progressCallback) {
                    progressCallback(message); // <-- THIS IS THE KEY UI UPDATE
                }

                await new Promise(resolve => setTimeout(resolve, totalDelay));
                delay *= 2; // Exponential backoff for the next potential retry
            } else {
                // For non-retryable errors (e.g., 4xx client errors), fail immediately.
                throw error;
            }
        }
    }
}