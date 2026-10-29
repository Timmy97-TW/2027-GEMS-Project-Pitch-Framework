/* =============================================================================
   The anatomy of a pitch
   -----------------------------------------------------------------------------
   Fifteen pages of a committed proposal, drawn as the document they are. Each
   page carries four things, and the third is the one students come here for:

     ask    what this page has to answer
     depth  how much research it takes before the page can be written — in
            countable units, because "do enough reading" is not an instruction
     had    what ReLEAF actually put on that page in 2026, with its numbers
     after  whether that turned out to be enough

   `state`: ok    the page did its job
            thin  written, and not deep enough — the season paid for it
            none  never written at all
   ========================================================================== */
(function () {
  'use strict';

  var PHASES = [
    { id: 1, zh: '值得做',   en: 'Worth doing', c: '#3f5468' },
    { id: 2, zh: '前人與新意', en: 'Prior art and increment', c: '#8a5a0b' },
    { id: 3, zh: '做得到',   en: 'Can we do it', c: '#23684a' },
    { id: 4, zh: '範圍與收割', en: 'Scope and harvest', c: '#7a3b67' }
  ];

  var PAGES = [
    {
      n: 1, ph: 1, gate: 'G1', type: 'hero', state: 'ok',
      zh: '願景', en: 'The vision',
      unit: { zh: '1 句話 · 2 個佐證數字', en: '1 sentence · 2 supporting numbers' },
      ask: {
        zh: '為什麼這件事值得做？用 25 字講給一位只給你兩分鐘的評審聽。',
        en: 'Why is this worth doing? In 25 words, to a judge who is giving you two minutes.'
      },
      depth: {
        zh: '一個具體的使用者，不是一個族群。一個場景。一句任何人聽完都能複述的話。另外至少兩個佐證數字，每個都找得到來源——評審會查其中一個。',
        en: 'One specific user, not a demographic. One scene. One sentence anyone can repeat back. Plus at least two supporting numbers, each traceable to a source — a judge will check one of them.'
      },
      had: {
        zh: '「把生產移到農場：密閉反應器在作物需要的那一天現做植物保護蛋白，工程菌留在膜的這一側。」佐證：台灣自 1991 年起每十年升溫 0.29 °C；99.2% 的農場小於 2 公頃，耕作 85.3% 的農地。',
        en: '"Manufacturing moved to the farm: a contained reactor makes a plant protectant on the day the crop needs it, with the cells kept behind the membrane." Supported by: Taiwan warming 0.29 °C per decade since 1991; 99.2% of farms under 2 ha, working 85.3% of the farmland.'
      },
      after: {
        zh: '整季所有對外敘述都從這一句長出來：首頁、簡報第一頁、五分鐘影片的第一句話彼此一致。這是最便宜也最常被跳過的一頁。',
        en: 'Everything outward-facing grew from this one sentence, and the homepage, the first slide and the first line of the five-minute video all agreed. It is the cheapest page to write and the one most often skipped.'
      }
    },
    {
      n: 2, ph: 1, gate: 'G3', type: 'text', state: 'ok',
      zh: '問題與受益者', en: 'The problem and who it falls on',
      unit: { zh: '1 位真實使用者 · 2 個具體缺口', en: '1 real user · 2 concrete gaps' },
      ask: {
        zh: '誰遇到這個問題？他們現在怎麼處理？現有做法的缺口是什麼？',
        en: 'Who has this problem, how do they handle it today, and where does that fall short?'
      },
      depth: {
        zh: '至少一次和真正使用者的對話，不能全是教授——教授會告訴你實驗怎麼做，不會告訴你誰願意付錢。現有方案的缺口要具體：價格、時效、保存條件、操作門檻，四項裡講得出兩項。',
        en: 'At least one conversation with a real user; they cannot all be professors — professors tell you how to run the experiment, not who will pay. The gap in today’s answer has to be concrete: price, speed, storage, or skill needed. Name two of the four.'
      },
      had: {
        zh: '小農買的生物製劑需要冷鏈、會失活，而且必須在知道要不要用之前就先買。這個問題第一次被外部確認，是 2 月 1 日和迦納一家社會企業的對話——對方從自己採購的小農身上看到氣候不穩的影響。',
        en: 'The biologicals smallholders buy need a cold chain, lose activity, and have to be bought before you know whether you need them. The problem was first confirmed from outside on 1 February, in a conversation with a social enterprise in Ghana who saw the instability in the smallholders they buy from.'
      },
      after: {
        zh: '兌現。而且那一次對話還決定了商業模式：走社會企業，不走公司。一場對話同時驗證問題又改掉設計，這就是整合式人文實踐要的東西。',
        en: 'Kept — and that conversation also settled the business model as a social enterprise rather than a company. One conversation that both validated the problem and changed the design is exactly what integrated human practices is asking for.'
      }
    },
    {
      n: 3, ph: 1, gate: 'G3', type: 'list', state: 'ok',
      zh: '落地階梯', en: 'The deployability ladder',
      unit: { zh: '5 階 · 標出十月站哪一階', en: '5 rungs · October’s rung marked' },
      ask: {
        zh: '我們十月交出的是第幾階？下一階是誰的工作，卡在什麼？',
        en: 'Which rung do we hand over in October? Whose job is the next one, and what blocks it?'
      },
      depth: {
        zh: '五階都要寫出來：實驗台 → 密閉原型 → 使用者現場試用 → 田間試驗 → 法規與量產。不在這一季的那幾階，要寫出卡在什麼（許可、作期長度、資金），而不是略過。誠實標出位置比宣稱走到第四階更得分。',
        en: 'Write all five: bench → contained prototype → user trial on site → field trial → regulation and manufacture. For the rungs outside this season, say what blocks them — a permit, the length of a growing cycle, money — instead of passing over them. Marking your rung honestly scores better than claiming rung four.'
      },
      had: {
        zh: '十月站在第二階與第三階之間：機器可以運轉、農民看過、但沒有人用它種過一季。第四階明寫需要許可、重複田區與一整個作期，不在這一季。',
        en: 'October stood between rungs two and three: the machine ran, farmers had seen it, nobody had grown a season with it. Rung four was written down as needing a permit, replicated plots and a full growing cycle, and as out of scope.'
      },
      after: {
        zh: '兌現且誠實。頁面上明寫感測器從未在田間跑過、沒有任何保護劑做過田間試驗。這種自己先講的句子，在判讀時反而是信用資產。',
        en: 'Kept, and kept honest: the pages state that the sensors never ran in a field and that no protectant went through a field trial. Saying it first is a credibility asset in the judging room.'
      }
    },
    {
      n: 4, ph: 1, gate: 'G3', type: 'chart', state: 'thin',
      zh: '量級與單位成本', en: 'Order of magnitude and unit cost',
      unit: { zh: '3 個數字 · 每個要有算式', en: '3 numbers · each with its arithmetic' },
      ask: {
        zh: '一個使用者單位一年需要多少？我們一天做得出多少？差幾個數量級？',
        en: 'What does one user unit need in a year? What do we make in a day? How many orders of magnitude apart?'
      },
      depth: {
        zh: '需求端一個數字、供給端一個數字、單位成本一個數字。三個都要附算式，不能只有結論。差三個數量級不是致命——高中隊伍本來就不是在做產線；說不出差幾個才是致命。',
        en: 'One number for demand, one for supply, one for unit cost, each with the arithmetic behind it rather than only the result. Being three orders of magnitude out is survivable — a high-school team is not building a production line. Not knowing the number is not.'
      },
      had: {
        zh: '模型給出每公頃 37.6 kU、81 L、約 US$3,800；原型硬體成本約 NT$83,028（約 US$2,800）。',
        en: 'The model gave 37.6 kU per hectare, 81 L and about US$3,800; the prototype hardware came in around NT$83,028, roughly US$2,800.'
      },
      after: {
        zh: '供給那一側始終沒有「每天多少」。原因是透膜側濃度在 12 小時達峰後下降，跑更久不等於收更多——這個特性如果二月就寫進量級估算，整季對「產量」的敘述會不一樣。另外硬體價格在兩個頁面上有兩個版本，兩個都站得住，因為沒有人是那個數字的主人。',
        en: 'The supply side never got a per-day figure, because the permeate concentration peaks around 12 hours and falls: a longer run does not mean a bigger harvest. Had that been in the February estimate, the whole season’s account of output would read differently. The hardware price also existed in two versions on two pages, both defensible, because nobody owned the number.'
      }
    },

    {
      n: 5, ph: 2, gate: 'G2', type: 'text', state: 'ok',
      zh: '文獻錨點', en: 'The literature anchors',
      unit: { zh: '3 篇錨 · 10–15 細讀 · 40–60 略讀', en: '3 anchors · 10–15 read · 40–60 skimmed' },
      ask: {
        zh: '這個題目站在哪三篇論文上？我們相信它們哪一張圖？',
        en: 'Which three papers does this project stand on, and which of their figures are we trusting?'
      },
      depth: {
        zh: '40–60 篇略讀、10–15 篇細讀、3 篇錨。每篇錨論文寫兩行：<b>我們相信它哪一張圖</b>，以及<b>它不保證什麼</b>。第二行才是真正的工作——它會直接變成你第一個月要做的實驗。',
        en: '40–60 skimmed, 10–15 read closely, 3 anchors. Each anchor gets two lines: <b>which figure we trust</b>, and <b>what it does not promise</b>. The second line is the real work — it turns straight into the experiments of your first month.'
      },
      had: {
        zh: '三個錨。綠光雙組分迴路：在大腸桿菌中已被定性，但不保證在 <i>B. subtilis</i> 有同樣的動態範圍，也不保證光穿得進高濁度培養。WB800 八蛋白酶剔除分泌宿主：不保證我們這三個蛋白分泌得出來，訊號肽配對是經驗性的。ACC 脫胺酶減輕鹽與淹水逆境：文獻幾乎都是活菌在根圈定殖，純蛋白外加、而且是經膜後的蛋白，是另一回事。',
        en: 'Three anchors. The green two-component circuit: characterised in <i>E. coli</i>, but it does not promise the same dynamic range in <i>B. subtilis</i>, nor that light penetrates a dense culture. The WB800 eight-protease-knockout secretion host: it does not promise our three proteins will come out, since signal-peptide pairing is empirical. ACC deaminase relieving salt and flooding stress: almost all of that literature is live bacteria colonising the rhizosphere, and applying the purified protein — one that has crossed a membrane — is a different question.'
      },
      after: {
        zh: '兌現。三個「不保證什麼」後來全部變成真正的實驗問題，而且其中兩個的答案是「不成立」。錨論文寫得越誠實，第一個月排的實驗越準。',
        en: 'Kept. All three "does not promise" lines became real experimental questions, and two of them came back negative. The more honest the anchors, the better aimed the first month of bench work.'
      }
    },
    {
      n: 6, ph: 2, gate: 'G2', type: 'table', state: 'none',
      zh: 'iGEM 前人評估', en: 'The prior-iGEM assessment',
      unit: { zh: '4 次搜尋 · 10–15 支隊伍 · 每列附連結', en: '4 sweeps · 10–15 teams · a link on every row' },
      ask: {
        zh: '哪些 iGEM 隊伍做過這件事？他們證明了什麼、沒證明什麼？我們因此改什麼？',
        en: 'Which iGEM teams have done this? What did they prove, what did they not, and what do we change because of it?'
      },
      depth: {
        zh: '題目的每個關鍵字各掃一次 Registry 零件搜尋與歷年 wiki（<code>site:2024.igem.wiki 關鍵字</code>，2015 年以前走舊站或 Wayback）。至少 10–15 支隊伍進表，每一列附連結，欄位是：隊伍與年份／證明了什麼／沒證明什麼／我們因此改什麼。',
        en: 'Sweep each of the project’s keywords across Registry part search and the past wikis (<code>site:2024.igem.wiki &lt;keyword&gt;</code>; before about 2015 use the old site or the Wayback Machine). At least 10–15 teams in the table, a link on every row, and four columns: team and year / what they proved / what they did not / what we change.'
      },
      had: {
        zh: '沒有。整季沒有做出這張表。',
        en: 'Nothing. The table was never assembled.'
      },
      after: {
        zh: '代價有兩層。第一，新意陳述只能靠直覺，而評審席上可能坐著記得那些隊伍的人。第二，少看了最有用的東西——別人踩過的坑。建議的讀法是只讀他們的 Results 與 Engineering 頁，不要讀 Description：多數隊伍的 Description 承諾的比 Results 多。2027 的規則是：沒有這張表，G2 最高 5 分。',
        en: 'It cost twice over. The novelty statement had only instinct behind it, with people in the judging room who may remember those teams. And it skipped the most useful material there is: other people’s dead ends. Read their Results and Engineering pages, not their Description — most teams promise more on Description than they delivered. The 2027 rule: without this table, G2 scores no more than 5.'
      }
    },
    {
      n: 7, ph: 2, gate: 'G10', type: 'figure', state: 'thin',
      zh: '新意與論文', en: 'The increment, and the paper',
      unit: { zh: '1 種新意 · 1 句話 · 4–6 張圖', en: '1 kind · 1 sentence · 4–6 figures' },
      ask: {
        zh: '我們多出來的那一塊是哪一種新意？論文那一句話怎麼寫？',
        en: 'Which kind of increment is ours? What is the paper’s one sentence?'
      },
      depth: {
        zh: '五種新意挑<b>一種</b>：新部件、新方法、新整合、新場景、新成本結構。宣稱五種等於沒有宣稱。論文要寫出一句話、期刊層級、以及 4–6 張圖的清單——那份圖清單同時就是這一季最低要完成的實驗清單，所以它要在二月寫，不是十一月。',
        en: 'Pick <b>one</b> of the five kinds: new part, new method, new integration, new setting, new cost structure. Claiming five is claiming none. The paper needs one sentence, a journal tier, and a list of its four to six figures — and that figure list is also the season’s minimum experiment list, which is why it belongs in February rather than November.'
      },
      had: {
        zh: '兩種：新整合（光控分泌 × 中空纖維分離，而且量到交接點）加新方法（量測之前先把預期值寫進版本控制）。論文那一句：一台成本約 US$372 的管線內 OD600 光度計，其訊號處理在量測之前就被預先登記，並在真實的連續灌流培養中被自己的數據推翻五項預測。',
        en: 'Two: a new integration (optogenetic secretion × hollow-fibre separation, with the handover measured) and a new method (expected values committed to version control before measuring). The paper’s sentence: an in-line OD600 photometer costing about US$372 whose signal processing was pre-registered before measurement and then had five of its predictions overturned by its own data in a real continuous perfusion culture.'
      },
      after: {
        zh: '新方法那一半完全兌現，而且成為全季最強的論證：八個預先登記的預測有五個被自己的數據推翻，五個失敗都寫在頁面上。新整合只兌現一半，因為交接點的上游——綠光——從未進入反應器。挑一種就好，這一頁是證據。',
        en: 'The new-method half was kept in full and became the season’s strongest argument: of eight pre-registered predictions, five were overturned by the team’s own data, and all five failures were published. The new-integration half was kept halfway, because the upstream of that handover — green light — never entered the reactor. Pick one kind; this page is the evidence for that rule.'
      }
    },

    {
      n: 8, ph: 3, gate: 'G4', type: 'figure', state: 'ok',
      zh: '科學設計', en: 'The science',
      unit: { zh: '每段序列一個來源編號', en: 'a source accession for every element' },
      ask: {
        zh: '生物在這個系統裡做什麼？每個構築的每一段從哪裡來？',
        en: 'What is the biology’s job here, and where does every element of every construct come from?'
      },
      depth: {
        zh: '每個質體寫出骨架、啟動子、RBS、CDS、標籤、終止子，每一項附 Registry 編號或 NCBI accession。組裝路線選定（Golden Gate 或 Gibson）、合成報價在手、骨架與底盤在手上或已下單——「向某教授索取」只有在對方已回信同意時才算數。',
        en: 'For every plasmid: backbone, promoter, RBS, CDS, tags and terminator, each with a Registry number or an NCBI accession. The assembly route chosen (Golden Gate or Gibson), the synthesis quote in hand, and the backbone and chassis physically in the lab or ordered — "requesting it from a professor" counts only once they have replied yes.'
      },
      had: {
        zh: '底盤 <i>B. subtilis</i> WB800；綠光開關 CcaS/CcaR 在 P<sub>cpcG2</sub>；兩種分泌訊號（SamyQ 與 Csn）並列測試；6×His 標籤；三個候選的植物保護蛋白。',
        en: 'Chassis <i>B. subtilis</i> WB800; the CcaS/CcaR green switch at P<sub>cpcG2</sub>; two secretion signals, SamyQ and Csn, tested against each other; a 6×His tag; three candidate plant-protectant proteins.'
      },
      after: {
        zh: '兌現，而且是後來零件工作的基礎：35 個 Registry 登錄、五個可互換模組、一個 Level 2 裝置、七個 Level 1 定序確認。兩種訊號肽並列測試的決定，讓「哪一個分泌得比較好」變成一個有答案的問題。',
        en: 'Kept, and it carried the parts work: 35 Registry entries across five interchangeable modules, one Level 2 device, seven Level 1 constructs sequence-confirmed. Testing two signal peptides side by side is what turned "which one secretes better" into a question with an answer.'
      }
    },
    {
      n: 9, ph: 3, gate: 'G4', type: 'list', state: 'thin',
      zh: '關鍵路徑', en: 'The critical path',
      unit: { zh: '1 張依賴圖 · 單點失敗排第 1 個月', en: '1 dependency graph · the single point of failure in month 1' },
      ask: {
        zh: '哪一個實驗失敗，整個題目就不成立？它排在第幾週，而不是第幾個？',
        en: 'Which experiment, if it fails, makes the project untrue? In which week does it run — not in which position on the list?'
      },
      depth: {
        zh: '一張依賴圖：實驗是節點，箭頭是「必須先有這個結果」，標出最長鏈。單點失敗明確命名並排在第一個月。最長交期清單每一項有下單日與預期到貨日。備援路線寫好——沒有備援的關鍵路徑要扣分，不是扣完照過。',
        en: 'A dependency graph: experiments as nodes, arrows meaning "this result must exist first", longest chain marked. The single point of failure named and scheduled inside month one. A long-lead list with an order date and an expected-arrival date per item. And a fallback written down — a critical path with no fallback loses points rather than passing with a note.'
      },
      had: {
        zh: '鏈有七節：感測與決策 → 光控迴路 → 分泌 → 灌流與分離 → 活性 → 植物反應 → 劑量與成本。單點失敗是分泌（第 3 節）；招牌是光控（第 2 節）。',
        en: 'A seven-link chain: sensing and decision → light circuit → secretion → perfusion and separation → activity → plant response → dose and cost. The single point of failure is secretion, link three; the headline is light control, link two.'
      },
      after: {
        zh: '分泌成立了，而且 ACC 脫胺酶的分泌量約為另外兩個蛋白的三倍，這個比較後來成為選主力蛋白的依據。但光控排在後面，整季每個反應器批次都是組成型表現，到十月光控仍然是「13 小時支持、16 小時反轉、n＝2、無統計」。<b>三月底排一個 go／no-go，整季的講法會從「我們的光控系統」變成「我們的連續生產平台，附一個尚未整合的光控模組」</b>——後者比較弱，但不會在評審面前塌。',
        en: 'Secretion held, and ACC deaminase came out at roughly three times the other two proteins, a comparison that later decided which protein led. But light control was scheduled late, every reactor run was constitutive, and in October it still stood at "supported at 13 h, reversed at 16 h, n = 2, no statistic". <b>A go/no-go at the end of March would have moved the season’s account from "our optogenetic system" to "our continuous production platform, with a light module not yet integrated"</b> — weaker, and it would not collapse in front of a judge.'
      }
    },
    {
      n: 10, ph: 3, gate: 'G5', type: 'table', state: 'thin',
      zh: '量測計畫', en: 'The measurement plan',
      unit: { zh: '6 列 × 8 欄 · 每列的 n 要進預算', en: '6 rows × 8 columns · every n inside the budget' },
      ask: {
        zh: '每個主張對應哪一個數字、什麼單位、跟什麼對照比、做幾次、用哪台儀器？',
        en: 'Per claim: which number, in what unit, against which control, how many times, on which instrument?'
      },
      depth: {
        zh: '五到八列，每列八欄：主張、數字與單位、對照、n、儀器與校正、統計、完成日、邊界（這個數字<b>不能</b>用來主張什麼）。對照欄不准空白。然後把每列的 n 乘上單次成本加總，那個總額必須出現在耗材預算裡——<b>加起來買不起，就減少列數，不要減少 n。</b>',
        en: 'Five to eight rows, eight columns each: claim, number and unit, control, n, instrument and calibration, statistic, done-by, and boundary — what this number may <b>not</b> be used to claim. No blanks in the control column. Then multiply each row’s n by its unit cost, sum it, and make that sum appear in the consumables budget — <b>if it is unaffordable, cut rows, not n.</b>'
      },
      had: {
        zh: '六列：M1 分泌定量、M2 活性、M3 圍堵、M4 光控比較、M5 植物反應、M6 反應器同型批次。',
        en: 'Six rows: M1 secretion quantified, M2 activity, M3 containment, M4 the light comparison, M5 plant response, M6 reactor runs of the same kind.'
      },
      after: {
        zh: '<b>整季最貴的一課。</b>植物拿到 n＝9 與 p 值（鹽逆境 1.00 → 1.85，p＝0.0002；土壤 300 mM NaCl p ＜ 0.0001），而反應器每個時間點 n＝1，四個批次條件還各不相同、不能合併。模式很清楚：便宜的實驗有重複，貴的沒有。那不是紀律問題，是預算問題——而預算是在二月決定的。',
        en: '<b>The season’s most expensive lesson.</b> The plant work returned n = 9 with p-values (salt 1.00 → 1.85, p = 0.0002; soil at 300 mM NaCl, p &lt; 0.0001), while every reactor time point was a single sample across four runs under four different conditions that cannot be pooled. The pattern is plain: the cheap experiments have replicates and the expensive ones do not. That is not a discipline problem, it is a budget problem — and the budget is set in February.'
      }
    },
    {
      n: 11, ph: 3, gate: 'G6', type: 'table', state: 'thin',
      zh: '設備與成本', en: 'Equipment and cost',
      unit: { zh: '3 類設備 · 每項報價 · 30% 預備金', en: '3 classes · a quote each · 30% contingency' },
      ask: {
        zh: '要借什麼、要買或做什麼、總共多少錢、最長交期那一項什麼時候下單？',
        en: 'What is borrowed, what is bought or built, what does it cost, and when is the longest-lead item ordered?'
      },
      depth: {
        zh: '設備分三類逐項列：<b>已經有</b>（現在可用）、<b>要借</b>（具名單位、具名聯絡人、已經問過）、<b>要買或做</b>（有價格、有交期）。耗材按月列並帶著 G5 的 n，合成 DNA、抗體與套組、培養與塑膠各自一行，運費與關稅也要一行。30% 預備金寫成一行。生物安全等級確認，高中隊伍還要逐項對過 White List。',
        en: 'Three classes, item by item: <b>have</b> (available now), <b>borrow</b> (named institution, named contact, already asked), <b>buy or build</b> (price and lead time). Consumables month by month carrying the G5 replicate counts, with synthesised DNA, antibodies and kits, and culture plastics each on their own row, plus a row for shipping and duty. A 30% contingency as a line. Biosafety level settled, and for a high-school team every organism checked against the White List.'
      },
      had: {
        zh: '反應器 US$1,023（含管線內光度計）、中空纖維模組 US$245、Pro 光度計 US$372（商用替代品約 US$470）、Slim 光度計 US$235、光板 US$66。整台原型約 NT$83,028。借用的是微量盤判讀儀，而六列量測有四列靠它。',
        en: 'Reactor US$1,023 including the in-line photometer, hollow-fibre module US$245, the Pro photometer US$372 against a US$470 commercial alternative, the slim photometer US$235, the light plate US$66. The whole prototype about NT$83,028. The borrowed item was a plate reader, and four of the six measurement rows depended on it.'
      },
      after: {
        zh: '資本那一側估得很準。偏掉的是「同型批次 ×3」的耗材成本從未被編進去，於是 M6 永遠是 n＝1。另外反應器料件清單不夠細，後來發現漏了主控板、鹼液泵與攪拌子——這是二月清單沒有逐項列到底的直接結果。',
        en: 'The capital side was estimated well. What went wrong is that the consumable cost of three runs of the same kind never entered the budget, so M6 stayed at n = 1. The reactor parts list also turned out to be missing the mainboard, the base pump and the stir bar — a direct consequence of a February list that was not itemised all the way down.'
      }
    },

    {
      n: 12, ph: 4, gate: 'G7', type: 'list', state: 'thin',
      zh: '硬體與軟體評估', en: 'Hardware and software assessment',
      unit: { zh: '≤3 台 · 每台一條驗證路徑', en: '≤3 instruments · a validation route each' },
      ask: {
        zh: '每一台儀器、每一支程式，少了它哪一列量測做不到？',
        en: 'For every instrument and every program: which measurement is impossible without it?'
      },
      depth: {
        zh: '一行一項，答出四件事：它讓哪一列量測成為可能、市售替代品多少錢、我們自製多少錢、驗證路徑是什麼（拿什麼標準品、跟哪一台商用儀器比、可接受的差異）。<b>答不出第一件的就不要做。</b>三台以內。軟體同一條規則：在實驗之前產出可被推翻的預測才算模型，把已有數據畫漂亮不算。',
        en: 'One line per item, answering four things: which measurement it makes possible, what the commercial alternative costs, what ours costs, and the validation route — which standard, which commercial instrument, what difference is acceptable. <b>No answer to the first, do not build it.</b> Three at most. The same rule covers software: a model makes a falsifiable prediction before the experiment; drawing the data you already have does not.'
      },
      had: {
        zh: '四台儀器加一個水耕板。反應器與管線內光度計都答得出來；Slim 是可複製性證據，不是量測工具；水耕板與額外感測器答不出來。',
        en: 'Four instruments plus a hydroponics plate. The reactor and the in-line photometer both had an answer; the slim photometer was reproducibility evidence rather than a measurement tool; the plate and the extra sensors had none.'
      },
      after: {
        zh: '硬體那側部分不足：溶氧探針無法維持校正、迴路溫度探針無回應、沒有液位感測，三項都要在頁面上寫成「裝了但未測」。<b>「裝了」不等於「測了」，而那句話一旦上頁就是負債。</b>軟體那側兌現：韌體連鎖讓 434 小時無人值守運轉成立，異常偵測在 OD 通道失效前 26.7 小時就標記出參考通道。',
        en: 'The hardware side fell short: a dissolved-oxygen probe that would not hold calibration, an unresponsive loop temperature probe, and no level sensing — all three written up as fitted-and-untested. <b>Fitted is not tested, and once that sentence is on the page it is a debt.</b> The software side was kept: interlocks in firmware made a 434-hour unattended run possible, and anomaly detection flagged the reference channel 26.7 hours before the OD channel failed.'
      }
    },
    {
      n: 13, ph: 4, gate: 'G8', type: 'text', state: 'ok',
      zh: '法規與安全', en: 'Regulation and safety',
      unit: { zh: '1 個類別 · 1 條法源 · 1 句圍堵', en: '1 category · 1 statute · 1 containment sentence' },
      ask: {
        zh: '走哪一條法規路徑？工程菌離不離開容器，什麼擋住它？',
        en: 'Which regulatory route? Do the engineered cells leave the vessel, and what stops them?'
      },
      depth: {
        zh: '類別名稱、法源名稱、大約的審查時程。<b>類別選擇本身就是一個設計決定</b>，它會往回決定濕實驗量什麼。圍堵要能用一句話講完：物理的（膜、容器）還是生物的（線路）。高中隊伍另外要對過 White List——清單外的生物是否決項，而且會在七月的安全表單被攔下來，不是在十月。',
        en: 'The category, the statute, the approximate clock. <b>The choice of category is itself a design decision</b> and it reaches back into what the wet lab measures. Containment fits in one sentence: physical (a membrane, a vessel) or biological (a circuit). A high-school team also checks the White List — an organism off it is a reject, and it is caught by the July safety form rather than in October.'
      },
      had: {
        zh: '選生物刺激素／肥料路線（約 30 天）而不是生物農藥（3–5 年）。圍堵是物理的：0.2 µm 孔徑對上 0.25–1.0 µm 的菌體，不是自殺基因。',
        en: 'The biostimulant and fertiliser route, about 30 days, rather than a biopesticide at three to five years. Containment physical: a 0.2 µm pore against a 0.25–1.0 µm cell, not a kill switch.'
      },
      after: {
        zh: '兌現，而且這一頁的影響比看起來大：選了生物刺激素，就只能主張逆境耐受與生長、不能主張防治，於是所有植物實驗的終點指標變成根長與鮮重，不是病害分數。圍堵的證據是兩次塗盤皆無菌落——有限但誠實，沒有 qPCR、沒有測孢子，頁面上照寫。',
        en: 'Kept, and this page reached further than it looks: choosing biostimulant allows claims about stress tolerance and growth but not about controlling pests, which fixed every plant endpoint as root length and fresh weight rather than a disease score. The containment evidence was two platings with no colonies — limited and honest, with no qPCR and no spore test, and the page says so.'
      }
    },
    {
      n: 14, ph: 4, gate: 'G9', type: 'table', state: 'none',
      zh: '風險與停損', en: 'Risk and kill criteria',
      unit: { zh: '5 列風險 · 3 個停損 · 1 個縮小版', en: '5 risks · 3 kill criteria · 1 de-scoped version' },
      ask: {
        zh: '前五大風險各由哪個實驗在哪個日期解決？什麼情況下我們停掉這個題目？',
        en: 'Which experiment resolves each of the top five risks, and on what date? When do we stop?'
      },
      depth: {
        zh: '風險表五列：風險、機率、影響、解決它的實驗、日期、失敗後的動作。三個停損條件，<b>各帶日期與數字門檻</b>（「若四月底仍測不到目標蛋白，改走胞內表現加破菌」）。一個縮小版題目：只剩一半時間與一半資源時的最小可交付成果。',
        en: 'A five-row risk table: risk, likelihood, impact, the experiment that resolves it, the date, and the action if it fails. Three kill criteria, <b>each with a date and a numeric threshold</b> ("if the target protein is still undetectable by the end of April, move to intracellular expression with lysis"). And a de-scoped version: the minimum deliverable on half the time and half the resources.'
      },
      had: {
        zh: '沒有。2026 沒有寫停損條件，也沒有寫縮小版。',
        en: 'Nothing. No kill criteria and no de-scoped version were written in 2026.'
      },
      after: {
        zh: '幾乎沒有 iGEM 隊伍寫這一頁，因為寫了像是不夠投入。實際上相反：<b>有停損劇本的隊伍才敢把關鍵實驗排在三月</b>，因為失敗有退路；沒有劇本的隊伍會一直往後推。結果是縮小版（光度計與量測）無意間變成最強的那一塊，而招牌（光控）變成最弱的那一塊——這個排序如果二月就看得見，簡報第一頁會是另一頁。',
        en: 'Almost no iGEM team writes this page, because writing it looks like a lack of commitment. The opposite holds: <b>a team with a script dares to schedule the decisive experiment in March</b>, because failure has a route out, while a team without one keeps pushing it back. The season ended with the de-scoped version — the photometer and the measurement work — as its strongest piece and the headline as its weakest. Visible in February, that ordering would have changed the first slide.'
      }
    },
    {
      n: 15, ph: 4, gate: 'G10', type: 'chart', state: 'thin',
      zh: '獎項評估與里程碑', en: 'Award assessment and milestones',
      unit: { zh: '3 個名額 · 跨 2 類 · 4 個 go／no-go', en: '3 slots · across 2 categories · 4 go/no-go dates' },
      ask: {
        zh: '瞄哪三個特別獎？各需要什麼證據？四個 go／no-go 的通過條件是什麼？',
        en: 'Which three Special Awards? What evidence does each need? What are the four go/no-go pass conditions?'
      },
      depth: {
        zh: '<b>三個名額是上限，也是金牌條件</b>：一隊最多申請三個特別獎，至少一個來自 General Bio Engineering 類、至少一個來自 Specializations 類，三個都要達到評分門檻才拿金牌，選不滿三個直接沒有金牌。每個名額逐條核對資格限制與評分問題，寫出我們要交出的證據與現在還缺什麼。獎牌條件逐條對應到工作項目、負責人與<b>標準網址</b>——評審沒有義務看指定網址之外的東西，做了但放錯頁面不會被評分。',
        en: '<b>Three slots is the cap and also the Gold criterion</b>: a team applies for at most three Special Awards, at least one from General Bio Engineering and one from Specializations, all three must clear the performance standard, and fewer than three forfeits Gold. Check each slot’s eligibility and ballot questions, and state the evidence you will hand over and what is still missing. Map every medal criterion to a work item, an owner and a <b>Standard URL</b> — judges are not obliged to look beyond the designated URLs, so work filed elsewhere is not evaluated.'
      },
      had: {
        zh: '工作內容對得上三個名額：Best Measurement（GBE 類）、Best Hardware 與 Best Integrated Human Practices（Specializations 類），跨類要求成立。不能碰 Best Alternative Platform，因為它的底盤明確排除 <i>B. subtilis</i>。第二個 GBE 選項是 Best Part Collection，條件接近，但零件類的獎要求文件寫在 Registry 上、集合要有集合層級文件，那是一整季的文件工作，要搶就得在二月排進人力表。',
        en: 'The work maps onto three slots: Best Measurement in General Bio Engineering, with Best Hardware and Best Integrated Human Practices in Specializations, which satisfies the cross-category rule. Best Alternative Platform is out, since it explicitly excludes <i>B. subtilis</i> as a chassis. The second General Bio Engineering option is Best Part Collection, which was close — but the part awards need documentation on the Registry and a collection needs collection-level documentation on top, a season of writing that has to go into February’s staffing table to be winnable.'
      },
      after: {
        zh: '獎項那一側兌現：三個方向都有站得住的證據。沒做到的是數字主人——硬體價格、菌株名稱、反應器產出區間在不同頁面上各有版本，最後要靠一份判讀準備文件把它們統一。那份文件如果是二月的一張表（一個數字、一位主人、一個來源檔案），十月就不需要寫。',
        en: 'The award side came through: all three directions had evidence that stands up. What did not was number ownership — the hardware price, the strain name and the reactor output window each existed in more than one version across pages, and a judging-prep document had to reconcile them at the end. Had that been a one-page table in February (one number, one owner, one source file), October would not have had to write it.'
      }
    }
  ];


  /* ===========================================================================
     The board
     ---------------------------------------------------------------------------
     Fifteen tiles on a twelve-column bento. Nine of them carry a real artefact
     off the 2026 bench — the reactor, a run's data, the twin's screen, the lit
     light plate, the containment plates — because a proposal section is easier
     to understand from the thing it eventually produced than from a diagram of
     itself. Two tiles carry nothing at all, and that is the argument.

     `at` is an explicit grid-area so the board composes on purpose rather than
     by flow. On a phone the areas are dropped and the tiles run two across.
     ========================================================================= */

  var TILES = {
    /* rows 1–6: the machine, the data it made, and the screen it ran on */
    1:  { kind: 'photo', img: 'reactor.webp',    at: '1 / 1 / 7 / 5',   pos: '50% 46%' },
    10: { kind: 'chart', img: 'permeate.webp',   at: '1 / 5 / 4 / 9'  },
    12: { kind: 'photo', img: 'twin.webp',       at: '1 / 9 / 4 / 13',  pos: '50% 46%' },
    9:  { kind: 'photo', img: 'lpa.webp',        at: '4 / 5 / 7 / 9',   pos: '50% 52%' },
    2:  { kind: 'photo', img: 'farm.webp',       at: '4 / 9 / 7 / 13',  pos: '50% 58%' },
    /* rows 7–8: the instrument, the world it reads, the evidence, the design */
    11: { kind: 'photo', img: 'photometer.webp', at: '7 / 1 / 9 / 4',   pos: '50% 50%' },
    4:  { kind: 'chart', img: 'gis.webp',        at: '7 / 4 / 9 / 7'  },
    13: { kind: 'chart', img: 'plates.webp',     at: '7 / 7 / 9 / 10' },
    8:  { kind: 'chart', img: 'constructs.webp', at: '7 / 10 / 9 / 13' },
    /* rows 9–10: the pages with no picture, and the two with nothing at all */
    5:  { kind: 'text',  at: '9 / 1 / 11 / 3',  big: '3', note: { zh: '篇錨論文，從 40–60 篇略讀裡挑出', en: 'anchors, out of 40–60 skimmed' } },
    3:  { kind: 'text',  at: '9 / 3 / 11 / 5',  big: '5', note: { zh: '階階梯。十月站在第 2–3 階', en: 'rungs. October stood at two to three' } },
    7:  { kind: 'text',  at: '9 / 5 / 11 / 7',  big: '1', note: { zh: '種新意：新方法', en: 'kind of increment: a new method' } },
    15: { kind: 'text',  at: '9 / 7 / 11 / 9',  big: '3', note: { zh: '個特別獎名額，也是金牌條件', en: 'award slots, and the Gold criterion' } },
    6:  { kind: 'empty', at: '9 / 9 / 11 / 11' },
    14: { kind: 'empty', at: '9 / 11 / 11 / 13' }
  };

  /* what each artefact is, said plainly under or over the picture */
  var CAPTION = {
    1:  { zh: '反應器本體', en: 'The reactor itself' },
    2:  { zh: '淡水的農場，2 月', en: 'A farm in Tamsui, February' },
    4:  { zh: '夜溫與稻作產量，逐縣', en: 'Night temperature against rice yield, by county' },
    8:  { zh: '五個可互換的構築模組', en: 'Five interchangeable construct modules' },
    9:  { zh: '光板運轉中，9 月 19 日', en: 'The light plate running, 19 September' },
    10: { zh: '透膜側 72 小時：ELISA、活性、比活性', en: 'The permeate over 72 h: ELISA, activity, specific activity' },
    11: { zh: '管線內光度計接上迴路', en: 'The in-line photometer on the loop' },
    12: { zh: 'Digital Twin 的實際畫面', en: 'The digital twin, as it actually ran' },
    13: { zh: '透膜側兩次塗盤，都沒有長', en: 'Two platings of the permeate, both clean' }
  };

  var root = document.getElementById('anatomy');
  if (!root) return;

  var phById = {}; PHASES.forEach(function (p) { phById[p.id] = p; });
  var byN = {};   PAGES.forEach(function (p) { byN[p.n] = p; });
  var STATE = {
    ok:   { zh: '兌現',   en: 'Delivered' },
    thin: { zh: '不夠深', en: 'Not deep enough' },
    none: { zh: '沒寫',   en: 'Never written' }
  };

  function bi(zh, en) { return '<span class="l-zh">' + zh + '</span><span class="l-en">' + en + '</span>'; }

  var counts = { ok: 0, thin: 0, none: 0 };
  PAGES.forEach(function (p) { counts[p.state]++; });

  /* ----------------------------------------------------------- the board -- */

  var h = '<div class="bento">';
  PAGES.forEach(function (p) {
    var t = TILES[p.n];
    var cap = CAPTION[p.n];
    var cls = ['tile', 't-' + t.kind, 's-' + p.state];
    h += '<button class="' + cls.join(' ') + '" type="button" data-pg="' + p.n + '" ' +
         'style="--at:' + t.at + '" aria-label="' + p.n + '. ' + p.en + '">';

    if (t.kind === 'photo' || t.kind === 'chart') {
      h += '<span class="tile__img"><img src="img/' + t.img + '" alt="" loading="lazy" decoding="async"' +
           (t.pos ? ' style="object-position:' + t.pos + '"' : '') + '></span>';
    }
    h += '<span class="tile__body">';
    h += '<span class="tile__n">' + (p.n < 10 ? '0' + p.n : p.n) + '</span>';
    if (t.kind === 'text') {
      h += '<span class="tile__big">' + t.big + '</span>';
      h += '<span class="tile__h">' + bi(p.zh, p.en) + '</span>';
      h += '<span class="tile__note">' + bi(t.note.zh, t.note.en) + '</span>';
    } else if (t.kind === 'empty') {
      h += '<span class="tile__h">' + bi(p.zh, p.en) + '</span>';
      h += '<span class="tile__none">' + bi('這一頁沒有寫', 'This page was never written') + '</span>';
    } else {
      h += '<span class="tile__h">' + bi(p.zh, p.en) + '</span>';
      if (cap) h += '<span class="tile__cap">' + bi(cap.zh, cap.en) + '</span>';
    }
    h += '</span>';
    h += '<span class="tile__dot" title="' + STATE[p.state].en + '"></span>';
    h += '</button>';
  });
  h += '</div>';

  h += '<p class="board__hint">' +
    bi('點任何一塊，看那一頁要回答什麼、要研究到什麼程度、ReLEAF 當時寫了什麼，以及後來證明夠不夠。',
       'Open any tile for what that page has to answer, how much research it takes, what ReLEAF put there, and whether it was enough.') +
    '</p>';

  root.innerHTML = h;

  /* fill the counts in the header strip */
  ['ok', 'thin', 'none'].forEach(function (s) {
    var el = document.querySelector('[data-count="' + s + '"]');
    if (el) el.textContent = counts[s];
  });

  /* The tiles arrive once, staggered. One observer on the board, not fifteen
     on the tiles: a tile that never quite crosses its own threshold would
     otherwise stay invisible, which is a much worse failure than a missed
     animation. Each tile keeps its own delay, so the stagger survives. */
  var bento = root.querySelector('.bento');
  if (bento && !window.matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window) {
    var tiles = Array.prototype.slice.call(root.querySelectorAll('.tile'));
    tiles.forEach(function (t, i) { t.style.setProperty('--d', (i * 30) + 'ms'); t.classList.add('is-wait'); });
    var reveal = function () { tiles.forEach(function (t) { t.classList.remove('is-wait'); }); };
    var io = new IntersectionObserver(function (es) {
      if (es.some(function (e) { return e.isIntersecting; })) { reveal(); io.disconnect(); }
    }, { rootMargin: '0px 0px -5% 0px' });
    io.observe(bento);
    window.setTimeout(reveal, 4000);   /* nothing stays hidden, whatever happens */
  }

  /* ----------------------------------------------------------- the sheet -- */

  var sheet = document.getElementById('sheet');
  if (!sheet) return;
  var lastFocus = null;

  function build(n) {
    var p = byN[n], t = TILES[n], ph = phById[p.ph], cap = CAPTION[n];
    var s = '';

    s += '<div class="sh__card" role="dialog" aria-modal="true" aria-label="' + p.en + '">';
    s += '<button class="sh__x" type="button" data-shclose aria-label="Close">' +
         '<svg viewBox="0 0 16 16" width="15" height="15" aria-hidden="true">' +
         '<path d="M3.5 3.5l9 9M12.5 3.5l-9 9" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg></button>';

    if (t.img) {
      s += '<figure class="sh__fig sh__fig--' + t.kind + '">' +
           '<img src="img/' + t.img + '" alt="">' +
           (cap ? '<figcaption>' + bi(cap.zh, cap.en) + '</figcaption>' : '') +
           '</figure>';
    }

    s += '<div class="sh__in">';
    s += '<div class="sh__chips">' +
         '<span class="sh__n">' + (n < 10 ? '0' + n : n) + ' / 15</span>' +
         '<span class="sh__ph">' + bi(ph.zh, ph.en) + '</span>' +
         '<a class="sh__g" href="#' + p.gate.toLowerCase() + '" data-shgate>' + p.gate + '</a>' +
         '<span class="sh__st s-' + p.state + '">' + bi(STATE[p.state].zh, STATE[p.state].en) + '</span>' +
         '</div>';
    s += '<h3 class="sh__name">' + bi(p.zh, p.en) + '</h3>';
    s += '<p class="sh__ask">' + bi(p.ask.zh, p.ask.en) + '</p>';

    s += '<div class="sh__rows">';
    s += '<div class="sh__r sh__r--depth"><h6>' + bi('要研究到什麼程度', 'How much research this takes') +
         '<em>' + bi(p.unit.zh, p.unit.en) + '</em></h6><p>' + bi(p.depth.zh, p.depth.en) + '</p></div>';
    s += '<div class="sh__r"><h6>' + bi('ReLEAF 當時寫了什麼', 'What ReLEAF put here in 2026') +
         '</h6><p>' + bi(p.had.zh, p.had.en) + '</p></div>';
    s += '<div class="sh__r sh__r--' + p.state + '"><h6>' + bi('後來證明夠不夠', 'Whether that was enough') +
         '</h6><p>' + bi(p.after.zh, p.after.en) + '</p></div>';
    s += '</div>';

    s += '<div class="sh__nav">';
    if (byN[n - 1]) s += '<button class="sh__b" type="button" data-pg="' + (n - 1) + '">← ' + bi(byN[n - 1].zh, byN[n - 1].en) + '</button>';
    if (byN[n + 1]) s += '<button class="sh__b" type="button" data-pg="' + (n + 1) + '">' + bi(byN[n + 1].zh, byN[n + 1].en) + ' →</button>';
    s += '</div>';
    s += '</div></div>';
    return s;
  }

  function openSheet(n) {
    if (sheet.hidden) lastFocus = document.activeElement;
    sheet.innerHTML = build(n);
    sheet.hidden = false;
    sheet.dataset.pg = n;
    document.documentElement.classList.add('sh-open');
    var x = sheet.querySelector('[data-shclose]');
    if (x) x.focus();
    Array.prototype.forEach.call(root.querySelectorAll('.tile'), function (b) {
      b.classList.toggle('is-on', +b.getAttribute('data-pg') === n);
    });
  }

  function closeSheet() {
    sheet.hidden = true;
    sheet.innerHTML = '';
    delete sheet.dataset.pg;
    document.documentElement.classList.remove('sh-open');
    Array.prototype.forEach.call(root.querySelectorAll('.tile'), function (b) { b.classList.remove('is-on'); });
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  root.addEventListener('click', function (e) {
    var b = e.target.closest('[data-pg]');
    if (b) openSheet(+b.getAttribute('data-pg'));
  });

  sheet.addEventListener('click', function (e) {
    if (e.target.closest('[data-shclose]')) { closeSheet(); return; }
    if (e.target.closest('[data-shgate]')) { closeSheet(); return; }   /* let the hash do its work */
    var b = e.target.closest('[data-pg]');
    if (b) { openSheet(+b.getAttribute('data-pg')); return; }
    if (!e.target.closest('.sh__card')) closeSheet();                  /* the backdrop */
  });

  document.addEventListener('keydown', function (e) {
    if (sheet.hidden) return;
    if (e.key === 'Escape') { closeSheet(); return; }
    var cur = +sheet.dataset.pg;
    if (e.key === 'ArrowRight' && byN[cur + 1]) { e.preventDefault(); openSheet(cur + 1); }
    if (e.key === 'ArrowLeft' && byN[cur - 1]) { e.preventDefault(); openSheet(cur - 1); }
    if (e.key === 'Tab') {                                             /* keep focus inside */
      var f = sheet.querySelectorAll('button, a[href]');
      if (!f.length) return;
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });
}());
