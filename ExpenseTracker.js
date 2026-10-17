const savedTransaction = JSON.parse(localStorage.getItem('transactions'));
const transactions = savedTransaction || [];
const totalIncomeElement = document.getElementById('total-income');
const balanceElement = document.getElementById('balance');
const totalExpensesElement = document.getElementById('total-expenses');
const form = document.getElementById('transaction-form');
const nameInput = document.getElementById('transaction-name');
const amountInput = document.getElementById('transaction-amount');
const typeInput = document.getElementById('transaction-type');
const transactionList = document.getElementById('transaction-list');
const filterTypeSelect = document.getElementById('filter-type');
const dateInput = document.getElementById('transaction-date');
const sortDateSelect = document.getElementById('sort-date');

function renderTransactions() {
    
    
        const slectedType = filterTypeSelect.value;
    const filteredTransactions = transactions.filter(transaction => transaction.type === slectedType || slectedType === 'all');

    
    transactionList.replaceChildren();

    for (const transaction of filteredTransactions) {
        const sign = transaction.type === 'income' ? '+' : '-';
        const item = document.createElement('p');

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        item.textContent = `${transaction.name}: ${sign}${Math.abs(transaction.amount)} | Date: ${transaction.date || 'N/A'}`;
        transactionList.append(item);
        item.append(deleteButton);

        const editButton = document.createElement('button');
editButton.textContent = 'Edit';
item.append(editButton);

        deleteButton.addEventListener('click', function(event) {
const index = transactions.findIndex( item => item === transaction);
transactions.splice(index, 1);
localStorage.setItem('transactions', JSON.stringify(transactions));
renderTransactions();
});

editButton.addEventListener('click', function(event) {
const newName = prompt('Enter new name:', transaction.name);
if (newName !== null) {
    transaction.name = newName;
const newAmount = prompt('Enter new amount:', transaction.amount);
const updatedAmount = Number(newAmount);
if (!isNaN(updatedAmount) && updatedAmount > 0) {
    transaction.amount = updatedAmount;
}
localStorage.setItem('transactions', JSON.stringify(transactions));
renderTransactions();
}
});


    }

    const totalIncome = transactions
        .filter(transaction => transaction.type === 'income')
        .reduce((sum, transaction) => sum + Math.abs(transaction.amount), 0);
        totalIncomeElement.textContent = totalIncome;
    const totalExpenses = transactions
        .filter(transaction => transaction.type === 'expense')
        .reduce((sum, transaction) => sum + Math.abs(transaction.amount), 0);
    totalExpensesElement.textContent = totalExpenses;
    const balance = totalIncome - totalExpenses;
    balanceElement.textContent = balance;

filterTypeSelect.addEventListener('change', () => {
    renderTransactions();
});
    
}
//



renderTransactions();
form.addEventListener('submit',function(event){
    event.preventDefault();
 const name = nameInput.value;
 const amount = Number(amountInput.value);
 const type = typeInput.value;
 const date = dateInput.value;
const transaction = {
    name,
    amount,
    type,
    date
};

const deleteButton = document.createElement('button');
deleteButton.textContent = 'Delete';



transactions.push(transaction);
localStorage.setItem('transactions', JSON.stringify(transactions));
renderTransactions();
form.reset();
})
filterTypeSelect.addEventListener('change', () => {
    renderTransactions();
});