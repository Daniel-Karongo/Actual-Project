function wrapperFunction(view, hide, tag, element) {
    toViewAndHide(view, hide);
    if(tag != null){
        clearText(element);    
    }
    highlightClicked(document.querySelector(element));
}

function toViewAndHide(view, hide) {
    Array.from(document.querySelectorAll(view)).forEach((item)=> {item.style.display = 'block';});
    Array.from(document.querySelectorAll(hide)).forEach((item)=> {item.style.display = 'none';});
}

function clearText(tag) {
    let text = document.querySelectorAll(tag);
    text.forEach((input) => {input.value = ""});    // Works for everything except the checkbox
}

function toggleEnabled() {
    const inputFields = document.querySelectorAll('input[type = "text"], input[type = "number"]');
    const passwordField = document.getElementById('password');
    const editDetailsButton = document.getElementsByClassName('edit-details');
    const confirmDetailsButton = document.getElementsByClassName('confirm-button');
    
    inputFields.forEach((inputField) => {
        inputField.disabled = false;
    });
    passwordField.disabled = false;
    
    for (let i = 0; i < confirmDetailsButton.length; i++) {
        confirmDetailsButton[i].style.display = 'block';
    }
    
    for (let i = 0; i < editDetailsButton.length; i++) {
        editDetailsButton[i].style.display = 'none';
    };
}

function toggleShowPassword() {
    const checkbox = document.getElementById('show-pass');
    const password = document.getElementById('password');

    if(checkbox.checked) {
        password.type = "text";        
    } else {
        password.type = "password"
        
    }
}

function displayError(element, errorMessage) {
    let parentDiv = element.parentElement;
    let error = parentDiv.querySelector('.error');                
    parentDiv.classList.add('error');
    parentDiv.classList.remove('success');
    error.innerHTML = errorMessage;             
}

function nullifySuccessOrFailure(element) {
    let parentDiv = element.parentElement;
    let error = parentDiv.querySelector('.error');
    error.innerHTML = '';
    parentDiv.classList.remove('success');
    parentDiv.classList.remove('error'); 
}

function validateEmail(event) {
    const email = document.getElementById('email');
    const emailValue = email.value;
        
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const emailValidity = emailRegex.test(emailValue);    

    if(emailValidity === true) {
        nullifySuccessOrFailure(email);
        if(event === 'submit') {
            return true;
        }
    } else {
        displayError(email, "Please Enter a Valid Email");
    }
}

function validatePasswordCreation(event) {
    const field = document.getElementById('password');
    const fieldValue = field.value;
    const regex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[\W\S]).*$/;

    if(fieldValue.length < 8) {
        displayError(field, "The Password Is Too Short");
    } else {
        if(regex.test(fieldValue) === false) {
            displayError(field, "The Password Must Contain At Least One Of Each Of The Following: lowercase, UPPERCASE, special characters as well as digits");
        } else {
            nullifySuccessOrFailure(field);
            if(event === 'submit') {
                return true;
            }
        }
    }
}

function validatePhoneNumber(event) {
    const phoneNumber = document.getElementById('phone');
    const phoneNumberValue = phoneNumber.value;
    const regex = new RegExp('^07[0-9]+$');

    if(phoneNumberValue === '') {
        displayError(phoneNumber, "Please Specify A Phone Number that will be Associated With Your Rentals");
    } else {
        if(phoneNumberValue.length !== 10) {
            displayError(phoneNumber, "Please Enter A Valid Phone Number");
        } else if(regex.test(phoneNumberValue) === false) {
            displayError(phoneNumber, "Please Enter A Valid Format");
        } else {
            nullifySuccessOrFailure(phoneNumber);
            if(event === 'submit') {
                return true;
            }
        }        
    }
}

function validateForm(event) {
    event.preventDefault();

    const firstNameOkay = validateField('first-name', 'Please Specify Your First Name', 'submit');

    const lastNameOkay = validateField('last-name', 'Please Specify Your Last Name', 'submit');

    const phoneNumberOkay = validatePhoneNumber('submit');

    const emailOkay = validateField('email', 'Please Specify An Email that will be Associated With Your Rentals', 'submit');

    const createPasswordOkay = validateField('password', 'Please Enter A Password To Secure Your Account', 'submit');

    if((firstNameOkay === true) && (lastNameOkay === true) && (phoneNumberOkay === true) && (emailOkay === true) && (createPasswordOkay === true)) {
        const proceed = confirm("Are You Sure You Want To Edit Your Account Details?");
        if(proceed) {
            document.querySelector('.contact-information #contact-information-form').submit();
        }        
    }
    
}

function validateField(id, error, event) {
    const field = document.getElementById(id);
    const fieldValue = field.value;

    if(fieldValue === '') {
        displayError(field, error);
    } else {
        nullifySuccessOrFailure(field);
        if((id === 'first-name') && (event === 'submit')) {
            return true;
        } else if((id === 'last-name') && (event === 'submit')) {
            return true;
        } else if(id === 'email') {
            validateEmail();
            if(event === 'submit') {
                const emailOkay = validateEmail(event);
                return emailOkay;
            }
        } else if (id === 'password') {
            validatePasswordCreation();
            if(event === 'submit') {
                const confirmPasswordOkay = validatePasswordCreation(event);
                return confirmPasswordOkay;
            }
        }
    }
}

function validateDeletion(event) {
    event.preventDefault();
    const form = event.target;
    
    const proceed = confirm("Are You Sure You Want To Delete This Rental?");
    if(proceed) {
        alert("Rental Deleted");
        form.submit();
    }        
}

function verifyDeleteAccount(event) {
    event.preventDefault();
    const proceed = confirm("Are You Sure You Want To Delete Your Account? This Will Delete All Your Details As Well As All The Rentals You Had Uploaded.");
    if(proceed) {
        document.querySelector('#account-deleter').submit();
    }
}

function activateAnchor(event) {
    const clickedElement = event.target;
    const form = document.querySelectorAll('.rental-template');
    form.forEach((div) => {
        const descendants = div.querySelectorAll('*');
        descendants.forEach((descendant) => {
            if(descendant === clickedElement) {
                const form = div.querySelector('.edit-details-form');
                form.submit();
            }
        });        
    });
}

function zoomDiv(div) {
    // Store the original border color
    var originalBorderColor = div.style.borderColor;

    div.style.transform = 'scale(1.02, 1.0)';
    div.style.borderColor = '#2C18DE';
    div.style.outline = '2px solid #2C18DE';

    // Add the original border color to the div as a data attribute
    div.setAttribute('data-original-border-color', originalBorderColor);
}
  
function unzoomDiv(div) {
    div.style.transform = 'scale(1)';

    // Restore the original border color
    var originalBorderColor = div.getAttribute('data-original-border-color');
    div.style.borderColor = originalBorderColor;

    div.style.outline = 'none';
}

function textareaSizor() {
    const textarea = document.querySelectorAll('.rental-template-description');
    textarea.forEach((element) => {
        elementId = element.id;
        preciseElement = document.getElementById(elementId);
        const height = preciseElement.scrollHeight;
        preciseElement.style.height = height + 'px';
    });    
}

function highlightClicked(element) {
    otherElements = element.parentElement.children;
    Array.from(otherElements).forEach((otherElement) => {
        otherElement.style.backgroundColor = "transparent";
    });
    element.style.backgroundColor = "#2C18DE";
}

function filterRentalsToBeDisplayedByType() {
    let typeOfRentalFilterButton = document.querySelector('#type-of-rental');
    let typeChosen = typeOfRentalFilterButton.value;
    let typeInputs = document.querySelectorAll('.rental-type-div input');

    Array.from(typeInputs).forEach((inputField) => {
        let typeDiv = inputField.parentElement;
        let rentalDetails = typeDiv.parentElement;
        let bottomSection = rentalDetails.parentElement;
        let mainSection = bottomSection.parentElement;
        let rentalDiv = mainSection.parentElement;
        
        if(typeChosen !== "no-value") {
            if(typeChosen === inputField.value) {
                rentalDiv.style.display = "flex";
            } else if (typeChosen === "Business Premise"){
                switch(inputField.value) {
                    case "Stall":
                        rentalDiv.style.display = "flex";
                        break;
                    case "Shop":
                        rentalDiv.style.display = "flex";
                        break;
                    case "Event Hall":
                        rentalDiv.style.display = "flex";
                        break;
                    case "Warehouse":
                        rentalDiv.style.display = "flex";
                        break;
                    case "Office":
                        rentalDiv.style.display = "flex";
                        break;
                    case "Industrial":
                        rentalDiv.style.display = "flex";
                        break;
                    default:
                        rentalDiv.style.display = "none";
                }
            } else {
                rentalDiv.style.display = "none";
            }
        } else {
            rentalDiv.style.display = "flex";
        }
        
    });

    document.querySelector('#location-filter').selectedIndex = 0;
    document.querySelector('#prospects').selectedIndex = 0;
}

function filterRentalsToBeDisplayedByLocation() {
    let locationFilterButton = document.querySelector('#location-filter');
    let locationChosen = locationFilterButton.value;
    let locationInputs = document.querySelectorAll('.location-div input');

    Array.from(locationInputs).forEach((inputField) => {
        let locationDiv = inputField.parentElement;
        let rentalDetails = locationDiv.parentElement;
        let bottomSection = rentalDetails.parentElement;
        let mainSection = bottomSection.parentElement;
        let rentalDiv = mainSection.parentElement;
        
        if(locationChosen !== "no-value") {
            if(locationChosen === inputField.value) {
                rentalDiv.style.display = "flex";
            } else {
                rentalDiv.style.display = "none";
            }
        } else {
            rentalDiv.style.display = "flex";
        }
    });

    document.querySelector('#type-of-rental').selectedIndex = 0;
    document.querySelector('#prospects').selectedIndex = 0;
}

function filterRentalsToBeDisplayedByProspects() {
    let prospectsFilterButton = document.querySelector('#prospects');
    let prospectChosen = prospectsFilterButton.value;
    let originalNumberOfUnitsInputs = document.querySelectorAll('.number-of-units-div input');
    // let numberOfUnitsRemainingInputs = document.querySelectorAll('.number-of-units-remaining-div input');

    Array.from(originalNumberOfUnitsInputs).forEach((inputField) => {
        let unitsDiv = inputField.parentElement;
        let rentalDetails = unitsDiv.parentElement;
        let bottomSection = rentalDetails.parentElement;
        let mainSection = bottomSection.parentElement;
        let rentalDiv = mainSection.parentElement;
        
        let numberOfUnitsRemainingInputs = rentalDiv.querySelector('.number-of-units-remaining-div input');
        
        if(prospectChosen === "no-value") {
            rentalDiv.style.display = "flex";
        } else {
            if(prospectChosen === "showing-prospects") {
                if((inputField.value - numberOfUnitsRemainingInputs.value) > 0) {
                    rentalDiv.style.display = "flex";
                } else {
                    rentalDiv.style.display = "none";
                }
            } else {
                if((inputField.value - numberOfUnitsRemainingInputs.value) > 0) {
                    rentalDiv.style.display = "none";
                } else {
                    rentalDiv.style.display = "flex";
                }
            }
        }
    });

    document.querySelector('#location-filter').selectedIndex = 0;
    document.querySelector('#type-of-rental').selectedIndex = 0;
}

function filterRentalsToBeDisplayedByTypeFormTableView() {
    let typeOfRentalFilterButton = document.querySelector('#table-view-type-of-rental');
    let typeChosen = typeOfRentalFilterButton.value;
    let typeInputs = document.querySelectorAll('.table-view-rental-type');

    Array.from(typeInputs).forEach((inputField) => {
        let tableData = inputField.parentElement;
        let tableRow = tableData.parentElement;

        if(typeChosen !== "no-value") {
            if(typeChosen === inputField.value) {
                tableRow.style.display = "table-row";
            } else if (typeChosen === "Business Premise"){
                switch(inputField.value) {
                    case "Stall":
                        tableRow.style.display = "table-row";
                        break;
                    case "Shop":
                        tableRow.style.display = "table-row";
                        break;
                    case "Event Hall":
                        tableRow.style.display = "table-row";
                        break;
                    case "Warehouse":
                        tableRow.style.display = "table-row";
                        break;
                    case "Office":
                        tableRow.style.display = "table-row";
                        break;
                    case "Industrial":
                        tableRow.style.display = "table-row";
                        break;
                    default:
                        tableRow.style.display = "none";
                }
            } else {
                tableRow.style.display = "none";
            }
        } else {
            tableRow.style.display = "table-row";
        }
        
    });

    document.querySelector('#table-view-location-filter').selectedIndex = 0;
    document.querySelector('#table-view-prospects').selectedIndex = 0;
}

function filterRentalsToBeDisplayedByLocationFromTableView() {
    let locationFilterButton = document.querySelector('#table-view-location-filter');
    let locationChosen = locationFilterButton.value;
    let locationInputs = document.querySelectorAll('.table-view-location');

    Array.from(locationInputs).forEach((inputField) => {
        let tabledata = inputField.parentElement;
        let tableRow = tabledata.parentElement;
        
        if(locationChosen !== "no-value") {
            if(locationChosen === inputField.value) {
                tableRow.style.display = "table-row";
            } else {
                tableRow.style.display = "none";
            }
        } else {
            tableRow.style.display = "table-row";
        }
    });

    document.querySelector('#table-view-type-of-rental').selectedIndex = 0;
    document.querySelector('#table-view-prospects').selectedIndex = 0;
}

function filterRentalsToBeDisplayedByProspectsFromTableView() {
    let prospectsFilterButton = document.querySelector('#table-view-prospects');
    let prospectChosen = prospectsFilterButton.value;
    let originalNumberOfUnitsInputs = document.querySelectorAll('.table-view-units');

    Array.from(originalNumberOfUnitsInputs).forEach((inputField) => {
        let tabledata = inputField.parentElement;
        let tableRow = tabledata.parentElement;
        
        let numberOfUnitsRemainingInputs = tableRow.querySelector('.table-view-units-remaining');
        
        if(prospectChosen === "no-value") {
            tableRow.style.display = "table-row";
        } else {
            if(prospectChosen === "showing-prospects") {
                if((inputField.value - numberOfUnitsRemainingInputs.value) > 0) {
                    tableRow.style.display = "table-row";
                } else {
                    tableRow.style.display = "none";
                }
            } else {
                if((inputField.value - numberOfUnitsRemainingInputs.value) > 0) {
                    tableRow.style.display = "none";
                } else {
                    tableRow.style.display = "table-row";
                }
            }
        }
    });

    document.querySelector('#table-view-location-filter').selectedIndex = 0;
    document.querySelector('#table-view-type-of-rental').selectedIndex = 0;
}





function printWholeList() {
    highlightClicked(document.querySelector('#view-all-interested-parties-button'));
    document.querySelector('.all-interested-parties-table-form').submit();
}

function viewTableView() {
    document.querySelector('.buttons').style.flexBasis = "0%";
    document.querySelector('.buttons').style.display = "none";
    document.querySelector('.panel').style.display = "flex";
    document.querySelector('.panel').style.flexDirection = "column";
    
    document.querySelector('.panel').style.width = "100%";
    document.querySelector('.panel').style.flexBasis = "100%";
    document.querySelector('.table-view').style.display = "block";
    document.querySelector('.normal-view').style.display = "none";
    document.querySelector('.normal-view').style.width = "100%";

    document.querySelector('#default-view-button').style.backgroundColor = "transparent";
    document.querySelector('#table-view-button').style.backgroundColor = "#2C18DE";
}

function viewDefaultView() {
    
    document.querySelector('.buttons').style.flexBasis = "20%";
    document.querySelector('.buttons').style.display = "block";

    document.querySelector('.panel').style.flexBasis = "80%";
    document.querySelector('.panel').style.display = "block";

    document.querySelector('.table-view').style.display = "none";
    document.querySelector('.normal-view').style.display = "block";

    document.querySelector('#default-view-button').style.backgroundColor = "#2C18DE";
    document.querySelector('#table-view-button').style.backgroundColor = "transparent";
        
}

function showInputInField(input) {
    let outputField = document.querySelector('#view-input-details-clearly');

    const inputWidth = 200;
    outputField.style.width = inputWidth + 'px';
    outputField.value = input.value;
  
    requestAnimationFrame(function () {
      const inputFieldWidth = input.scrollWidth;
      const maxWidth = Math.max(inputFieldWidth, inputWidth);
  
      if (maxWidth > inputWidth) {
        outputField.style.width = maxWidth + 10 + 'px';
      }
    });
}

function verifyForgetAccount(event) {
    event.preventDefault();
    const proceed = confirm("Are You Sure? This Will force you to enter your credentials every tinme you want to log into your account.");
    if(proceed) {
        event.target.submit();
    }
}