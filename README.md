# 2027 GEMS Project Pitch Framework

A ten-gate framework for deciding which iGEM project a team commits to in February,
with the 2026 ReLEAF project worked through it end to end.

一套十道門的題目評估架構，用來決定一支 iGEM 隊伍在二月要定案哪一個題目；
後半是完整範例：把 2026 年的 ReLEAF 專案倒回二月，按同一套架構寫成一份提案。

**Live site → https://timmy97-tw.github.io/2027-GEMS-Project-Pitch-Framework/**

---

## What this is / 這是什麼

iGEM is not won by the best idea. It is won by the idea that can still be proved in
October. This site breaks the February commitment into ten gates across four phases.
Each gate asks one question, demands one piece of evidence that must **already exist**,
and is allowed to return a no.

iGEM 不是比誰的想法最好，是比誰的想法到十月能被證明。這份文件把「定案」拆成四個階段、
十道門。每一道門問一個問題、要求一份二月就該存在的證據，並且允許回答「過不了」。

| Page | 中文 | What it holds |
| --- | --- | --- |
| [`index.html`](index.html) | 總覽 | The thesis, the gate map, the February bar in summary, three rules for judging a pitch, and what the 2026 season cost |
| [`framework/`](framework/) | 十道門 | Each gate in full: the question, the evidence required by February, the red flags, how it scores |
| [`releaf/`](releaf/) | ReLEAF 範例 | All ten gates filled with the 2026 ReLEAF project, each February answer set beside what actually happened |
| [`toolkit/`](toolkit/) | 工具包 | The 22-item February bar, the one-page pitch template, the 100-point PK scorecard, the 2026 hindsight ledger, and the nine-week calendar from kick-off to commitment |

## The ten gates / 十道門

| | Gate | 門 | Weight |
| --- | --- | --- | --- |
| **Ⅰ Worth doing** | G1 The claim | 主張 | 10 |
| | G2 Prior art and the increment | 前人與新意 | 10 |
| | G3 Impact and deployability | 影響與落地 | 8 |
| **Ⅱ Can we do it** | G4 The critical path | 關鍵路徑 | 15 |
| | G5 The measurement plan | 量測計畫 | 15 |
| | G6 Resources: equipment, money, people | 資源 | 12 |
| **Ⅲ Scope** | G7 Hardware and software scope | 硬體與軟體範圍 | 8 |
| | G8 Practices and regulation | 人文實踐與法規 | 7 |
| **Ⅳ Harvest** | G9 Risk and kill criteria | 風險與停損 | 8 |
| | G10 Milestones, prizes, paper | 里程碑、獎項、論文 | 7 |

## Notes on the facts

- The iGEM rules cited — the 17 Special Awards and their two categories, the
  three-award cap, the Bronze/Silver/Gold criteria, the White List limit on high-school
  teams, and the deadline shape — are read off the 2026 season at
  [competition.igem.org](https://competition.igem.org/). Names and rules move between
  seasons: check the current season's awards, medals and calendar pages, and that
  season's Judge Handbook, before planning against them.
- The worked example draws on the public 2026 ReLEAF wiki
  ([2026.igem.wiki/gems-taiwan](https://2026.igem.wiki/gems-taiwan/)) and the team's own
  records. Everything in a "what happened / 後來" box was measured after the fact; the
  February pitch itself was written for this teaching document and did not exist at the
  time.

## Running it locally

Static HTML with one stylesheet and one script. No build step.

```bash
python3 -m http.server 4821
```

## Design

The ReLEAF wiki's visual language reduced to one stylesheet: leaf green on white,
Inter on its optical-size axis, hairline cards, and the frosted segmented control from
the Engagement pages. Palette values are copied from the live wiki's `tokens.css`.
Both languages live in one document — prose duplicated into `.l-zh` / `.l-en`, headings
keeping both with the inactive language demoted to a subtitle.

GEMS Taiwan · written 29 October 2026
