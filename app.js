// Add user balance and transaction history
let balance = 10000;
let transactionHistory = [];

// Initialize app
// This adds an event listener that listens for the DOMContentLoaded 
//event, which is fired when the HTML document has been completely 
//loaded and parsed
document.addEventListener('DOMContentLoaded', () => {
  //This calls the loadData function to retrieve any saved data 
  //(such as balance and transaction history) from localStorage 
  //when the page loads.
  loadData();
  //This sets up event listeners for interactions (like form 
  //submission) once the page content has loaded.
  setupEventListeners();
});

// Load data from localStorage
function loadData() {
  //This retrieves the saved balance value from localStorage 
  // (the browser's local storage). It returns a string, or null 
  //if no value is found.
  var savedBalance = localStorage.getItem('balance');
  //If savedBalance is not null, it converts it from a string to a 
  //number using parseFloat() and updates the balance variable.
  if (savedBalance !== null) {
    balance = parseFloat(savedBalance);
  }

  // this retrieves the saved transactionHistory from localStorage.
  var savedTransactionHistory = localStorage.getItem('transactionHistory');
  //If savedTransactionHistory is not null, it parses the string into
  // an array of transaction objects using JSON.parse(), and assigns it
  // to transactionHistory.
  if (savedTransactionHistory !== null) {
    transactionHistory = JSON.parse(savedTransactionHistory);
  }

  //After loading the data from localStorage, it calls updateUI() to 
  //refresh the page and show the current balance and transaction history.
  updateUI();
}

// Update the UI
function updateUI() {
  //This updates the element with the ID balance to display the 
  //current balance. balance.toFixed(2) formats the balance to 2 
  //decimal places.
  document.getElementById('balance').textContent = balance.toFixed(2);
  //Refresh the transactionHistory displayed on the page
  updateTransactionHistory();
}

// Update the transaction history list
function updateTransactionHistory() {
  //This retrieves the element with the ID history where transaction 
  //history is displayed.
  var historyList = document.getElementById('history');
  //Clear current list
  historyList.innerHTML = '';

  //This iterates over the transactionHistory array, and for each transaction
  transactionHistory.forEach(transaction => {
	//This creates a new <li> element to represent a single 
	//transaction in the list.
    var li = document.createElement('li');
	//This sets the text content of the list item to include the 
	//transaction's date, amount, and recipient.
    li.textContent = `${transaction.date}: Sent $${transaction.amount} to ${transaction.recipient}`;
    //This adds the newly created <li> element to the historyList 
    //element, which will display the transaction on the page.
	historyList.appendChild(li);
  });
}

// Handle sending money
function setupEventListeners() {
  //This retrieves the form element with the ID sendForm, where users 
  //can submit their transaction details
  var sendForm = document.getElementById('sendForm');
  //Event listener for clicking the send button
  sendForm.addEventListener('submit', (e) => {
	//This prevents the form from performing its default action 
	//(reloading the page when submitted).
    e.preventDefault();
	//This retrieves the recipient's name from the input field with 
	//the ID recipient.
    var recipient = document.getElementById('recipient').value;
	//This retrieves the transaction amount from the input field 
	//with the ID amount and converts it from a string to a 
	//floating-point number.
    var amount = parseFloat(document.getElementById('amount').value);

	//This checks if the recipient is not empty, the amount is a 
	//valid number, and the amount does not exceed the current 
	//balance. If all conditions are true, it proceeds with the 
	//transaction.
    if (recipient && amount && amount <= balance) {
      // Process the transaction
      processTransaction(recipient, amount);
    } else {
      alert('Invalid input or insufficient balance.');
    }
  });
}

// Process the transaction
function processTransaction(recipient, amount) {
  // Update balance
  //This deducts the transaction amount from the current balance.
  balance -= amount;

  // Create transaction record
  //This creates a new transaction object containing the current 
  //date and time (formatted as a string using toLocaleString()), 
  //the recipient, and the amount sent.
  var transaction = {
    date: new Date().toLocaleString(),
    recipient,
    amount
  };

  // Add to transaction history
  //This adds the new transaction to the transactionHistory array.
  transactionHistory.push(transaction);

  // Save data
  //This saves the updated balance to localStorage as a string.
  localStorage.setItem('balance', balance.toString());
  //This saves the updated transactionHistory array to localStorage, 
  //converting it to a string with JSON.stringify().
  localStorage.setItem('transactionHistory', JSON.stringify(transactionHistory));

  // Update UI
  updateUI();
}


