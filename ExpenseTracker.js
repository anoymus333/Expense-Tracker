const transactions = [];
transactions.push(
    {
        name: 'salary',
        amount: 1000,
        type: 'income',
    },
    {
        name: 'Gas',
        amount: -30,
        type: 'expense',
    }

);
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
