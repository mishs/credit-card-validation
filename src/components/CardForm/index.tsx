import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { CreditCard } from '../../CardManager/CreditCard';
import DisappearingAlert from './DisappearingAlert';

const currentYear = new Date().getFullYear();
const monthsArr = Array.from({ length: 12 }, (x, i) => {
  const month = i + 1;
  return month <= 9 ? '0' + month : month;
});
const yearsArr = Array.from({ length: 9 }, (_x, i) => currentYear + i);
interface CardFormProps {
  selectedCreditCard: CreditCard;
  onUpdateState: any;
  setIsCardFlipped: React.Dispatch<React.SetStateAction<boolean>>;
  handleSubmitAction: () => void;
  children: any;
}
export default function CardForm(props: CardFormProps) {
  const {
    selectedCreditCard,
    onUpdateState,
    setIsCardFlipped,
    handleSubmitAction,
    children,
  } = props;

  const [errors, setErrors] = useState<CreditCard>({
    id: '',
    cardNumber: '',
    cardHolder: '',
    cardMonth: '',
    cardYear: '',
    cardCvv: '',
    cardCountry: '',
  });

  const [showModal, setShowModal] = useState<boolean>(false);
  const [closeModalTimeout, setCloseModalTimeout] = useState<NodeJS.Timeout | null>(null);

  const handleCountryFocus = () => {
    setShowModal(true);
    if (closeModalTimeout) {
      clearTimeout(closeModalTimeout);
    }
    setCloseModalTimeout(
      setTimeout(() => {
        setShowModal(false);
      }, 4000) // 4 seconds
    );
  };

  const handleCloseModal = () => {
    if (closeModalTimeout) {
      clearTimeout(closeModalTimeout);
    }
    setShowModal(false);
  };

  const handleFormChange = (event: {
    target: { name: string; value: string };
  }) => {
    const { name, value } = event.target;

    onUpdateState(name, value);
  };

  const handleFormChangeNumbers = (event: {
    target: { value: string; name: string };
  }) => {
    const { name, value } = event.target;
    if (isNaN(Number(value))) return; //only accept numbers
    onUpdateState(name, value);
  };

  const onCvvFocus = () => {
    setIsCardFlipped(true);
  };

  const onCvvBlur = () => {
    setIsCardFlipped(false);
  };

  const bannedCountries = ['Country1', 'Country2', 'Country3', 'Country4', 'Country5']; // your banned countries here


  const handleFormChangeCountry = (event: { target: { value: string; name: string }; }) => {
    const { name, value } = event.target;
    const newErrors = { ...errors };

    if (bannedCountries.includes(value)) {
      // prevent banned countries
      newErrors.cardCountry = 'This country is not allowed';
      setErrors(newErrors);
      return;
    } else if (value.trim() === '') {
      newErrors.cardCountry = 'Country field cannot be empty';
      setErrors(newErrors);
      return;
    }

    newErrors.cardCountry = '';
    setErrors(newErrors);
    onUpdateState(name, value);
  };


  const handleConfirmAction = (e: any) => {
    // validate errors
    if (!isFormHasErrors()) {
      handleSubmitAction();
    }
  };
  const isFormHasErrors = () => {
    const newErrors: CreditCard = {
      id: '',
      cardNumber: '',
      cardHolder: '',
      cardMonth: '',
      cardYear: '',
      cardCvv: '',
      cardCountry: '',
    };
    //first validate blank fields
    let isErrorFlag = false;
    Object.keys(newErrors).forEach(function (key: any) {
      const keyPair = key as keyof CreditCard;
      const displayableKeyName = key.toLowerCase().replace('card', 'Card ');
      if (!selectedCreditCard[keyPair]) {
        newErrors[keyPair] = `${displayableKeyName} value required.`;
        isErrorFlag = true;
      } else {
        newErrors[keyPair] = '';
        isErrorFlag = false;
      }
    });
    if (isErrorFlag) {
      setErrors(newErrors);
      return isErrorFlag;
    }
    //if no blank field then check other validation
    if (selectedCreditCard['cardNumber'].length !== 16) {
      newErrors.cardNumber = 'Card number should be 16 digits';
      isErrorFlag = true;
    }
    if (selectedCreditCard['cardCvv'].length !== 4) {
      newErrors.cardCvv = 'Card number should be 4 digits';
      isErrorFlag = true;
    }

    if (bannedCountries.includes(selectedCreditCard['cardCountry'])) {
      newErrors.cardCountry = 'This country is not allowed';
      isErrorFlag = true;
    }

    setErrors(newErrors);
    return isErrorFlag;
  };

  return (
    <div className="card-form">
      {/* <BannedCountriesModal
        show={showModal}
        onHide={handleCloseModal}
        bannedCountries={bannedCountries}
      /> */}
      <DisappearingAlert bannedCountries={bannedCountries} message="This alert will disappear in 5 seconds." timeout={5000} show={undefined} />

      <div className="card-list">{children}</div>
      <div className="card-form__inner">
        <div className="card-input">
          <label htmlFor="cardNumber" className="card-input__label">
            Card Number
          </label>
          <Form.Control
            type="text"
            name="cardNumber"
            className="card-input__input"
            autoComplete="off"
            onChange={handleFormChangeNumbers}
            maxLength={16}
            value={selectedCreditCard.cardNumber}
            isInvalid={!!errors.cardNumber}
          />
          <Form.Control.Feedback type="invalid">
            {errors.cardNumber}
          </Form.Control.Feedback>
        </div>

        <div className="card-input">
          <label htmlFor="cardName" className="card-input__label">
            Card Holder Name
          </label>
          <Form.Control
            type="text"
            className="card-input__input"
            autoComplete="off"
            name="cardHolder"
            onChange={handleFormChange}
            value={selectedCreditCard.cardHolder}
            isInvalid={!!errors.cardHolder}
          />
          <Form.Control.Feedback type="invalid">
            {errors.cardHolder}
          </Form.Control.Feedback>
        </div>

        <div className="card-form__row">
          <div className="card-form__col">
            <div className="card-form__group">
              <label htmlFor="cardMonth" className="card-input__label">
                Expiration Date
              </label>
              <Form.Control
                as="select"
                className="card-input__input -select"
                value={selectedCreditCard.cardMonth}
                name="cardMonth"
                onChange={handleFormChange}
                isInvalid={!!errors.cardMonth}
              >
                <option value="" disabled>
                  Month
                </option>

                {monthsArr.map((val, index) => (
                  <option key={index} value={val}>
                    {val}
                  </option>
                ))}
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                {errors.cardMonth}
              </Form.Control.Feedback>
              <Form.Control
                as="select"
                name="cardYear"
                className="card-input__input -select"
                value={selectedCreditCard.cardYear}
                onChange={handleFormChange}
                isInvalid={!!errors.cardYear}
              >
                <option value="" disabled>
                  Year
                </option>

                {yearsArr.map((val, index) => (
                  <option key={index} value={val}>
                    {val}
                  </option>
                ))}
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                {errors.cardYear}
              </Form.Control.Feedback>
            </div>
          </div>
          <div className="card-form__col -cvv">
            <div className="card-input">
              <label htmlFor="cardCvv" className="card-input__label">
                CVV (Security Code)
              </label>
              <Form.Control
                type="text"
                className="card-input__input"
                maxLength={4}
                autoComplete="off"
                name="cardCvv"
                value={selectedCreditCard.cardCvv}
                onChange={handleFormChangeNumbers}
                onFocus={onCvvFocus}
                onBlur={onCvvBlur}
                isInvalid={!!errors.cardCvv}
              />
              <Form.Control.Feedback type="invalid">
                {errors.cardCvv}
              </Form.Control.Feedback>
            </div>
          </div>
        </div>

        <div className="card-form__row">
          <div className="card-form__col">
            <div className="card-input">
              <label htmlFor="cardCountry" className="card-input__label">
                Country
              </label>
              <Form.Control
                type="text"
                className="card-input__input"
                autoComplete="off"
                name="cardCountry"
                onChange={handleFormChangeCountry}
                value={selectedCreditCard.cardCountry}
                isInvalid={!!errors.cardCountry}
                onFocus={handleCountryFocus}
                onClick={handleCountryFocus}
              // onBlur={handleCountryBlur}
              />
              <Form.Control.Feedback type="invalid">
                {errors.cardCountry}
              </Form.Control.Feedback>
            </div>
          </div>
        </div>

        <div className="card-form__row">
          <div className="card-form__col">
            <div className="d-grid gap-2">
              <Button className="add-new-card"
                variant="success" size="lg" onClick={handleConfirmAction}>
                Confirm
              </Button>{' '}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
