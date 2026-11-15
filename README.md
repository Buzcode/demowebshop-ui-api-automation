# Demo Web Shop UI & API Automation

## Project Overview
Automated UI testing for Demo Web Shop (https://demowebshop.tricentis.com/) using Playwright with Page Object Model (POM), and API testing for JSONPlaceholder Users API using Postman & Newman.

## Tech Stack
- **UI Automation:** Playwright (JavaScript / Node.js) with Page Object Model (POM)
- **API Automation:** Postman & Newman CLI
- **Reporting:** Playwright HTML Report, Allure Report, Newman HTML/CLI Report
- **Version Control:** Git & GitHub

## Prerequisites
- Node.js (v18+ recommended)
- Java (required to generate/open Allure reports)
- Newman & `newman-reporter-html` installed globally (`npm install -g newman newman-reporter-html`)

## Project Structure
- `pages/` — Page Object Model classes
- `tests/` — UI test scenarios (Q1, Q2, Q3)
- `api-tests/` — Postman collection JSON for API tests
- `playwright.config.js` — Playwright & reporter configuration

## Setup Instructions
1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd <your-repo-folder>
   ```
2. Install dependencies:
   ```bash
   npm install
   npx playwright install chromium
   ```
3. Create a `.env` file in the root directory and configure:
   ```env
   BASE_URL=https://demowebshop.tricentis.com/
   ```

## Running UI Tests
### Run Each Scenario Individually
- **Q1 (Invalid Login):**
  ```bash
  npx playwright test tests/<your-q1-file>
  ```
- **Q2 (Register + Add to Cart):**
  ```bash
  npx playwright test tests/<your-q2-file>
  ```
- **Q3 (E2E Search to Checkout):**
  ```bash
  npx playwright test tests/<your-q3-file>
  ```

### Run All UI Scenarios Sequentially
```bash
npx playwright test
```
*(Update this if you add custom `npm run` scripts in `package.json`.)*

## Generating & Viewing Reports
### Playwright HTML Report
```bash
npx playwright show-report
```

### Allure Report
```bash
npx allure generate allure-results --clean -o allure-report
npx allure open allure-report
```

## Running API Tests (Postman / Newman)
```bash
newman run api-tests/<your-collection-file>.json -r cli,html --reporter-html-export api-tests/report.html
```
