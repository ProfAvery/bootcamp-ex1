# Using GitHub Copilot Ask Mode with a New Repository

## Purpose

In this activity, you will use GitHub Copilot Chat in [Ask mode](https://docs.github.com/en/copilot/how-tos/chat-with-copilot/chat-in-ide?tool=vscode#ask-mode) to understand an unfamiliar codebase.

The goal is to practice a professional habit:

> Understand the code before changing the code.

## Repository

[`bootcamp-ex1`](https://github.com/ProfAvery/bootcamp-ex1) is a web app that displays posts and comments from [JSONPlaceholder](https://jsonplaceholder.typicode.com/).

---

## What Ask Mode Is Good For

Use Ask mode when you need help understanding:

- What a repository does
- How files relate to each other
- What a function does
- What an unfamiliar API call does
- What an error message means
- Where data comes from
- Where data appears on the page
- What code runs first
- What code runs later because of a user action

---

## Basic Workflow

1. Open the project folder in VS Code.
2. Open Copilot Chat.
3. Choose **Ask** mode.
4. Ask one small question.
5. Read the answer.
6. **Check the actual code** to see whether the answer is correct.
7. Ask a follow-up question.
8. Write down what you learned.

---

## Tip: What to do when you're confused

Use this prompt pattern:

```text
I am a beginner. I am trying to understand [specific thing].
Explain [file/function/error/concept] in plain language.

Do not change code.

Tell me what file or function I should inspect next.
```

---

## Danger Zone

1. Copilot may be wrong.
2. Copilot may overlook details.
3. Copilot may describe code that is not actually there.
4. Copilot may suggest commands that do not apply to this project.
5. Always verify answers in the code.
6. Do not paste secrets, passwords, API keys, or private tokens.
7. Do not accept code changes during this activity.
8. Do not run a command unless you understand what it does.
9. Prefer small questions over giant prompts.
10. When confused, ask Copilot to explain, **not to fix**.

---

## Activity

### Part 1: First Contact

Ask Copilot:

> Explain this repository in beginner-friendly terms. What kind of app is it, and what are the most important files?

Then answer the questions in this section of the worksheet.

### Part 2: Understand the HTML Page

Open `posts.html`.

Ask Copilot:

> Explain `posts.html` in beginner-friendly terms. What does this file do?

Then answer the questions in this section of the worksheet.

Things to notice:

- The page has a `<header>`.
- The JavaScript file is loaded at the bottom of `<body>`.
- The script uses `type="module"`.

### Part 3: Understand the CSS

Open `titles.css`.

Ask Copilot:

> Explain this CSS rule in beginner-friendly terms:

```text
h2, p::first-letter {
    text-transform: capitalize;
}
```

Combine this information with what you know about `posts.html` to answer the questions in this section of the worksheet.

### Part 4: Identify the Data Sources

Open `comments.js`.

Ask Copilot:

> What external APIs does `comments.js` call? List each URL pattern and explain what data it returns.

Write down the URLs in the worksheet.

Now ask:

> What is JSONPlaceholder, and why might this project use it?

Then answer the rest of the questions in this section of the worksheet.

### Part 5: Understand the Three Download Functions

Ask Copilot:

> Explain these three functions in beginner-friendly terms: `downloadPosts`, `downloadComments`, and `getUserName`

Ask additional clarifying questions to answer the rest of the questions in this section of the worksheet.

_Note_: you may need to do this from now on.

### Part 6: Trace How Posts Appear on the Page

Ask Copilot:

> Trace how posts are downloaded and added to the page. Start with this line: `const posts = await downloadPosts(2)`

Then answer the rest of the questions in this section of the worksheet.

---

### Part 7: Understand `dataset`

Ask Copilot:

> Explain this line in beginner-friendly terms: `article.dataset.postId = post.id`

Then ask:

> How is that `postId` value used later when downloading comments?

Then answer the rest of the questions in this section of the worksheet.

### Part 8: Understand the Comments Section

Ask Copilot:

> Explain how the `<details>` and `<summary>` elements are used in this app.

Then ask:

> Why does the code create one `<details>` element after each `<article>`?

Use this information to answer the questions in this section of the worksheet.

### Part 9: Trace What Happens When Comments Are Opened

Ask Copilot:

> Trace what happens when a user opens a comments section. Start with the toggle event listener.

Use this information to answer the questions in this section of the worksheet.

### Part 10: Understand `getArticleId`

Ask Copilot:

> Explain this function in beginner-friendly terms:

```text
function getArticleId (comments) {
  const article = comments.previousElementSibling
  const data = article.dataset
  return data.postId
}
```

Use this information to answer the questions in this section of the worksheet.

---

## Migrated React app (Parcel)

A Parcel-based React scaffold has been added under `src/`. To run the dev server:

```bash
npm install
npm run dev
```

Build for production with:

```bash
npm run build
```

The migrated app preserves the original behavior (posts + comment sections) and uses `src/titles.css` for the small global rule from the original app.

## Running the app and tests

Use Command Prompt on Windows when running project commands. The examples below assume the repo is at `d:\repos\bootcamp-ex1`.

```bat
cmd.exe /c "cd /d d:\repos\bootcamp-ex1 && npm install"
cmd.exe /c "cd /d d:\repos\bootcamp-ex1 && npm run dev"
```

The automated checks are saved in `scripts/` so you can rerun them later:

```bat
cmd.exe /c "cd /d d:\repos\bootcamp-ex1 && npx playwright install chromium"
cmd.exe /c "cd /d d:\repos\bootcamp-ex1 && npm run test:smoke"
cmd.exe /c "cd /d d:\repos\bootcamp-ex1 && node scripts/check-layout.mjs"
cmd.exe /c "cd /d d:\repos\bootcamp-ex1 && node scripts/check-comments.mjs"
```

Notes:

- `npm run test:smoke` expects the Parcel dev server to be running at `http://localhost:1234`.
- `scripts/check-layout.mjs` verifies the posts stay aligned.
- `scripts/check-comments.mjs` verifies the comments flow left-to-right and wrap naturally.
- If Playwright reports missing browsers, run the `npx playwright install chromium` command once.

### Part 11: Find One Possible Bug or Weakness

Ask Copilot:

> Do not change code. Identify one possible bug, weakness, or confusing part of this app. Explain it in beginner-friendly terms.
>
> Choose only one issue.

Describe the issue Copilot suggested by answering the first two questions in this section of the worksheet.

Now verify the suggested issue yourself, and record your results.

### Part 12: Ask for an Improvement Plan

Ask Copilot:

> Do not edit code. Suggest three small improvements a beginner could make to this app later. For each one, list the file that would probably change.

Record the suggestions in this section of the worksheet.
