document.addEventListener('DOMContentLoaded', function() {
    const applyButtons = document.querySelectorAll('.apply-button');
    if (applyButtons.length > 0) {  
        applyButtons.forEach(button => {
            button.addEventListener('click', function() {
                const jobRef = this.getAttribute('data-jobref');
                if (jobRef !== null) {
                    localStorage.setItem('jobRef', jobRef);
                    window.location.href = 'apply.html';
                }
            });
        });
    }

    const jobRefInput = document.getElementById('jobRef');
    if (jobRefInput) {  
        const jobRef = localStorage.getItem('jobRef');
        console.log('Get item');
        if (jobRef) {
            jobRefInput.value = jobRef;
            console.log('Get item set');
        }

        const savedData = sessionStorage.getItem('applicantDetails');
        if (savedData) {
            const applicantDetails = JSON.parse(savedData);
            Object.keys(applicantDetails).forEach(key => {
                const input = document.getElementById(key);
                if (input) input.value = applicantDetails[key];
            });
        }
    }

    const applicationForm = document.getElementById('candidateForm');
    if (applicationForm) {
        console.log('Found');
        applicationForm.addEventListener('submit', function(event) {
            if (!validateFirstName() || !validateLastName() || !validateDOB() || !validateGender() || !validateAddress() || !validateTown() || !validateStateAndPostcode() || !validatePhoneNumber() || !validateOtherSkills()) {
                console.log('Event called');
                event.preventDefault();  
                
            } else {
                const formData = {
                    firstName: document.getElementById('first-name').value,
                    lastName: document.getElementById('last-name').value,
                    dob: document.getElementById('dob').value,
                    gender: document.querySelector('input[name="gender"]:checked') ? document.querySelector('input[name="gender"]:checked').value : '',
                    address: document.getElementById('street-address').value,
                    suburb: document.getElementById('suburb-town').value,
                    state: document.getElementById('state').value,
                    postcode: document.getElementById('postcode').value,
                    phone: document.getElementById('phone').value,
                    otherSkills: document.getElementById('other-skills').value
                };
                sessionStorage.setItem('applicantDetails', JSON.stringify(formData));
            }
        });
    } else {
        console.log('Not Found');
    }

    const backButton = document.getElementById('backButton');
    if (backButton) {
        backButton.addEventListener('click', function() {
            window.history.back();
        });
    }
});

function displayError(inputId, message) {
    const errorSpan = document.getElementById(`${inputId}-error`);
    if (errorSpan) {
        errorSpan.textContent = message;
        errorSpan.style.display = 'block';
    }
}

function clearError(inputId) {
    const errorSpan = document.getElementById(`${inputId}-error`);
    if (errorSpan) {
        errorSpan.textContent = '';
        errorSpan.style.display = 'none'; 
    }
}

// Functions for validating each form field
function validateFirstName() {
    clearError('first-name');
    const firstNameInput = document.getElementById('first-name');
    const firstNameValue = firstNameInput.value.trim(); 
    if (firstNameValue === '') {
        displayError('first-name', 'First name is required.');
        return false;
    }
    const regex = /^[A-Za-z ]{1,20}$/;
    if (!regex.test(firstNameValue)) {
        displayError('first-name', 'First name must be 1-20 alphabetic characters.');
        return false;
    }
    return true;
}

function validateLastName() {
    clearError('last-name');
    const lastNameInput = document.getElementById('last-name');
    const lastNameValue = lastNameInput.value.trim(); 
    if (lastNameValue === '') {
        displayError('last-name', 'Last name is required.');
        return false;
    }
    const regex = /^[A-Za-z ]{1,20}$/;
    if (!regex.test(lastNameValue)) {
        displayError('last-name', 'Last name must be 1-20 alphabetic characters.');
        return false;
    }
    return true;
}

function validateDOB() {
    clearError('dob');
    const dobInput = document.getElementById('dob');
    const dobValue = dobInput.value;
    if (dobValue === '') {
        displayError('dob', 'Date of Birth is required.');
        return false;
    }
    const regex = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!regex.test(dobValue)) {
        displayError('dob', 'Date must be in dd/mm/yyyy format.');
        return false;
    }

    const [day, month, year] = dobValue.split('/').map(num => parseInt(num, 10));
    const dob = new Date(year, month - 1, day);
    const today = new Date();

    if (dob.getDate() !== day || month < 1 || month > 12 || day < 1 || day > 31) {
        displayError('dob', 'Invalid date.');
        return false;
    }

    let age = today.getFullYear() - year;
    if (today.getMonth() < month - 1 || (today.getMonth() === month - 1 && today.getDate() < day)) {
        age--;
    }

    if (age < 15 || age > 80) {
        displayError('dob', 'Age must be between 15 and 80 years.');
        return false;
    }
    return true;
}

function validateGender() {
    clearError('gender');
    const gender = document.querySelector('input[name="gender"]:checked');
    if (!gender) {
        displayError('gender', 'Selecting a gender is required.');
        return false;
    }
    return true;
}

function validateAddress() {
    clearError('street-address');
    const addressInput = document.getElementById('street-address');
    const addressValue = addressInput.value.trim(); 
    if (addressValue === '') {
        displayError('street-address', 'Address is required.');
        return false;
    }
    if (addressValue.length > 40) {
        displayError('street-address', 'Address must not exceed 40 characters.');
        return false;
    }
    return true;
}

function validateTown() {
    clearError('suburb-town');
    const suburbInput = document.getElementById('suburb-town');
    const suburbValue = suburbInput.value.trim(); 
    if (suburbValue === '') {
        displayError('suburb-town', 'Suburb is required.');
        return false;
    }
    const regex = /^[A-Za-z ]{1,40}$/;
    if (!regex.test(suburbValue)) {
        displayError('suburb-town', 'Suburb must be 1-40 alphabetic characters.');
        return false;
    }
    return true;
}

function validateStateAndPostcode() {
    clearError('state');
    clearError('postcode');
    const stateInput = document.getElementById('state');
    const postcodeInput = document.getElementById('postcode');
    const state = stateInput.value;
    const postcode = postcodeInput.value.trim();
    if (state === '') {
        displayError('state', 'Please select a state.');
        return false;
    }
    if (postcode === '') {
        displayError('postcode', 'Postcode is required.');
        return false;
    }
    const regex = /^[0-9]{4}$/;
    if (!regex.test(postcode)) {
        displayError('postcode', 'Postcode must be exactly 4 digits.');
        return false;
    }
    const stateMap = {
        'VIC': ['3', '8'],
        'NSW': ['1', '2'],
        'QLD': ['4', '9'],
        'NT': ['0'],
        'WA': ['6'],
        'SA': ['5'],
        'TAS': ['7'],
        'ACT': ['0']
    };
    const firstDigit = postcode.charAt(0);
    if (!stateMap[state].includes(firstDigit)) {
        displayError('postcode', 'State and postcode do not match.');
        return false;
    }
    return true;
}

function validatePhoneNumber() {
    clearError('phone');
    const phoneInput = document.getElementById('phone');
    const phoneValue = phoneInput.value.trim();
    if (phoneValue === '') {
        displayError('phone', 'Phone number is required.');
        return false;
    }
    const regex = /^[0-9\s]{8,12}$/;
    if (!regex.test(phoneValue)) {
        displayError('phone', 'Phone number must be 8 to 12 digits or spaces.');
        return false;
    }
    return true;
}

function validateOtherSkills() {
    clearError('other-skills');
    const otherSkillSelected = document.getElementById('skills').selectedIndex;
    const otherSkillsText = document.getElementById('other-skills');
    if (otherSkillSelected == 5 && otherSkillsText.value.trim() === '') {
        displayError('other-skills', 'Please fill in the other skills text area.');
        return false;
    }
    return true;
}