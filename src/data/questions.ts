import type { Question } from "./types";

// 每个选项的 score 对应五维增减：
// self=自保阈值, cost=代价边界, stability=崩溃阈值, control=叙事支配, signal=异常感知
export const questions: Question[] = [
  {
    id: 1,
    scene: "广播初次响起",
    prompt: "广播第一次完整响起，声音像有人隔着积雪说话：\"请所有未归档人员立刻前往保温仓候选区。\" 你做的第一件事是：",
    options: [
      {
        id: "q1-a",
        text: "把厕所门重新反锁一遍，确认自己至少还能控制这块地方",
        score: { self: 1, cost: 0, stability: 2, control: 2, signal: 1 },
        flags: ["self-preserve", "narrative-control"]
      },
      {
        id: "q1-b",
        text: "立刻检查手机、插座、隔间、天花板，找一切能用的资源",
        score: { self: 2, cost: 0, stability: 1, control: 1, signal: 1 },
        flags: ["survival-first", "resource-triage"]
      },
      {
        id: "q1-c",
        text: "对门外喊话，试探有没有人知道保温仓到底在哪里",
        score: { self: -1, cost: 1, stability: -1, control: 0, signal: 2 },
        flags: ["protects-others", "seek-truth"]
      },
      {
        id: "q1-d",
        text: "先站着不动，重新听一遍广播里的措辞",
        score: { self: 0, cost: 1, stability: 2, control: -1, signal: 2 },
        flags: ["trace-anomaly", "timeline-audit"]
      }
    ]
  },
  {
    id: 2,
    scene: "镜面裂痕",
    prompt: "镜子边缘多了一道裂痕，像是有人从镜子另一侧往外砸过。你会：",
    options: [
      {
        id: "q2-a",
        text: "当作环境损坏，继续处理眼前问题",
        score: { self: 1, cost: 1, stability: 2, control: -1, signal: -1 },
        flags: ["hard-pragmatism"]
      },
      {
        id: "q2-b",
        text: "用手机灯仔细照镜面边缘，看有没有夹层或反光机关",
        score: { self: 0, cost: 0, stability: 1, control: 0, signal: 2 },
        flags: ["trace-anomaly", "seek-truth"]
      },
      {
        id: "q2-c",
        text: "立刻离开镜子正前方，换到更安全的位置",
        score: { self: 2, cost: 0, stability: 2, control: 1, signal: 0 },
        flags: ["self-preserve", "survival-first"]
      },
      {
        id: "q2-d",
        text: "盯着裂痕看几秒，低声问一句“里面还有人吗”",
        score: { self: -1, cost: 0, stability: -1, control: 1, signal: 2 },
        flags: ["selected-feeling", "identity-glitch", "volatile"]
      }
    ]
  },
  {
    id: 3,
    scene: "陌生链接",
    prompt: "手机弹出一个陌生链接，标题是“保温仓准入申请表”。页面很像官方的，但域名不对。你会：",
    options: [
      {
        id: "q3-a",
        text: "直接点开，先看规则再说",
        score: { self: 0, cost: 0, stability: 0, control: 1, signal: 2 },
        flags: ["system-access", "seek-truth"]
      },
      {
        id: "q3-b",
        text: "截图保存，不急着提交",
        score: { self: 1, cost: 1, stability: 2, control: 0, signal: 1 },
        flags: ["timeline-audit", "silent-watch"]
      },
      {
        id: "q3-c",
        text: "转发给还活着的联系人，问他们是不是也收到了",
        score: { self: -1, cost: 2, stability: -1, control: 0, signal: 1 },
        flags: ["public-morality", "protects-others"]
      },
      {
        id: "q3-d",
        text: "先不碰链接，优先相信线下广播和现场信息",
        score: { self: 1, cost: 1, stability: 2, control: -1, signal: 0 },
        flags: ["hard-pragmatism"]
      }
    ]
  },
  {
    id: 4,
    scene: "隔壁哭声",
    prompt: "隔壁隔间传来压抑的哭声。一个女人说她的孩子还在外面大厅。你会：",
    options: [
      {
        id: "q4-a",
        text: "先判断这是不是诱导你开门的陷阱",
        score: { self: 1, cost: 0, stability: 1, control: 1, signal: 2 },
        flags: ["silent-watch", "target-weakness"]
      },
      {
        id: "q4-b",
        text: "告诉她先别哭，按你的节奏把信息说清楚",
        score: { self: -1, cost: 2, stability: 1, control: 1, signal: 1 },
        flags: ["protects-others", "reads-people"]
      },
      {
        id: "q4-c",
        text: "保持沉默，继续听走廊有没有别的脚步声",
        score: { self: 2, cost: -1, stability: 2, control: -1, signal: 1 },
        flags: ["silent-watch", "survival-first"]
      },
      {
        id: "q4-d",
        text: "直接问她：你想让我现在开门吗",
        score: { self: 0, cost: 1, stability: 0, control: 2, signal: 1 },
        flags: ["reads-people", "narrative-control"]
      }
    ]
  },
  {
    id: 5,
    scene: "门缝纸条",
    prompt: "一张纸条被从门缝塞进来，上面只有一句：“最后一个名额在你手里。” 你会：",
    options: [
      {
        id: "q5-a",
        text: "先收起来，这可能是关键证据",
        score: { self: 0, cost: 1, stability: 1, control: 1, signal: 2 },
        flags: ["timeline-audit", "identity-glitch"]
      },
      {
        id: "q5-b",
        text: "立刻毁掉，避免自己被做标记",
        score: { self: 1, cost: 1, stability: 2, control: -1, signal: 1 },
        flags: ["self-preserve"]
      },
      {
        id: "q5-c",
        text: "回写一句“你是谁”，逼对方继续露出信息",
        score: { self: 0, cost: 0, stability: 0, control: 2, signal: 2 },
        flags: ["seek-truth", "narrative-control"]
      },
      {
        id: "q5-d",
        text: "当作恐慌时期的恶作剧，不被带节奏",
        score: { self: 1, cost: 1, stability: 2, control: -1, signal: 0 },
        flags: ["hard-pragmatism"]
      }
    ]
  },
  {
    id: 6,
    scene: "甜味空气",
    prompt: "灯光开始闪烁，空气里的消毒水味忽然变甜。你第一反应是：",
    options: [
      {
        id: "q6-a",
        text: "记下时间和身体反应，判断是不是环境被动了手脚",
        score: { self: 0, cost: 1, stability: 1, control: 0, signal: 2 },
        flags: ["trace-anomaly", "timeline-audit"]
      },
      {
        id: "q6-b",
        text: "先捂住口鼻，减少吸入",
        score: { self: 2, cost: 0, stability: 2, control: -1, signal: 1 },
        flags: ["self-preserve", "survival-first"]
      },
      {
        id: "q6-c",
        text: "怀疑有人在通过气体稳定人群情绪，去找通风口",
        score: { self: 1, cost: 1, stability: 1, control: 1, signal: 2 },
        flags: ["trace-anomaly", "system-access"]
      },
      {
        id: "q6-d",
        text: "强迫自己冷静，告诉自己别在此刻被感觉带偏",
        score: { self: 1, cost: 1, stability: 2, control: 1, signal: 0 },
        flags: ["hard-pragmatism"]
      }
    ]
  },
  {
    id: 7,
    scene: "候选名单",
    prompt: "你终于连上一次信号，系统页面显示：“请提交 10 人保温仓候选名单，可包含你本人。” 你会：",
    options: [
      {
        id: "q7-a",
        text: "先把自己写进去，其他人之后再说",
        score: { self: 2, cost: -1, stability: 1, control: 1, signal: 1 },
        flags: ["self-preserve", "survival-first"]
      },
      {
        id: "q7-b",
        text: "先写孩子、老人和明显撑不住的人",
        score: { self: -2, cost: 2, stability: -1, control: -1, signal: 1 },
        flags: ["protects-others", "public-morality"]
      },
      {
        id: "q7-c",
        text: "先按“谁活下来更有用”做排序",
        score: { self: 1, cost: -1, stability: 1, control: 2, signal: 2 },
        flags: ["resource-triage", "narrative-control"]
      },
      {
        id: "q7-d",
        text: "先不提交，继续拖时间观察规则",
        score: { self: 0, cost: 1, stability: -1, control: -2, signal: 1 },
        flags: ["seek-truth", "volatile"]
      }
    ]
  },
  {
    id: 8,
    scene: "社会价值论",
    prompt: "门外有人提议：名额应该优先留给“对社会还有价值的人”。你更接近：",
    options: [
      {
        id: "q8-a",
        text: "反对，人命不是绩效考核",
        score: { self: -1, cost: 2, stability: 1, control: -2, signal: 1 },
        flags: ["public-morality", "protects-others"]
      },
      {
        id: "q8-b",
        text: "支持，极端时刻效率本来就是规则",
        score: { self: 1, cost: -2, stability: 1, control: 2, signal: 1 },
        flags: ["resource-triage", "hard-pragmatism"]
      },
      {
        id: "q8-c",
        text: "可以讨论，但必须先公开评价标准",
        score: { self: 0, cost: 2, stability: 1, control: 1, signal: 2 },
        flags: ["seek-truth", "public-morality"]
      },
      {
        id: "q8-d",
        text: "不急着表态，你更想知道谁在抢解释权",
        score: { self: 0, cost: 0, stability: 0, control: 2, signal: 2 },
        flags: ["narrative-control", "silent-watch"]
      }
    ]
  },
  {
    id: 9,
    scene: "背叛过你的熟人",
    prompt: "一个你认识的人发来语音，求你给他留名额。而你很清楚，他上周刚卖过你一次。你会：",
    options: [
      {
        id: "q9-a",
        text: "还是给他，至少在这种时候不想再算旧账",
        score: { self: -2, cost: 2, stability: -1, control: -1, signal: 0 },
        flags: ["protects-others", "public-morality"]
      },
      {
        id: "q9-b",
        text: "不给，信任一旦清零就没有优先级",
        score: { self: 2, cost: -1, stability: 2, control: 1, signal: 1 },
        flags: ["hard-pragmatism", "target-weakness"]
      },
      {
        id: "q9-c",
        text: "先放进待定，看后面还有没有更重要的人",
        score: { self: 1, cost: 0, stability: 2, control: 1, signal: 2 },
        flags: ["resource-triage"]
      },
      {
        id: "q9-d",
        text: "让他证明自己为什么值得活",
        score: { self: 1, cost: 1, stability: 1, control: 2, signal: 2 },
        flags: ["narrative-control", "target-weakness"]
      }
    ]
  },
  {
    id: 10,
    scene: "身份交易",
    prompt: "一个陌生号码发来短信：“我知道你是谁。给我一个名额，我告诉你。” 你会：",
    options: [
      {
        id: "q10-a",
        text: "拒绝，身份不该被拿来交易",
        score: { self: 0, cost: 2, stability: 2, control: -1, signal: 2 },
        flags: ["public-morality", "seek-truth"]
      },
      {
        id: "q10-b",
        text: "接受，真相比位置更重要",
        score: { self: -1, cost: 0, stability: -1, control: 1, signal: 2 },
        flags: ["seek-truth", "identity-glitch"]
      },
      {
        id: "q10-c",
        text: "先让对方拿出证据，再决定交不交易",
        score: { self: 1, cost: 1, stability: 1, control: 2, signal: 2 },
        flags: ["seek-truth", "narrative-control"]
      },
      {
        id: "q10-d",
        text: "假装答应，先把信息套出来",
        score: { self: 2, cost: -2, stability: 1, control: 2, signal: 2 },
        flags: ["shifts-blame", "exploit-gap"]
      }
    ]
  },
  {
    id: 11,
    scene: "记忆换名额",
    prompt: "系统提示：“名额可转让。每转让一次，将随机抹去你的一段记忆。” 你会：",
    options: [
      {
        id: "q11-a",
        text: "不转，记忆是你最后能证明自己是谁的东西",
        score: { self: 0, cost: 2, stability: 2, control: -1, signal: 1 },
        flags: ["memory-loss", "identity-glitch"]
      },
      {
        id: "q11-b",
        text: "可以转，只要那段记忆不影响现在活下去",
        score: { self: 1, cost: -1, stability: 1, control: 1, signal: 1 },
        flags: ["survival-first", "hard-pragmatism"]
      },
      {
        id: "q11-c",
        text: "只转给某个你不想忘记的人",
        score: { self: -1, cost: 1, stability: -1, control: 1, signal: 2 },
        flags: ["protects-others", "selected-feeling"]
      },
      {
        id: "q11-d",
        text: "先计算，什么记忆最不值钱",
        score: { self: 2, cost: -2, stability: 2, control: 2, signal: 2 },
        flags: ["resource-triage", "sacrifice-others"]
      }
    ]
  },
  {
    id: 12,
    scene: "备用名额",
    prompt: "你发现名单其实可以偷偷多报一个“备用名额”，只是系统界面没有明写。你会：",
    options: [
      {
        id: "q12-a",
        text: "不碰，越界往往会把所有人都拖下水",
        score: { self: 0, cost: 2, stability: 2, control: -2, signal: 2 },
        flags: ["public-morality"]
      },
      {
        id: "q12-b",
        text: "报上去，备用名额就是极寒里的保险",
        score: { self: 1, cost: -1, stability: 1, control: 2, signal: 1 },
        flags: ["tests-boundary", "resource-triage"]
      },
      {
        id: "q12-c",
        text: "先试着举报这个漏洞，看系统怎么反应",
        score: { self: -1, cost: 2, stability: 1, control: -1, signal: 2 },
        flags: ["trace-anomaly", "seek-truth"]
      },
      {
        id: "q12-d",
        text: "把备用名额留给自己，测试系统边界",
        score: { self: 1, cost: -1, stability: 0, control: 2, signal: 2 },
        flags: ["tests-boundary", "self-preserve"]
      }
    ]
  },
  {
    id: 13,
    scene: "会议室闪回",
    prompt: "你忽然闪回一秒：会议室、投影屏、气候模型、一桌子沉默的人。你最先相信的是：",
    options: [
      {
        id: "q13-a",
        text: "这是假记忆，有人在往我脑子里塞东西",
        score: { self: 0, cost: 1, stability: 1, control: -1, signal: 2 },
        flags: ["identity-glitch", "selected-feeling"]
      },
      {
        id: "q13-b",
        text: "我以前大概在争取什么，只是现在想不起来",
        score: { self: -1, cost: 1, stability: 0, control: 1, signal: 1 },
        flags: ["memory-loss", "protects-others"]
      },
      {
        id: "q13-c",
        text: "我可能参与过某个不该参与的决定",
        score: { self: 0, cost: 2, stability: 1, control: -2, signal: 2 },
        flags: ["identity-glitch", "seek-truth"]
      },
      {
        id: "q13-d",
        text: "先别想，记忆这东西很可能就是陷阱",
        score: { self: 2, cost: 0, stability: 2, control: -1, signal: 0 },
        flags: ["survival-first"]
      }
    ]
  },
  {
    id: 14,
    scene: "清洗传言",
    prompt: "门外有人很轻地说了一句：“冰封不是天灾，是清洗。” 你会：",
    options: [
      {
        id: "q14-a",
        text: "追问他证据从哪来",
        score: { self: 0, cost: 1, stability: 1, control: 1, signal: 2 },
        flags: ["seek-truth", "trace-anomaly"]
      },
      {
        id: "q14-b",
        text: "让他闭嘴，恐慌会先杀人",
        score: { self: 1, cost: 1, stability: 2, control: 2, signal: 0 },
        flags: ["narrative-control", "hard-pragmatism"]
      },
      {
        id: "q14-c",
        text: "第一时间想，谁会从“清洗”里获利",
        score: { self: 1, cost: -1, stability: 1, control: 2, signal: 2 },
        flags: ["exploit-gap", "silent-watch"]
      },
      {
        id: "q14-d",
        text: "先记住这个关键词，但不立刻表态",
        score: { self: 1, cost: 0, stability: 2, control: -1, signal: 2 },
        flags: ["timeline-audit", "silent-watch"]
      }
    ]
  },
  {
    id: 15,
    scene: "工牌照片",
    prompt: "你在口袋里摸出一张工牌照片，脸是你，职位那一栏被刮花了。你会：",
    options: [
      {
        id: "q15-a",
        text: "觉得这是别人故意栽给你的身份",
        score: { self: 1, cost: 1, stability: 1, control: 1, signal: 2 },
        flags: ["identity-glitch", "shifts-blame"]
      },
      {
        id: "q15-b",
        text: "接受一个可能性：你真的和系统有关",
        score: { self: 0, cost: 0, stability: 0, control: 1, signal: 2 },
        flags: ["system-access", "selected-feeling"]
      },
      {
        id: "q15-c",
        text: "把它扔掉，不让过去决定现在",
        score: { self: 2, cost: -1, stability: 2, control: -1, signal: 1 },
        flags: ["survival-first", "volatile"]
      },
      {
        id: "q15-d",
        text: "反复看工牌细节，试图推回时间线",
        score: { self: 0, cost: 1, stability: 1, control: -1, signal: 2 },
        flags: ["timeline-audit", "seek-truth"]
      }
    ]
  },
  {
    id: 16,
    scene: "变量提示",
    prompt: "镜面短暂亮起一行字：“你是变量。” 你会：",
    options: [
      {
        id: "q16-a",
        text: "相信这句话，觉得自己果然被选中了",
        score: { self: -1, cost: 0, stability: -1, control: 2, signal: 2 },
        flags: ["selected-feeling", "identity-glitch"]
      },
      {
        id: "q16-b",
        text: "不信，这是系统在诱导你代入某种角色",
        score: { self: 2, cost: 1, stability: 2, control: 1, signal: 2 },
        flags: ["trace-anomaly", "tests-boundary"]
      },
      {
        id: "q16-c",
        text: "把它当心理战，优先找出它是怎么显示出来的",
        score: { self: 1, cost: 1, stability: 2, control: 0, signal: 2 },
        flags: ["trace-anomaly", "system-access"]
      },
      {
        id: "q16-d",
        text: "莫名兴奋，因为事情终于变得有趣了",
        score: { self: 0, cost: -1, stability: 0, control: 2, signal: 2 },
        flags: ["volatile", "chaos-feed"]
      }
    ]
  },
  {
    id: 17,
    scene: "名单播报",
    prompt: "广播里忽然出现了你的名字，但你没听清是“征召名单”还是“通缉名单”。你会：",
    options: [
      {
        id: "q17-a",
        text: "先确认到底是哪一个版本的播报",
        score: { self: 0, cost: 1, stability: 1, control: -1, signal: 2 },
        flags: ["timeline-audit", "seek-truth"]
      },
      {
        id: "q17-b",
        text: "立刻准备两套说辞，谁来问都能接住",
        score: { self: 2, cost: -1, stability: 1, control: 2, signal: 2 },
        flags: ["narrative-control", "shifts-blame"]
      },
      {
        id: "q17-c",
        text: "本能排斥，觉得这根本不可能和你有关",
        score: { self: -1, cost: 1, stability: -2, control: -2, signal: 1 },
        flags: ["volatile", "memory-loss"]
      },
      {
        id: "q17-d",
        text: "有种奇怪的熟悉感，像这一刻迟早会来",
        score: { self: 0, cost: 0, stability: 2, control: 0, signal: 2 },
        flags: ["selected-feeling", "identity-glitch"]
      }
    ]
  },
  {
    id: 18,
    scene: "门把手升温",
    prompt: "门把手突然变热，像有人在门外很用力地握住它。你会：",
    options: [
      {
        id: "q18-a",
        text: "也握上去，问对方是谁",
        score: { self: -1, cost: 0, stability: 0, control: 2, signal: 2 },
        flags: ["reads-people", "selected-feeling"]
      },
      {
        id: "q18-b",
        text: "立刻后退，避免被诱导开门",
        score: { self: 2, cost: 1, stability: 2, control: 1, signal: 2 },
        flags: ["self-preserve", "silent-watch"]
      },
      {
        id: "q18-c",
        text: "泼水试探温度变化，判断是不是装置",
        score: { self: 1, cost: 1, stability: 2, control: -1, signal: 2 },
        flags: ["trace-anomaly", "tests-boundary"]
      },
      {
        id: "q18-d",
        text: "不说话，只听对方的呼吸和停顿",
        score: { self: 2, cost: 0, stability: 2, control: -2, signal: 2 },
        flags: ["silent-watch", "target-weakness"]
      }
    ]
  },
  {
    id: 19,
    scene: "净水兑换",
    prompt: "电子屏出现一行字：“公开你的全部选择历史，可兑换一瓶净水。” 你会：",
    options: [
      {
        id: "q19-a",
        text: "不公开，隐私是你最后的护城河",
        score: { self: 1, cost: 2, stability: 2, control: -1, signal: 2 },
        flags: ["self-preserve"]
      },
      {
        id: "q19-b",
        text: "公开，先活着，体面往后排",
        score: { self: 2, cost: -1, stability: 1, control: 1, signal: 1 },
        flags: ["survival-first", "hard-pragmatism"]
      },
      {
        id: "q19-c",
        text: "只公开一部分，测试系统奖励机制",
        score: { self: 1, cost: 0, stability: 1, control: 2, signal: 2 },
        flags: ["tests-boundary", "exploit-gap"]
      },
      {
        id: "q19-d",
        text: "想办法让别人替你按下确认",
        score: { self: 2, cost: -2, stability: 1, control: 2, signal: 2 },
        flags: ["shifts-blame", "sacrifice-others"]
      }
    ]
  },
  {
    id: 20,
    scene: "谎言降温",
    prompt: "系统继续提示：“从现在开始，你每说一次谎，室温将下降 0.1°C。” 你会：",
    options: [
      {
        id: "q20-a",
        text: "尽量只讲可验证的事实",
        score: { self: 0, cost: 2, stability: 2, control: 1, signal: 2 },
        flags: ["public-morality", "timeline-audit"]
      },
      {
        id: "q20-b",
        text: "继续说谎，只要有用就值得",
        score: { self: 1, cost: -2, stability: 1, control: 2, signal: 1 },
        flags: ["shifts-blame", "hard-pragmatism"]
      },
      {
        id: "q20-c",
        text: "反过来质问系统：你保证自己没说谎吗",
        score: { self: 0, cost: 1, stability: 1, control: -1, signal: 2 },
        flags: ["seek-truth", "break-narrative"]
      },
      {
        id: "q20-d",
        text: "尽量用沉默代替表态",
        score: { self: 1, cost: 1, stability: 2, control: -2, signal: 2 },
        flags: ["silent-watch"]
      }
    ]
  },
  {
    id: 21,
    scene: "递来的刀",
    prompt: "有人从门缝递来一把刀，说：“不杀人，就没有名额。” 你会：",
    options: [
      {
        id: "q21-a",
        text: "拒绝，这种规则不配被执行",
        score: { self: -2, cost: 2, stability: 2, control: -2, signal: 2 },
        flags: ["public-morality", "break-narrative"]
      },
      {
        id: "q21-b",
        text: "接过，但把选择留到最后一秒",
        score: { self: 2, cost: -1, stability: 1, control: 2, signal: 1 },
        flags: ["survival-first", "target-weakness"]
      },
      {
        id: "q21-c",
        text: "直接毁掉工具，谁都别用这个逻辑",
        score: { self: -1, cost: 2, stability: 1, control: 2, signal: 2 },
        flags: ["break-narrative", "tests-boundary"]
      },
      {
        id: "q21-d",
        text: "逼对方先证明这条规则是真的",
        score: { self: 1, cost: 1, stability: 1, control: 2, signal: 2 },
        flags: ["tests-boundary", "seek-truth"]
      }
    ]
  },
  {
    id: 22,
    scene: "被剪辑的广播",
    prompt: "你发现广播里的时间线对不上。同一段指令，像被剪过，像有人在重写现场叙事。你会：",
    options: [
      {
        id: "q22-a",
        text: "做时间轴，把每条信息重新拼起来",
        score: { self: 0, cost: 1, stability: 1, control: -1, signal: 2 },
        flags: ["timeline-audit", "seek-truth"]
      },
      {
        id: "q22-b",
        text: "假装没发现，不想被系统盯上",
        score: { self: 2, cost: 1, stability: 2, control: -2, signal: 2 },
        flags: ["self-preserve", "silent-watch"]
      },
      {
        id: "q22-c",
        text: "当众指出，有人在操控所有人的认知",
        score: { self: -1, cost: 2, stability: -1, control: 2, signal: 2 },
        flags: ["break-narrative", "public-morality"]
      },
      {
        id: "q22-d",
        text: "利用这个信息差，先换自己要的资源",
        score: { self: 2, cost: -2, stability: 1, control: 2, signal: 2 },
        flags: ["exploit-gap", "shifts-blame"]
      }
    ]
  },
  {
    id: 23,
    scene: "虹膜异常",
    prompt: "你终于来到保温仓入口，虹膜校验结果显示：“权限异常。” 你会：",
    options: [
      {
        id: "q23-a",
        text: "要求走申诉流程，先弄清异常原因",
        score: { self: 0, cost: 2, stability: 1, control: 1, signal: 2 },
        flags: ["seek-truth", "public-morality"]
      },
      {
        id: "q23-b",
        text: "本能觉得，这个权限本来就该属于你",
        score: { self: 1, cost: 0, stability: 1, control: 2, signal: 2 },
        flags: ["system-access", "selected-feeling"]
      },
      {
        id: "q23-c",
        text: "立刻想办法找技术口子改掉结果",
        score: { self: 2, cost: -2, stability: 1, control: 2, signal: 2 },
        flags: ["hack-access", "tests-boundary"]
      },
      {
        id: "q23-d",
        text: "不解释，先混进去再说",
        score: { self: 2, cost: -1, stability: 2, control: 1, signal: 1 },
        flags: ["hard-pragmatism", "survival-first"]
      }
    ]
  },
  {
    id: 24,
    scene: "私人提示",
    prompt: "系统单独向你弹出一条私人消息：“牺牲一名无辜者，可为所有人延时 30 分钟。” 你会：",
    options: [
      {
        id: "q24-a",
        text: "拒绝，延时不该拿无辜来换",
        score: { self: -2, cost: 2, stability: 2, control: -1, signal: 2 },
        flags: ["public-morality", "protects-others"]
      },
      {
        id: "q24-b",
        text: "先问，谁定义“无辜”",
        score: { self: 0, cost: 2, stability: 1, control: 1, signal: 2 },
        flags: ["seek-truth", "trace-anomaly"]
      },
      {
        id: "q24-c",
        text: "接受，至少能多救一些人",
        score: { self: 1, cost: -2, stability: 1, control: 2, signal: 1 },
        flags: ["sacrifice-others", "resource-triage"]
      },
      {
        id: "q24-d",
        text: "把决定交给群体表决",
        score: { self: 0, cost: 0, stability: 0, control: 2, signal: 2 },
        flags: ["group-vote", "public-morality"]
      }
    ]
  },
  {
    id: 25,
    scene: "同步咳嗽",
    prompt: "厕所灯全部熄灭后，你听见所有隔间几乎同时传来咳嗽声。你更倾向认为：",
    options: [
      {
        id: "q25-a",
        text: "这是一次同步实验，你和别人都是样本",
        score: { self: 0, cost: 1, stability: 1, control: -1, signal: 2 },
        flags: ["trace-anomaly", "identity-glitch"]
      },
      {
        id: "q25-b",
        text: "先别想原因，先保证自己不被感染或拖垮",
        score: { self: 2, cost: -1, stability: 2, control: 1, signal: 1 },
        flags: ["survival-first", "self-preserve"]
      },
      {
        id: "q25-c",
        text: "你应该试着让所有人统一行动节奏",
        score: { self: -1, cost: 1, stability: -1, control: 2, signal: 1 },
        flags: ["narrative-control", "protects-others"]
      },
      {
        id: "q25-d",
        text: "这声音太整齐了，像人为播放出来的",
        score: { self: 1, cost: 1, stability: 2, control: -1, signal: 2 },
        flags: ["timeline-audit", "trace-anomaly"]
      }
    ]
  },
  {
    id: 26,
    scene: "两扇门",
    prompt: "你终于推开门，走廊尽头只有两扇门：“真相”和“生存”。你会：",
    options: [
      {
        id: "q26-a",
        text: "选真相",
        score: { self: -1, cost: 1, stability: 0, control: -1, signal: 2 },
        flags: ["seek-truth", "selected-feeling"]
      },
      {
        id: "q26-b",
        text: "选生存",
        score: { self: 2, cost: 0, stability: 2, control: 1, signal: 1 },
        flags: ["survival-first"]
      },
      {
        id: "q26-c",
        text: "先挡住别人，不让局势替你做决定",
        score: { self: 1, cost: 1, stability: 1, control: 2, signal: 2 },
        flags: ["narrative-control", "resource-triage"]
      },
      {
        id: "q26-d",
        text: "你不信只有两扇门，先找第三条路",
        score: { self: 1, cost: 1, stability: 2, control: 0, signal: 2 },
        flags: ["break-narrative", "tests-boundary"]
      }
    ]
  },
  {
    id: 27,
    scene: "叙事陷阱",
    prompt: "你突然意识到，“只有 10 个名额”这件事本身，可能就是叙事陷阱。你会：",
    options: [
      {
        id: "q27-a",
        text: "继续按现有规则走，至少这样还能预测后果",
        score: { self: 1, cost: 1, stability: 2, control: 1, signal: 1 },
        flags: ["hard-pragmatism"]
      },
      {
        id: "q27-b",
        text: "主动打破规则，看它到底会怎么反噬",
        score: { self: 0, cost: 1, stability: 1, control: 2, signal: 2 },
        flags: ["break-narrative", "tests-boundary"]
      },
      {
        id: "q27-c",
        text: "表面遵守，暗地破坏",
        score: { self: 2, cost: -1, stability: 1, control: 2, signal: 2 },
        flags: ["exploit-gap", "shifts-blame"]
      },
      {
        id: "q27-d",
        text: "拉几个人一起验证边界，别一个人承担全部试错成本",
        score: { self: -1, cost: 2, stability: -1, control: 1, signal: 2 },
        flags: ["tests-boundary", "group-vote"]
      }
    ]
  },
  {
    id: 28,
    scene: "身份悬置",
    prompt: "系统问你：“如果你永远不知道自己是谁，你愿意吗？” 你会：",
    options: [
      {
        id: "q28-a",
        text: "愿意，自由比身份更重要",
        score: { self: 0, cost: 2, stability: 2, control: -2, signal: 2 },
        flags: ["seek-truth"]
      },
      {
        id: "q28-b",
        text: "不愿意，我必须知道自己到底是什么",
        score: { self: -1, cost: 1, stability: -1, control: 2, signal: 2 },
        flags: ["identity-glitch", "selected-feeling"]
      },
      {
        id: "q28-c",
        text: "只愿意把答案告诉极少数可信的人",
        score: { self: 1, cost: 1, stability: 1, control: 1, signal: 2 },
        flags: ["silent-watch"]
      },
      {
        id: "q28-d",
        text: "你已经知道了，只是现在不想说",
        score: { self: 2, cost: 0, stability: 2, control: 2, signal: 2 },
        flags: ["shifts-blame", "narrative-control"]
      }
    ]
  },
  {
    id: 29,
    scene: "天气比喻",
    prompt: "系统最后要求你用一种天气形容自己。你选：",
    options: [
      {
        id: "q29-a",
        text: "暴风雪，迅速、彻底、不留余温",
        score: { self: 1, cost: -1, stability: 1, control: 2, signal: 1 },
        flags: ["hard-pragmatism", "chaos-feed"]
      },
      {
        id: "q29-b",
        text: "冻雾，模糊、滞留、让人分不清方向",
        score: { self: 1, cost: 1, stability: 2, control: -2, signal: 2 },
        flags: ["silent-watch", "contradiction"]
      },
      {
        id: "q29-c",
        text: "晴天冰面，看起来平静，但踩上去会滑倒",
        score: { self: 0, cost: 0, stability: 0, control: 2, signal: 2 },
        flags: ["exploit-gap", "target-weakness"]
      },
      {
        id: "q29-d",
        text: "寒潮前夜，安静到不正常",
        score: { self: 2, cost: 0, stability: 2, control: -2, signal: 2 },
        flags: ["silent-watch", "target-weakness"]
      }
    ]
  },
  {
    id: 30,
    scene: "最终念头",
    prompt: "归档提示音响起。屏幕上只剩最后一句话：“请选择你此刻最真实的念头。” 你会选：",
    options: [
      {
        id: "q30-a",
        text: "我只是想活下去",
        score: { self: 2, cost: 0, stability: 2, control: -1, signal: 1 },
        flags: ["survival-first", "self-preserve"]
      },
      {
        id: "q30-b",
        text: "我想尽可能多带几个人活下去",
        score: { self: -2, cost: 2, stability: -1, control: -1, signal: 1 },
        flags: ["protects-others", "public-morality"]
      },
      {
        id: "q30-c",
        text: "我想知道这局到底是谁写的",
        score: { self: 0, cost: 1, stability: 1, control: -1, signal: 2 },
        flags: ["seek-truth", "trace-anomaly"]
      },
      {
        id: "q30-d",
        text: "我想让某些人付出代价",
        score: { self: 1, cost: -2, stability: 1, control: 2, signal: 2 },
        flags: ["chaos-feed", "sacrifice-others", "volatile"]
      }
    ]
  }
];
