export const STRONG_MARKERS = [
  /^(Let’s|Let's)\b/i, /^Now\b/i, /^Next\b/i, /^Then\b/i, /^Remember\b/i,
  /^First\b/i, /\bSecond\b/i, /\bThird\b/i, /^However\b/i, /^But\b/i, /^In this\b/i
];

export const EXAMPLE_MARKERS = [
  /^For example\b/i, /^For instance\b/i, /^Consider\b/i, /^Suppose\b/i, /^Let’s take a look\b/i
];

export const CONTRAST_MARKERS = [
  /\bversus\b/i, /\bvs\.\b/i, /\bcompared to\b/i, /\bon the other hand\b/i
];

export const VISUAL_MARKERS = [
  /\bscatter plot\b/i, /\bhistogram\b/i, /\bpanel\b|\bfacet\b/i,
  /\bvisualize\b|\bplot\b/i, /\bx[- ]?axis\b/i, /\by[- ]?axis\b/i,
  /\bfit(ting)? a? linear regression\b/i, /\bcoefficients?\b/i, /\btrain(?:ing)?\/?test\b/i, /\b80\/20\b/i
];

export function shouldSplit(sentence: string): boolean {
  const tests = [...STRONG_MARKERS, ...EXAMPLE_MARKERS, ...CONTRAST_MARKERS];
  if (tests.some(r => r.test(sentence))) return true;

  // definition-style sentence at start
  if (/^[A-Z][\w\s-]{0,80}\s(is|are|means|consists of|refers to)\b/i.test(sentence)) return true;

  // visuals/operations often imply new unit
  if (VISUAL_MARKERS.some(r => r.test(sentence))) return true;

  return false;
}
