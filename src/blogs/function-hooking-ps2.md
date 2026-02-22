---
title: Function Hooking on PS2
description: Understanding symbol redirection on the Emotion Engine.
date: 2026-02-21
layout: layouts/blog.njk
---

With the Midnight Club 3 modding scene steadily growing, I feel this is the right time to share some modding resources — and a few insights from my own experience working with PlayStation 2 titles.

---

## What Is Function Hooking?

When I say *hooking*, I mean patching the game's executable code to introduce custom behavior.

More technically, function hooking is a modding technique that redirects the game’s control flow. We patch an existing routine so that execution jumps to our own injected code, runs whatever logic we want, and optionally returns to the original function.

On the PS2, this typically involves modifying MIPS instructions inside the ELF, redirecting them to a custom code region (often called a *code cave*).

---

## Common Misconceptions

### 1. “PS2 games are easy to mod like PC games.”

Most PS2 games are written in **compiled languages** such as C or C++. Unlike interpreted languages, compiled binaries do not preserve high-level structure in a readable form.

That means:

- No source code
- No easy scripting layer (unless the developers added one)

For comparison:
- Minecraft Java Edition had a modding community from day one.
- Minecraft Bedrock Edition (C++) only gained a strong modding ecosystem after Microsoft introduced official APIs.

Console games generally do not ship with modding APIs.

---

### 2. “All games are equally moddable.”

Some PS2 games ship with **debug symbols**. Others do not.

This makes a massive difference.

If debug symbols are present:
- Function names are preserved
- Class names may exist
- Structures are easier to identify
- Reverse engineering is significantly faster

If they are stripped:
- Everything becomes `sub_XXXXXXXX`
- You must infer behavior manually
- Reverse engineering takes much longer

The only AGE engine titles I know of that contain debug symbols are:

- Test Drive: Off-Road: Wide Open
- The leaked Oni 2 prototype

Most commercial PS2 releases strip them.

---

## Why Hook Functions?

Function hooking on the PlayStation 2 is commonly used for:

- Debugging internal game logic
- Modifying behavior at runtime
- Logging execution flow
- Fixing broken mechanics
- Injecting new features
- Overriding hardcoded limits

Because PS2 games are fully compiled, hooking is often the most practical way to extend functionality without rewriting entire systems.

---

## Useful Tools for Hooking

### Decompilers / Disassemblers
- Ghidra  
- IDA Pro  
- Binary Ninja  

These are essential for understanding the game’s control flow and identifying candidate functions.

### PCSX2 Debugger
The PCSX2 debugger allows:
- Breakpoints
- Step execution
- Memory inspection
- Register inspection

This is critical for understanding runtime behavior.

### PS2dev
[https://github.com/ps2dev/ps2dev](https://github.com/ps2dev/ps2dev)

PS2dev includes everything needed for PlayStation 2 development:
- Emotion Engine GNU toolchain
- C/C++ compiler
- Linker
- Binutils
- IRX tools

This allows you to compile real MIPS code targeting the Emotion Engine.

### Armips
[https://github.com/Kingcom/armips](https://github.com/Kingcom/armips)

Armips is an assembler that supports:
- Overwriting specific areas of a binary
- Injecting raw assembly
- Linking `.o` and `.a` files produced by compilers

It is extremely useful for patch-based workflows.

---

## My Typical Workflow

Here’s how I usually approach a hook:

1. Locate the target function inside the ELF.
2. Analyze the function’s calling convention and side effects.
3. Find or create a code cave (unused executable space).
4. Compile custom C/assembly code using PS2dev.
5. Use Armips to:
   - Inject compiled object code
   - Patch original instructions
   - Redirect execution with a `j` or `jal`

Understanding MIPS calling conventions (especially `$ra`, `$sp`, and saved registers) is critical to avoiding crashes.

---

## Example Repository

You can find a concrete example here:

[https://github.com/AlgumCorrupto/mc3-function-hooking](https://github.com/AlgumCorrupto/mc3-function-hooking)

This repository contains multiple branches, but I recommend starting with the `master` branch.

- `src/` contains the C code that gets injected.
- `linker.asm` contains the Armips script that performs the injection and patching.

Reading both together will give you a clear picture of how the workflow fits end-to-end.

---

## Final Thoughts

Function hooking on the PlayStation 2 is not “easy” — but it is extremely powerful.

Once you understand:

- MIPS instruction flow
- ELF structure
- The Emotion Engine calling conventions
- Binary patching

You can modify nearly any behavior in a PS2 title.

The barrier to entry is high, but the control it gives you is absolute.
