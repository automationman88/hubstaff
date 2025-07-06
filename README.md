# Hubstaff Project

This project is a test framework for a time tracking application.

## Features

- ESLint and Prettier for code quality

## Prerequisites

- Node.js (version 16 or higher recommended)
- npm or yarn

## Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/hubstaff.git
   cd hubstaff
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Add missing credentials to `.env` file:

4. Run tests:
   ```bash
   npx playwright test
   ```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## NOTE:

1. `Create a team payment: one time amount aka "bonus" payment` fails because `Rate type` is set to `Bonus` instead
   `Pending` by test case.
2. `.env` was pushed intentionally in order to run tests (test account was created for this purpose).

