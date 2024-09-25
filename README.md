# expense-tracker-cli

A simple and powerful command-line interface (CLI) to manage your finances effectively.

## Features

- Add new expenses with descriptions and amounts.
- Update existing expenses by ID (description and/or amount).
- Delete expenses by ID.
- List all your expenses in a clear and organized format.
- Calculate and display total expenses, optionally filtered by month.

## Requirements

- Node.js and npm (or yarn)

## Installation

1. Clone the Repository

```bash
git clone https://github.com/ar-dehghan-a/expense-tracker-cli.git
cd expense-tracker-cli
```

2. Install Dependencies

```bash
npm install
```

3. Creates a symlink in your global npm modules directory

```bash
npm link
```

## Usage

Here's how to use the expense-tracker-cli commands:

### Adding Expenses

```bash
expense-tracker add --description="Movie ticket" --amount=15.00
```

### Updating Expenses

```bash
expense-tracker update --id=1 --description="Dinner with friends" --amount=30.00
expense-tracker update --id=2 --amount=25.00
```

### Deleting Expenses

```bash
expense-tracker delete --id=3
```

### Listing All Expenses

```bash
expense-tracker list
```

### Calculating Total Expenses

```bash
expense-tracker summary
```

### Filtering Total Expenses by Month

```bash
expense-tracker summary --month=8
```

<https://roadmap.sh/projects/expense-tracker>
