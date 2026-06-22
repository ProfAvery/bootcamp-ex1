## Plan: React Migration

Goal: keep the app visually and structurally faithful to the original non-React version while using Parcel + React for the implementation.

### Non-Negotiables

- Run commands from Command Prompt on Windows. Prefer `cmd.exe /c ...` when invoking npm/node commands from tooling.
- Preserve the original HTML structure and semantics from the old app. The React version should reproduce the same header, main content flow, `article`/`details` pairing, and dataset-based comment lookup.
- Do not add extra wrapper elements, extra layout classes, or extra styling unless the original app already had them.
- Keep styling to the single custom rule from `titles.css` only: `h2, p::first-letter { text-transform: capitalize; }`.
- Rely on MVP.css defaults for layout and cards; if something looks wrong, fix the HTML structure first instead of adding new CSS overrides.
- Create reusable automated checks and keep them in `scripts/` for later reruns.

### Implementation Notes

1. Use Parcel as the build tool.
2. Keep `src/index.html` as the source of the original HTML shell.
3. Keep `src/titles.css` as the only custom stylesheet rule.
4. Render the existing header and main content without introducing extra wrappers in the final DOM.
5. Match the original data flow:
   - fetch posts
   - look up author names
   - render each `article` with its sibling `details`
   - fetch comments on toggle
   - use `dataset.postId` and `previousElementSibling` for comment lookup
6. Preserve the original text formatting, including line breaks in post bodies and comment bodies.

### Tests to Keep

- Headless smoke test that verifies:
  - the dev server responds
  - JSONPlaceholder posts and comments endpoints respond
  - articles render in the browser
  - opening a details element loads comments
- Layout check that verifies the posts stay aligned and the comments flow left-to-right and wrap naturally.
- Comments check that verifies the details section renders and comments appear after opening.

### Reusable Scripts

- `scripts/smoke-test.mjs`
- `scripts/check-layout.mjs`
- `scripts/check-comments.mjs`

### README Reminder

- Document how to run the dev server and tests from Command Prompt.
- Include the one-time Playwright browser install step.
- Make it clear that the tests expect the Parcel dev server at `http://localhost:1234`.
