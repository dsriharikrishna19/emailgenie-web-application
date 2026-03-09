import { SarvamAIClient } from "sarvamai";

const apiKey = process.env.SARVAM_API_KEY || process.env.NEXT_PUBLIC_SARVAM_KEY;

if (!apiKey) {
    console.warn('SARVAM_API_KEY or NEXT_PUBLIC_SARVAM_KEY is not set in environment variables');
}

export const sarvam = new SarvamAIClient({
    apiSubscriptionKey: apiKey || '',
});
