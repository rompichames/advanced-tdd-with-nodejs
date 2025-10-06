# Advanced TDD with Node.js

This project demonstrates advanced Test-Driven Development practices using Node.js with the built-in test runner.

[![CI](https://github.com/guillaumeagile/advanced-tdd-with-nodejs/actions/workflows/ci.yml/badge.svg?branch=simple-TDD-with-dependencies%2Fwip)](https://github.com/guillaumeagile/advanced-tdd-with-nodejs/actions/workflows/ci.yml)

## Node.js Upgrade Instructions

### Current Status
- **Current Version**: Node.js v20.9.0
- **Target Version**: Node.js v22.20.0 (Latest LTS)
- **Current npm**: v10.8.3

### How to Upgrade Node.js

You have several options to upgrade Node.js to the latest LTS version (v22.20.0):

#### Option 1: Using Volta (Recommended - already installed)
```bash
# Install the latest LTS version
volta install node@lts

# Pin this version to your project
volta pin node@lts
```

#### Option 2: Using n version manager
```bash
# Install latest LTS (requires sudo)
sudo n lts

# Or install specific version
sudo n 22.20.0
```

#### Option 3: Using nvm (if you prefer to install it)
```bash
# Install nvm first if not installed
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Then install and use Node.js LTS
nvm install --lts
nvm use --lts
nvm alias default lts/*
```

#### Option 4: Direct download from nodejs.org
1. Visit https://nodejs.org/
2. Download the LTS version (v22.20.0)
3. Install the package

### After Upgrading Node.js

1. **Verify the installation**:
   ```bash
   node --version  # Should show v22.20.0
   npm --version   # Should show v10.x.x or higher
   ```

2. **Update npm to latest version**:
   ```bash
   npm install -g npm@latest
   ```

3. **Install project dependencies** (when you add them):
   ```bash
   npm install
   ```

4. **Run tests to verify everything works**:
   ```bash
   npm test
   ```

## Project Structure

```
Advanced-TDD-with-NodeJS/
├── package.json          # Project configuration with Node.js v22 requirements
├── .nvmrc                # Node.js version pinning (22.20.0)
├── index.js              # Main application with sample functions
├── test/
│   └── index.test.js     # Test files using Node.js built-in test runner
└── README.md             # This file
```

## Features

- **Modern ES Modules**: Uses `"type": "module"` for native ES6 imports/exports
- **Built-in Test Runner**: Uses Node.js native test runner (no external dependencies)
- **Version Constraints**: Enforces Node.js >=22.0.0 and npm >=10.0.0
- **Watch Mode**: Supports `--watch` flag for development and testing
- **TDD Ready**: Pre-configured for Test-Driven Development workflow

## Available Scripts

### Testing
- `npm test` - Run all Jest tests
- `npm run test:watch` - Run Jest tests in watch mode
- `npm run test:unit` - Run unit tests only
- `npm run test:integration` - Run integration tests only
- `npm run test:coverage` - Run tests with coverage report
- `npm run test:bdd` - Run BDD tests with Cucumber & Playwright
- `npm run test:bdd:watch` - Run BDD tests in watch mode
- `npm run test:bdd:report` - Generate HTML report for BDD tests

### Development
- `npm start` - Start the application
- `npm run dev` - Start the application in watch mode
- `npm run build` - Build TypeScript to JavaScript
- `npm run build:watch` - Build in watch mode

## What's New in Node.js v22

- **Performance improvements**: Better V8 engine performance
- **Enhanced security**: Updated security features and patches
- **Better ES modules support**: Improved ESM compatibility
- **New built-in test runner features**: Enhanced testing capabilities
- **Updated dependencies**: Latest versions of core dependencies

## Testing Approaches

This project supports two complementary testing approaches:

### 1. TDD with Jest (Unit & Integration Tests)
1. **Write a failing test** in the `tests/` directory
2. **Run the test** with `npm test` to see it fail
3. **Write minimal code** to make the test pass
4. **Refactor** while keeping tests green
5. **Repeat** the cycle

See [TESTING_GUIDE.md](TESTING_GUIDE.md) for detailed Jest testing guidelines.

### 2. BDD with Cucumber & Playwright (Executable Specifications)
1. **Write a feature** in Gherkin syntax describing the behavior
2. **Create step definitions** to implement the steps
3. **Run scenarios** with `npm run test:bdd`
4. **Implement the feature** to make scenarios pass
5. **Use as living documentation** for stakeholders

See [BDD_GUIDE.md](BDD_GUIDE.md) for comprehensive BDD testing guidelines.

## Getting Started

1. Upgrade Node.js following the instructions above
2. Run `npm test` to verify the setup
3. Start writing your tests and implementation following TDD principles

## Troubleshooting

If you encounter issues after upgrading:

1. **Clear npm cache**: `npm cache clean --force`
2. **Delete node_modules**: `rm -rf node_modules package-lock.json`
3. **Reinstall dependencies**: `npm install`
4. **Check Node.js version**: `node --version`
5. **Check npm version**: `npm --version`

## Next Steps

- Add more sophisticated testing scenarios
- Implement CI/CD pipeline
- Add code coverage reporting
- Integrate with testing frameworks like Jest or Mocha if needed
- Add linting and formatting tools (ESLint, Prettier)
