import React, { useState, useEffect } from "react";

import "./App.css";

import Input from "./Components/Input";
import Select from "./Components/Select";
import TextArea from "./Components/TextArea";
import Agreement from "./Components/Agreement";
import FormFooter from "./Components/FormFooter";
import GeneratePdf from "./Components/GeneratePdf";

const App = () => {
  const [state, setState] = useState({
    typeOfReturn: "",
    buyDate: "",
    howFinish: "",
    getDate: "",
    isProtocol: "",
    docNumber: "",
    name: "",
    email: "",
    phone: "",
    getBack: "",
    street: "",
    zipCode: "",
    city: "",
    producer: "",
    typeProduct: "",
    quantity: 1,
    serialNumber: "",
    requiresDisassembly: "",
    description: "",
    pos: "",
    employee: "",
    agreement: false,
  });

  const [badValidate, setBadValidate] = useState({
    typeOfReturn: false,
    buyDate: false,
    howFinish: false,
    getDate: false,
    isProtocol: false,
    docNumber: false,
    name: false,
    email: false,
    phone: false,
    getBack: false,
    street: false,
    zipCode: false,
    city: false,
    producer: false,
    typeProduct: false,
    quantity: false,
    serialNumber: false,
    requiresDisassembly: false,
    description: false,
    pos: false,
    employee: false,
    agreement: false,
  });

  const [todayDate, setTodayDate] = useState(false);

  const [showForm, setShowForm] = useState(true);

  const [showSpinner, setShowSpinner] = useState(false);

  const [showSuccess, setShowSuccess] = useState(false);

  const [showError, setShowError] = useState(false);

  const [taskNumber, setTaskNumber] = useState("");

  useEffect(() => {
    setTodayDate(new Date().toISOString().split("T")[0], []);
  }, []);

  const validateForm = (e) => {
    const validate = {
      typeOfReturn: false,
      buyDate: false,
      howFinish: false,
      getDate: false,
      isProtocol: false,
      docNumber: false,
      name: false,
      email: false,
      phone: false,
      getBack: false,
      street: false,
      zipCode: false,
      city: false,
      producer: false,
      typeProduct: false,
      quantity: false,
      serialNumber: false,
      requiresDisassembly: false,
      description: false,
      pos: false,
      employee: false,
      agreement: false,
    };

    if (state.typeOfReturn === "") validate.typeOfReturn = true;

    if (
      state.typeOfReturn === "Gwarancja producenta" ||
      state.typeOfReturn === "Rękojmia"
    ) {
      if (state.buyDate === "") validate.buyDate = true;
    }

    if (state.typeOfReturn === "Rękojmia") {
      if (state.howFinish === "") validate.howFinish = true;
    }

    if (
      state.typeOfReturn ===
      "Dostałem towar uszkodzony (zgł. max. do 7 dni od otrzymania towaru)"
    ) {
      if (state.getDate === "") validate.getDate = true;
      if (state.isProtocol === "") validate.isProtocol = true;
    }

    if (state.docNumber === "") validate.docNumber = true;

    if (state.name === "") validate.name = true;

    if (state.email === "") validate.email = true;

    const regExEmail =
      /^[a-z\d]+[\w\d.-]*@(?:[a-z\d]+[a-z\d-]+\.){1,5}[a-z]{2,6}$/i;
    if (!regExEmail.test(state.email)) validate.email = true;

    if (state.phone === "") validate.phone = true;

    const regExPhoneNumber = /^[0-9\+]{8,13}$/;
    if (!regExPhoneNumber.test(state.phone)) validate.phone = true;

    if (state.getBack === "") validate.getBack = true;

    if (state.getBack === "kurierem na adres") {
      if (state.street === "") validate.street = true;

      if (state.zipCode === "") validate.zipCode = true;

      if (state.city === "") validate.city = true;
    }

    if (state.producer === "") validate.producer = true;

    if (state.typeProduct === "") validate.typeProduct = true;

    if (state.quantity === "") validate.quantity = true;

    if (state.serialNumber === "") validate.serialNumber = true;

    if (state.requiresDisassembly === "") validate.requiresDisassembly = true;

    if (state.description === "") validate.description = true;

    if (state.pos === "") validate.pos = true;

    if (state.employee === "") validate.employee = true;

    if (state.agreement === false) validate.agreement = true;

    setBadValidate({ ...badValidate, ...validate });
    if (
      !validate.typeOfReturn &&
      !validate.docNumber &&
      !validate.name &&
      !validate.email &&
      !validate.phone &&
      !validate.getBack &&
      !validate.producer &&
      !validate.typeProduct &&
      !validate.quantity &&
      !validate.serialNumber &&
      !validate.requiresDisassembly &&
      !validate.description &&
      !validate.pos &&
      !validate.employee &&
      !validate.agreement
    ) {
      if (state.typeOfReturn === "Gwarancja producenta") {
        if (!validate.buyDate) {
          if (state.getBack === "kurierem na adres") {
            if (!validate.street && !validate.zipCode && !validate.city) {
              sendForm(state);
            }
          } else {
            sendForm(state);
          }
        }
      } else if (state.typeOfReturn === "Rękojmia") {
        if (!validate.buyDate && !validate.howFinish) {
          console.log("tutaj", state.getBack);
          if (state.getBack === "kurierem na adres") {
            if (!validate.street && !validate.zipCode && !validate.city) {
              sendForm(state);
            }
          } else {
            sendForm(state);
          }
        }
      } else if (
        state.typeOfReturn ===
        "Dostałem towar uszkodzony (zgł. max. do 7 dni od otrzymania towaru)"
      ) {
        if (!validate.buyDate && !validate.howFinish) {
          console.log("tutaj", state.getBack);
          if (state.getBack === "kurierem na adres") {
            if (!validate.street && !validate.zipCode && !validate.city) {
              sendForm(state);
            }
          } else {
            sendForm(state);
          }
        }
      }
    }
  };

  const applicationType = [
    "Gwarancja producenta",
    "Rękojmia",
    "Dostałem towar uszkodzony (zgł. max. do 7 dni od otrzymania towaru)",
  ];

  const howFinishApplication = [
    "Naprawa towaru",
    "Wymiana towaru na nowy",
    "Obniżenie ceny towaru",
    "Odstąpienie od umowy (istotna wada towaru)",
  ];

  const isTrue = ["Tak", "Nie"];

  const whereGetBack = [
    "w Salonie/ Punkcie sprzedaży (w tym, w którym składane jest zgłoszenie)",
    "kurierem na adres",
  ];

  const pos = [
    "Salon sprzedaży Warszawa",
    "Salon sprzedaży Kraków",
    "Salon sprzedaży Rzeszów",
    "Salon sprzedaży Zamość",
    "Punkt sprzedaży Gdańsk",
    "Punkt sprzedaży Poznań",
  ];

  const handleCheckbox = (e) => {
    setState({ ...state, [e.target.name]: e.target.checked });
    setBadValidate({ ...badValidate, [e.target.name]: false });
  };

  const handleInput = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
    setBadValidate({ ...badValidate, [e.target.name]: false });
  };

  const sendForm = (obj) => {
    setShowForm(false);
    setShowSpinner(true);

    const url = "https://newaccount1632792215290.freshdesk.com/api/v2/tickets";
    const body = {
      subject: "Reklamacja stacjonarna",
      description: `
      <h4>Reklamacja stacjonarna:</h4>
      <b>Rodzaj zgłoszenia:</b> ${obj.typeOfReturn} <br/>
      ${
        obj.typeOfReturn === "Gwarancja producenta"
          ? `<b>Data zakupu:</b> ${obj.buyDate} <br/>`
          : ""
      }

      ${
        obj.typeOfReturn === "Rękojmia"
          ? `<b>Data zakupu:</b> ${obj.buyDate} <br/>
          <b>Oczekiwany sposób zakończenia zgłoszenia:</b> ${obj.howFinish} <br/>`
          : ""
      }

      ${
        obj.typeOfReturn ===
        "Dostałem towar uszkodzony (zgł. max. do 7 dni od otrzymania towaru)"
          ? `<b>Data otrzymania towaru:</b> ${obj.getDate} <br/>
            <b>Czy został sporządzony protokół szkody przez kuriera?:</b> ${obj.isProtocol} <br/>`
          : ""
      }
      <br/>
      <b>Numer zamówienia lub numer faktury:</b> ${obj.docNumber} <br/>
      <b>Imię i nazwisko lub nazwa firmy:</b> ${obj.name} <br/>
      <b>Adres e-mail:</b> ${obj.email} <br/>
      <b>Telefon:</b> ${obj.phone} <br/>
      <br/>
      <b>Odbiór towaru przez Klienta:</b> ${obj.getBack} <br/>

      ${
        obj.getBack === "kurierem na adres"
          ? `<b>Ulica:</b> ${obj.street} <br/>
        <b>Kod pocztowy:</b> ${obj.zipCode} <br/>
        <b>Miejscowość:</b> ${obj.city} <br/>`
          : null
      }
      <br/>
      <b>Producent:</b> ${obj.producer} <br/>
      <b>Nazwa i model towaru:</b> ${obj.typeProduct} <br/>
      <b>Ilość sztuk:</b> ${obj.quantity} <br/>
      <b>Numer fabryczny/ seryjny:</b> ${obj.serialNumber} <br/>
      <b>Czy produkt wymaga demontażu:</b> ${obj.requiresDisassembly} <br/>
      <b>Opis wady:</b> ${obj.description} <br/>
      <b>Salon, który przyjął reklamację:</b> ${obj.pos} <br/>
      <b>Pracownik przyjmujący zgłoszenie:</b> ${obj.employee} <br/>
      `,
      email: obj.email,
      phone: obj.phone,
      priority: 1,
      status: 2,
    };
    console.log("body", body);
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
      <GeneratePdf />
      {showForm ? (
        <div id="return-form" className="return-form">
          <h2 className="return-form__title">
            Formularz reklamacji (salony stacjonarne)
          </h2>

          <Select
            value={state.typeOfReturn}
            name={"typeOfReturn"}
            labelName="Rodzaj zgłoszenia"
            optionsValue={applicationType}
            handleInput={handleInput}
            validation={badValidate.typeOfReturn}
          />
          {state.typeOfReturn === "Gwarancja producenta" ||
          state.typeOfReturn === "Rękojmia" ? (
            <Input
              value={state.buyDate}
              name={"buyDate"}
              labelName="Data zakupu"
              handleInput={handleInput}
              type={"date"}
              validation={badValidate.buyDate}
              maxDate={todayDate}
            />
          ) : null}
          {state.typeOfReturn === "Rękojmia" ? (
            <Select
              value={state.howFinish}
              name={"howFinish"}
              labelName="Oczekiwany sposób zakończenia zgłoszenia"
              optionsValue={howFinishApplication}
              handleInput={handleInput}
              validation={badValidate.howFinish}
            />
          ) : null}

          {state.typeOfReturn ===
          "Dostałem towar uszkodzony (zgł. max. do 7 dni od otrzymania towaru)" ? (
            <div>
              <Input
                value={state.getDate}
                name={"getDate"}
                labelName="Data otrzymania towaru"
                handleInput={handleInput}
                type={"date"}
                validation={badValidate.getDate}
                maxDate={todayDate}
              />
              <Select
                value={state.isProtocol}
                name={"isProtocol"}
                labelName="Czy został sporządzony protokół szkody przez kuriera?"
                optionsValue={isTrue}
                handleInput={handleInput}
                validation={badValidate.isProtocol}
              />
            </div>
          ) : null}

          <Input
            value={state.docNumber}
            name={"docNumber"}
            labelName="Numer zamówienia lub numer faktury"
            handleInput={handleInput}
            type={"text"}
            validation={badValidate.docNumber}
          />

          <Input
            value={state.name}
            name={"name"}
            labelName="Imię i nazwisko lub nazwa firmy"
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
            value={state.getBack}
            name={"getBack"}
            labelName="Odbiór towaru przez Klienta"
            optionsValue={whereGetBack}
            handleInput={handleInput}
            validation={badValidate.getBack}
          />

          {state.getBack === "kurierem na adres" ? (
            <div>
              <Input
                value={state.street}
                name={"street"}
                labelName="Ulica i numer domu"
                handleInput={handleInput}
                type={"text"}
                validation={badValidate.street}
              />

              <Input
                value={state.zipCode}
                name={"zipCode"}
                labelName="Kod pocztowy"
                handleInput={handleInput}
                type={"number"}
                validation={badValidate.zipCode}
              />

              <Input
                value={state.city}
                name={"city"}
                labelName="Miejscowość"
                handleInput={handleInput}
                type={"text"}
                validation={badValidate.city}
              />
            </div>
          ) : null}

          <Input
            value={state.producer}
            name={"producer"}
            labelName="Producent"
            handleInput={handleInput}
            type={"text"}
            validation={badValidate.producer}
          />

          <Input
            value={state.typeProduct}
            name={"typeProduct"}
            labelName="Nazwa i model towaru"
            handleInput={handleInput}
            type={"text"}
            validation={badValidate.typeProduct}
          />

          <Input
            value={state.quantity}
            name={"quantity"}
            labelName="Ilość sztuk"
            handleInput={handleInput}
            type={"number"}
            minValue={1}
            validation={badValidate.quantity}
          />

          <Input
            value={state.serialNumber}
            name={"serialNumber"}
            labelName="Numer fabryczny/ seryjny"
            handleInput={handleInput}
            type={"text"}
            validation={badValidate.serialNumber}
          />

          <Select
            value={state.requiresDisassembly}
            name={"requiresDisassembly"}
            labelName="Czy produkt wymaga demontażu"
            optionsValue={isTrue}
            handleInput={handleInput}
            validation={badValidate.requiresDisassembly}
          />

          <TextArea
            value={state.description}
            name={"description"}
            labelName="Opis wady"
            handleInput={handleInput}
            validation={badValidate.description}
          />

          <Select
            value={state.pos}
            name={"pos"}
            labelName="Salon, który przyjął reklamację"
            optionsValue={pos}
            handleInput={handleInput}
            validation={badValidate.pos}
          />

          <Input
            value={state.employee}
            name={"employee"}
            labelName="Pracownik przyjmujący zgłoszenie"
            handleInput={handleInput}
            validation={badValidate.employee}
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
              Wyślij formularz
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
              Formularz został wysłany poprawnie
            </h2>
            <h3 className="return-message__id">
              Numer Twojego zgłoszenia:
              <strong>{taskNumber}</strong>
            </h3>
            <p className="return-message__remember">
              * Potwierdzenie wysłania formularza znajdziesz na swojej skrzynce
              pocztowej.
            </p>
            <p className="return-message__remember">
              ** Pamiętaj, aby spakować wszystkie elementy zestawu oraz oznaczyć
              paczkę numerem zgłoszenia.
            </p>
          </div>
        </div>
      ) : null}
      {showError ? (
        <div id="return-error" className="return-message return-error">
          <div className="return-message__container">
            <h2 className="return-message__error">
              Podczas wysyłania formularza wystąpił błąd. Spróbuj później.
            </h2>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default App;
