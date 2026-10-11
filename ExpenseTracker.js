const transactions = [];
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
        item.textContent = `${transaction.name}: ${sign}${Math.abs(transaction.amount)}`;
        transactionList.append(item);
    }
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
transactions.push(transaction);
localStorage.setItem('transactions', JSON.stringify(transactions));
renderTransactions();
form.reset();
})
