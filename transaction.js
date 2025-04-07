// Load transaction history from localStorage
document.addEventListener('DOMContentLoaded', () => {
  loadTransactionHistory();
});

// Load and display transaction history
function loadTransactionHistory() {
  // Retrieve the saved transaction history from localStorage
  var savedTransactionHistory = localStorage.getItem('transactionHistory');
  var transactionHistory = [];

  if (savedTransactionHistory !== null) {
    // Parse the saved data into an array of transactions
    transactionHistory = JSON.parse(savedTransactionHistory);
  }

  // Update the UI with the transaction history
  updateTransactionHistory(transactionHistory);
}

// Update the transaction history UI
function updateTransactionHistory(transactionHistory) {
  // Get the history list element
  var historyList = document.getElementById('history');
  
  // Clear current list
  historyList.innerHTML = '';

  // Iterate over each transaction and display it
  transactionHistory.forEach(transaction => {
    var li = document.createElement('li');
    li.textContent = `${transaction.date}: Sent $${transaction.amount} to ${transaction.recipient}`;
    historyList.appendChild(li);
  });
}


