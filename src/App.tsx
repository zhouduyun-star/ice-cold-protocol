import { useEffect, useState } from "react";
import { questions } from "./data/questions";
import { buildShareText } from "./lib/buildShareText";
import { scoreAnswers } from "./lib/scoring";
import { clearSession, loadSession, saveSession, type StoredAnswer } from "./lib/storage";

type AppPhase = "intro" | "testing" | "result";

const dimensionLabels = {
  self: "自保阈值",
  cost: "代价边界",
  stability: "崩溃阈值",
  control: "叙事支配",
  signal: "异常感知"
};

const ogImageMap: Record<string, string> = {
  "system-operator": "/og/system-operator.png",
  "hidden-villain": "/og/hidden-villain.png",
  "performative-savior": "/og/performative-savior.png",
  "cold-survivor": "/og/cold-survivor.png",
  "higher-observer": "/og/higher-observer.png",
  "emotion-parasite": "/og/emotion-parasite.png",
  "rule-breaker": "/og/rule-breaker.png",
  "silent-hunter": "/og/silent-hunter.png",
  "chosen-substitute": "/og/chosen-substitute.png",
  "unstable-variable": "/og/unstable-variable.png"
};

const initialSession = loadSession();

export default function App() {
  const [phase, setPhase] = useState<AppPhase>(initialSession?.started ? "testing" : "intro");
  const [currentIndex, setCurrentIndex] = useState(initialSession?.currentIndex ?? 0);
  const [answers, setAnswers] = useState<StoredAnswer[]>(initialSession?.answers ?? []);
  const [copyState, setCopyState] = useState<"idle" | "done" | "failed">("idle");
  const [imageMissing, setImageMissing] = useState(false);

  useEffect(() => {
    if (phase === "intro") {
      clearSession();
      return;
    }

    if (phase === "testing") {
      saveSession({
        started: true,
        currentIndex,
        answers
      });
    }
  }, [answers, currentIndex, phase]);

  useEffect(() => {
    if (answers.length === questions.length) {
      setPhase("result");
    }
  }, [answers.length]);

  useEffect(() => {
    if (phase !== "testing") {
      return;
    }

    const invalidProgress =
      currentIndex < 0 ||
      currentIndex > questions.length ||
      answers.length < 0 ||
      answers.length > questions.length;

    if (!invalidProgress) {
      return;
    }

    clearSession();
    setAnswers([]);
    setCurrentIndex(0);
    setPhase("intro");
  }, [answers.length, currentIndex, phase]);

  useEffect(() => {
    if (phase !== "testing") {
      return;
    }
    if (currentIndex !== answers.length) {
      setCurrentIndex(answers.length);
    }
  }, [answers.length, currentIndex, phase]);

  const currentQuestion = questions[answers.length];
  const outcome = answers.length === questions.length ? scoreAnswers(answers) : null;
  const basePath = import.meta.env.BASE_URL.endsWith("/")
    ? import.meta.env.BASE_URL
    : `${import.meta.env.BASE_URL}/`;
  const primaryImageSrc = outcome
    ? `${basePath}${(ogImageMap[outcome.primary.id] ?? outcome.primary.ogImage).replace(/^\/+/, "")}`
    : "";
  const fallbackImageSrc = `${basePath}og/og-default.png`;

  useEffect(() => {
    setImageMissing(false);
  }, [outcome?.primary.id]);

  function handleStart(): void {
    clearSession();
    setAnswers([]);
    setCurrentIndex(0);
    setPhase("testing");
  }

  function handleRestart(): void {
    clearSession();
    setAnswers([]);
    setCurrentIndex(0);
    setCopyState("idle");
    setPhase("intro");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleAnswer(optionId: string): void {
    if (!currentQuestion) {
      return;
    }
    const questionId = currentQuestion.id;
    setAnswers((previousAnswers) => {
      // 防止同一题被快速连点导致重复计分/题号越界
      if (previousAnswers.length >= questions.length) {
        return previousAnswers;
      }
      const nextAnswers = [...previousAnswers, { questionId, optionId }];
      setCurrentIndex(nextAnswers.length);
      return nextAnswers;
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleCopyShare(): Promise<void> {
    if (!outcome) {
      return;
    }

    const shareText = buildShareText(outcome.primary, outcome.ranking[1]?.identity.name);

    try {
      await navigator.clipboard.writeText(shareText);
      setCopyState("done");
    } catch {
      setCopyState("failed");
    }
  }

  if (phase === "intro") {
    return (
      <main className="shell">
        <section className="hero-card">
          <p className="eyebrow">ICE COLD PROTOCOL / IDENTITY ARCHIVE</p>
          <h1>冰封协议：你到底是谁？</h1>
          <p className="hero-meta">温度：-39.2°C | 商场失温 | 保温仓剩余名额：10</p>
          <p className="hero-copy">
            你被困在三楼尽头的厕所。外面还有 27 个人，广播系统刚刚提醒你：你的身份尚未确认。
          </p>
          <p className="hero-copy">
            你可能是幸存者，可能是共谋者，也可能就是这场冰封的起点。
          </p>
          <div className="hero-tags">
            <span>末日隐藏身份模拟器</span>
            <span>30 道归档问题</span>
            <span>10 张隐藏身份结果卡</span>
          </div>
          <button className="primary-button" type="button" onClick={handleStart}>
            开始归档
          </button>
          <p className="tiny-note">本测试为虚构叙事互动内容，仅用于娱乐体验。</p>
        </section>
      </main>
    );
  }

  if (phase === "testing" && currentQuestion) {
    return (
      <main className="shell">
        <header className="topbar">
          <div>
            <p className="eyebrow">归档进行中</p>
            <h2>{currentQuestion.scene}</h2>
          </div>
          <div className="progress-box">
            <span>
              {Math.min(currentIndex + 1, questions.length)} / {questions.length}
            </span>
            <div className="progress-track">
              <div
                className="progress-fill"
                style={{
                  width: `${((answers.length + 1) / questions.length) * 100}%`
                }}
              />
            </div>
          </div>
        </header>

        <section className="question-card">
          <p className="question-text">{currentQuestion.prompt}</p>
          <div className="option-grid">
            {currentQuestion.options.map((option) => (
              <button
                key={option.id}
                className="option-button"
                type="button"
                onClick={() => handleAnswer(option.id)}
              >
                {option.text}
              </button>
            ))}
          </div>
        </section>
      </main>
    );
  }

  if (!outcome) {
    return (
      <main className="shell">
        <section className="result-card">
          <p className="eyebrow">ARCHIVE INTERRUPTED</p>
          <h2>归档中断</h2>
          <p className="tiny-note">检测到状态异常，已建议重开测试。</p>
          <div className="actions">
            <button className="primary-button" type="button" onClick={handleRestart}>
              重新开始测试
            </button>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="shell">
      <section className="result-card">
        <p className="eyebrow">ARCHIVE COMPLETE</p>
        <h2>{outcome.primary.name}</h2>
        <div className="identity-tags">
          {outcome.primary.tags.map((tag, index) => (
            <span key={index} className="identity-tag">
              {tag}
            </span>
          ))}
        </div>
        
        <p className="result-tagline">{outcome.primary.tagline}</p>
        <p className="result-system-note">系统归档：{outcome.primary.systemNote}</p>

        <section className="og-card">
          <div className="og-preview">
            <img
              src={primaryImageSrc}
              alt={`${outcome.primary.name} OG 图`}
              onError={(event) => {
                const target = event.target as HTMLImageElement;
                if (target.dataset.fallback !== "1") {
                  target.dataset.fallback = "1";
                  target.src = fallbackImageSrc;
                  return;
                }
                target.style.opacity = "0";
                setImageMissing(true);
              }}
            />
          </div>
          {imageMissing && (
            <p className="tiny-note">结果图资源缺失：请把对应 png 放到 `public/og` 目录。</p>
          )}
        </section>

        <div className="metric-list">
          {Object.entries(outcome.profile).map(([dimension, value]) => (
            <div key={dimension} className="metric-row">
              <div className="metric-head">
                <span>{dimensionLabels[dimension as keyof typeof dimensionLabels]}</span>
                <strong>{value}</strong>
              </div>
              <div className="metric-track">
                <div className="metric-fill" style={{ width: `${value}%` }} />
              </div>
            </div>
          ))}
        </div>

        <section className="secondary-card">
          <h3>判定依据</h3>
          <ul>
            {Object.entries(outcome.rawScores).map(([dimension, value]) => (
              <li key={dimension}>
                <span>{dimensionLabels[dimension as keyof typeof dimensionLabels]}</span>
                <strong>{value >= 0 ? `+${value}` : value}</strong>
              </li>
            ))}
          </ul>
          <p className="tiny-note">结果由五维累计分主判定，再用剧情标签做少量修正。</p>
        </section>

        <div className="detail-grid">
          <article>
            <h3>档案摘要</h3>
            <p>{outcome.primary.summary}</p>
          </article>
          <article>
            <h3>你的危险点</h3>
            <p>{outcome.primary.dangerPoint}</p>
          </article>
          <article>
            <h3>你的吸引点</h3>
            <p>{outcome.primary.allurePoint}</p>
          </article>
        </div>

        <section className="secondary-card">
          <h3>次级归档倾向</h3>
          <ul>
            {outcome.ranking.slice(1, 4).map((entry) => (
              <li key={entry.identity.id}>
                <span>{entry.identity.name}</span>
                <strong>{entry.matchScore}%</strong>
              </li>
            ))}
          </ul>
        </section>

        <div className="actions">
          <button className="primary-button" type="button" onClick={() => void handleCopyShare()}>
            复制分享文案
          </button>
          <button className="secondary-button" type="button" onClick={handleRestart}>
            再测一次
          </button>
        </div>

        <p className="tiny-note">
          {copyState === "done" && "分享文案已复制。"}
          {copyState === "failed" && "复制失败，请手动复制结果内容。"}
          {copyState === "idle" && "转发给朋友，看看TA是什么身份。"}
        </p>
      </section>
    </main>
  );
}
