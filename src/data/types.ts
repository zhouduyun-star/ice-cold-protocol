export const dimensions = [
  "self",
  "cost",
  "stability",
  "control",
  "signal"
] as const;

export type DimensionKey = (typeof dimensions)[number];

export type Scores = Record<DimensionKey, number>;

export type Option = {
  id: string;
  text: string;
  score: Scores;
  flags?: string[];
};

export type Question = {
  id: number;
  scene: string;
  prompt: string;
  options: Option[];
};

export type Identity = {
  id: string;
  name: string;
  ogImage: string;
  tagline: string;
  summary: string;
  systemNote: string;
  dangerPoint: string;
  allurePoint: string;
  shareText: string;
  tags: string[];
  idealVector: Record<DimensionKey, number>;
  dimensionWeights: Record<DimensionKey, number>;
  flagWeights: Record<string, number>;
};
