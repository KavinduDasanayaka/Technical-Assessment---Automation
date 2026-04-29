# SauceDemo QA Automation — Playwright

Automated test suite for https://www.saucedemo.com as part of the Vertecza QA Intern Assignment.

![My Skills](https://skillicons.dev/icons?i=js,nodejs&theme=light)

## Tech Stack
- Playwright (JavaScript)
- Node.js

## Setup Instructions
1. Clone the repo: `git clone https://github.com/KavinduDasanayaka/Technical-Assessment---Automation.git`
2. Navigate to the folder:
                     `cd Technical-Assessment---Automation`
                     `cd saucedemo-qa-automation-playwright`
5. Install dependencies: `npm install`| `npm i`
6. Include .env file at the root of the project.(Make sure downloaded env file is named as .env)

## Run Tests
- All tests: `npx playwright test`
- Specific file: `npx playwright test tests/login.spec.js`
- Specific file: `npx playwright test tests/checkout.spec.js`
- View latest executed tests report: `npx playwright show-report reports`
- Playwright test ui: `npx playwright test tests/login.spec.js --ui`

## Test Coverage
- Login (valid/invalid credentials)
- Product browsing
- Cart operations
- Checkout flow

