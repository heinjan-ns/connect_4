# Connect 4

This is a typescript implementation a Connect 4 game for the orange NS dojo belt.

## Summary of the connect-4 game Rules

- **Board**: 6 rows × 7 columns (42 positions)
- **Objective**: Connect 4 coins in a row (horizontal, vertical, or diagonal)
- **Gameplay**: Players alternate dropping coins into columns; coins fall to the lowest available position
- **Win**: First player to get 4 in a row wins
- **Draw**: All 42 positions filled with no winner

## Development

### Prerequisites

- Node.js 20+
- npm

### Install Dependencies

```bash
npm install
```

### Run the Game

```bash
# No build required, run the development code
npm run dev

# Production mode: build first
npm run build
npm start
```

### Run linter and tests

```bash
# Run linter
npm run lint

# Run Cucumber tests
npm run test:cucumber
npm run test:cucumber:watch
```

### Build

```bash
npm run build
```

## CI/CD on GitHub

GitHub Actions automatically runs on every push and pull request:

- Linter checks
- Cucumber tests
- Docker image build and push to GitHub Container Registry for the main branch
- No PR flow implemented for this project

## Docker stuff

### Build Image

```bash
docker build -t connect4 .
```

### Run Container

```bash
docker run -it connect4
```

### Pull from GitHub Container Registry

```bash
docker pull ghcr.io/heinjan-ns/connect4:latest
docker run -it ghcr.io/heinjan-ns/connect4:latest
```

Multi-platform support: linux/amd64, linux/arm64
