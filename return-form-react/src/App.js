import React, { useState, useEffect } from "react";

import "./App.css";

import Input from "./Components/Input";
import InputTooltip from "./Components/InputTooltip";
import Select from "./Components/Select";
import AddRemoveButtons from "./Components/AddRemoveButtons";
import Agreement from "./Components/Agreement";
import FormFooter from "./Components/FormFooter";

const App = () => {
  const [state, setState] = useState({
    name: "",
    email: "",
    phone: "",
    placeBuy: "",
    docNumber: "",
    payType: "",
    accountNumber: "",
    reason: "",
    anotherReason: "",
    products: [],
    agreement: false,
  });

  const [badValidate, setBadValidate] = useState({
    name: "",
    email: "",
    phone: "",
    placeBuy: "",
    docNumber: "",
    payType: "",
    accountNumber: "",
    reason: "",
    productsInfo: "",
    products: [],
    agreement: false,
  });

  const [showForm, setShowForm] = useState(true);

  const [showSpinner, setShowSpinner] = useState(false);

  const [showSuccess, setShowSuccess] = useState(false);

  const [showError, setShowError] = useState(false);

  const [taskNumber, setTaskNumber] = useState("");

  const [showButtonsError, setShowButtonsError] = useState(false);

  const [switchValidation, setSwitchValidation] = useState(false);

  useEffect(() => {
    addProductForm();
  }, []);

  const validateForm = () => {
    setSwitchValidation(true);

    const validate = {
      name: "",
      email: "",
      phone: "",
      placeBuy: "",
      docNumber: "",
      payType: "",
      accountNumber: "",
      reason: "",
      productsInfo: "",
      products: [],
      agreement: false,
    };

    if (state.name === "") validate.name = true;

    if (state.email === "") validate.email = true;

    const regExEmail =
      /^[a-z\d]+[\w\d.-]*@(?:[a-z\d]+[a-z\d-]+\.){1,5}[a-z]{2,6}$/i;
    if (!regExEmail.test(state.email)) validate.email = true;

    if (state.phone === "") validate.phone = true;

    const regExPhoneNumber = /^[0-9\+]{8,13}$/;
    if (!regExPhoneNumber.test(state.phone)) validate.phone = true;

    if (state.placeBuy === "") validate.placeBuy = true;

    if (state.docNumber === "") validate.docNumber = true;

    if (state.payType === "") validate.payType = true;

    if (state.accountNumber === "") validate.accountNumber = true;

    const regExAccountNumber = /^[0-9]{26}$/;
    if (!regExAccountNumber.test(state.accountNumber))
      validate.accountNumber = true;

    if (state.reason === "") validate.reason = true;

    if (state.products.length === 0) {
      setShowButtonsError(true);
      validate.productsInfo = true;
    }

    state.products.forEach((product, index) => {
      const localValidateObj = {
        id: index,
        producer: false,
        typeProduct: false,
        quantity: 1,
      };
      if (product.producer === "") localValidateObj.producer = true;
      if (product.typeProduct === "") localValidateObj.typeProduct = true;
      if (product.quantity === "") localValidateObj.quantity = true;
      validate.products.push(localValidateObj);
    });

    if (state.agreement === false) validate.agreement = true;

    setBadValidate({ ...badValidate, ...validate });
    if (
      !validate.name &&
      !validate.email &&
      !validate.phone &&
      !validate.placeBuy &&
      !validate.docNumber &&
      !validate.payType &&
      !validate.productsInfo &&
      !validate.reason &&
      !validate.agreement
    ) {
      const productObjValidated = state.products.map((prod) => {
        if (prod.producer && prod.typeProduct && prod.quantity) {
          return "okValue";
        } else return "badValue";
      });
      if (productObjValidated.includes("badValue")) {
        return;
      } else {
        if (state.payType !== "Przelew") {
          if (!state.accountNumber) {
            sendForm(state);
          } else {
            return;
          }
        } else {
          sendForm(state);
        }
      }
    } else {
      console.log("walidacja niepoprawna");
    }
  };

  const placeBuy = [
    "Emultimax.pl",
    "Allegro",
    "Salon Sprzeda??y Warszawa",
    "Salon Sprzeda??y Krak??w",
    "Salon Sprzeda??y Rzesz??w",
    "Salon Sprzeda??y Zamo????",
    "Punkty Sprzeda??y Gda??sk",
    "Punkt Sprzeda??y Pozna??",
  ];

  const payType = ["Przelew", "Karta bankowa", "Got??wka", "Inny spos??b"];

  const reason = [
    "Produkt nie spe??nia moich oczekiwa??",
    "Produkt niezgodny z zam??wieniem",
    "Produkt niezgodny z opisem na stronie",
    "Inny pow??d",
    "Nie chc?? podawa?? przyczyny",
  ];

  const producer = ["Warmtec", "Dimplex"];

  const handleCheckbox = (e) => {
    setState({ ...state, [e.target.name]: e.target.checked });
    setBadValidate({ ...badValidate, [e.target.name]: false });
  };

  const handleInput = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
    setBadValidate({ ...badValidate, [e.target.name]: false });
  };

  const handleProducerInput = (e, id) => {
    const arr = state.products.filter((product) => product.id === id)[0];
    arr[e.target.name] = e.target.value;
    const newProductArr = [...state.products];
    newProductArr[id] = arr;
    setState({ ...state, products: [...newProductArr] });
    setBadValidate({ ...badValidate, products: [...newProductArr] });
  };

  const addProductForm = () => {
    const newProduct = {
      id: state.products.length,
      producer: "",
      typeProduct: "",
      quantity: 1,
    };
    setState({
      ...state,
      products: [...state.products, newProduct],
    });
    setShowButtonsError(false);
  };

  const removeProductForm = () => {
    const oldProductList = state.products;
    oldProductList.pop();
    setState({
      ...state,
      products: [...oldProductList],
    });
  };

  const showProducts = state.products.map((showProduct, index) => {
    return (
      <div key={index} className="return-form__product-box">
        <Select
          value={showProduct.producer}
          name={"producer"}
          id={`producer${index}`}
          labelName="Producent"
          optionsValue={producer}
          handleInput={(e) => {
            handleProducerInput(e, showProduct.id);
          }}
          validation={
            switchValidation && showProduct.producer == "" ? true : false
          }
        />
        <InputTooltip
          value={showProduct.typeProduct}
          name={"typeProduct"}
          id={`typeProduct${index}`}
          labelName="Nazwa produktu"
          handleInput={(e) => {
            handleProducerInput(e, showProduct.id);
          }}
          type={"text"}
          validation={
            switchValidation && showProduct.typeProduct == "" ? true : false
          }
        />

        <Input
          value={showProduct.quantity}
          name={"quantity"}
          id={`quantity${index}`}
          labelName="Ilo???? sztuk"
          handleInput={(e) => {
            handleProducerInput(e, showProduct.id);
          }}
          type={"number"}
          minValue={1}
          validation={
            switchValidation && showProduct.quantity == "" ? true : false
          }
        />
      </div>
    );
  });

  const sendForm = (obj) => {
    const products = obj.products.map((product, index) => {
      return `
      <h5>Produkt ${index + 1}</h5>
      <b>Producent:</b> ${product.producer} <br/>
      <b>Nazwa produktu:</b> ${product.typeProduct} <br/>
      <b>Ilo????:</b> ${product.quantity} <br/>
      <br/>
        `;
    });

    setShowForm(false);
    setShowSpinner(true);

    const url = "https://newaccount1632792215290.freshdesk.com/api/v2/tickets";
    const body = {
      subject: "Formularz zwrotu (online)",
      description: `
      <h4>Formularz zwrotu (online):</h4>
      <b>Imi?? i nazwisko lub nazwa firmy:</b> ${obj.name} <br/>
      <b>Adres e-mail:</b> ${obj.email} <br/>
      <b>Telefon:</b> ${obj.phone} <br/>
      <br/>
      <b>Miejsce zakupu:</b> ${obj.placeBuy} <br/>
      <b>Numer zam??wienia lub numer faktury:</b> ${obj.docNumber} <br/>
      <b>Spos??b p??atno??ci za zam??wienie:</b> ${obj.payType} <br/>
      ${
        obj.payType !== "Przelew"
          ? `<b>Numer rachunku bankowego:</b> ${obj.accountNumber} <br/>`
          : ""
      }
      <br/>
      <b>Pow??d odst??pienia:</b> ${obj.reason} <br/>
      ${
        obj.anotherReason
          ? `<b>Dlaczego odst??puj??:</b> ${obj.anotherReason} <br/>`
          : ""
      }
      <br/>
      ${products}
      `,
      email: obj.email,
      phone: obj.phone,
      priority: 1,
      status: 2,
    };

    fetch(url, {
      method: "POST",
      headers: {
        Authorization: "VHE3djNOUEFwUWFSNXhscG80Zg==",
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(body),
    })
      .then((resp) => resp.json())
      .then(function (data) {
        if (data.id) {
          setShowSpinner(false);
          setShowSuccess(true);
          setTaskNumber(data.id);
        } else {
          setShowSpinner(false);
          setShowError(true);
        }
      })
      .catch(function (error) {
        setShowSpinner(false);
        setShowError(true);
        console.log(error);
      });
  };

  return (
    <div className="return">
      {showForm ? (
        <div id="return-form" className="return-form">
          <h2 className="return-form__title">Formularz zwrotu (online)</h2>
          <Input
            value={state.name}
            name={"name"}
            labelName="Imi?? i nazwisko lub nazwa firmy"
            handleInput={handleInput}
            type={"text"}
            validation={badValidate.name}
          />

          <Input
            value={state.email}
            name={"email"}
            labelName="Adres e-mail"
            handleInput={handleInput}
            type={"text"}
            validation={badValidate.email}
          />

          <Input
            value={state.phone}
            name={"phone"}
            labelName="Telefon"
            handleInput={handleInput}
            type={"number"}
            validation={badValidate.phone}
          />
          <Select
            value={state.placeBuy}
            name={"placeBuy"}
            labelName="Miejsce zakupu"
            optionsValue={placeBuy}
            handleInput={handleInput}
            validation={badValidate.placeBuy}
          />
          <Input
            value={state.docNumber}
            name={"docNumber"}
            labelName="Numer zam??wienia lub numer faktury"
            handleInput={handleInput}
            type={"text"}
            validation={badValidate.docNumber}
          />
          <Select
            value={state.payType}
            name={"payType"}
            labelName="Spos??b p??atno??ci za zam??wienie"
            optionsValue={payType}
            handleInput={handleInput}
            validation={badValidate.payType}
          />
          {state.payType && state.payType !== "Przelew" ? (
            <Input
              value={state.accountNumber}
              name={"accountNumber"}
              labelName="Numer rachunku bankowego"
              handleInput={handleInput}
              type={"number"}
              validation={badValidate.accountNumber}
            />
          ) : null}

          <Select
            value={state.reason}
            name={"reason"}
            labelName="Pow??d odst??pienia"
            optionsValue={reason}
            handleInput={handleInput}
            validation={badValidate.reason}
          />
          {state.reason === "Inny pow??d" ? (
            <Input
              value={state.anotherReason}
              name={"anotherReason"}
              labelName="Podaj pow??d"
              handleInput={handleInput}
              type={"text"}
              validation={false}
            />
          ) : null}

          {showProducts}

          <AddRemoveButtons
            addProductForm={addProductForm}
            removeProductForm={removeProductForm}
            validation={showButtonsError}
            productlist={state.products.length}
          />

          <Agreement
            value={state.agreement}
            name={"agreement"}
            handleCheckbox={handleCheckbox}
            validation={badValidate.agreement}
          />

          <div className="return-form__btn-wrapper">
            <button
              className="return-form__btn"
              onClick={(e) => {
                validateForm(e);
              }}
            >
              Wy??lij formularz
            </button>
          </div>
          <FormFooter />
        </div>
      ) : null}
      {showSpinner ? (
        <div id="return-spinner" className="return-spinner">
          <div className="return-spinner__container">
            <div className="return-spinner__wrapper">
              <div className="return-spinner-circle1 return-spinner-circle"></div>
              <div className="return-spinner-circle2 return-spinner-circle"></div>
              <div className="return-spinner-circle3 return-spinner-circle"></div>
              <div className="return-spinner-circle4 return-spinner-circle"></div>
              <div className="return-spinner-circle5 return-spinner-circle"></div>
              <div className="return-spinner-circle6 return-spinner-circle"></div>
              <div className="return-spinner-circle7 return-spinner-circle"></div>
              <div className="return-spinner-circle8 return-spinner-circle"></div>
              <div className="return-spinner-circle9 return-spinner-circle"></div>
              <div className="return-spinner-circle10 return-spinner-circle"></div>
              <div className="return-spinner-circle11 return-spinner-circle"></div>
              <div className="return-spinner-circle12 return-spinner-circle"></div>
            </div>
          </div>
        </div>
      ) : null}
      {showSuccess ? (
        <div id="return-message" className="return-message">
          <div className="return-message__container">
            <h2 className="return-message__success">
              Formularz zosta?? wys??any poprawnie
            </h2>
            <h3 className="return-message__id">
              Numer Twojego zg??oszenia:
              <strong>{taskNumber}</strong>
            </h3>
            <p className="return-message__remember">
              * Potwierdzenie wys??ania formularza znajdziesz na swojej skrzynce
              pocztowej.
            </p>
            <p className="return-message__remember">
              ** Pami??taj, aby spakowa?? wszystkie elementy zestawu oraz oznaczy??
              paczk?? numerem zg??oszenia.
            </p>
          </div>
        </div>
      ) : null}
      {showError ? (
        <div id="return-error" className="return-message return-error">
          <div className="return-message__container">
            <h2 className="return-message__error">
              Podczas wysy??ania formularza wyst??pi?? b????d. Spr??buj p????niej.
            </h2>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default App;
