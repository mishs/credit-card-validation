import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import Card from '../../components/Card';
import CardForm from '../../components/CardForm';
import { CreditCard, updateLocalStorageCards } from '../CreditCard';

const initialState: CreditCard = {
  id: '',
  cardNumber: '',
  cardHolder: '',
  cardMonth: '',
  cardYear: '',
  cardCvv: '',
  cardCountry: '',
};

export default function AddCard() {
  const navigate = useNavigate();
  const [state, setState] = useState<CreditCard>(initialState);
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Add isLoading state

  const updateStateValues = useCallback((keyName: keyof CreditCard, value: string) => {
    setState(prevState => ({
      ...prevState,
      [keyName]: value || '',
    }));
  }, []);

  const handleSubmitAction = async () => {
    try {
      setIsLoading(true); // Start loader

      let newCardsList: CreditCard[] = [];
      const storageCards = localStorage.getItem('cards');
      if (storageCards) {
        newCardsList = JSON.parse(storageCards);
      }

      newCardsList.push({
        ...state,
        id: uuid(),
      });

      updateLocalStorageCards(newCardsList);
      navigate('/');
    } catch (error: any) {
      alert(error.message);
      console.error(error);
    } finally {
      setIsLoading(false); // Stop loader
    }
  };

  return (
    <>
      <div className="add-card-content">
        <div className="wrapper">
          <CardForm
            selectedCreditCard={state}
            onUpdateState={updateStateValues}
            setIsCardFlipped={setIsCardFlipped}
            handleSubmitAction={handleSubmitAction}
          >
            <Card
              cardNumber={state.cardNumber}
              cardHolder={state.cardHolder}
              cardMonth={state.cardMonth}
              cardYear={state.cardYear}
              cardCvv={state.cardCvv}
              cardCountry={state.cardCountry}
              isCardFlipped={isCardFlipped}
            />
          </CardForm>
        </div>
      </div>

      {isLoading && <div className="loader">Loading...</div>} {/* Render loader conditionally */}
    </>
  );
}
