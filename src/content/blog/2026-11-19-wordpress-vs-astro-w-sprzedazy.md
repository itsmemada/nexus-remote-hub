---
title: "WordPress vs Astro in Sales: Why \"Rebuild It in Astro\" Loses Micro-Businesses"
description: "I scanned 122 Polish micro-business domains I had manually verified and found 38 running WordPress. Here is what that number did to my sales pitch, with my own TTFB and page-weight measurements."
pubDate: 2026-11-19
updatedDate: 2026-11-19
tags: ["wordpress", "astro", "nexus404", "sales", "smallbusiness"]
draft: false
image:
  url: /images/2026-11-19-wordpress-vs-astro-w-sprzedazy-hero.jpg
  alt: "Two browser windows side by side comparing a WordPress page and an Astro page load waterfall"
---

On 19 November 2026 I ran a script from my VPS against the 122 Polish small-business domains I had manually verified in October for my outbound campaign. The script fetched each homepage, looked for `wp-content` and `wp-json` in the HTML, and pulled the generator meta tag. Of the 122, 105 answered with HTTP 200. Thirty-eight of those 105 were WordPress — 36% of every site I could realistically sell to.

That number killed the pitch I had been carrying since summer. My pitch was "we will rebuild your site in Astro". I run my own blog on Astro; my pages come back in 164–234 ms with 23 KB of HTML, and I can point at the waterfall and feel clever. But the customer on the other end of that email is not buying a framework. They are buying the disappearance of a red warning in Chrome.

## The Scan That Reframed the Pitch

The method matters, because a WordPress count is easy to fake. For each domain I tried HTTPS first, then HTTP, with a 15-second timeout and a desktop user agent. I counted a site as WordPress if the HTML contained `/wp-content/` or `wp-json`, which catches sites that strip the generator tag. Seventeen domains did not answer at all — the same Polish hosting blocklist problem that has burned me before when scanning from Oracle's ASN. I did not count those as "not WordPress"; they are simply unknown, and that gap is honest.

Of the 38 WordPress installs, 30 exposed a version string. Eight of those 30 were below 6.0, including a 3.5.1 install that has not received a security patch since 2013, a 4.9.6, and two on 5.4.26. The largest single group — ten sites — was on 7.1.5, which tells me the ecosystem is not uniformly abandoned; it is split between people who update and people who set it up in 2018 and stopped.

Compare that with the market figure I had been quoting in drafts: [WordPress holds over 40% of the web](https://piotrgrala.com/blog/astro-vs-wordpress/). My local sample at 36% is close enough to confirm the obvious thing I had been ignoring for weeks — my lead list *is* a WordPress estate. Selling against WordPress means asking a micro-business to write off the thing they already paid for. That is not a technology argument. It is an argument about sunk cost, and sunk cost usually wins.

## Why "We'll Rebuild It" Dies in the First Email

The October campaign is where I learned this with numbers attached. I started with 1,293 rows in my lead CSV, manually verified 53 domains, and found 37 with real, exploitable certificate problems — expired chains, hostname mismatches, self-signed certs on live shops. I sent 15 personalised emails and got 4 replies, a 26.7% reply rate that looked like traction until I read them.

Three of the four said some version of "we have a guy for that" or "our agency handles it". The fourth asked for a call: a 12-person e-commerce company in Poznań, PrestaShop on shared hosting, certificate expired for 47 days. Their question was whether 150 PLN covered the whole chain or only the leaf certificate. I answered it properly. They said they would discuss it internally. They never came back, and I did not chase them, which is a separate mistake.

Nobody in that batch asked what stack I would use. Not one. The conversation never reached the framework level, because the conversation was about an incumbent — a hosting company, a nephew, an agency on a 200 PLN monthly retainer. My "rebuild in Astro" pitch would have required them to fire that person first. My repair pitch only required them to admit something was broken, and even that was too much for three out of four.

The industry data says migration is safe: in [95% of cases rankings stay stable or improve](https://wppoland.com/pl/wordpress-7-vs-astro-6-cloudflare-porownanie-2026/) thanks to better Core Web Vitals. That is true and it is useless in a sales email, because "your rankings will stay the same" is a promise about the absence of change. Nobody pays for the absence of change. They pay to make the warning go away.

## Where Astro Actually Wins, Measured

I ran a second measurement the same morning, from the same VPS, so the network vantage point is identical for every site. My Astro homepage returned first byte in 0.164 s and 0.234 s across two runs, with 23 KB of HTML. My blog index came in at 0.194–0.273 s with 98 KB. Against that, three WordPress sites from the same list: 0.147 s for an 11.7 KB photography page running 3.5.1, 0.253–0.392 s for an 86 KB site, and 0.658 s for a 219 KB shop page. Two more refused my repeat request entirely and timed out.

Read that carefully, because it does not say what I wanted it to say. The fastest response in the whole set was a WordPress 3.5.1 site — because it serves 11.7 KB of cached HTML and nothing else. The framework did not make it fast; the absence of bloat did. What Astro gives you is that outcome by default, without a caching plugin someone has to configure and maintain. [A typical Astro business page hits TTFB under 100 ms on CDN hosting and scores 95–100 on Core Web Vitals](https://www.mahawir.pl/blog/wordpress-vs-astro); my numbers are worse because I measured from a single VPS, not a CDN edge, but the 3–10× page-weight gap between 23 KB and 219 KB is real and it is the part a client can feel on a phone in a parking lot.

Where WordPress wins the deal is the boring part I kept dismissing: the owner can change a price at 9 pm before a long weekend without calling anyone. That is worth more to a 6-person firm than 150 ms of TTFB, and pretending otherwise is how you lose a client you already half-won.

## The Hybrid Offer I'm Testing

The pitch I am rewriting now separates the two jobs instead of picking a side. Pages that make money — the landing page someone pays for ads to reach — get built in Astro and served static. Pages that change weekly — the offer list, the blog, the "about us" with the new team photo — stay in WordPress where the owner already knows the admin panel. A reverse proxy in front, WordPress on a subpath, Astro on the root. Standard infrastructure, not custom engineering, and it isolates the CMS as a risk surface.

The reason to bother is load time, and the number I use is the one clients react to: [at 3 seconds of load time, up to 40% of visitors leave](https://piotrgrala.com/blog/astro-vs-wordpress/). But the number that gets me paid is smaller. My price list is 990 PLN for a landing page, 1,490 for a company site, 2,990 for a WooCommerce shop, and 100% of my documented revenue so far — two projects, roughly 8,000 PLN — came from referrals, not from the blog, not from cold email, not from SEO in eighteen months of publishing. The framework was never the bottleneck. Being findable and being trusted was.

So the test for the next 200 emails is not "does Astro convert better". It is whether a repair-first email, with the framework mentioned only as a footnote, gets more than the 4 replies I got from 15 sends. That is a measurable thing, and I would rather have that number than another benchmark table.

## What This Changes

Two things. First, I stopped opening sales conversations with the stack I like. The first paragraph is now the specific thing that is broken on their domain, verified by hand, with the exact error string. The framework shows up in paragraph four, if at all. Second, I stopped treating "WordPress site" as a synonym for "bad site" — 30 of my 38 WordPress installs were current within a major version or two, and the ten on 7.1.5 are better maintained than most of the custom builds I audited.

The framework debate is an internal preference dressed up as a client benefit. The client's actual question has two halves: will my site stop being broken, and can I still edit it myself. Astro answers the first, WordPress answers the second, and a hybrid answers both — which is why it closes and a rewrite does not. The 36% figure did not make me abandon Astro. It made me stop selling it as a replacement and start selling it as a component, which is a less satisfying pitch and, so far, a more honest one.
