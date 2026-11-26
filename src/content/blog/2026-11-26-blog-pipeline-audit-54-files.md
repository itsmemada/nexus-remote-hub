---
title: "I Audited the Pipeline That Writes This Blog: 54 Files, 13 Not Quite Articles"
description: "Doctor.sh returned 43 passes and one failure on the writer job, so I counted every file, every idea and every duplicate in the blog repo. The numbers were worse than the failed check."
pubDate: 2026-11-26
updatedDate: 2026-11-26
tags: ["homelab", "content-pipeline", "astro", "automation", "writing"]
draft: false
image:
  url: /images/2026-11-26-blog-pipeline-audit-54-files-hero.jpg
  alt: "A terminal window showing a green checklist stopping on one red failed line"
---

On Thursday 26 November 2026, at 10:00 CET, I ran `scripts/doctor.sh` on the Oracle VPS that hosts this blog. It printed 43 passed, 1 failed, and the failing line was about me: `WRITER FAILED — the run finished 9571 min after the newest article was written`. In other words, the scheduled writer job that was supposed to produce this week's post had not produced anything on time, and the only thing the check could tell me was a time difference of roughly six and a half days.

That number annoyed me more than it should have. The pipeline has three moving parts and I built all of them: `content_intelligence.py` proposes topics on Monday morning, the writer turns one idea into a draft on Thursday, and a deploy script publishes whatever passes validation on Thursday evening. If a check fails, it should point at the part that broke. This one only compares two file timestamps, so it can tell me that something did not happen and nothing about why. Instead of debugging the clock, I sat down and counted everything the pipeline had produced since the beginning.

## What 54 markdown files actually contain

The blog repo holds 54 markdown files. Strip the frontmatter and count the body of each one, and the total is 62,251 words, an average of 1,152 per file. That average is a lie told by arithmetic, because the distribution underneath it is nothing like a normal curve: a handful of 2,000-word posts sit next to files that contain a title, a description and nothing but a placeholder outline heading.

Nine files are exactly that shape. They are 141 to 154 words long, they carry `draft: true`, and they were generated during a batch run on 27 and 28 September 2026, then withdrawn from publication on 1 October. Withdrawn is not the same as deleted. They are still in the repo, still counted by my own diagnostic as "9 unpublished drafts", and still visible to anyone who clones the site. Four more files are under 200 words and not marked as drafts at all — leftovers from a generator that was allowed to publish what it had.

Then there are the duplicates. Five titles appear twice in those 54 files: the context-switching post, the 47-item packing list, the insurance guide, the async-first piece, and the "hidden cost of free nomad visas" post. One of each pair is a real article and the other is a shell, so the site does not show a duplicate to a reader today, but the filesystem does not know the difference between "the draft that got replaced" and "the draft that is the article". Ten of my 54 files are two versions of five posts.

## The thirteen ideas that nobody can write

The engine side is worse. `content/ideas/` currently holds 13 topic files. My instinct was to blame the writer for not producing an article this week; the honest answer is that the writer had nothing to write, and here is the evidence.

Every idea file generated since November follows the same template, and one section of it is a checklist titled "Material zrodlowy": the opening episode with a date and a place, three numbers from my own measurements, what went wrong, what I would do differently, and which vault files back it up. Six of the 13 carry that checklist with five boxes and zero of them filled in. The other seven were generated before the template gained the section, so they do not even ask the question. Below that checklist sit facts pulled from other people's pages — an EU freelancer statistics article, a Polish freelancing report, a law firm's blog post about public procurement. One topic, the subcontracting piece, rests entirely on numbers like 2 million PLN, 0.5% of contract value and 50,000 PLN, scraped from three law firms. I have never bid on a public tender, never registered for VAT OSS, and never negotiated a jurisdiction clause.

The thirteenth file is honest about itself: it is labelled SZKIELET, zero sources, zero facts, and tells the writer not to touch it. So the real state of the queue is 13 files, 1 correctly blocked, and 12 that look ready and would produce an article in which I claim experience I do not have. That is precisely the failure the pillars document describes, and the writer job refusing to write was the correct behaviour, not a bug.

## Why the gate has to be a file, not a mood

I put the rule into `content/PILLARS.md` on 25 October 2026, and then put a mechanical check into the deploy script as Check 8. The pillars file defines four areas where this blog is allowed to exist: building Card Nomad, running Nexus404 as a service business, looking for remote work from Poland without a CV or portfolio, and running this homelab with agents in it. The test is not "is this interesting", it is "can I name the episode, the date and three numbers I measured myself".

The gate already has a track record, which is why I trust it more than my own enthusiasm. Two of the last three posts came straight out of the lead project: 1,293 rows in a CSV, 122 rows I re-checked by hand, 83 emails sent across nine dates. The pricing post from 23 November came from that same dataset, and the WordPress-versus-Astro post from 19 November came from a scan of 122 domains where 38 turned out to be WordPress installs. None of those numbers needed a citation, because they came out of files I own.

The cadence also changed, and the file listing shows it. Between 1 and 2 October the pipeline published nine files in two days, a week after it published seven more. Since 15 October it has published one post a week: 15 October, 22 October, 29 October, 12 November, 19 November, 23 November. Six posts in six weeks, each one traceable to something I did. That is fewer articles than the batch era, and it is the first time the average word count of a week's output means anything.

## What I am fixing first

Nothing here needs a new tool. Three small cleanups follow from the numbers.

The nine withdrawn shells get deleted rather than kept as drafts, after I check for inbound wikilinks in the vault — a file with `draft: true` is not a backup, it is a liability that makes the diagnostic report nine drafts when the real number is zero. The four sub-200-word live posts get the same treatment or a rewrite, decided per file.

The writer check gets a real failure message. A timestamp difference of 9,571 minutes tells me the job ended late; it does not tell me whether the job crashed, wrote nothing, or wrote something that the gate rejected. A check that cannot name its own cause is a check I will start ignoring within a month, and an ignored check is worse than no check at all.

And the ideas folder stops being a queue. From now on an idea file only enters `content/ideas/` with the material checklist already filled in from my own data, and the generator that produces 12 plausible briefs with empty checklists gets switched off. If next Thursday arrives with an empty folder, the correct output is no article, not an article about the EU freelance market written by someone who has never sent an invoice to a German client.

The uncomfortable part of this audit is that the pipeline worked as designed. It published 45 posts, held back 9 broken ones, and failed exactly one check — the one that measures whether a human with actual material showed up that week. That is the only metric on this blog I cannot automate, and for the last six weeks it has been the one doing the real filtering.
