/**
* Author: Muhammad Osama Nadeem, 104659862
* Target: apply.html
* Purpose: This file is for COS60004 assignment 2
* Created: 28/04/24
* Last updated: 28/04/24
*/

document.addEventListener('DOMContentLoaded', function() {
    const timeLimit = 5 * 60 * 1000; 
    const warningTime = 1 * 60 * 1000; 
    let timeoutWarning;

    const countdownDisplay = document.createElement('div');
    countdownDisplay.setAttribute('id', 'countdownTimer');
    countdownDisplay.style.position = 'fixed';
    countdownDisplay.style.bottom = '10px';
    countdownDisplay.style.left = '10px';
    countdownDisplay.style.backgroundColor = 'purple';
    countdownDisplay.style.color = 'grey';
    countdownDisplay.style.border = '1px solid darkpurple';
    countdownDisplay.style.padding = '10px';
    countdownDisplay.style.borderRadius = '5px';
    countdownDisplay.style.display = 'none';
    document.body.appendChild(countdownDisplay);

    let countdown = setTimeout(expireApplication, timeLimit);
    
    function expireApplication() {
        alert('Your time has expired! You will be redirected to the home page.');
        window.location.href = 'index.html';
    }

    function updateCountdownDisplay(timeLeft) {
        const minutes = Math.floor(timeLeft / 60000);
        const seconds = ((timeLeft % 60000) / 1000).toFixed(0);
        countdownDisplay.textContent = `Time remaining: ${minutes}:${(seconds < 10 ? '0' : '')}${seconds}`;

        if (timeLeft <= warningTime) {
            countdownDisplay.style.backgroundColor = 'red';
            countdownDisplay.style.border = '1px solid darkred';
        }
    }

    function startWarningCountdown() {
        countdownDisplay.style.display = 'block';
        const startTime = new Date().getTime();
        updateCountdownDisplay(timeLimit);
        
        timeoutWarning = setInterval(function() {
            const timeLeft = timeLimit - (new Date().getTime() - startTime);
            if (timeLeft <= 0) {
                clearInterval(timeoutWarning);
                expireApplication(); 
            } else {
                updateCountdownDisplay(timeLeft);
            }
        }, 1000);
    }

    const applicationForm = document.getElementById('candidateForm');
    applicationForm.addEventListener('focusin', startWarningCountdown, { once: true });
    
    const formElements = document.querySelectorAll('#candidateForm input, #candidateForm textarea, #candidateForm select');
    formElements.forEach(function(element) {
        element.addEventListener('input', function() {
            clearTimeout(countdown);
            countdown = setTimeout(expireApplication, timeLimit);
        });
    });
});

var flashScreenBtn = document.getElementById('apply');

flashScreenBtn.addEventListener('click', function() {
    console.log('flash screen called');
    flashScreen();
});

function flashScreen() {
    document.body.style.backgroundColor = 'white';
    
    var flashDuration = 500; 
    var flashInterval = 50; 
    var flashColor = 'black';
    var originalColor = 'white';
    
    var flashIntervalId = setInterval(function() {
        document.body.style.backgroundColor = document.body.style.backgroundColor === originalColor ? flashColor : originalColor;
    }, flashInterval);
    
    setTimeout(function() {
        clearInterval(flashIntervalId);
        document.body.style.backgroundColor = originalColor;
    }, flashDuration);
}
