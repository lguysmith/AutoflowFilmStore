I have written Playwright tests (with assistance from Copilot) to cover the requirements outlined in the README. I also performed manual accessibility checks on the page, which are documented in a separate defect report.

To ensure Playwright is set up correctly after downloading the repo, make sure Playwright and its browsers are installed:

```bash
npm install
npx playwright install
```

To run the tests from the command line:

```bash
npx playwright test
```

> Most tests are currently failing because of issues on the page/

I’ve used the **Page Object Model** approach for the tests. There is a page object in the `pages` folder containing getters for locators, which the tests use to avoid duplication.

Normally, I wouldn’t include Playwright tests directly in the repository alongside the application code, but for this demo it made things simpler.

---

## ✅ To-Do List

- Double-check that the current tests adequately cover the requirements. I admit I rushed them a bit, so there may be missing parts.
- Review the test structure and description names to make them more readable and user-friendly.
- Refactor tests that use `.fill()` directly — these should be moved to setter methods in the page object.
- Add more descriptive `expect()` messages to improve debugging when tests fail.
- Improve validation of the initial test data if the film list is static (e.g., load from an external data file).
- Add more checks to validate responsive layout. I’ve added a mobile-sized viewport for WebKit to simulate an older iOS device, but currently there’s only one explicit check for the button width exceeding the screen.
- I ran a manual accessibility check using the [WAVE Chrome plugin](https://wave.webaim.org/extension/), which flagged issues with labels, tab order, heading structure, etc.
- I also ran Lighthouse in the browser. Although Lighthouse can be automated, I haven’t set that up yet — in previous teams, other members were responsible for this.
