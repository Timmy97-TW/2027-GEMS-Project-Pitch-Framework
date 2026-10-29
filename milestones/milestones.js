/* =============================================================================
   The season chart
   -----------------------------------------------------------------------------
   One data block, three views. Everything the chart draws comes from SEASON
   below; to re-date the season for a new year, edit the dates here and nothing
   else. Dates are ISO and inclusive.

   `kind`:  bar      a stretch of work
            gate     a go/no-go the team itself owns
            due      an iGEM deliverable deadline
   `crit`:  on the critical path — the chain that, if a link fails, takes the
            project with it.
   `needs`: ids this item cannot start without. Selecting an item lights its
            whole upstream chain.
   ========================================================================== */
(function () {
  'use strict';

  var SPAN = { from: '2026-12-01', to: '2027-11-30' };

  var TRACKS = [
    { id: 'team', zh: '組建與訓練', en: 'Team and training', c: '#3f5468' },
    { id: 'wet',  zh: '濕實驗',     en: 'Wet lab',           c: '#23684a' },
    { id: 'hw',   zh: '硬體',       en: 'Hardware',          c: '#8a5a0b' },
    { id: 'dry',  zh: '乾實驗與模型', en: 'Dry lab and model', c: '#1f5f8b' },
    { id: 'hp',   zh: '人文實踐',   en: 'Human practices',   c: '#7a3b67' },
    { id: 'doc',  zh: '文件與繳交', en: 'Record and deliverables', c: '#9a3d22' }
  ];

  var SEASON = [

    /* ---- the four gates the team owns ------------------------------------ */
    {
      id: 'gate1', kind: 'gate', track: 'wet', crit: true, on: '2027-03-31',
      zh: '閘門一　招牌功能', en: 'Gate 1 · The headline function',
      gate: 'G4', needs: ['m4'],
      delivers: {
        zh: '題目最常被講出來的那個功能，有沒有數據支持。',
        en: 'Whether the function everyone says out loud has data behind it.'
      },
      pass: {
        zh: '招牌功能相對對照組的效果比 ≥ 2，n＝3，而且干擾來源（串擾、漏光、批次差）已排除。',
        en: 'The headline effect is at least 2× its control at n = 3, with the obvious confounders — crosstalk, light leak, batch effects — ruled out.'
      },
      fail: {
        zh: '把招牌功能降級成「已測試、未整合」的模組，整季敘述改寫成次強的那條線，並且從這天起不再把它放在簡報第一頁。這不是放棄題目，是換掉標題。',
        en: 'Demote it to a tested-but-not-integrated module, rewrite the season around the next strongest line, and take it off the first slide from this day. This is not abandoning the project, it is changing its headline.'
      },
      owner: { zh: '濕實驗組長', en: 'Wet lab lead' }
    },
    {
      id: 'gate2', kind: 'gate', track: 'wet', crit: true, on: '2027-04-30',
      zh: '閘門二　單點失敗', en: 'Gate 2 · The single point of failure',
      gate: 'G4', needs: ['m1'],
      delivers: {
        zh: '整條鏈的第一節：如果這裡沒有東西，後面每一節都不存在。',
        en: 'The first link of the chain. With nothing here, none of the links after it exists.'
      },
      pass: {
        zh: '核心產物以兩種獨立方法同時可偵測，且相對無質體對照 ≥ 3 倍，n＝3。',
        en: 'The core product is detectable by two independent methods at 3× the plasmid-free control, n = 3.'
      },
      fail: {
        zh: '啟動 G9 的第一條停損：改走備援路線（例如分泌改成胞內表現加破菌）。備援路線必須在二月就寫好，不是這天才想。',
        en: 'Fire the first kill criterion from G9 and move to the fallback route — for example from secretion to intracellular expression with lysis. That fallback was written in February, not improvised today.'
      },
      owner: { zh: '濕實驗組長', en: 'Wet lab lead' }
    },
    {
      id: 'gate3', kind: 'gate', track: 'hw', crit: true, on: '2027-06-30',
      zh: '閘門三　整合', en: 'Gate 3 · Integration',
      gate: 'G4', needs: ['hw-val', 'm2'],
      delivers: {
        zh: '生物那一側與硬體那一側第一次在同一個批次裡交接。',
        en: 'The biology side and the hardware side hand over to each other inside one run, for the first time.'
      },
      pass: {
        zh: '同一個批次同時成立三件事：產物出現在正確的一側、不該過去的東西沒有過去、批次撐過預定時長。三件缺一就是不通過。',
        en: 'One run shows all three: the product on the right side, what should not cross has not crossed, and the run holds for its planned duration. Two out of three is a fail.'
      },
      fail: {
        zh: '縮短單批長度、增加批次數，並把整合的證據降級成「分段成立」。同時把硬體耗材從一季一個改成一季兩個。',
        en: 'Shorten the runs, do more of them, and demote the integration claim to "holds in stages". At the same time move the hardware consumable from one a season to two.'
      },
      owner: { zh: '硬體組長 ＋ 濕實驗組長', en: 'Hardware lead with wet lab lead' }
    },
    {
      id: 'gate4', kind: 'gate', track: 'doc', crit: true, on: '2027-08-31',
      zh: '閘門四　凍結前', en: 'Gate 4 · Before the freeze',
      gate: 'G5', needs: ['m5', 'm6'],
      delivers: {
        zh: '停止收集、開始解釋的那一天。',
        en: 'The day you stop collecting and start explaining.'
      },
      pass: {
        zh: '量測表六列之中至少四列達到當初承諾的 n。',
        en: 'At least four of the six measurement rows have reached the n they were promised.'
      },
      fail: {
        zh: '沒達到的那幾列，從這天起停止做新實驗，改為寫清楚它們為什麼沒達到。九月再開新實驗，結果只會是另一組 n＝1。',
        en: 'The rows that fell short stop collecting today and start writing down why. A new experiment begun in September returns one more n = 1.'
      },
      owner: { zh: '全隊', en: 'Whole team' }
    },

    /* ---- team and training ----------------------------------------------- */
    {
      id: 'train', kind: 'bar', track: 'team', from: '2026-12-12', to: '2027-01-09',
      zh: '基本訓練四週', en: 'Four weeks of basic training',
      delivers: {
        zh: '濕實驗每週一個技術，每次寫紀錄：無菌操作與配製培養基、PCR 與電泳、組裝與轉形、表現與量測。乾實驗同時進行，每人做出一個小成品。',
        en: 'One wet-lab technique a week, each written up: sterile technique and media, PCR and gels, assembly and transformation, expression and measurement. The dry-lab track runs alongside and each student makes one small thing.'
      },
      pass: {
        zh: '每個學生自己跑成功一次轉形，並且交出四週的紀錄。',
        en: 'Every student has run one successful transformation themselves and handed in four weeks of records.'
      },
      owner: { zh: '全隊', en: 'Whole team' }
    },
    {
      id: 'explore', kind: 'bar', track: 'team', from: '2026-12-19', to: '2027-01-23',
      zh: '題目探索與前人搜尋', en: 'Project exploration and the prior-art sweep',
      gate: 'G2',
      delivers: {
        zh: '學生選一份老師的 brief 深入，或自己提一個。兩條路都要交出附連結的 iGEM 前人表。',
        en: 'Students go deep on one of the instructors’ briefs or propose their own. Both routes hand in a linked prior-iGEM table.'
      },
      pass: {
        zh: '每個題目都有一張前人表，而且表上每一列都有連結。',
        en: 'Every project has a prior-art table, and every row on it carries a link.'
      },
      owner: { zh: '全隊', en: 'Whole team' }
    },
    {
      id: 'pk', kind: 'bar', track: 'team', from: '2027-01-23', to: '2027-02-05',
      zh: 'PK 與定案', en: 'The PK and the commitment', crit: true,
      needs: ['explore'], gate: 'G1',
      delivers: {
        zh: '每個題目唸一頁提案、回答驗屍那一題、接受提問。老師的題目也被學生打分。',
        en: 'Each project reads its one-pager, answers the pre-mortem question and takes questions. The instructors’ projects are scored by the students too.'
      },
      pass: {
        zh: '二月門檻二十二項全部在桌上，其中四個否決項缺一就不定案。',
        en: 'All twenty-two items of the February bar are on the table, and none of the four rejects is missing.'
      },
      owner: { zh: '全隊', en: 'Whole team' }
    },
    {
      id: 'sprint0', kind: 'bar', track: 'team', from: '2027-02-06', to: '2027-02-28',
      zh: '寒假第一個 sprint', en: 'The first sprint, over the holiday', crit: true,
      needs: ['pk'],
      delivers: {
        zh: '下單合成 DNA、索取質體、把借來的儀器時段訂下來。這三件事都是只能等的事，所以要最早做。',
        en: 'Order the synthesised DNA, request the plasmids, book the borrowed instrument. All three are things you can only wait for, so they go first.'
      },
      pass: { zh: '最長交期那一項已經下單，並且有預期到貨日。', en: 'The longest-lead item is ordered and has an expected arrival date.' },
      owner: { zh: '濕實驗組長', en: 'Wet lab lead' }
    },

    /* ---- wet lab ---------------------------------------------------------- */
    {
      id: 'build', kind: 'bar', track: 'wet', from: '2027-02-06', to: '2027-03-12',
      zh: '建構設計與下單', en: 'Construct design and ordering', crit: true,
      needs: ['pk'], gate: 'G4',
      delivers: {
        zh: '每個質體的骨架、啟動子、RBS、CDS、標籤、終止子定稿，每一項附 Registry 編號或 NCBI accession。',
        en: 'Every plasmid’s backbone, promoter, RBS, CDS, tags and terminator finalised, each with a Registry number or an NCBI accession.'
      },
      pass: { zh: '序列送出，報價與交期在手。', en: 'Sequences sent, with the quote and the lead time in hand.' },
      owner: { zh: '濕實驗組長', en: 'Wet lab lead' }
    },
    {
      id: 'assemble', kind: 'bar', track: 'wet', from: '2027-03-08', to: '2027-04-20',
      zh: '組裝、轉形與定序確認', en: 'Assembly, transformation and sequence confirmation', crit: true,
      needs: ['build'], gate: 'G4',
      delivers: { zh: '可用的菌株，序列確認過。', en: 'Working strains, sequence confirmed.' },
      pass: { zh: '每個要進量測的構築都有一個定序確認過的菌株，並且凍存兩管。', en: 'Every construct that enters a measurement has one sequence-confirmed strain, with two frozen stocks.' },
      owner: { zh: '濕實驗組長', en: 'Wet lab lead' }
    },
    {
      id: 'm4', kind: 'bar', track: 'wet', from: '2027-03-01', to: '2027-03-31',
      zh: 'M4　招牌功能比較　n＝3', en: 'M4 · The headline comparison, n = 3', crit: true,
      gate: 'G5',
      delivers: { zh: '招牌功能的開與關，各三個生物重複，含必要的陰性對照。', en: 'The headline function on and off, three biological replicates each, with the negative controls it needs.' },
      pass: { zh: '效果比 ≥ 2 且有檢定。這一列餵給閘門一。', en: 'A ratio of 2 or more with a test behind it. This row feeds gate one.' },
      owner: { zh: '濕實驗組長', en: 'Wet lab lead' }
    },
    {
      id: 'm1', kind: 'bar', track: 'wet', from: '2027-04-01', to: '2027-04-30',
      zh: 'M1　核心產物定量　n＝3', en: 'M1 · Core product quantified, n = 3', crit: true,
      needs: ['assemble'], gate: 'G5',
      delivers: { zh: '核心產物的濃度，相對無質體對照與載體對照。', en: 'The core product’s concentration against both a plasmid-free and a vector control.' },
      pass: { zh: '兩種獨立方法同時可偵測，≥ 3 倍對照，n＝3。這一列餵給閘門二。', en: 'Detectable by two independent methods at 3× control, n = 3. This row feeds gate two.' },
      owner: { zh: '濕實驗組長', en: 'Wet lab lead' }
    },
    {
      id: 'm2', kind: 'bar', track: 'wet', from: '2027-05-03', to: '2027-06-18',
      zh: 'M2　活性定量　n＝3', en: 'M2 · Activity quantified, n = 3',
      needs: ['m1'], gate: 'G5',
      delivers: { zh: '產物有沒有功能，不只是有沒有出現。', en: 'Whether the product works, not only whether it is there.' },
      pass: { zh: '相對熱滅活的同一樣本有顯著活性，n＝3。', en: 'Significant activity against the same sample heat-killed, n = 3.' },
      owner: { zh: '濕實驗組長', en: 'Wet lab lead' }
    },
    {
      id: 'm3', kind: 'bar', track: 'wet', from: '2027-06-14', to: '2027-07-30',
      zh: 'M3　圍堵驗證　3 批次', en: 'M3 · Containment verified, 3 runs',
      needs: ['hw-int'], gate: 'G5',
      delivers: { zh: '不該出去的東西沒有出去，用兩種方法各驗一次。', en: 'What should not leave has not left, checked two ways.' },
      pass: { zh: '三個批次都是陰性，且每次都有同日的陽性對照。', en: 'Three runs negative, each with a same-day positive control beside it.' },
      owner: { zh: '濕實驗組長', en: 'Wet lab lead' }
    },
    {
      id: 'm5', kind: 'bar', track: 'wet', from: '2027-05-03', to: '2027-08-31',
      zh: 'M5　應用端反應　n ≥ 9', en: 'M5 · Response at the application end, n ≥ 9',
      needs: ['m2'], gate: 'G5',
      delivers: { zh: '產物在真正要用的地方有沒有效果。這一列通常是全季唯一帶統計的生物數據，因為它最便宜。', en: 'Whether the product does anything where it is meant to be used. This row is usually the season’s only biological data with statistics, because it is the cheapest.' },
      pass: { zh: '相對兩個對照（未處理、以及不含產物的介質）有顯著差異，n ≥ 9。', en: 'A significant difference against two controls — untreated, and the carrier without the product — at n ≥ 9.' },
      owner: { zh: '濕實驗組長', en: 'Wet lab lead' }
    },
    {
      id: 'm6', kind: 'bar', track: 'wet', from: '2027-07-05', to: '2027-09-17',
      zh: 'M6　同型批次 ×3', en: 'M6 · Three runs of the same kind', crit: true,
      needs: ['gate3'], gate: 'G5',
      delivers: { zh: '同一個條件做三次，不是三個條件各做一次。', en: 'The same condition three times, not three conditions once each.' },
      pass: { zh: '三個同型批次完成，其中一個是無質體的對照批次。', en: 'Three runs of the same kind, one of them the plasmid-free control run.' },
      owner: { zh: '濕實驗組長', en: 'Wet lab lead' }
    },
    {
      id: 'redo', kind: 'bar', track: 'wet', from: '2027-09-01', to: '2027-09-30',
      zh: '重做與補洞', en: 'Repeats and gap-filling',
      needs: ['gate4'],
      delivers: { zh: '閘門四點名的缺口，只補得完的那幾個。', en: 'The gaps gate four named, and only the ones that can actually be closed.' },
      pass: { zh: '沒有新開的實驗線。這個月只做重複，不做新題。', en: 'No new experimental lines. This month repeats; it does not explore.' },
      owner: { zh: '濕實驗組長', en: 'Wet lab lead' }
    },

    /* ---- hardware --------------------------------------------------------- */
    {
      id: 'hw-build', kind: 'bar', track: 'hw', from: '2027-02-15', to: '2027-04-16',
      zh: '儀器設計與製作', en: 'Instrument design and build',
      needs: ['pk'], gate: 'G7',
      delivers: { zh: '三台以內，每一台都答得出「少了它哪一列量測做不到」。', en: 'Three at most, each able to name the measurement row that dies without it.' },
      pass: { zh: '每台都有料件清單與價格，而且市售替代品的價格也查好了。', en: 'Each has a costed parts list, and the price of the commercial alternative is known.' },
      owner: { zh: '硬體組長', en: 'Hardware lead' }
    },
    {
      id: 'hw-val', kind: 'bar', track: 'hw', from: '2027-04-19', to: '2027-05-31',
      zh: '校正與驗證', en: 'Calibration and validation', crit: true,
      needs: ['hw-build'], gate: 'G7',
      delivers: { zh: '自製儀器的數字有沒有軸：拿什麼標準品、跟哪一台商用儀器比、差多少。', en: 'Whether the home-built instrument’s numbers have an axis: which standard, which commercial instrument, and how far apart.' },
      pass: { zh: '兩種獨立標準品，與商用儀器做過斜率與截距檢定，差異寫出來而不是修掉。', en: 'Two independent standards, a slope-and-intercept test against a commercial instrument, and the difference published rather than corrected away.' },
      owner: { zh: '硬體組長', en: 'Hardware lead' }
    },
    {
      id: 'hw-int', kind: 'bar', track: 'hw', from: '2027-05-10', to: '2027-06-30',
      zh: '系統整合與連續運轉', en: 'System integration and continuous running', crit: true,
      needs: ['hw-val'], gate: 'G4',
      delivers: { zh: '整套系統第一次自己跑完預定時長。', en: 'The whole system running its planned duration on its own for the first time.' },
      pass: { zh: '一次無人值守的完整批次，全程有紀錄，安全連鎖沒有被繞過。', en: 'One complete unattended run, logged end to end, with the interlocks never bypassed.' },
      owner: { zh: '硬體組長', en: 'Hardware lead' }
    },
    {
      id: 'hw-doc', kind: 'bar', track: 'hw', from: '2027-06-01', to: '2027-09-30',
      zh: '組裝指南與料件清單', en: 'Assembly guides and parts lists',
      needs: ['hw-build'], gate: 'G10',
      delivers: { zh: '別人照著做得出來的文件。這是硬體獎真正在看的東西。', en: 'Documents someone else can build from. This is what a hardware award actually looks at.' },
      pass: { zh: '每台儀器一份指南、一份含價格的料件清單、一份 3D 檔或電路檔。', en: 'Per instrument: a guide, a costed parts list, and the print or circuit files.' },
      owner: { zh: '硬體組長', en: 'Hardware lead' }
    },
    {
      id: 'hw-out', kind: 'bar', track: 'hw', from: '2027-08-02', to: '2027-09-15',
      zh: '外部自建測試', en: 'Outside builders',
      needs: ['hw-doc'], gate: 'G10',
      delivers: { zh: '找兩個隊外的人照指南自己做一台。他們卡住的地方就是指南要改的地方。', en: 'Two people outside the team build one from the guide. Where they get stuck is what the guide has to fix.' },
      pass: { zh: '至少兩位外部建造者完成，指南因此改過至少三處。', en: 'At least two outside builds finished, and at least three changes to the guide because of them.' },
      owner: { zh: '硬體組長', en: 'Hardware lead' }
    },

    /* ---- dry lab ---------------------------------------------------------- */
    {
      id: 'prereg', kind: 'bar', track: 'dry', from: '2027-03-01', to: '2027-04-30',
      zh: '預先登記', en: 'Pre-registration', crit: true,
      gate: 'G5',
      delivers: { zh: '在量測之前，把預期值與判準寫進版本控制並留下時間戳。', en: 'Before measuring, commit the expected values and the decision rules to version control with a timestamp.' },
      pass: { zh: '至少六項可被推翻的預測已提交，而且提交日期早於第一筆對應數據。', en: 'At least six falsifiable predictions committed, with a commit date earlier than the first matching data point.' },
      owner: { zh: '乾實驗組長', en: 'Dry lab lead' }
    },
    {
      id: 'model', kind: 'bar', track: 'dry', from: '2027-04-05', to: '2027-07-02',
      zh: '模型第一版', en: 'The model, first version',
      needs: ['m1'], gate: 'G7',
      delivers: { zh: '一個在實驗之前給出預測的模型，不是把已有數據畫漂亮的模型。', en: 'A model that predicts before the experiment, not one that draws the data you already have.' },
      pass: { zh: '模型輸出一個可以被下一次實驗推翻的數字，而且那個數字寫在預先登記裡。', en: 'The model outputs a number the next experiment could overturn, and that number sits inside the pre-registration.' },
      owner: { zh: '乾實驗組長', en: 'Dry lab lead' }
    },
    {
      id: 'fw', kind: 'bar', track: 'dry', from: '2027-05-03', to: '2027-07-16',
      zh: '韌體與安全連鎖', en: 'Firmware and interlocks',
      needs: ['hw-build'], gate: 'G7',
      delivers: { zh: '讓硬體可以無人值守運轉的那一層。連鎖寫在韌體，不是寫在介面。', en: 'The layer that lets the hardware run unattended. The interlocks live in firmware, not in the interface.' },
      pass: { zh: '超過門檻會停機並閂鎖，重開機不會讓它在無人的房間裡自己重啟。', en: 'Over threshold it stops and latches, and a reboot cannot restart it in an empty room.' },
      owner: { zh: '乾實驗組長', en: 'Dry lab lead' }
    },
    {
      id: 'replay', kind: 'bar', track: 'dry', from: '2027-08-02', to: '2027-09-15',
      zh: '預先登記回測', en: 'Testing the pre-registration',
      needs: ['prereg', 'm6'], gate: 'G10',
      delivers: { zh: '把當初的預測拿出來，對實際數據跑一次，公布被推翻的那幾項。', en: 'Take the predictions back out, run them against the real data, and publish the ones that were overturned.' },
      pass: { zh: '每一項預測都有「成立／不成立」的結論與重算腳本。被推翻的項目留在頁面上。', en: 'Every prediction ends in supported or not supported, with a replay script. The overturned ones stay on the page.' },
      owner: { zh: '乾實驗組長', en: 'Dry lab lead' }
    },

    /* ---- human practices --------------------------------------------------- */
    {
      id: 'hp-pre', kind: 'bar', track: 'hp', from: '2026-12-19', to: '2027-02-05',
      zh: '定案前三場對話', en: 'Three conversations before the commitment',
      gate: 'G8',
      delivers: { zh: '三個我們自己答不出來的問題，拿去問三個人。其中一位是潛在使用者，不能全是教授。', en: 'Three questions the team cannot answer itself, put to three people. One of them is a potential user; they cannot all be professors.' },
      pass: { zh: '每場留下「他說了什麼／我們因此改了什麼」兩行。', en: 'Each leaves two lines: what they said, what we changed.' },
      owner: { zh: '人文組長', en: 'Human practices lead' }
    },
    {
      id: 'hp-loop', kind: 'bar', track: 'hp', from: '2027-02-08', to: '2027-09-30',
      zh: '持續訪談循環', en: 'The continuing loop',
      needs: ['hp-pre'], gate: 'G8',
      delivers: { zh: '每一次設計轉折都要指得出人、日期與那句話。', en: 'Every design turn is nameable with a person, a date and a sentence.' },
      pass: { zh: '到九月累積五到六個可指名日期的設計轉折。數量不是重點，改動才是。', en: 'Five or six dated design turns by September. The count is not the point; the changes are.' },
      owner: { zh: '人文組長', en: 'Human practices lead' }
    },
    {
      id: 'hp-law', kind: 'bar', track: 'hp', from: '2027-02-08', to: '2027-04-30',
      zh: '法規路徑確認', en: 'Settling the regulatory route',
      gate: 'G8',
      delivers: { zh: '類別名稱、法源名稱、大約的審查時程。類別選擇會往回決定濕實驗的終點指標。', en: 'The category, the statute and the approximate clock. The category reaches back and sets the wet lab’s endpoints.' },
      pass: { zh: '類別定下來，而且 M5 的終點指標已經按那個類別改寫。', en: 'The category is fixed and M5’s endpoints have been rewritten to match it.' },
      owner: { zh: '人文組長', en: 'Human practices lead' }
    },
    {
      id: 'hp-user', kind: 'bar', track: 'hp', from: '2027-08-02', to: '2027-09-30',
      zh: '使用者試用', en: 'User trial',
      needs: ['hw-int'], gate: 'G3',
      delivers: { zh: '讓真正的使用者碰一次東西，不是再訪談一位專家。', en: 'A real user touches the thing, instead of one more expert interview.' },
      pass: { zh: '至少一位非專家使用者操作過，並且留下他卡住的地方。', en: 'At least one non-expert user has operated it, and where they got stuck is written down.' },
      owner: { zh: '人文組長', en: 'Human practices lead' }
    },

    /* ---- record and deliverables -------------------------------------------- */
    {
      id: 'rota', kind: 'bar', track: 'doc', from: '2026-12-12', to: '2027-10-21',
      zh: '每週紀錄值班', en: 'The weekly record rota', crit: true,
      gate: 'G6',
      delivers: { zh: '每週一人，把那一週變成一頁：日期、目的、材料、結果、照片、下一步。', en: 'One person a week turns that week into one page: date, purpose, materials, result, photographs, next step.' },
      pass: { zh: '到凍結日為止沒有任何一週是空的。十月重建紀錄的成本遠高於一整季的值班。', en: 'No empty weeks by freeze day. Rebuilding the record in October costs far more than a season of rota.' },
      owner: { zh: '文件值班（輪流）', en: 'Record rota, rotating' }
    },
    {
      id: 'parts', kind: 'bar', track: 'doc', from: '2027-06-01', to: '2027-10-21',
      zh: 'Registry 零件文件', en: 'Registry part documentation', crit: true,
      needs: ['assemble'], gate: 'G10',
      delivers: { zh: '零件頁的文件寫在 Registry 上，不是寫在 wiki 上。寫錯地方不會被評分。', en: 'Part documentation on the Registry, not on the wiki. Filed in the wrong place it is not evaluated.' },
      pass: { zh: '凍結日之前所有要被評分的零件與文件都完成。這一項最常被留到最後一週，而它和 wiki 同一天凍結。', en: 'Everything meant for judging is finished before freeze day. This is the item most often left to the last week, and it freezes on the same day as the wiki.' },
      owner: { zh: '文件組長', en: 'Documentation lead' }
    },
    {
      id: 'wiki', kind: 'bar', track: 'doc', from: '2027-07-01', to: '2027-10-21',
      zh: 'wiki 搭建與寫作', en: 'Building and writing the wiki',
      needs: ['rota'], gate: 'G10',
      delivers: { zh: '每一項工作都要先決定它最後出現在哪一個標準網址上。', en: 'Every work item decides in advance which Standard URL it will finally appear on.' },
      pass: { zh: '九月底頁面骨架與圖的位置就位，十月只填字不改結構。', en: 'By the end of September the page skeletons and figure slots exist; October fills words into a structure it does not change.' },
      owner: { zh: '文件組長', en: 'Documentation lead' }
    },
    {
      id: 'judge', kind: 'bar', track: 'doc', from: '2027-10-21', to: '2027-11-12',
      zh: '判讀準備', en: 'Judging preparation',
      needs: ['wiki'], gate: 'G10',
      delivers: { zh: '每個主張的「數字·對照·n·邊界」四件一組，以及我們絕不說的那幾句話。', en: 'Per claim: number, control, n and boundary as one set, plus the sentences the team will refuse to say.' },
      pass: { zh: '每位隊員都能講出三個最強的數字，以及它們各自的限制。', en: 'Every member can state the three strongest numbers and what each one does not cover.' },
      owner: { zh: '全隊', en: 'Whole team' }
    },

    /* ---- iGEM deadlines ----------------------------------------------------- */
    { id: 'd-lock', kind: 'due', track: 'team', on: '2027-02-05', zh: '定案（農曆年前）', en: 'Commitment, before Lunar New Year',
      note2026: null,
      delivers: { zh: '這是隊伍自己的日期，不是 iGEM 的。定在年前，寒假那幾週才用得到。', en: 'This date is the team’s own, not iGEM’s. Before the holiday, so the holiday weeks are usable.' },
      owner: { zh: '全隊', en: 'Whole team' } },
    { id: 'd-reg', kind: 'due', track: 'doc', on: '2027-06-04', zh: '報名最終截止', en: 'Registration finally closes',
      note2026: '2026-06-04',
      delivers: { zh: '名冊與人員要定下來。', en: 'The roster has to settle.' }, owner: { zh: 'PI', en: 'PI' } },
    { id: 'd-vill', kind: 'due', track: 'doc', on: '2027-06-24', zh: '村落與題目資訊', en: 'Village choice, title and description',
      note2026: '2026-06-24',
      delivers: { zh: '六月就要公開說出題目是什麼。二月的一句話主張到這裡要還站得住。', en: 'By June the project is stated publicly. February’s one-sentence claim has to still hold.' },
      owner: { zh: '全隊', en: 'Whole team' } },
    { id: 'd-saf1', kind: 'due', track: 'doc', on: '2027-07-01', zh: '安全表單初版', en: 'Preliminary safety form',
      note2026: '2026-07-01',
      delivers: { zh: 'White List 的問題在這裡被攔下來，不是在十月。', en: 'White List problems surface here, not in October.' },
      owner: { zh: '安全負責人', en: 'Safety officer' } },
    { id: 'd-promo', kind: 'due', track: 'doc', on: '2027-08-12', zh: '兩分鐘宣傳影片', en: 'Two-minute promotion video',
      note2026: '2026-08-12',
      delivers: { zh: '八月中就要有畫面可拍，所以實驗不能全排在九月。', en: 'There must be something to film by mid-August, so the bench cannot all sit in September.' },
      owner: { zh: '文件組長', en: 'Documentation lead' } },
    { id: 'd-roster', kind: 'due', track: 'doc', on: '2027-09-16', zh: '名冊凍結', en: 'Roster freeze',
      note2026: '2026-09-16',
      delivers: { zh: '之後不能加人。', en: 'No new members after this.' }, owner: { zh: 'PI', en: 'PI' } },
    { id: 'd-saf2', kind: 'due', track: 'doc', on: '2027-10-07', zh: '安全表單定版（PI 送交）', en: 'Final safety form, submitted by a PI',
      note2026: '2026-10-07',
      delivers: { zh: '沒送可能失去資格。', en: 'Not submitting risks disqualification.' }, owner: { zh: 'PI', en: 'PI' } },
    { id: 'd-freeze', kind: 'due', track: 'doc', on: '2027-10-21', zh: '凍結日：五樣同時封', en: 'Freeze day: five things close at once',
      note2026: '2026-10-21', big: true,
      delivers: { zh: 'wiki、判讀表單、貢獻者表、Registry 零件、軟體倉庫，同一天封掉。零件文件也在這天停。', en: 'Wiki, judging form, attributions, Registry parts and the software repository all close. Part documentation stops here too.' },
      owner: { zh: '全隊', en: 'Whole team' } },
    { id: 'd-pres', kind: 'due', track: 'doc', on: '2027-10-28', zh: '15 分鐘簡報影片', en: 'Fifteen-minute presentation video',
      note2026: '2026-10-28',
      delivers: { zh: '凍結後唯一還能改的對外說法。', en: 'The only outward-facing account you can still change after the freeze.' },
      owner: { zh: '全隊', en: 'Whole team' } },
    { id: 'd-jam', kind: 'due', track: 'doc', on: '2027-11-13', zh: 'Jamboree', en: 'Jamboree',
      note2026: '2026-11-13',
      delivers: { zh: '判讀場次是 25 分鐘的現場問答。', en: 'The judging session is 25 minutes of live questions.' },
      owner: { zh: '全隊', en: 'Whole team' } }
  ];

  /* ------------------------------------------------------------- helpers -- */
  var D = function (s) { return new Date(s + 'T00:00:00Z').getTime(); };
  var T0 = D(SPAN.from), T1 = D(SPAN.to), TOTAL = T1 - T0;
  var pct = function (s) { return ((D(s) - T0) / TOTAL) * 100; };
  var byId = {};
  SEASON.forEach(function (it) { byId[it.id] = it; });
  var trackById = {};
  TRACKS.forEach(function (t) { trackById[t.id] = t; });

  var MONTHS = (function () {
    var out = [], d = new Date(T0);
    while (d.getTime() < T1) {
      var y = d.getUTCFullYear(), m = d.getUTCMonth();
      out.push({ y: y, m: m, at: ((Date.UTC(y, m, 1) - T0) / TOTAL) * 100 });
      d = new Date(Date.UTC(y, m + 1, 1));
    }
    return out;
  }());
  var MN_EN = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

  function bi(zh, en, cls) {
    return '<span class="l-zh' + (cls ? ' ' + cls : '') + '">' + zh + '</span>' +
           '<span class="l-en' + (cls ? ' ' + cls : '') + '">' + en + '</span>';
  }
  function esc(s) { return String(s).replace(/[&<>]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]; }); }

  /* ------------------------------------------------------------- the chart -- */
  var chart = document.getElementById('chart');
  if (!chart) return;

  var html = '';

  /* header: month scale */
  html += '<div class="gt__head"><div class="gt__lab gt__lab--head"></div><div class="gt__lane gt__lane--head">';
  MONTHS.forEach(function (mo, i) {
    var next = MONTHS[i + 1] ? MONTHS[i + 1].at : 100;
    html += '<div class="gt__mo" style="left:' + mo.at + '%;width:' + (next - mo.at) + '%">' +
            '<b>' + bi(MN_EN[mo.m], MN_EN[mo.m]) + '</b>' +
            (mo.m === 0 || i === 0 ? '<i>' + mo.y + '</i>' : '') + '</div>';
  });
  html += '</div></div>';

  /* rows, grouped by track */
  TRACKS.forEach(function (tr) {
    var items = SEASON.filter(function (it) { return it.track === tr.id; });
    if (!items.length) return;
    html += '<div class="gt__grp" style="--tc:' + tr.c + '">' + bi(tr.zh, tr.en) + '</div>';
    items.forEach(function (it) {
      var cls = ['gt__row'];
      if (it.crit) cls.push('is-crit');
      cls.push('k-' + it.kind);
      html += '<div class="' + cls.join(' ') + '" data-id="' + it.id + '" data-track="' + tr.id + '"' +
              (it.crit ? ' data-crit="1"' : '') + ' data-kind="' + it.kind + '" style="--tc:' + tr.c + '">';
      html += '<div class="gt__lab">' + bi(esc(it.zh), esc(it.en)) +
              (it.crit ? '<span class="gt__cf" title="critical path">●</span>' : '') + '</div>';
      html += '<div class="gt__lane">';
      if (it.kind === 'bar') {
        var a = pct(it.from), b = pct(it.to);
        html += '<button class="gt__bar" type="button" data-pick="' + it.id + '" ' +
                'style="left:' + a + '%;width:' + Math.max(b - a, 1.2) + '%">' +
                '<span class="gt__barl">' + bi(esc(it.zh), esc(it.en)) + '</span></button>';
      } else {
        var p = pct(it.on);
        html += '<button class="gt__pt ' + (it.kind === 'gate' ? 'gt__pt--gate' : 'gt__pt--due') +
                (it.big ? ' gt__pt--big' : '') + (p > 72 ? ' gt__pt--rev' : '') +
                '" type="button" data-pick="' + it.id + '" ' +
                'style="left:' + p + '%">' +
                '<span class="gt__ptm"></span><span class="gt__ptl">' + bi(esc(it.zh), esc(it.en)) + '</span></button>';
      }
      html += '</div></div>';
    });
  });

  /* overlay rules: month separators, gates, freeze day */
  var rules = '<div class="gt__rules" aria-hidden="true">';
  MONTHS.forEach(function (mo) { rules += '<i class="gt__ml" style="left:' + mo.at + '%"></i>'; });
  SEASON.filter(function (it) { return it.kind === 'gate'; }).forEach(function (g) {
    rules += '<i class="gt__gl" style="left:' + pct(g.on) + '%"></i>';
  });
  var fr = byId['d-freeze'];
  if (fr) rules += '<i class="gt__fl" style="left:' + pct(fr.on) + '%"></i>';
  var now = Date.now();
  if (now > T0 && now < T1) {
    rules += '<i class="gt__now" style="left:' + (((now - T0) / TOTAL) * 100) + '%"></i>';
  }
  rules += '</div>';

  chart.innerHTML = '<div class="gt">' + html + rules + '</div>';

  /* ------------------------------------------------------------- detail --- */
  var panel = document.getElementById('detail');

  function chainOf(id) {
    var seen = {}, stack = [id];
    while (stack.length) {
      var cur = stack.pop();
      if (seen[cur]) continue;
      seen[cur] = 1;
      var it = byId[cur];
      if (it && it.needs) it.needs.forEach(function (n) { stack.push(n); });
    }
    return seen;
  }

  function fmt(iso) {
    var p = iso.split('-');
    return { zh: p[0] + ' 年 ' + (+p[1]) + ' 月 ' + (+p[2]) + ' 日', en: (+p[2]) + ' ' + MN_EN[+p[1] - 1] + ' ' + p[0] };
  }

  function render(id) {
    var it = byId[id];
    if (!it) return;
    var tr = trackById[it.track];
    var when = it.kind === 'bar'
      ? { zh: fmt(it.from).zh + ' → ' + fmt(it.to).zh, en: fmt(it.from).en + ' → ' + fmt(it.to).en }
      : fmt(it.on);

    var h = '';
    h += '<div class="dt__top" style="--tc:' + tr.c + '">';
    h += '<span class="dt__kind">' +
         (it.kind === 'gate' ? bi('GO / NO-GO', 'GO / NO-GO')
          : it.kind === 'due' ? bi('繳交期限', 'DEADLINE')
          : bi('工作', 'WORK')) + '</span>';
    h += '<span class="dt__track">' + bi(tr.zh, tr.en) + '</span>';
    if (it.crit) h += '<span class="dt__crit">' + bi('關鍵路徑', 'critical path') + '</span>';
    if (it.gate) h += '<span class="dt__gate">' + it.gate + '</span>';
    h += '</div>';
    h += '<h3 class="dt__name">' + bi(esc(it.zh), esc(it.en)) + '</h3>';
    h += '<p class="dt__when">' + bi(when.zh, when.en) + '</p>';

    h += '<div class="dt__rows">';
    h += '<div class="dt__r"><h6>' + bi('交付什麼', 'What it delivers') + '</h6><p>' + bi(it.delivers.zh, it.delivers.en) + '</p></div>';
    if (it.pass) h += '<div class="dt__r"><h6>' + bi(it.kind === 'gate' ? '通過條件' : '完成條件', it.kind === 'gate' ? 'Pass condition' : 'Done when') + '</h6><p>' + bi(it.pass.zh, it.pass.en) + '</p></div>';
    if (it.fail) h += '<div class="dt__r dt__r--fail"><h6>' + bi('不通過怎麼辦', 'If it does not pass') + '</h6><p>' + bi(it.fail.zh, it.fail.en) + '</p></div>';
    if (it.owner) h += '<div class="dt__r"><h6>' + bi('負責', 'Owner') + '</h6><p>' + bi(it.owner.zh, it.owner.en) + '</p></div>';

    if (it.needs && it.needs.length) {
      h += '<div class="dt__r"><h6>' + bi('必須先有', 'Cannot start without') + '</h6><p class="dt__links">';
      it.needs.forEach(function (n) {
        var u = byId[n];
        if (u) h += '<button class="dt__go" type="button" data-pick="' + n + '">' + bi(esc(u.zh), esc(u.en)) + '</button>';
      });
      h += '</p></div>';
    }
    var blocks = SEASON.filter(function (o) { return o.needs && o.needs.indexOf(id) > -1; });
    if (blocks.length) {
      h += '<div class="dt__r"><h6>' + bi('它卡住什麼', 'What waits on it') + '</h6><p class="dt__links">';
      blocks.forEach(function (o) {
        h += '<button class="dt__go" type="button" data-pick="' + o.id + '">' + bi(esc(o.zh), esc(o.en)) + '</button>';
      });
      h += '</p></div>';
    }
    if (it.note2026) {
      h += '<div class="dt__r dt__r--note"><h6>' + bi('這個日期怎麼來的', 'Where this date comes from') + '</h6><p>' +
           bi('依 2026 賽季的 ' + fmt(it.note2026).zh + ' 推估。2027 公布後要換成當季日期。',
              'Estimated from ' + fmt(it.note2026).en + ' in the 2026 season. Replace it with 2027’s date once published.') +
           '</p></div>';
    }
    h += '</div>';

    panel.innerHTML = h;
    panel.hidden = false;

    var lit = chainOf(id);
    chart.querySelector('.gt').classList.add('is-focus');
    Array.prototype.forEach.call(chart.querySelectorAll('.gt__row'), function (r) {
      r.classList.toggle('is-lit', !!lit[r.getAttribute('data-id')]);
      r.classList.toggle('is-on', r.getAttribute('data-id') === id);
    });
  }

  function clear() {
    panel.hidden = true;
    panel.innerHTML = '';
    var g = chart.querySelector('.gt');
    g.classList.remove('is-focus');
    Array.prototype.forEach.call(chart.querySelectorAll('.gt__row'), function (r) {
      r.classList.remove('is-lit', 'is-on');
    });
  }

  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-pick]');
    if (b) {
      var id = b.getAttribute('data-pick');
      var row = chart.querySelector('.gt__row.is-on');
      if (row && row.getAttribute('data-id') === id && !e.target.closest('.dt__go')) { clear(); return; }
      render(id);
      if (e.target.closest('.dt__go')) {
        var t = chart.querySelector('.gt__row.is-on');
        if (t) t.scrollIntoView({ block: 'center' });
      }
      return;
    }
    if (e.target.closest('[data-clear]')) clear();
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') clear(); });

  /* -------------------------------------------------------------- filter -- */
  var FILTERS = [
    { id: 'all',  zh: '全部', en: 'Everything' },
    { id: 'crit', zh: '只看關鍵路徑', en: 'Critical path only' },
    { id: 'gate', zh: '只看閘門與期限', en: 'Gates and deadlines' }
  ].concat(TRACKS.map(function (t) { return { id: 'tr:' + t.id, zh: t.zh, en: t.en, c: t.c }; }));

  var fb = document.getElementById('filters');
  if (fb) {
    fb.innerHTML = FILTERS.map(function (f, i) {
      return '<button class="fchip' + (i === 0 ? ' is-on' : '') + '" type="button" data-f="' + f.id + '"' +
             (f.c ? ' style="--fc:' + f.c + '"' : '') + '>' + bi(f.zh, f.en) + '</button>';
    }).join('');
    fb.addEventListener('click', function (e) {
      var b = e.target.closest('[data-f]');
      if (!b) return;
      Array.prototype.forEach.call(fb.querySelectorAll('.fchip'), function (c) { c.classList.remove('is-on'); });
      b.classList.add('is-on');
      var f = b.getAttribute('data-f');
      clear();
      Array.prototype.forEach.call(chart.querySelectorAll('.gt__row'), function (r) {
        var show = f === 'all'
          || (f === 'crit' && r.getAttribute('data-crit') === '1')
          || (f === 'gate' && r.getAttribute('data-kind') !== 'bar')
          || (f.indexOf('tr:') === 0 && r.getAttribute('data-track') === f.slice(3));
        r.hidden = !show;
      });
      Array.prototype.forEach.call(chart.querySelectorAll('.gt__grp'), function (g) {
        var n = g.nextElementSibling, any = false;
        while (n && n.classList.contains('gt__row')) { if (!n.hidden) any = true; n = n.nextElementSibling; }
        g.hidden = !any;
      });
    });
  }

  /* ---------------------------------------------------------- gate cards -- */
  var gc = document.getElementById('gatecards');
  if (gc) {
    gc.innerHTML = SEASON.filter(function (it) { return it.kind === 'gate'; }).map(function (g) {
      var f = fmt(g.on);
      return '<article class="gcard">' +
        '<p class="gcard__when">' + bi(f.zh, f.en) + '</p>' +
        '<h3 class="gcard__name">' + bi(esc(g.zh), esc(g.en)) + '</h3>' +
        '<p class="gcard__q">' + bi(g.delivers.zh, g.delivers.en) + '</p>' +
        '<div class="gcard__b gcard__b--pass"><h6>' + bi('通過條件', 'Pass condition') + '</h6><p>' + bi(g.pass.zh, g.pass.en) + '</p></div>' +
        '<div class="gcard__b gcard__b--fail"><h6>' + bi('不通過就這樣做', 'If it does not pass, do this') + '</h6><p>' + bi(g.fail.zh, g.fail.en) + '</p></div>' +
        '<p class="gcard__o">' + bi('負責：' + g.owner.zh, 'Owner: ' + g.owner.en) + '</p>' +
        '</article>';
    }).join('');
  }

  /* ------------------------------------------------------- deadline table -- */
  var dt = document.getElementById('duetable');
  if (dt) {
    dt.innerHTML = SEASON.filter(function (it) { return it.kind === 'due'; }).map(function (d) {
      var f = fmt(d.on);
      return '<tr' + (d.big ? ' style="background:var(--amber-100)"' : '') + '>' +
        '<td class="nowrap"><b>' + bi(f.zh, f.en) + '</b></td>' +
        '<td><b>' + bi(esc(d.zh), esc(d.en)) + '</b></td>' +
        '<td>' + bi(d.delivers.zh, d.delivers.en) + '</td>' +
        '<td class="nowrap">' + bi(d.owner.zh, d.owner.en) + '</td>' +
        '<td class="nowrap">' + (d.note2026 ? bi(fmt(d.note2026).zh.replace(/^\d+ 年 /, '2026 / '), fmt(d.note2026).en) : bi('隊伍自訂', 'team’s own')) + '</td>' +
        '</tr>';
    }).join('');
  }

  /* counts for the stat strip */
  var c = { bar: 0, gate: 0, due: 0, crit: 0 };
  SEASON.forEach(function (it) { c[it.kind]++; if (it.crit) c.crit++; });
  ['bar', 'gate', 'due', 'crit'].forEach(function (k) {
    var el = document.querySelector('[data-count="' + k + '"]');
    if (el) el.textContent = c[k];
  });
}());
