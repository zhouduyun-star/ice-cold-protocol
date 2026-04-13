import { identities } from "../data/identities";
import { questions } from "../data/questions";
import { dimensions, type DimensionKey, type Identity, type Option, type Scores } from "../data/types";
import type { StoredAnswer } from "./storage";

type RankedIdentity = {
  identity: Identity;
  matchScore: number;
  dimensionScore: number;
  flagScore: number;
  adjustmentScore: number;
};

export type Outcome = {
  rawScores: Record<DimensionKey, number>;
  profile: Record<DimensionKey, number>;
  primary: Identity;
  ranking: RankedIdentity[];
  flagCounts: Record<string, number>;
  hiddenArchive: string | null;
};

const MIN_TOTAL = -60;
const MAX_TOTAL = 60;

const optionLookup = new Map<string, Option>();
const centeredScoreLookup = new Map<string, Scores>();

function calibrationFromFlags(flags: string[] = []): Scores {
  const calibrated = createZeroScores();

  for (const flag of flags) {
    switch (flag) {
      case "self-preserve":
      case "survival-first":
        calibrated.self += 0.8;
        calibrated.cost -= 0.6;
        calibrated.signal -= 0.4;
        break;
      case "hard-pragmatism":
        calibrated.self += 0.5;
        calibrated.cost -= 0.4;
        calibrated.signal -= 0.3;
        break;
      case "protects-others":
      case "public-morality":
        calibrated.self -= 0.8;
        calibrated.cost += 0.9;
        break;
      case "group-vote":
        calibrated.control -= 0.3;
        calibrated.cost += 0.4;
        break;
      case "narrative-control":
      case "resource-triage":
        calibrated.control += 0.8;
        calibrated.self += 0.2;
        break;
      case "tests-boundary":
      case "break-narrative":
      case "hack-access":
        calibrated.control += 0.7;
        calibrated.signal += 0.8;
        calibrated.stability -= 0.2;
        break;
      case "seek-truth":
      case "trace-anomaly":
      case "timeline-audit":
      case "system-access":
        calibrated.signal += 0.9;
        calibrated.self -= 0.2;
        break;
      case "silent-watch":
        calibrated.signal += 0.3;
        calibrated.control -= 0.3;
        break;
      case "target-weakness":
      case "exploit-gap":
        calibrated.self += 0.5;
        calibrated.cost -= 0.6;
        calibrated.signal += 0.3;
        break;
      case "shifts-blame":
      case "sacrifice-others":
        calibrated.self += 0.6;
        calibrated.cost -= 0.9;
        calibrated.control += 0.4;
        break;
      case "reads-people":
        calibrated.signal += 0.4;
        calibrated.control += 0.2;
        break;
      case "selected-feeling":
      case "identity-glitch":
      case "memory-loss":
        calibrated.stability -= 0.8;
        calibrated.signal += 0.3;
        break;
      case "volatile":
      case "chaos-feed":
      case "contradiction":
        calibrated.stability -= 1;
        calibrated.control += 0.1;
        break;
      default:
        break;
    }
  }

  return calibrated;
}

for (const question of questions) {
  const averages = dimensions.reduce(
    (result, dimension) => {
      result[dimension] =
        question.options.reduce((sum, option) => sum + option.score[dimension], 0) / question.options.length;
      return result;
    },
    {} as Scores
  );

  for (const option of question.options) {
    optionLookup.set(option.id, option);
    const calibration = calibrationFromFlags(option.flags);
    centeredScoreLookup.set(option.id, {
      self: option.score.self - averages.self + calibration.self,
      cost: option.score.cost - averages.cost + calibration.cost,
      stability: option.score.stability - averages.stability + calibration.stability,
      control: option.score.control - averages.control + calibration.control,
      signal: option.score.signal - averages.signal + calibration.signal
    });
  }
}

function createZeroScores(): Scores {
  return {
    self: 0,
    cost: 0,
    stability: 0,
    control: 0,
    signal: 0
  };
}

function normalizeScore(value: number): number {
  const clamped = Math.max(MIN_TOTAL, Math.min(MAX_TOTAL, value));
  return Math.round(((clamped - MIN_TOTAL) / (MAX_TOTAL - MIN_TOTAL)) * 100);
}

function high(value: number): number {
  return value;
}

function low(value: number): number {
  return 100 - value;
}

function middle(value: number, center = 50): number {
  return Math.max(0, 100 - Math.abs(value - center) * 2);
}

function combine(parts: Array<[number, number]>): number {
  return Math.round(parts.reduce((sum, [value, weight]) => sum + value * weight, 0));
}

function spread(profile: Record<DimensionKey, number>): number {
  const values = Object.values(profile);
  const mean = values.reduce((sum, value) => sum + value, 0) / values.length;
  const variance = values.reduce((sum, value) => sum + (value - mean) ** 2, 0) / values.length;
  return Math.min(100, Math.round(Math.sqrt(variance) * 4));
}

function inRange(value: number, min: number, max: number): boolean {
  return value >= min && value <= max;
}

function sumFlags(flagCounts: Record<string, number>, flags: string[]): number {
  return flags.reduce((sum, flag) => sum + (flagCounts[flag] ?? 0), 0);
}

function computeDimensionScore(
  profile: Record<DimensionKey, number>,
  identity: Identity
): number {
  const { self, cost, stability, control, signal } = profile;

  switch (identity.id) {
    case "system-operator":
      return combine([
        [high(control), 0.3],
        [high(signal), 0.26],
        [high(stability), 0.22],
        [high(self), 0.12],
        [low(cost), 0.1]
      ]);
    case "hidden-villain":
      return combine([
        [high(self), 0.3],
        [low(cost), 0.28],
        [high(control), 0.18],
        [high(stability), 0.12],
        [high(signal), 0.12]
      ]);
    case "performative-savior":
      return combine([
        [high(cost), 0.3],
        [middle(control, 68), 0.22],
        [middle(self, 42), 0.18],
        [middle(stability, 52), 0.12],
        [middle(signal, 60), 0.18]
      ]);
    case "cold-survivor":
      return combine([
        [high(self), 0.34],
        [high(stability), 0.3],
        [low(cost), 0.2],
        [middle(control, 58), 0.1],
        [low(signal), 0.06]
      ]);
    case "higher-observer":
      return combine([
        [high(signal), 0.42],
        [high(stability), 0.2],
        [high(cost), 0.14],
        [low(control), 0.12],
        [middle(self, 48), 0.12]
      ]);
    case "emotion-parasite":
      return combine([
        [low(stability), 0.3],
        [high(signal), 0.22],
        [high(control), 0.16],
        [high(self), 0.16],
        [middle(cost, 42), 0.16]
      ]);
    case "rule-breaker":
      return combine([
        [high(control), 0.24],
        [high(signal), 0.24],
        [middle(self, 57), 0.12],
        [middle(cost, 46), 0.12],
        [low(stability), 0.1],
        [high(stability), 0.18]
      ]);
    case "silent-hunter":
      return combine([
        [high(self), 0.28],
        [high(stability), 0.24],
        [high(signal), 0.22],
        [middle(control, 62), 0.14],
        [low(cost), 0.12]
      ]);
    case "chosen-substitute":
      return combine([
        [high(signal), 0.28],
        [high(cost), 0.24],
        [low(control), 0.2],
        [low(stability), 0.14],
        [middle(self, 46), 0.14]
      ]);
    case "unstable-variable":
      return combine([
        [low(stability), 0.5],
        [spread(profile), 0.3],
        [high(control), 0.05],
        [high(signal), 0.05],
        [high(self), 0.05],
        [low(cost), 0.05]
      ]);
    default: {
      let weightedDistance = 0;
      let totalWeight = 0;

      for (const dimension of dimensions) {
        const weight = identity.dimensionWeights[dimension];
        weightedDistance += Math.abs(profile[dimension] - identity.idealVector[dimension]) * weight;
        totalWeight += 100 * weight;
      }

      return Math.max(0, Math.min(100, Math.round(100 - (weightedDistance / totalWeight) * 100)));
    }
  }
}

function computeFlagScore(flagCounts: Record<string, number>, identity: Identity): number {
  let score = 0;

  for (const [flag, weight] of Object.entries(identity.flagWeights)) {
    const count = flagCounts[flag] ?? 0;
    score += Math.min(count, 5) * weight;
  }

  return Math.min(100, Math.round(score * 3));
}

function computeAdjustmentScore(
  profile: Record<DimensionKey, number>,
  flagCounts: Record<string, number>,
  identity: Identity
): number {
  const { self, cost, stability, control, signal } = profile;

  switch (identity.id) {
    case "system-operator": {
      let score = 0;
      if (control >= 80) score += 10;
      if (signal >= 78) score += 7;
      if (stability >= 72) score += 5;
      if (control < 58) score -= 16;
      if (stability < 50) score -= 8;
      if (cost > 72) score -= 5;
      return score;
    }
    case "hidden-villain": {
      let score = 0;
      if (self >= 75 && cost <= 42) score += 14;
      if (control >= 70) score += 6;
      if (sumFlags(flagCounts, ["shifts-blame", "sacrifice-others", "exploit-gap"]) >= 4) score += 8;
      if (cost >= 60) score -= 14;
      if (self < 56) score -= 10;
      return score;
    }
    case "performative-savior": {
      let score = 0;
      if (cost >= 68 && inRange(control, 45, 80)) score += 14;
      if (sumFlags(flagCounts, ["protects-others", "public-morality", "group-vote"]) >= 4) score += 8;
      if (self > 72) score -= 7;
      if (cost < 56) score -= 14;
      return score;
    }
    case "cold-survivor": {
      let score = 0;
      if (self >= 80 && stability >= 78) score += 14;
      if (cost <= 42) score += 7;
      if (signal >= 82) score -= 8;
      if (cost >= 62) score -= 10;
      return score;
    }
    case "higher-observer": {
      let score = 0;
      if (signal >= 84 && control <= 60) score += 14;
      if (sumFlags(flagCounts, ["trace-anomaly", "seek-truth", "timeline-audit"]) >= 5) score += 8;
      if (control >= 74) score -= 14;
      if (self >= 78 && cost <= 38) score -= 8;
      return score;
    }
    case "emotion-parasite": {
      let score = 0;
      if (stability <= 42 && signal >= 62) score += 14;
      if (sumFlags(flagCounts, ["reads-people", "chaos-feed", "volatile"]) >= 5) score += 10;
      if (stability >= 65) score -= 16;
      if (cost >= 68) score -= 6;
      return score;
    }
    case "rule-breaker": {
      let score = 0;
      if (control >= 68 && signal >= 72) score += 12;
      if (sumFlags(flagCounts, ["tests-boundary", "break-narrative", "hack-access"]) >= 4) score += 10;
      if (control <= 45) score -= 12;
      if (cost >= 72) score -= 5;
      return score;
    }
    case "silent-hunter": {
      let score = 0;
      if (self >= 72 && stability >= 72 && signal >= 68) score += 14;
      if (sumFlags(flagCounts, ["silent-watch", "target-weakness", "exploit-gap"]) >= 5) score += 8;
      if (cost >= 66) score -= 10;
      if (self < 58) score -= 8;
      return score;
    }
    case "chosen-substitute": {
      let score = 0;
      if (signal >= 74 && control <= 48) score += 13;
      if (sumFlags(flagCounts, ["identity-glitch", "selected-feeling", "memory-loss"]) >= 4) score += 10;
      if (control >= 62) score -= 14;
      if (self >= 78) score -= 6;
      return score;
    }
    case "unstable-variable": {
      let score = 0;
      if (stability <= 35) score += 15;
      if ((flagCounts["volatile"] ?? 0) >= 5) score += 10;
      if (sumFlags(flagCounts, ["contradiction", "chaos-feed"]) >= 3) score += 7;
      if (stability >= 60) score -= 18;
      return score;
    }
    default:
      return 0;
  }
}

function computeVolatility(options: Option[]): number {
  let volatility = 0;

  for (let index = 1; index < options.length; index += 1) {
    const previous = options[index - 1].score;
    const current = options[index].score;

    if (previous.self * current.self < 0) {
      volatility += 1;
    }

    if (previous.cost * current.cost < 0) {
      volatility += 1;
    }

    if (Math.abs(previous.stability - current.stability) >= 3) {
      volatility += 1;
    }
  }

  return volatility;
}

function buildArchive(flagCounts: Record<string, number>, profile: Record<DimensionKey, number>): string | null {
  if ((flagCounts["identity-glitch"] ?? 0) >= 3 && (flagCounts["selected-feeling"] ?? 0) >= 2) {
    return "隐藏档案已解锁：你不像误入现场，更像被系统主动投放进这一轮时间线。";
  }

  if ((flagCounts["trace-anomaly"] ?? 0) >= 4 && profile.signal >= 80) {
    return "隐藏档案已解锁：你看到的结果只是表层，你更接近这场冰封背后的编排者。";
  }

  if ((flagCounts["tests-boundary"] ?? 0) >= 4 && profile.control >= 70) {
    return "隐藏档案已解锁：你不是在过关，你一直在试图把规则本身拆开。";
  }

  return null;
}

export function scoreAnswers(answers: StoredAnswer[]): Outcome {
  const rawScores = createZeroScores();
  const flagCounts: Record<string, number> = {};
  const selectedOptions: Option[] = [];

  for (const answer of answers) {
    const option = optionLookup.get(answer.optionId);
    if (!option) {
      continue;
    }

    selectedOptions.push(option);

    const centeredScore = centeredScoreLookup.get(answer.optionId) ?? option.score;

    for (const dimension of dimensions) {
      rawScores[dimension] += centeredScore[dimension];
    }

    for (const flag of option.flags ?? []) {
      flagCounts[flag] = (flagCounts[flag] ?? 0) + 1;
    }
  }

  const volatility = computeVolatility(selectedOptions);
  flagCounts["volatile"] = (flagCounts["volatile"] ?? 0) + volatility;

  const profile = dimensions.reduce(
    (result, dimension) => {
      result[dimension] = normalizeScore(rawScores[dimension]);
      return result;
    },
    {} as Record<DimensionKey, number>
  );

  const ranking = identities
    .map((identity) => {
      // 主判定看五维原型是否贴合，flag 只做剧情微调，避免结果被少数标签“锁死”
      const dimensionScore = computeDimensionScore(profile, identity);
      const flagScore = computeFlagScore(flagCounts, identity);
      const adjustmentScore = computeAdjustmentScore(profile, flagCounts, identity);
      const matchScore = Math.max(
        1,
        Math.min(99, Math.round(dimensionScore * 0.78 + flagScore * 0.12 + adjustmentScore))
      );

      return {
        identity,
        matchScore,
        dimensionScore,
        flagScore,
        adjustmentScore
      };
    })
    .sort((left, right) => right.matchScore - left.matchScore);

  const roundedRawScores = dimensions.reduce(
    (result, dimension) => {
      result[dimension] = Math.round(rawScores[dimension] * 10) / 10;
      return result;
    },
    {} as Record<DimensionKey, number>
  );

  return {
    rawScores: roundedRawScores,
    profile,
    primary: ranking[0].identity,
    ranking,
    flagCounts,
    hiddenArchive: buildArchive(flagCounts, profile)
  };
}
