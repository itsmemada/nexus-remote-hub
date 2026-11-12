---
title: "Why I Chose Phaser 3 Over Godot — and What I'd Do Differently"
description: "Three months into building Card Nomad, a TypeScript roguelike deck-builder, Phaser 3 was still the right call. Then I deleted my local AI models on October 17, 2026, and two of my four development roles vanished overnight — and the engine choice suddenly looked different."
pubDate: 2026-11-12
updatedDate: 2026-11-12
tags: ["gamedev", "typescript", "phaser", "godot", "cardnomad"]
draft: false
image:
  url: /images/card-nomad-phaser-vs-godot-hero.svg
  alt: "Card Nomad — a Phaser 3 and TypeScript roguelike deck-builder in pre-alpha"
---

On October 17, 2026, I deleted the local AI models my whole development workflow was standing on. Ollama went away, and with it went two of the four roles that were building Card Nomad: Aider, which handled multi-file refactors, and Void IDE, which handled the small inline edits. The game didn't break. The workflow did. Sitting in front of a half-finished pre-alpha, I had to ask a question I thought I'd already answered three months earlier: was Phaser 3 actually the right engine, or had I picked it for reasons that no longer held?

Card Nomad is a roguelike deck-builder about journeys — each card is a choice you accept or reject, and the consequences are shaped by attributes you can't always see. It runs on TypeScript, Phaser 3, Vite and Capacitor, and it's currently at v0.9.0-prealpha, targeting web on Itch.io, Android via Google Play, and desktop. This is not a generic "Phaser vs Godot" guide. It's a post-mortem of one specific decision, made by one specific developer, after roughly three months of real work.

## Why Phaser Won: Web-First and TypeScript-Native

The first reason is the least interesting but the most decisive: I already write TypeScript. Phaser 3 is a JavaScript library, not a separate language with its own ecosystem to learn. Godot, for all its strengths, asks you to adopt GDScript (or bolt on C# support) before you've written a single line of game logic. For a solo developer who was already productive in TypeScript, that was a tax I didn't want to pay at the start of a project.

The second reason is the target. I wanted a game that lives in the browser first — social links, itch.io embeds, people on average phones opening a link and playing. Phaser renders natively to Canvas and WebGL, so the web build is the game, not a port of it. Capacitor then wraps that same build for Android. That is one codebase across three targets. The licensing angle reinforced it: the comparison I read at the time pointed out that proprietary engines carry real overhead — Unity's licensing tiers and runtime fee, and Unreal's 5% royalty after the first million dollars in revenue. Phaser is free under MIT with no royalties, and so is Godot, but Godot is, in the words of another comparison I consulted, a 3D engine under the hood. I was building a 2D card game. I didn't need the 3D machinery.

## What Phaser Doesn't Give You

Phaser gives you a rendering loop, input, physics, and scene management. It does not give you a scene editor, a UI toolkit, or state management. There is no drag-and-drop layout. You build the interface in code, and you manage your own state. For a game built around hidden systems, that turned out to matter a lot.

Card Nomad tracks 11 attributes per run — five visible, six hidden. The player can see five; the other six drive consequences that surface later, and that split is the core of the design. There are five distinct win paths and a level 1-100 scaling curve. None of that fits a generic editor workflow; it needed a hand-written state machine. So I wrote my own GameStateManager that owns the deck, the hidden attributes, and the win/lose conditions. What looked like a Phaser weakness — no built-in editor, manual state — turned out to be the thing that forced me to build the game's systems explicitly instead of wiring them through someone else's abstraction.

The performance side of the comparison mattered here too. One of the sources I read framed the whole Phaser-vs-Godot question for browser games as a matter of "tax" — whether your game stays smooth on average devices after you add the ordinary bad habits of real production, and whether your acquisition channel is social traffic or people opening links on mid-range phones. My channel is exactly that. Keeping the browser bundle small and the frame rate stable on an average phone beats having a nicer editor I would only use for scene layout.

## The Collapse: Two of Four Roles, Gone Overnight

My AI workflow was four roles. Hermes, the agent I use for PM and docs, ran on Nemotron 3 Ultra and owned decisions, the vault, and the ADRs. Aider handled macro refactors — feature branches, multi-file changes, system-level work. Void IDE handled micro edits — quick bug fixes, card data. And a cloud model did review and architecture. Four roles, two of which depended on local models served by Ollama.

When I deleted those local models on October 17, Aider and Void both lost their backends in the same afternoon. Two of four roles were gone, and the note in my project tracker now reads: suspended — local model disappeared with Ollama, decision pending. The game kept building because the engine is a dependency in my repository, not a service I rent. When the tooling around the project collapsed, the raw engine still worked: I could open the repo, run Vite, and watch the Boot → Preload → Menu → Game scenes come up in the browser.

That is the real test of an engine choice. A feature matrix tells you what a tool can do on a good day. What you actually need to know is what it does on the day your workflow breaks. Phaser, as a plain npm dependency inside my own codebase, doesn't collapse when an external service does. The same question I'd apply to an engine — "what survives when everything around it fails?" — turned out to be the one that mattered most.

## What I'd Do Differently

Three things, in order of how much they cost me.

First, decide on Capacitor earlier. I scaffolded the web build first and treated Android as a later problem. It wasn't. Today the web build — the `dist/` folder — and the Android keystore plus AAB are the two milestones still pending, and they're pending partly because I kept deferring the packaging question. If I'd wired Capacitor in from the first commit, the Android story would already be done instead of being a sprint-0 leftover.

Second, don't build the game design doc in Obsidian without structure. My GDD vault grew to roughly 440 notes, and at one point there were 327 files uncommitted — three parallel data systems for the same game instead of one. The same "bad habits of real production" the browser-game comparison warned about apply to documentation: what matters isn't volume, it's whether the thing stays coherent after you add the messy reality of a real project on top of it.

Third, and this follows from the second: one data system for game content, not three. Cards, locations, and attributes should live in a single structured source I can load at runtime. I'm consolidating that now, because the cleanup is cheaper at pre-alpha than it will be after the first release.

## The Verdict, for Now

Phaser 3 was the right call for this project — web-first, TypeScript-native, zero royalties, and robust when my workflow collapsed around it. But the choice I made in month zero was only partly about the engine. The lesson that actually stuck is that every tooling decision — engine included — has to be judged by what it does when the scaffolding fails. The engine is part of the product. The AI workflow around it never was.

Next up: the web build, then the keystore and the Android AAB, then the first playable build on Itch.io. The game is still pre-alpha and everything can still change. But the engine, for now, stays.
