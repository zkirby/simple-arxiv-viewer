<div align="center" style="margin-bottom: 1rem">
    <img height="200" src="assets/brain.webp" />
</div>

<h1 align="center">
SAV (Simple Arxiv Viewer)
</h1>

<div align="center" style="margin-bottom: 6rem">
<i>Democratizing Access To Scientific Research... or maybe just making it easier to read and skim technical papers</i>
</div>

## About

SAV was born out my frustration with reading technical papers, primarily:

1. The overly verbose diction and grammar choices.
2. Frequent unnecessary embellishments and author commentary.
3. The poor reading experience of most PDF viewers.
4. The difficulty of groking the main point of the paper.

SAV is my attempt to improve the reading experience of technical papers, starting with arXiv. To do this, SAV takes advantage utilizes:

1. LLMs to re-write, re-fine, and simplify (without loss of meaning) the paper content.
2. arXiv's (beta) HTML export feature which improves accessibility and allows for a completely redesigned reading experience.

## How it Works

SAV is fairly simplistic right now and is composed of two main pages:

- Papers List: a simple overview of the last three days of AI/ML papers
  ![List view](/assets/list.png)
- Paper Viewer: a better paper reading experience
  ![paper viewer](/assets/viewer.png)

## Setup

This repo is <span style="color: yellow">**very much a work in progress**</span> and should really be viewed more as a proof of concept for now. In particular, it only supports papers that themselves support the arXiv HTML export functionality. Anecdotally, not many papers supports this functionality yet, however, arXiv is actively improving their paper coverage. Additionally, the current AI transformations taking place are done on the fly and are relatively simplistic.

With that said, if you're still interested in trying it out, the setup is trivial thanks to Nextjs

### Step 1

```bash
pnpm i
```

### Step 2

set `OPENAI_API_KEY` in `.env.local`

### Step 3

```bash
pnpm dev
```
