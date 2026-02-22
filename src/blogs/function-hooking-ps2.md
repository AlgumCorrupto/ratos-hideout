---
title: Function Hooking on PS2
description: Understanding symbol redirection on the Emotion Engine.
date: 2026-02-21
layout: layouts/blog.njk
---

This is a simple test post to validate typography, layout behavior, and semantic rendering inside `blog.njk`.

It includes headings, lists, code blocks, and tables.

---

## Why Hook Functions?

Function hooking on the PlayStation 2 is commonly used for:

- Debugging internal game logic
- Modding behavior at runtime
- Logging execution flow
- Patching broken mechanics

### Typical Workflow

1. Locate target function in ELF
2. Identify call sites or entry point
3. Redirect jump to custom stub
4. Preserve registers
5. Return cleanly

---

## Hook Types

### 1. Direct Jump Patch

Replace the first instruction with a jump.

- Fast
- Dangerous if function is small
- Must preserve original instructions

### 2. Import Table Redirection

Modify imported symbol reference.

- Cleaner
- Safer
- Requires symbol visibility

---

## Example Stub (Conceptual)

#### Register Preservation Example

```c
void hook_stub() {
    // save registers
    // call custom code
    // restore registers
    // jump back
}
```