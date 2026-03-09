// Initialize or Fetch Data
let expenses = JSON.parse(localStorage.getItem('myExpenses')) || [];

// Page Load Detection
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('total-expense')) {
        updateDashboard();
    }
    if (document.getElementById('history-body')) {
        renderHistory();
    }
});

// Function to add a new expense
function addExpense() {
    const desc = document.getElementById('desc').value;
    const amount = document.getElementById('amount').value;
    const category = document.getElementById('category').value;
    const date = new Date();

    if (desc === '' || amount === '') {
        alert("Please fill in all fields.");
        return;
    }

    const newExpense = {
        id: Date.now(),
        description: desc,
        amount: Number(amount), // Ensuring numeric conversion
        category: category,
        date: date.toISOString()
    };

    expenses.push(newExpense);
    saveData();
    
    // Clear inputs
    document.getElementById('desc').value = '';
    document.getElementById('amount').value = '';
    
    updateDashboard();
    alert("Expense Added Successfully!");
}

// Update Dashboard Totals
function updateDashboard() {
    const totalEl = document.getElementById('total-expense');
    const monthEl = document.getElementById('month-expense');
    const countEl = document.getElementById('transaction-count');

    const total = expenses.reduce((sum, item) => sum + item.amount, 0);
    
    // Filter for current month
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const monthTotal = expenses
        .filter(item => {
            const itemDate = new Date(item.date);
            return itemDate.getMonth() === currentMonth && itemDate.getFullYear() === currentYear;
        })
        .reduce((sum, item) => sum + item.amount, 0);

    totalEl.innerText = `$${total.toFixed(2)}`;
    monthEl.innerText = `$${monthTotal.toFixed(2)}`;
    countEl.innerText = expenses.length;
}

// Render History Table
function renderHistory() {
    const tbody = document.getElementById('history-body');
    tbody.innerHTML = '';

    expenses.forEach((item, index) => {
        const row = document.createElement('tr');
        const dateFormatted = new Date(item.date).toLocaleDateString();

        row.innerHTML = `
            <td>${item.description}</td>
            <td>$${item.amount.toFixed(2)}</td>
            <td><span class="badge">${item.category}</span></td>
            <td>${dateFormatted}</td>
            <td><button class="delete-btn" onclick="deleteExpense(${index})">Delete</button></td>
        `;
        tbody.appendChild(row);
    });
}

// Delete an Expense
function deleteExpense(index) {
    if (confirm("Are you sure you want to delete this transaction?")) {
        expenses.splice(index, 1);
        saveData();
        renderHistory();
    }
}

// Utility to save to LocalStorage
function saveData() {
    localStorage.setItem('myExpenses', JSON.stringify(expenses));
}