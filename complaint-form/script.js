"use strict";

const showExpectedFinishSubmission = () => {
  const expectedFinishSubmissionLabel = document.getElementById(
    "expectedFinishSubmissionLabel"
  );
  if (typeComplaintSelect.value === "Rękojmia") {
    expectedFinishSubmissionLabel.classList.add(
      "return-form__extra-field--show"
    );
  } else {
    expectedFinishSubmissionLabel.classList.remove(
      "return-form__extra-field--show"
    );
  }
};

// Pokaż pole "Oczekiwany sposób zakończenia zgłoszenia" jeżeli jest Rodzaj zgłoszenia to Rękojmia
const typeComplaintSelect = document.getElementById("typeComplaint");
typeComplaintSelect.addEventListener("change", showExpectedFinishSubmission);

const validateUserNumbers = (variable, htmlElement, regEx) => {
  const el = document.querySelector(`label[for='${htmlElement}']`);
  if (!variable) {
    el.classList.add("return-form__require");
    return false;
  } else {
    if (!regEx.test(variable)) {
      el.classList.add("return-form__require");
      return false;
    } else {
      el.classList.remove("return-form__require");
      return true;
    }
  }
};

const validateText = (variable, htmlElement) => {
  const el = document.querySelector(`label[for='${htmlElement}']`);
  if (!variable) {
    el.classList.add("return-form__require");
    return false;
  } else {
    el.classList.remove("return-form__require");
    return true;
  }
};

const checkType = (value) => {
  if (
    value.type !== "image/png" &&
    value.type !== "image/jpg" &&
    value.type !== "image/jpeg"
  ) {
    return true;
  }
};

const validateFiles = (file, htmlElement) => {
  const el = document.querySelector(`label[for='${htmlElement}']`);
  const files = [...file];
  const arr = files.filter(checkType);
  if (arr.length) {
    el.classList.add("return-form__require");
  } else {
    el.classList.remove("return-form__require");
    return true;
  }
};

const formValid = (e) => {
  e.preventDefault();

  // const orderInvoiceNumber =
  //   document.getElementById("orderInvoiceNumber").value;
  // const producer = document.getElementById("producer").value;
  // const productName = document.getElementById("productName").value;
  // const quantity = document.getElementById("quantity").value;
  // const typeComplaint = document.getElementById("typeComplaint").value;
  // const expectedFinishSubmission = document.getElementById(
  //   "expectedFinishSubmission"
  // ).value;
  // const description = document.getElementById("description").value;
  // const userFile = document.getElementById("userFile").files;
  // const userName = document.getElementById("userName").value;
  // const userEmail = document.getElementById("userEmail").value;
  // const userPhone = document.getElementById("userPhone").value;
  // const userAddress = document.getElementById("userAddress").value;
  // const userZipCode = document.getElementById("userZipCode").value;
  // const userCity = document.getElementById("userCity").value;
  // const userDeliveryDate = document.getElementById("userDeliveryDate").value;
  // const userAgreement = document.getElementById("userAgreement").checked;

  const orderInvoiceNumber = "1";
  const producer = "Warmtec";
  const productName = "Warmtec";
  const quantity = "1";
  const typeComplaint = "s";
  const expectedFinishSubmission = "Warmtec";
  const description = "Warmtec";
  // const userFile = [...document.getElementById("userFile").files];
  const userFile = document.getElementById("userFile").files;
  console.log("userFile", userFile);
  const userName = "Warmtec";
  const userEmail = "tomek2x1@wp.pl";
  const userPhone = "607453178";
  const userAddress = "Warmtec";
  const userZipCode = "Warmtec";
  const userCity = "Warszawa";
  const userDeliveryDate = "cos";
  const userAgreement = document.getElementById("userAgreement").checked;

  const valInvoiceNumber = validateText(
    orderInvoiceNumber,
    "orderInvoiceNumber"
  );
  if (!valInvoiceNumber) {
    return;
  }

  const valProducer = validateText(producer, "producer");
  if (!valProducer) {
    return;
  }

  const valProductName = validateText(productName, "productName");
  if (!valProductName) {
    return;
  }

  const valQuantity = validateText(quantity, "quantity");
  if (!valQuantity) {
    return;
  }

  const valTypeComplaint = validateText(typeComplaint, "typeComplaint");
  if (!valTypeComplaint) {
    return;
  }

  if (typeComplaint === "Rękojmia") {
    const valExpectedFinishSubmission = validateText(
      expectedFinishSubmission,
      "expectedFinishSubmission"
    );
    if (!valExpectedFinishSubmission) {
      return;
    }
  }

  const valDescription = validateText(description, "description");
  if (!valDescription) {
    return;
  }

  const valUserFile = validateFiles(userFile, "userFile");
  if (!valUserFile) {
    return;
  }

  const valName = validateText(userName, "userName");
  if (!valName) {
    return;
  }

  const valEmail = validateUserNumbers(
    userEmail,
    "userEmail",
    /^[a-z\d]+[\w\d.-]*@(?:[a-z\d]+[a-z\d-]+\.){1,5}[a-z]{2,6}$/i
  );
  if (!valEmail) {
    return;
  }

  const valPhone = validateUserNumbers(
    userPhone,
    "userPhone",
    /^[0-9\+]{8,13}$/
  );
  if (!valPhone) {
    return;
  }

  const valUserAddress = validateText(userAddress, "userAddress");
  if (!valUserAddress) {
    return;
  }

  const valUserZipCode = validateText(userZipCode, "userZipCode");
  if (!valUserZipCode) {
    return;
  }

  const valUserCity = validateText(userCity, "userCity");
  if (!valUserCity) {
    return;
  }

  const valUserDeliveryDate = validateText(
    userDeliveryDate,
    "userDeliveryDate"
  );
  if (!userDeliveryDate) {
    return;
  }

  const el = document.querySelector('label[for="userAgreement"]');
  if (!userAgreement) {
    el.classList.add("return-form__require");
    return;
  } else {
    el.classList.remove("return-form__require");
  }

  const form = {
    orderInvoiceNumber: orderInvoiceNumber,
    producer: producer,
    productName: productName,
    quantity: quantity,
    typeComplaint: typeComplaint,
    expectedFinishSubmission: expectedFinishSubmission,
    description: description,
    userName: userName,
    userEmail: userEmail,
    userPhone: userPhone,
    userAddress: userAddress,
    userZipCode: userZipCode,
    userCity: userCity,
    userDeliveryDate: userDeliveryDate,
    userAgreement: userAgreement,
    userFile:userFile,
  };

  if (userFile.length) {
    form.userFile = userFile;
  }
  sendReturnsForm(form);
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

  const url = "https://newaccount1632792215290.freshdesk.com/api/v2/tickets";
console.log(obj.userFile)
  const body = {
    subject: `Reklamacja ${obj.productName}`,
    description: `
    <h4>Zgłoszenie:</h4>
    <b>imię:</b> ${obj.userName} <br/>
    <b>telefon:</b> ${obj.userPhone} <br/>
    <b>email:</b> ${obj.userEmail} <br/>
    <br/>
    <b>Numer zamówienia:</b> ${obj.orderInvoiceNumber}<br/>
    <br/>
    <h4>Dane zwracanego produktu:</h4>
    <b>Producent:</b> ${obj.producer}<br/>
    <b>Nazwa towaru:</b> ${obj.productName}<br/>
    <br/>
    <br/>
    <h4>Powód zwrotu:</h4>
    <p>${obj.description}</p>
        <p>Załączniki: ${obj.userFile}</p>
    `,
    email: obj.userEmail,
    phone: obj.userPhone,
    priority: 1,
    status: 2,
  };

  if(obj.userFile){
    body.attachments = [...obj.userFile];
  }

  console.log(body);

  fetch(url, {
    method: "POST",
    headers: {
      Authorization: "VUl6Q2FrTmVTeHFPVWI0QmNocHM6eA==",
      // "Content-Type": "application/json; charset=utf-8",
      "Content-Type": "multipart/form-data",
    },
    body: JSON.stringify(body),
  })
    .then((resp) => resp.json())
    .then(function (data) {
      console.log("freshdeskdata", data);
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
