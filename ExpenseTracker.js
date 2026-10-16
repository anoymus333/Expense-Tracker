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

function renderTransactions() {
    transactionList.replaceChildren();

    for (const transaction of transactions) {
        const sign = transaction.type === 'income' ? '+' : '-';
        const item = document.createElement('p');

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        item.textContent = `${transaction.name}: ${sign}${Math.abs(transaction.amount)}`;
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
}


renderTransactions();
form.addEventListener('submit',function(event){
    event.preventDefault();
 const name = nameInput.value;
 const amount = Number(amountInput.value);
 const type = typeInput.value;
const transaction = {
    name,
    amount,
    type
};
const deleteButton = document.createElement('button');
deleteButton.textContent = 'Delete';



transactions.push(transaction);
localStorage.setItem('transactions', JSON.stringify(transactions));
renderTransactions();
form.reset();
})
