# Car History App

Vehicle maintenance history tracker for a Chevrolet Cavalier 2021. Stores service visits, component inspections, tire checks, and maintenance guidelines in MySQL, with a JSON export tool.

## Prerequisites

- Node.js >= 18
- MySQL 8.x

## Setup

```bash
cd backend
npm install
cp .env.example .env   # edit with your MySQL credentials
```

## Migrations

```bash
cd backend
npm run migrate:create -- <name>   # create a new migration pair (.up.sql / .down.sql)
npm run migrate:up                 # apply all pending migrations
npm run migrate:down               # revert the last applied migration
npm run migrate:down -- 3          # revert the last 3 migrations
```

## Seed

```bash
cd backend
npm run seed   # populate the database with real service history data
```

## Export

```bash
cd backend
npm run export   # write the full history to exports/car-history-<date>.json
```

## Project structure

```
backend/
  migrations/          SQL migration files (NNNN_name.up.sql / .down.sql)
  seeds/               SQL seed data
  exports/             JSON export output (gitignored)
  src/
    config/            Environment configuration
    infrastructure/    Database connection and query execution
    domain/
      entities/        TypeScript interfaces per table
      enums/           Domain union types and const objects
    repositories/      Data access layer (interface + MySQL implementation)
    services/          Business logic (MigrationService, ExportService)
    cli/               Thin CLI entry points
docs/                  Vehicle manuals (PDF)
images/                Service receipt photos
```
