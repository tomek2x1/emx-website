"use strict";
const packageComplete = document.getElementById("packageComplete");
const packageNotComplete = document.getElementById("packageNotComplete");
const missElementLabel = document.getElementById("missElementLabel");
const cash = document.getElementById("cash");
const bankTransfer = document.getElementById("bankTransfer");
const bankTransferBox = document.getElementById("bankTransferBox");

// Pokaż ukrytą część formularza związaną ze statusem
const showExtraStatusFields = () => {
  const inputReturnNotAccept = document.getElementById("returnNotAccepted");
  const inputReturnAccept = document.getElementById("returnAccept");
  const boxReturnNotAccepted = document.getElementById("boxReturnNotAccepted");
  const boxReturnAccepted = document.getElementById("boxReturnAccepted");

  if (inputReturnNotAccept.checked) {
    boxReturnAccepted.classList.remove("return-form__box--show");
    boxReturnNotAccepted.classList.add("return-form__box--show");
  } else if (inputReturnAccept.checked) {
    boxReturnNotAccepted.classList.remove("return-form__box--show");
    boxReturnAccepted.classList.add("return-form__box--show");
  }
};

const inputsStatus = document.querySelectorAll("input[name='status']");
inputsStatus.forEach((inputStatus) => {
  inputStatus.addEventListener("change", showExtraStatusFields);
});

// Pokaż ukryte pole formularza
const showExtraCompleteField = (radio1, radio2, element) => {
  if (radio1.checked) {
    element.classList.remove("return-form__extra-field--show");
  } else if (radio2.checked) {
    element.classList.add("return-form__extra-field--show");
  }
};

const inputsPackage = document.querySelectorAll("input[name='package']");
inputsPackage.forEach((inputPackage) => {
  inputPackage.addEventListener("change", () => {
    showExtraCompleteField(
      packageComplete,
      packageNotComplete,
      missElementLabel
    );
  });
});

// Pokaż część formularza dotyczącą zwrotu na konto
const cashbacksRadio = document.querySelectorAll("input[name='cashback']");
cashbacksRadio.forEach((cashbackRadio) => {
  cashbackRadio.addEventListener("change", () => {
    showExtraCompleteField(cash, bankTransfer, bankTransferBox);
  });
});

const validateUserNumbers = (variable, regEx) => {
  if (!regEx.test(variable.value)) {
    variable.parentElement.classList.add("return-form__require");
  } else variable.parentElement.classList.remove("return-form__require");
};

// Walidacja formularza
const formValid = (e) => {
  e.preventDefault();

  const employee = document.getElementById("employee");
  const city = document.getElementById("city");
  const orderInvoiceNumber = document.getElementById("orderInvoiceNumber");
  const producer = document.getElementById("producer");
  const productName = document.getElementById("productName");
  const quantity = document.getElementById("quantity");
  const reason = document.getElementById("reason");
  const statuses = document.querySelectorAll("input[name='status']");
  const userAgreement = document.getElementById("userAgreement");

  const statusWrapper = document.getElementById("status-wrapper");

  const mainInputs = [
    employee,
    city,
    orderInvoiceNumber,
    producer,
    productName,
    quantity,
    reason,
  ];

  for (let i = 0; i < statuses.length; i++) {
    if (statuses[i].checked) {
      statusWrapper.classList.remove("return-form__radio-wrapper");
      break;
    } else statusWrapper.classList.add("return-form__radio-wrapper");
  }

  // Obiekt formularza 
  const formValue = {};

  // Zwroty przekazana do Działu Zwrotów i Reklamacji
  const returnsDepartment = document.querySelector(
    "#boxReturnNotAccepted.return-form__box--show"
  );

  // Usunięcie klasy
  const removeClass = (arr, className) => {
    console.log("arr", arr);
    arr.forEach((tab) => {
      tab.classList.remove(className);
    });
  };

  // Toggle .return-form__require class
  const toggleClass = (element) => {
    if (element.value !== ""){
      element.parentElement.classList.remove("return-form__require");
      formValue[element.name] = element.value;
    }
    else element.parentElement.classList.add("return-form__require");
  };

  mainInputs.forEach((mainInput) => {
    toggleClass(mainInput);
  });

  if (returnsDepartment) {
    const userName = document.getElementById("userNameNotAccepted");
    const userEmail = document.getElementById("userEmail");
    const userPhone = document.getElementById("userPhone");
    const accountNumber = document.getElementById("accountNumberNotAccepted");
    const packages = document.querySelectorAll("input[name='package']");
    const description = document.getElementById("description");

    const packageWrapper = document.getElementById("package-wrapper");
    const returnFormRequire = document.querySelectorAll("#boxReturnAccepted .return-form__require");
    const returnFormRadioWrapper = document.querySelectorAll("#boxReturnAccepted .return-form__radio-wrapper");

    removeClass(returnFormRequire,"return-form__require");
    removeClass(returnFormRadioWrapper, "return-form__radio-wrapper");

    toggleClass(userName);
    toggleClass(userEmail);
    toggleClass(userPhone);
    toggleClass(accountNumber);

    validateUserNumbers(
      userEmail,
      /^[a-z\d]+[\w\d.-]*@(?:[a-z\d]+[a-z\d-]+\.){1,5}[a-z]{2,6}$/i
    );

    validateUserNumbers(userPhone, /^[0-9\+]{8,13}$/);

    validateUserNumbers(accountNumber, /^[0-9]{26}$/);

    const missElement = document.getElementById("missElement");

    for (let i = 0; i < packages.length; i++) {
      if (packages[i].checked) {
        if (packages[i].value === "Kompletny") {
          missElement.parentElement.classList.remove("return-form__require");
        }
        packageWrapper.classList.remove("return-form__radio-wrapper");
        break;
      } else packageWrapper.classList.add("return-form__radio-wrapper");
    }

    const packageComplete = document.querySelector("#packageNotComplete");

    if (packageComplete.checked) {
      toggleClass(missElement);
    }

    toggleClass(description);
  }

  // Zwrot zaakceptowany
  const returnsAccepted = document.querySelector(
    "#boxReturnAccepted.return-form__box--show"
  );

  if (returnsAccepted) {
    const price = document.getElementById("price");
    const cashback = document.querySelectorAll("input[name='cashback']");
    const cashbackWrapper = document.getElementById("cashback-wrapper");
    const userName = document.getElementById("userNameAccepted");
    const accountNumber = document.getElementById("accountNumberAccepted");

    const returnFormRequire = document.querySelectorAll("#boxReturnNotAccepted .return-form__require");
    const returnFormRadioWrapper = document.querySelectorAll("#boxReturnNotAccepted .return-form__radio-wrapper");
    const bankTransferBox = document.querySelectorAll("#bankTransferBox .return-form__require");

    removeClass(returnFormRequire,"return-form__require");
    removeClass(returnFormRadioWrapper, "return-form__radio-wrapper");

    toggleClass(price);

    for (let i = 0; i < cashback.length; i++) {
      if (cashback[i].checked) {
        if (cashback[i].value === "Gotówka") {
          removeClass(bankTransferBox,"return-form__require");
          console.log("bankTransferBox", bankTransferBox);
        }
        cashbackWrapper.classList.remove("return-form__radio-wrapper");
        break;
      } else cashbackWrapper.classList.add("return-form__radio-wrapper");
    }

    toggleClass(userName);

    validateUserNumbers(accountNumber, /^[0-9]{26}$/);
  }

  if (userAgreement.checked)
    userAgreement.parentElement.classList.remove("return-form__require");
  else userAgreement.parentElement.classList.add("return-form__require");

  // sendReturnsForm(form);
  const isEmptyInputs = document.querySelectorAll(".return-form__require");
  const isEmptyRadioInputs = document.querySelectorAll(".return-form__radio-wrapper");
  const isFormCompleted = [...isEmptyInputs, ...isEmptyRadioInputs]
  // if(isFormCompleted.length === 0){
    sendReturnsForm(formValue);
  // }
  console.log("Nie wysłano formularza")
};

const sendForm = document.querySelector("#sendForm");
sendForm.addEventListener("click", formValid);

const sendReturnsForm = (obj) => {
  const returnForm = document.getElementById("return-form");
  const returnSpinner = document.getElementById("return-spinner");
  const returnMessage = document.getElementById("return-message");
  const returnError = document.getElementById("return-error");

  returnForm.classList.add("return-message__hide");
  returnSpinner.classList.remove("return-message__hide");

  console.log("obj",obj)

  const url = "https://newaccount1632792215290.freshdesk.com/api/v2/tickets";
  const body = {
    subject: "Reklamacja",
    description: `
    <h4>Zgłoszenie:</h4>
    <b>Osoba przyjmująca zwrot:</b> ${obj.employee} <br/>
    <b>Miejsce zakupu:</b> ${obj.city} <br/>
    <b>Numer zamówienia lub numer faktury:</b> ${obj.orderInvoiceNumber} <br/>
    <br/>
    <b>Producent:</b> ${obj.producer} <br/>
    <b>Nazwa towaru:</b> ${obj.productName} <br/>
    <b>Ilość:</b> ${obj.quantity} <br/>
    <b>Powód odstąpienia:</b> ${obj.reason} <br/>
    <br/>
    <b>Status zwrotu:</b> Do zweryfikowania<br/>
    <br/>
    Jeżeli produkt przekazany do weryfkacji
    <h4>Jeżeli produkt przekazany do weryfkacji:</h4>
    <b>Imię i nazwisko lub nazwa firmy:</b> ${obj.userName}<br/>
    <b>Email:</b> ${obj.userEmail}<br/>
    <b>Numer telefonu:</b> ${obj.userPhone}<br/>
    <b>Numer konta:</b> ${obj.accountNumberNotAccepted}<br/>
    <br/>
    Jeżeli skład zestawu:
    <br/>
    <h4>Powód zwrotu:</h4>
    <p>${obj.description}</p>
    `,
    email: obj.userEmail,
    phone: obj.userPhone,
    priority: 1,
    status: 2,
  };

  fetch(url, {
    method: "POST",
    headers: {
      Authorization: "VUl6Q2FrTmVTeHFPVWI0QmNocHM6eA==",
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(body),
  })
    .then((resp) => resp.json())
    .then(function (data) {
      if (data.id) {
        document.getElementById("freshdeskId").innerHTML = data.id;
      }
      returnSpinner.classList.add("return-message__hide");
      returnMessage.classList.remove("return-message__hide");
    })
    .catch(function (error) {
      returnSpinner.classList.add("return-message__hide");
      returnError.classList.remove("return-message__hide");
      console.log(error);
    });
};
