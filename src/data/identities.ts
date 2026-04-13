import type { Identity } from "./types";

export const identities: Identity[] = [
  {
    id: "system-operator",
    name: "系统操盘者",
    ogImage: "og/system-operator.png",
    tagline: "这场冰封从不是意外，10 个保温仓是你筛选人性的筹码。所有选择都在你的计算里，你是幕后执棋人，也是这场末世剧本的唯一操盘手。仅有2%的人测出同样的结果。",
    summary:
      "你对秩序的渴望高于对温情的依赖。你能在最混乱的时候抽离情绪、建立规则、重新分配资源。你未必邪恶，但你很容易相信只要系统还能运转，个体损耗就是可被管理的成本。",
    systemNote: "你深谙系统规则与人性底层逻辑，所有人的抉择、挣扎、博弈，都在你的预设轨迹之中。",
    dangerPoint: "你不在乎生死输赢，只在意这场人性操盘的最终结果，是这场末世困局里真正的幕后主导。",
    allurePoint: "你看似与众人同处绝境，实则掌控着这场冰封试炼的全部走向，对系统真相有着绝对感知，情绪从无波澜，道德与利己皆为实验变量",
    shareText: "原来这场冰封，从一开始就是我布的局。你也来试试吧！",
    tags: ["执棋布局", "洞悉全局", "极致控场"],
    idealVector: { self: 72, cost: 38, stability: 90, control: 96, signal: 91 },
    dimensionWeights: { self: 1.1, cost: 1, stability: 1.2, control: 1.4, signal: 1.3 },
    flagWeights: { "resource-triage": 2.5, "narrative-control": 3, "system-access": 2.8 }
  },
  {
    id: "hidden-villain",
    name: "隐性反派",
    ogImage: "og/hidden-villain.png",
    tagline: "你是冰封灾难的间接推手，却把自己伪装成最无辜的受害者，蜷缩在厕所绝境中，不动声色地引导他人做出错误抉择。仅有0.1%的人测出同样的结果。",
    summary:
      "你不会冲在最前面喊口号，却总能用规则、信息差和局势压力，为自己换到更高的生存率。你真正危险的地方，不是恶意有多明显，而是你总能把每一步都解释成没办法。",
    systemNote: "你道德底线极低，极致利己却藏得滴水不漏，情绪稳定得近乎可怕，对系统真相心知肚明却刻意掩盖，在绝境中默默收割利益，",
    dangerPoint: "一旦你说出现实就是这样，通常就有人要替你买单。",
    allurePoint: "你在极端场景里几乎总能活下来。",
    shareText: "藏在最无害的面孔里，做最冷的那只手。你也来试试吧！",
    tags: ["隐忍蛰伏", "暗推浩劫", "阴鸷利己"],
    idealVector: { self: 88, cost: 18, stability: 76, control: 84, signal: 80 },
    dimensionWeights: { self: 1.35, cost: 1.35, stability: 1.05, control: 1.15, signal: 1.05 },
    flagWeights: { "shifts-blame": 3, "sacrifice-others": 3.2, "exploit-gap": 2.8 }
  },
  {
    id: "performative-savior",
    name: "伪善救世主",
    ogImage: "og/performative-savior.png",
    tagline: "你总以救赎者的姿态出现在绝境里，高呼公平、悲悯众生，劝诫众人谦让保温仓名额，用道德枷锁束缚他人的求生欲。仅有5%的人测出同样的结果。",
    summary:
      "你擅长操控舆论与人心，控制欲藏在温柔的表象下，情绪看似温和实则极具欺骗性，对系统真相一知半解却故作通透，用伪善的外衣，行自私求生之实。",
    systemNote: "你的善意是真的，只是镜头感也是真的。",
    dangerPoint: "用伪善的外衣，行自私求生之实。",
    allurePoint: "你能在绝望里给别人一种还有人性的错觉。",
    shareText: "嘴上喊着拯救世界，心里只想着保住自己。你也快来试试吧！",
    tags: ["道德绑架", "伪善共情", "自私伪光"],
    idealVector: { self: 42, cost: 78, stability: 52, control: 67, signal: 58 },
    dimensionWeights: { self: 0.95, cost: 1.4, stability: 0.9, control: 1.1, signal: 0.8 },
    flagWeights: { "protects-others": 2.8, "public-morality": 3, "group-vote": 2.2 }
  },
  {
    id: "cold-survivor",
    name: "冷血生存者",
    ogImage: "og/cold-survivor.png",
    tagline: "冰封末世降临，你只信奉生存法则。道德、共情、良知在体温与生机面前一文不值，10 个保温仓名额是你唯一的追求，为了活下去，你可以无视他人的绝望，舍弃所有情感牵绊。仅有7%的人测出同样的结果。",
    summary:
      "你不喜欢混乱，也不迷信牺牲。你很清楚，极寒里最没用的就是自我感动。你不是没有感情，只是会把感情锁到求生之后。",
    systemNote: "你没有多余的情绪波动，稳定得如同冰冷的机器，对系统真相毫无探究欲，控制欲仅停留在抢占生存资源，利己刻在骨子里，不评判对错，不纠结身份，只为在冰封里活下来，是最纯粹也最冷酷的求生机器。你不是冷血，你只是拒绝陪所有人一起死。",
    dangerPoint: "为了活下去，你可以无视他人的绝望，舍弃所有情感牵绊。",
    allurePoint: "到了真正的死局，你反而最可靠。",
    shareText: "系统说我能活到最后。你也来试试吧！",
    tags: ["漠视道义", "极致求生", "冷酷务实"],
    idealVector: { self: 95, cost: 32, stability: 93, control: 58, signal: 52 },
    dimensionWeights: { self: 1.45, cost: 1.1, stability: 1.35, control: 0.9, signal: 0.75 },
    flagWeights: { "self-preserve": 2.6, "hard-pragmatism": 2.5, "survival-first": 3 }
  },
  {
    id: "higher-observer",
    name: "高维观察者",
    ogImage: "og/higher-observer.png",
    tagline: "你不属于这场冰封浩劫，也不属于厕所里的绝境众生，你是跳出棋局的观测者。仅有0.05%的人测出同样的结果。",
    summary:
      "你不急着站队，也不轻易被情绪卷进去。你更在意谁在写规则、谁在剪辑叙事、谁在利用认知差制造选择。你不一定是局里最响的人，但往往是最后最接近真相的人。",
    systemNote: "别人忙着求生，你忙着给世界做注释。",
    dangerPoint: "人性的善恶拉扯、众人的身份探寻，于你而言只是一场沉浸式数据实验。",
    allurePoint: "你无求生欲，无利己心，道德于你毫无意义，情绪始终处于绝对平静的状态，对系统与冰封真相有着全景式的感知，总能捕捉别人忽略的关键证据。",
    shareText: "高维观察者不参与世俗纷争。快来试试你有没有这个觉悟吧！",
    tags: ["超然疏离", "冷眼俯瞰", "漠然旁观"],
    idealVector: { self: 48, cost: 64, stability: 82, control: 36, signal: 98 },
    dimensionWeights: { self: 0.8, cost: 1, stability: 1.1, control: 0.75, signal: 1.55 },
    flagWeights: { "trace-anomaly": 3, "seek-truth": 2.6, "timeline-audit": 2.5 }
  },
  {
    id: "emotion-parasite",
    name: "情绪寄生者",
    ogImage: "og/emotion-parasite.png",
    tagline: "你靠吸食他人的恐慌、贪婪、绝望、挣扎存活，情绪是你唯一的热源。别人的崩溃，会让你短暂地确认自己还清醒。仅有1.8%的人测出同样的结果。",
    summary:
      "你对情绪波动极其敏感，也极其依赖。你会安慰别人，也会靠近濒临失控的人，因为你从他们的反应里读取权力、弱点和入口。你不一定是故意的，但你的安全感往往建立在别人先失序。",
    systemNote: "你总能精准捕捉众人的情绪波动，在绝境中放大他人的焦虑与执念，保温仓名额的争夺越激烈，你获得的能量便越充足。",
    dangerPoint: "你会无意识放大场上的情绪张力。",
    allurePoint: "你利己却不争夺生存资源，道德感模糊，自身情绪随他人起伏而变化，对人性情绪的真相感知极强，如同依附在这场末世困局里的影子，靠众生的情绪共生。",
    shareText: "这测试也太有点扎心了。你也来试试吧！",
    tags: ["噬取情绪", "依附人心", "敏感易感"],
    idealVector: { self: 66, cost: 41, stability: 28, control: 55, signal: 74 },
    dimensionWeights: { self: 1.05, cost: 0.95, stability: 1.45, control: 1, signal: 1.15 },
    flagWeights: { "reads-people": 2.5, "chaos-feed": 2.8, volatile: 1.8 }
  },
  {
    id: "rule-breaker",
    name: "规则破坏者",
    ogImage: "og/rule-breaker.png",
    tagline: "既定的名额规则、冰封的末世秩序、系统设定的抉择剧本，在你面前通通无效。你不是不守规则，你是根本不信它配管你。仅有1.6%的人测出同样的结果。",
    summary:
      "你对任何现成秩序都带着天然怀疑。别人看到限制会绕开，你会想直接撞碎。你最强的不是叛逆，而是你对边界其实是被人写出来的这件事有极强直觉。",
    systemNote: "你随性而为，道德无固定标准，利己或利他全凭心意，情绪极不稳定，极易被触发叛逆心理，对系统规则的漏洞感知敏锐，控制欲体现在打破一切束缚，是这场冰封里最不守规矩、最易掀翻剧本的存在。",
    dangerPoint: "你有时会为了证明规则能碎，而忽略碎完之后谁来收场。",
    allurePoint: "所有绝路，都是被你这种人先撞出缺口。",
    shareText: "这破局，我掀定了！快来试试你的身份吧！",
    tags: ["叛逆反骨", "无视秩序", "破局失控"],
    idealVector: { self: 57, cost: 46, stability: 51, control: 78, signal: 89 },
    dimensionWeights: { self: 0.95, cost: 0.95, stability: 0.95, control: 1.25, signal: 1.35 },
    flagWeights: { "tests-boundary": 3, "break-narrative": 3, "hack-access": 2.8 }
  },
  {
    id: "silent-hunter",
    name: "沉默猎手",
    ogImage: "og/silent-hunter.png",
    tagline: "你话不多，但你一直在算。不争抢、不表态、不外露情绪，像潜伏的猎手般静静观察每一个人的抉择与弱点。仅有3%的人测出同样的结果。",
    summary:
      "你不爱暴露自己，也不喜欢把真实意图挂在脸上。你擅长观察节奏、记住漏洞、在关键时刻给出最省力却最致命的一步。你未必主动伤人，但很难放过显而易见的弱点。",
    systemNote: "10 个保温仓的猎物早已被你暗中锁定，你不参与无意义的博弈，只在最关键的时刻出手，精准收割生存资格。",
    dangerPoint: "你极致利己，道德底线极低，情绪稳定性拉满，对人性弱点与系统漏洞感知极强，控制欲藏在暗处。",
    allurePoint: "你有一种低存在感但高威胁感的魅力。不声不响便掌握绝境主动权，是低调却致命的生存猎手。",
    shareText: "不吵不闹，不抢不夺。等你们斗完，我再收走最后一个保温仓。你也来试试吧！",
    tags: ["蛰伏静待", "精准收割", "狠戾内敛"],
    idealVector: { self: 82, cost: 35, stability: 86, control: 62, signal: 83 },
    dimensionWeights: { self: 1.2, cost: 1, stability: 1.2, control: 1, signal: 1.15 },
    flagWeights: { "silent-watch": 2.8, "target-weakness": 2.8, "exploit-gap": 2.2 }
  },
  {
    id: "chosen-substitute",
    name: "被选中的替代体",
    ogImage: "og/chosen-substitute.png",
    tagline: "你的每一次选择都被无形的力量牵引，看似自主抉择，实则只是在走别人安排好的路，你是他人身份的替代者，是这场试炼里的工具人。仅有3%的人测出同样的结果。",
    summary:
      "你对规则没有绝对控制力，却总是被规则莫名选中。很多线索都在把你推向某个身份。你身上同时有无辜感和危险感，因为你可能连自己都不知道自己到底在替代谁。",
    systemNote: "你不是走进这场冰封，你是被送进来的。",
    dangerPoint: "你利己性薄弱，道德感模糊，情绪极易受他人影响，对系统真相感知迟钝。你越想证明自己普通，越像不普通。",
    allurePoint: "你天然带着剧情主角感。",
    shareText: "谁曾想我连身份都是假的。你也来试试吧！",
    tags: ["宿命傀儡", "无主自我", "被动盲从"],
    idealVector: { self: 46, cost: 69, stability: 39, control: 28, signal: 81 },
    dimensionWeights: { self: 0.9, cost: 1.1, stability: 1, control: 0.8, signal: 1.25 },
    flagWeights: { "identity-glitch": 3, "selected-feeling": 2.8, "memory-loss": 2.4 }
  },
  {
    id: "unstable-variable",
    name: "最不稳定变量",
    ogImage: "og/unstable-variable.png",
    tagline: "你是这场冰封困局里唯一无法被预判的存在，无人能定义你的身份，无人能掌控你的选择。你就是天选之子，系统对你无效。仅有0.0001%的人测出同样的结果。",
    summary:
      "你不是稳定的好，也不是稳定的坏。你会在某一刻极度冷静，下一刻忽然掀桌；会在某个瞬间柔软，在另一个瞬间对规则展现攻击性。你很难被建模，所以系统会把你视作风险源。",
    systemNote: "上一秒你可能为他人让出保温仓名额，下一秒便会为了生存不择手段；时而守序，时而疯狂，利己与利他、善良与冷酷全在一念之间。",
    dangerPoint: "你情绪极度不稳定，对系统真相的感知飘忽不定，控制欲时强时弱，没有固定的道德标尺。",
    allurePoint: "你会让所有自以为看透你的人翻车。",
    shareText: "别猜我，我自己都猜不到自己。下一秒，世界是冻是活，全看我心情。你也快来试试吧。",
    tags: ["混沌未知", "一念反转", "极致失控"],
    idealVector: { self: 55, cost: 50, stability: 20, control: 52, signal: 57 },
    dimensionWeights: { self: 1, cost: 1, stability: 1.6, control: 1, signal: 1 },
    flagWeights: { volatile: 3.2, contradiction: 2.8, "chaos-feed": 2.6 }
  }
];
