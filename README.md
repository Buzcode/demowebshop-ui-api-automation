# Demo Web Shop UI & API Automation

## Project Overview
Automated UI testing for **Demo Web Shop** (https://demowebshop.tricentis.com/) using **Playwright** with **Page Object Model (POM)**, and API testing for **JSONPlaceholder Users API** using **Postman & Newman**.

## Tech Stack
- **UI Automation:** Playwright (JavaScript / Node.js, ES Modules) with Page Object Model (POM)
- **API Automation:** Postman & Newman CLI
- **Reporting:** Playwright HTML Report, Allure Report (`allure-playwright`, `allure-commandline`), Newman HTML/CLI Report
- **Configuration:** `dotenv`
- **Version Control:** Git & GitHub

## Prerequisites
- Node.js (v18+ recommended)
- Java JDK (required to generate/open Allure reports)
- Newman & `newman-reporter-html` installed globally:
  ```bash
  npm install -g newman newman-reporter-html
  ```

## Project Structure
- `pages/` — Page Object Model classes (`BasePage.js`, `LoginPage.js`, `RegisterPage.js`, `ProductPage.js`, `CartPage.js`, `SearchPage.js`, `CheckoutPage.js`)
- `tests/` — UI test scenarios (`q1_invalid_login.spec.js`, `q2_register_cart.spec.js`, `q3_e2e_checkout.spec.js`)
- `api-tests/` — Postman collection JSON (`jsonplaceholder-users.postman_collection.json`)
- `playwright.config.js` — Playwright sequential execution & HTML/Allure reporter configuration
- `package.json` — Scripts for individual, sequential, and combined test execution

## Setup Instructions
1. Clone the repository:
   ```bash
   git clone https://github.com/Buzcode/demowebshop-ui-api-automation.git
   cd demowebshop-ui-api-automation
   ```
2. Install dependencies and Playwright Chromium:
   ```bash
   npm install
   npx playwright install chromium
   ```
3. Create a `.env` file in the root directory and configure:
   ```env
   BASE_URL=https://demowebshop.tricentis.com/
   ```

## Running Tests

### Run Each Scenario Individually
- **Q1 (Invalid Login):**
  ```bash
  npm run test:q1
  ```
- **Q2 (Register, Login & Add to Cart):**
  ```bash
  npm run test:q2
  ```
- **Q3 (E2E Product Search to Order Checkout):**
  ```bash
  npm run test:q3
  ```
- **Part C (API Tests via Newman + HTML Report):**
  ```bash
  npm run test:api
  ```

### Run All Scenarios Sequentially
- **All UI scenarios sequentially (`workers: 1`):**
  ```bash
  npm run test:ui
  ```
- **All UI + API scenarios sequentially + generate Allure report:**
  ```bash
  npm run test:all
  ```

## Generating & Viewing Reports

### Playwright HTML Report (includes attached screenshots)
```bash
npm run report:html
```

### Allure Report (includes test steps & attached screenshots)
```bash
npm run report:allure:generate
npm run report:allure:open
```

### Newman API HTML Report
Generated automatically at `reports/newman-report.html` when running `npm run test:api` or `npm run test:all` (or directly via):
```bash
newman run api-tests/jsonplaceholder-users.postman_collection.json -r "cli,html" --reporter-html-export reports/newman-report.html
```
