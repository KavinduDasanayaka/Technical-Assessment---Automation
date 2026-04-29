# SauceDemo QA Automation — Playwright

Automated test suite for https://www.saucedemo.com as part of the Vertecza QA Intern Assignment.

![My Skills](https://skillicons.dev/icons?i=js,nodejs&theme=light)

## Tech Stack
- Playwright (JavaScript)
- Node.js

## Setup Instructions
1. Clone the repo: `git clone https://github.com/KavinduDasanayaka/Technical-Assessment---Automation.git`
2. Navigate to the folder: `cd Technical-Assessment---Automation/saucedemo-qa-automation-playwright`
5. Install dependencies: `npm install`| `npm i`
6. installs browser binaries  `npx playwright install`
7. Include .env file at the root of the project.(Make sure downloaded env file is named as .env)

## Run Tests
- All tests: `npx playwright test`
- Specific file: `npx playwright test tests/login.spec.js`
- Specific file: `npx playwright test tests/checkout.spec.js`
- View latest executed tests report: `npx playwright show-report`
- Playwright test ui: `npx playwright test tests/login.spec.js --ui`

## Test Coverage
- Login (valid/invalid credentials)
- Product browsing
- Cart operations
- Checkout flow

## Execution summary
<img width="1156" height="682" alt="image" src="https://github.com/user-attachments/assets/2ae1c43f-a352-4919-9428-3ec1b5349af3" />

