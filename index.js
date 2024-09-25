#!/usr/bin/env node

const {Command} = require('commander')
const fs = require('fs')
const path = require('path')

const program = new Command()
const filePath = path.join(process.cwd(), 'expenses.json')

// Helper to read and write data
const readExpenses = () => {
  if (!fs.existsSync(filePath)) {
    return []
  }
  const data = fs.readFileSync(filePath, 'utf-8')
  return JSON.parse(data || '[]')
}

const writeExpenses = expenses => {
  fs.writeFileSync(filePath, JSON.stringify(expenses, null, 2))
}

program
  .name('expense-tracker')
  .description('A simple CLI-based expense tracker to manage your finances.')
  .version('1.0.0')
  .helpOption('-H, --help', 'display help for command')

// Add expense
program
  .command('add')
  .description('Add an expense')
  .requiredOption('--description <description>', 'Expense description')
  .requiredOption('--amount <amount>', 'Expense amount')
  .action(options => {
    const expenses = readExpenses()
    const newExpense = {
      id: expenses[expenses.length - 1]?.id || 0 + 1,
      date: new Date().toISOString().slice(0, 10),
      description: options.description,
      amount: parseFloat(options.amount),
    }
    expenses.push(newExpense)
    writeExpenses(expenses)
    console.log(`# Expense added successfully (ID: ${newExpense.id})`)
  })

// Update expense
program
  .command('update')
  .description('Update an expense')
  .requiredOption('--id <id>', 'Expense ID')
  .option('--description <description>', 'Updated description')
  .option('--amount <amount>', 'Updated amount')
  .action(options => {
    const expenses = readExpenses()
    const expense = expenses.find(e => e.id == options.id)
    if (!expense) return console.log('# Expense not found.')

    if (options.description) expense.description = options.description
    if (options.amount) expense.amount = parseFloat(options.amount)
    writeExpenses(expenses)
    console.log(`# Expense updated successfully (ID: ${options.id})`)
  })

// Delete expense
program
  .command('delete')
  .description('Delete an expense')
  .requiredOption('--id <id>', 'Expense ID')
  .action(options => {
    let expenses = readExpenses()
    const expense = expenses.find(e => e.id == options.id)
    if (!expense) return console.log('# Expense not found.')
    expenses = expenses.filter(e => e.id != options.id)
    writeExpenses(expenses)
    console.log(`# Expense deleted successfully (ID: ${options.id})`)
  })

// List all expenses
program
  .command('list')
  .description('List all expenses')
  .action(() => {
    const expenses = readExpenses()
    console.log('# ID  Date       Description  Amount')
    expenses.forEach(e => {
      console.log(`# ${e.id}   ${e.date}  ${e.description}        $${e.amount}`)
    })
  })

// Show total summary
program
  .command('summary')
  .description('Show total expenses')
  .option('--month <month>', 'Filter by month (1-12)')
  .action(options => {
    const expenses = readExpenses()
    let filteredExpenses = expenses

    if (options.month) {
      const month = parseInt(options.month)
      filteredExpenses = expenses.filter(e => {
        const expenseMonth = new Date(e.date).getMonth() + 1
        return expenseMonth === month
      })
      const total = filteredExpenses.reduce((sum, e) => sum + e.amount, 0)
      console.log(`# Total expenses for month ${options.month}: $${total}`)
    } else {
      const total = expenses.reduce((sum, e) => sum + e.amount, 0)
      console.log(`# Total expenses: $${total}`)
    }
  })

// Parse the command-line arguments
program.parse(process.argv)
