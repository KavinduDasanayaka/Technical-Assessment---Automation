# SauceDemo QA Automation — Playwright

Automated test suite for https://www.saucedemo.com as part of the Vertecza QA Intern Assignment.

![My Skills](https://skillicons.dev/icons?i=js,nodejs&theme=light)

## Tech Stack
- Playwright (JavaScript)
- Node.js

## Setup Instructions
1. Clone the repo: `git clone https://github.com/KavinduDasanayaka/Technical-Assessment---Automation.git`
2. Navigate to the folder: `cd saucedemo-qa-automation-playwright`
3. Install dependencies: `npm install` `npm i` 

## Run Tests
- All tests: `npx playwright test`
- Specific file: `npx playwright test tests/login.spec.js`
- View report: `npx playwright show-report reports`
- Playwright test ui: `npx playwright test tests/login.spec.js --ui`

## Test Coverage
- Login (valid/invalid credentials)
- Product browsing & sorting
- Cart operations
- Checkout flow
- Edge cases
