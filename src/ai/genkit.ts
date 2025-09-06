/**
 * @fileOverview Genkit AI configuration.
 */

import {genkit, Plugin} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

const plugins: Plugin<any>[] = [googleAI()];

if (process.env.NODE_ENV === 'development') {
  //   plugins.push(firebaseDeveloper());
}

export const ai = genkit({
  plugins,
});
