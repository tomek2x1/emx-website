"use strict";

const validateUserNumbers = (variable, htmlElement, regEx) => {
  const el = document.querySelector(`label[for='${htmlElement}']`);
  if(!variable){
    el.classList.add("return-form__require");
    return false;
  } else {
    if(!regEx.test(variable)){
      el.classList.add("return-form__require");
      return false;
    } else {
      el.classList.remove("return-form__require");
      return true; 
    }
  }
}

const validateText = (variable, htmlElement) => {
  const el = document.querySelector(`label[for='${htmlElement}']`);
  if(!variable){
    el.classList.add("return-form__require");
    return false;
  } else {
    el.classList.remove("return-form__require");
    return true;   
  }
}

const formValid = (e) => {
  e.preventDefault();

  const userName = document.getElementById("userName").value;
  const userSurname = document.getElementById("userSurname").value;
  const userEmail = document.getElementById("userEmail").value;
  const userPhone = document.getElementById("userPhone").value;
  const orderInvoiceNumber = document.getElementById("orderInvoiceNumber").value;
  const accountNumber = document.getElementById("accountNumber").value;
  const userReason = document.getElementById("userReason").value;
  const producer = document.getElementById("producer").value;
  const productName = document.getElementById("productName").value;
  const quantity = document.getElementById("quantity").value;
  const userAgreement = document.getElementById("userAgreement").checked;

  const form = {
    userName: userName,
    userSurname: userSurname,
    userEmail: userEmail,
    userPhone: userPhone,
    orderInvoiceNumber: orderInvoiceNumber,
    accountNumber: accountNumber,
    userReason: userReason,
    producer:producer,
    productName: productName,
    quantity: quantity,
    userAgreement: userAgreement,
  }

  const valName = validateText(userName, "userName");
  if(!valName){
    return;
  }

  const valSurname = validateText(userSurname, "userSurname");
  if(!valSurname){
    return;
  }

  const valEmail = validateUserNumbers(userEmail, "userEmail", /^[a-z\d]+[\w\d.-]*@(?:[a-z\d]+[a-z\d-]+\.){1,5}[a-z]{2,6}$/i);
  if(!valEmail){
    return;
  }

  const valPhone = validateUserNumbers(userPhone, "userPhone", /^[0-9\+]{8,13}$/);
  if(!valPhone){
    return;
  }

  const valInvoiceNumber = validateText(orderInvoiceNumber, "orderInvoiceNumber");
  if(!valInvoiceNumber){
    return;
  }

  const valAccount = validateUserNumbers(accountNumber, "accountNumber", /^[0-9]{26}$/);
  if(!valAccount){
    return;
  }

  const valReason = validateText(userReason, "userReason");
  if(!valReason){
    return;
  }

  const valProductName = validateText(productName, "productName");
  if(!valProductName){
    return;
  }

  const el = document.querySelector('label[for="userAgreement"]');
  if(!userAgreement){
    el.classList.add("return-form__require");
    return;
  } else {
      el.classList.remove("return-form__require");
  }
  sendReturnsForm(form);
}

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

  const body = {
    "subject": "Zwrot towaru",
    "description": `
    <h4>Zgłoszenie:</h4>
    <b>imię:</b> ${obj.userName} <br/>
    <b>nazwisko:</b> ${obj.userSurname} <br/>
    <b>telefon:</b> ${obj.userPhone} <br/>
    <b>email:</b> ${obj.userEmail} <br/>
    <br/>
    <b>Numer zamówienia:</b> ${obj.orderInvoiceNumber}<br/>
    <b>Numer rachunku bankowego:</b> ${obj.accountNumber}<br/>
    <br/>
    <h4>Dane zwracanego produktu:</h4>
    <b>Producent:</b> ${obj.producer}<br/>
    <b>Nazwa towaru:</b> ${obj.productName}<br/>
    <br/>
    <br/>
    <h4>Powód zwrotu:</h4>
    <p>${obj.userReason}</p>    
    `,
    "email": obj.userEmail,
    "phone": obj.userPhone,
    "priority": 1, 
    "status": 2,
  }

  fetch(url, {
    method: "POST",
    headers: {
      'Authorization': 'VUl6Q2FrTmVTeHFPVWI0QmNocHM6eA==',
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(body)
  })
    .then(resp => resp.json())
    .then(function(data) {
      if(data.id){
        document.getElementById("freshdeskId").innerHTML = data.id;
      }
      returnSpinner.classList.add("return-message__hide");
      returnMessage.classList.remove("return-message__hide");
    })
    .catch(function(error) {
      returnSpinner.classList.add("return-message__hide");
      returnError.classList.remove("return-message__hide");
      console.log(error);
    });  
}