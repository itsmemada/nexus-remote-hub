---
title: "I Published My Prices — What $250, $370 and $750 Actually Buy"
description: "After 15 cold emails, 4 replies and zero clients, I stopped quoting custom prices and put three fixed packages on nexus404.net. Here are the numbers behind that decision, the stack, and the jobs I now refuse to take."
pubDate: 2026-11-23
updatedDate: 2026-11-23
tags: ["nexus404", "freelancing", "pricing", "smallbusiness", "sales"]
draft: false
image:
  url: /images/2026-11-23-i-published-my-prices-hero.jpg
  alt: "A printed price sheet next to a laptop showing a small business website"
---

In October 2026 I sent 15 personalised cold emails to Polish small businesses whose sites had real, verifiable defects. Four people wrote back — a 26.7% reply rate, which looked like traction until I read the replies properly. Zero of them became clients. One asked a single question that I should have anticipated: does the 150 PLN cover the whole certificate chain, or only the leaf? I answered it correctly, they said they would discuss it internally, and the thread died. Nobody ever asked me what a website costs, because nothing I sent them had a price on it.

That silence was the most useful thing the campaign gave me. I had been treating pricing as a negotiation I would win later, once someone was interested. In practice it was a filter running before every conversation: a business owner who cannot see a number assumes the number is too big for them, and quietly stops replying. So I did the unglamorous thing. I wrote the packages down, put the numbers on the page, and launched [nexus404.net](https://www.nexus404.net/?utm_source=nexusremotehub&utm_medium=blog&utm_campaign=prices&utm_content=i-published-my-prices) as the English side of the same business, next to the Polish [nexus404.pl](https://nexus404.pl/?utm_source=nexusremotehub&utm_medium=blog&utm_campaign=prices&utm_content=i-published-my-prices).

## What the lead list actually told me

The list behind those emails was 1,360 rows. I did not email 1,360 businesses — I manually verified 53 of them from my own machine, because my VPS cannot reliably reach a chunk of Polish hosting and reports live sites as dead. Of those 53, 37 had problems I could point at in a screenshot: expired chains, hostname mismatches, a self-signed certificate on a live shop. Fifteen claims did not survive verification, which is a polite way of saying I was about to send accusations that were simply false.

A separate scan of 122 domains, of which 105 answered with HTTP 200, found 38 installs of WordPress — 36% of every site I could realistically sell to. That number quietly killed my favourite pitch, "we will rebuild your site in Astro", because it means most of my leads already paid for the thing I was asking them to throw away. I wrote about that in [the WordPress post](/blog/2026-11-19-wordpress-vs-astro-w-sprzedazy/) and the short version is: sunk cost wins, and a rebuild pitch asks a micro-business to admit a mistake before they have received any value from me.

## The three packages, with the numbers visible

The offer now has three fixed shapes. They are one-time prices in USD on the English site, and the Polish site carries the PLN version for local clients — different market, different expectations, same work behind it.

- **Landing page — from $250.** A single page built for one job: getting a form filled or a phone call made. Custom design and copy, mobile-first, contact form, SSL and analytics included, one revision round.
- **Business website — from $370.** Up to 10 pages, a design system instead of a stack of one-off pages, a blog or news section, CMS so the client can edit text without me, schema markup, two revision rounds.
- **Online store — from $750.** Product catalogue, cart and checkout with Stripe, inventory and order notifications, product-level SEO, three revision rounds.

Every one of them carries the same non-negotiables, and I listed them on purpose rather than hiding them in a contract: HTTPS with automatic renewal, daily backups on storage separate from the site, DDoS and WAF filtering, updates applied before the vulnerabilities become the client's problem, and the domain registered in the **client's** name. That last point costs me a small amount of leverage and buys the client the ability to fire me, which is the only honest way to sell hosting.

The site itself runs Astro, deployed on Cloudflare's CDN, with no WordPress in the stack for new builds. That is not a religious position — it is a measurement I can repeat: my own blog serves its HTML in 164–234 ms with about 23 KB of markup, so when I promise a fast page I am pointing at something I run, not at a benchmark screenshot from a framework's homepage.

## What I refuse to sell

Publishing prices forced me to write down the jobs I will not take, and this list mattered more to my evenings than the prices did.

I will not rebuild a working WordPress site into Astro just because I like Astro. If the site loads acceptably and the client can edit it, the honest answer is "keep it, fix the certificate, update the plugins". I will not promise Google positions — I can promise structure, schema, speed and clean markup, and I cannot promise a ranking, so I say it in those words. I will not hold a domain or a hosting account hostage to keep a client. And I will not sell "SEO" as a monthly line item when what is actually being delivered is edits that should have been in the build.

What the packages do not include is just as explicit: copywriting that needs interviews with the client's customers, photography, paid ads management, and ongoing content. I quote those separately or decline them, because bundling them into a $370 build is how a three-week project becomes a six-month argument.

## The trade I am making

Published prices mean fewer enquiries and, I expect, better ones. It is too early to claim a win: at the time of writing, the packages have been live for a short while and I have not yet signed a client who arrived through the price page. What I do have is a different opening line in every conversation, because the other person has already decided whether $370 is inside their budget before they contact me. In the October campaign, four people spent their time and mine finding that out. The 37 verified defects in that 53-domain sample are still sitting there, unresolved, and they are a better use of my week than quoting custom numbers into a void.

If you are curious what the packages look like written out properly, they live at [nexus404.net](https://www.nexus404.net/?utm_source=nexusremotehub&utm_medium=blog&utm_campaign=prices&utm_content=i-published-my-prices-footer) — three shapes, the price on the card, and a form that gets answered within 24 hours. I would rather you read a number and decide I am too expensive than wonder for a week and never write back.
