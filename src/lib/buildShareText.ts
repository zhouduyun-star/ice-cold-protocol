import type { Identity } from "../data/types";

export function buildShareText(primary: Identity, secondaryName?: string): string {
  const tagsLine = primary.tags.length ? `身份标签：${primary.tags.join(" / ")}` : "";

  return [
    `我的隐藏身份：${primary.name}`,
    tagsLine,
    primary.shareText,
    secondaryName ? `系统给我的第二归档倾向是：${secondaryName}` : "",
    "你也来测测，在这场冰封里你到底是谁。"
  ]
    .filter(Boolean)
    .join("\n");
}
