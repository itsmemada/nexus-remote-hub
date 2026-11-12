---
title: "I Sent 15 Cold Emails to Polish SMBs. Got 4 Replies, Zero Clients."
description: "My first outbound campaign for Nexus404 — 15 emails, 4 replies, one interested lead, zero conversions. Here's the exact email I sent, what the replies said, and why I'm changing the offer."
pubDate: 2026-10-29
updatedDate: 2026-10-29
tags: ["smallbusiness", "freelance", "sales", "nexus404"]
draft: false
image:
  url: /images/2026-10-29-i-sent-15-cold-emails-got-4-replies-zero-clients-hero.jpg
  alt: "Cold email campaign results dashboard showing 15 sent, 4 replies, 0 clients"
---

October 2026. I sat at my desk in Warsaw with a CSV of 1,360 Polish companies that had broken SSL certificates. I had spent two weeks building a verification script that checked each domain from my home PC — not from a VPS, because Oracle Cloud's IP ranges get blocked by half the Polish hosting providers, giving false "site down" readings. Nine companies flagged as down by the VPS were perfectly alive when I curled them from my laptop. That lesson cost me two days and taught me to never trust infrastructure I don't control.

From that 1,360, I manually verified 53 companies. Thirty-seven had real, exploitable SSL issues — expired certs, mismatched domains, self-signed certificates on production stores. Fifteen were false positives (Cloudflare's flexible SSL confusing the scanner). One was ambiguous. I picked 15 from the verified 37, wrote a template that mentioned their specific domain and the exact error I saw, and hit send. No tracking pixels, no follow-up sequence, no "bumping" emails. Just one honest message per company.

## The Email That Got 4 Replies (Out of 15)

Here is the exact email I sent, with the company-specific parts in brackets:

> Subject: SSL certificate on [domain.pl] — expired since [date]
>
> Hi [Name from LinkedIn or "Team"],
>
> I checked [domain.pl] and the SSL certificate expired on [date]. Browsers show "Not Secure" — on every page, not just checkout, because an expired certificate triggers a full-page warning before the site even loads.
>
> I run Nexus404, a small shop building and fixing websites for Polish micro-businesses. Fixed-price SSL repair: 150 PLN one-time + 30 PLN/month for monitoring and auto-renewal. No retainer, no upsell.
>
> If you're already handling it, no worries. Happy to share the exact curl output if useful.
>
> Best,
> Mada
> nexus404.pl

Four companies replied within 48 hours. Three said "we have a guy for that" or "our agency handles it." One asked for a call — a small e-commerce shop in a mid-sized Polish city, running on a shared host. Their cert had been expired for over six weeks. They wanted to know if 150 PLN covered the whole chain or just the leaf certificate. I explained it covers the full chain, Let's Encrypt automation, and 30-day monitoring. They said they'd discuss internally and get back. They never did.

## The Verification Layer That Changed Everything

The 53 manual checks were the real work. My script from the VPS flagged 1,360 domains with SSL errors. But when I ran the same checks from my PC (Tailscale IP, Polish ISP), 9 of the "down" sites returned 200 OK with valid certificates. Oracle's ASN is on blocklists at Home.pl, Cyberfolks, and Nazwa.pl — three of Poland's biggest shared hosting providers. If I had trusted the VPS data, I would have wasted outreach on companies that were fine, and missed the ones that actually had problems.

The breakdown of the 53 verified:
- 37 real issues (expired, self-signed, hostname mismatch)
- 15 false positives (Cloudflare flexible SSL, HSTS preload quirks)
- 1 ambiguous (cert valid but chain incomplete on mobile only)

This cost me roughly 6 hours of manual `openssl s_client -connect` checks and spreadsheet work. The 15 emails took another 45 minutes to personalize and send. Total time investment: ~7 hours for four replies and zero revenue. A 26.7% reply rate is a real number, but on a sample of 15 it's an anecdote, not a metric — I'm calling it out because it would be easy to round it up into a success story.

## Pricing That Doesn't Work for Micro-SMBs

My base price list lives on nexus404.pl: landing page from 990 PLN, company site from 1,490 PLN, WooCommerce shop from 2,990 PLN. The SSL repair at 150 + 30/month was meant as a low-friction entry product — a "foot in the door" to upsell a redesign later.

The Poznań lead's question revealed the flaw: 150 PLN is too high for a "try me" purchase but too low to signal quality. A micro-business owner in Poland thinks in monthly costs. 30 PLN/month sounds like a subscription they'll forget to cancel. 150 PLN upfront sounds like a risk. The sweet spot I'm testing next: 99 PLN one-time + 99 PLN/month for three months prepaid. Same annual revenue (495 vs 510 PLN), but the psychology shifts from "subscription" to "quarterly service."

The referrals tell the real story. One hundred percent of my documented revenue (two projects, ~8,000 PLN total) came from word of mouth. A former colleague referred a dentist needing a booking site. A client's cousin needed a landing page for a grant application. Cold email, SEO, blog content — zero conversions in 18 months of Nexus Remote Hub publishing.

## What I'm Changing for the Next 200 Emails

The next batch goes out this week. Two hundred companies from the remaining verified 37, plus 163 more I'll verify from the 1,360 list. Changes:

1. **Price test**: 99 PLN + 99 PLN/quarter (prepaid 3 months). Removes the monthly subscription friction.
2. **Shorter email**: Three sentences max. The specific error, the price, the link to book a 10-minute slot on Cal.com. No "I run Nexus404" paragraph.
3. **No "happy to share curl output"**: That line got zero follow-up questions. It felt helpful but added noise.
4. **Verification from PC only**: The VPS script is deprecated for Polish targets. I'll run the checker locally via SSH tunnel to my home machine.

The goal isn't a higher reply rate — it's a higher *qualified* reply rate. Four replies with three "we have a guy" and one ghost is a signal, not a win. And the math is honest about that: 7 hours for 53 verifications scales to ~26 hours for 200. At 150 PLN/hour, that's 3,900 PLN of my time. At 99 PLN per close, breaking even means nearly 40 clients out of 200 emails — a 20% conversion rate that no cold-email campaign gets. So I'm not treating these 200 as a revenue line. They're an experiment to find out whether this channel can feed the only thing that has ever actually paid: referrals. Right now, 100% of my documented revenue comes from word of mouth.

---

Cold email isn't dead. But "spray and pray" with a generic template is. The four replies came from one thing: I knew exactly what was broken on their site before I wrote the first word. That specificity cost me 7 hours. The next 200 will cost 26. We'll see if the math holds — or if it confirms what the referrals already told me.