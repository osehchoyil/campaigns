document.getElementById('paymentForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent the form from refreshing the page

    // Get form values
    const cardNumber = document.getElementById('cardNumber').value;
    const expDate = document.getElementById('expDate').value;
    const amount = document.getElementById('amount').value;

    // Data to send to the USAePay API
    const paymentData = {
        command: 'sale',
        amount: amount,
        card: {
            number: cardNumber,
            expiration: expDate
        },
        api_key: 'lW7Y8Ce13M3wRd4T1u2D7y2V1g291ObX' // Your USAePay API Key
    };

    // Call the API using Fetch
    fetch('https://www.usaepay.com/api/v2/transactions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(paymentData)
    })
    .then(response => response.json())
    .then(data => {
        const paymentResult = document.getElementById('paymentResult');
        if (data.result === 'approved') {
            paymentResult.innerHTML = '<p>Payment Successful! Transaction ID: ' + data.transaction_id + '</p>';
        } else {
            paymentResult.innerHTML = '<p>Payment Failed: ' + data.error + '</p>';
        }
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('paymentResult').innerHTML = '<p>An error occurred. Please try again.</p>';
    });
});
