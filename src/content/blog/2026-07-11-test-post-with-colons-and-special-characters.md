---
# ⚠️ YAML FRONTMATTER RULES — DO NOT BREAK THESE ⚠️
# 1. NEVER wrap pubDate/updatedDate in quotes — Astro requires bare dates (YYYY-MM-DD)
#    WRONG: pubDate: "2026-06-22"  →  RIGHT: pubDate: 2026-06-22
# 2. ALWAYS wrap title in double quotes if it contains colons (:) or special chars
#    WRONG: title: My Post: A Subtitle  →  RIGHT: title: "My Post: A Subtitle"
# 3. ALWAYS wrap description in double quotes if it contains colons, quotes, or special chars
#    WRONG: description: Some "quote" here  →  RIGHT: description: "Some \"quote\" here"
# 4. Tags must be a YAML array: tags: ["tag1", "tag2"]
# 5. Image URL MUST point to a real file in public/images/ — NO placeholders allowed
title: "Test Post: With Colons and Special Characters"
description: "This is a test post with \"quotes\" and an em-dash — and apostrophes like it's here."
pubDate: 2026-07-11
updatedDate: 2026-07-11
tags: ["remote work", "work from home", "productivity"]
draft: false
image:
  url: "/images/remote-work-focus.jpg"
  alt: "Test Post — With Colons and Special Characters featured image"
---

# "Test Post: With Colons and Special Characters"

This is a test post with "quotes" and an em-dash — and apostrophes like it's here.
