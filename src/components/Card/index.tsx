import React, { useEffect, useMemo, useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  CSSTransition,
  SwitchTransition,
  TransitionGroup,
} from 'react-transition-group';
import './styles.scss';

interface CardProp {
  cardHolder: string;
  cardNumber: string;
  cardMonth: string;
  cardYear: string;
  cardCvv: string;
  isCardFlipped: boolean;
  cardCountry: string;
}

const CARD_TYPES = {
  visa: '^4',
  mastercard: '^5[1-5]',
  discover: '^6011',
  maestro: '^62',
};

const Card = ({
  cardHolder,
  cardNumber,
  cardMonth,
  cardYear,
  cardCvv,
  isCardFlipped,
  cardCountry
}: CardProp) => {
  const countryRef = useRef<HTMLSpanElement | null>(null);
  const [fontSize, setFontSize] = useState<string>("1em");

  const cardType = (cardNumber: string) => {
    let re;
    for (const [card, pattern] of Object.entries(CARD_TYPES)) {
      re = new RegExp(pattern);
      if (cardNumber.match(re) !== null) {
        return card;
      }
    }
    return 'visa';
  };

  const useCardType = useMemo(() => cardType(cardNumber), [cardNumber]);

  const maskCardNumber = (cardNumber: string) => {
    return cardNumber.split('').map((val, index) =>
      index > 4 && index < 14 && val !== ' ' ? '*' : val
    );
  };

  const countryText = cardCountry ? cardCountry.slice(0, 16) : 'Unknown';

  useEffect(() => {
    setFontSize(cardCountry.length > 16 ? "0.75em" : "1em");
  }, [cardCountry]);

  return (
    <div className={'card-item ' + (isCardFlipped ? '-active' : '')}>
      <div className="card-item__side -front">
        <div className={`card-item__focus`} />
        <div className="card-item__cover">
        </div>

        <div className="card-item__wrapper">
          <div className="card-item__top">
            <img
              src={'/card-asserts/chip.png'}
              alt=""
              className="card-item__chip"
            />
            <div className="card-item__type">
              <img
                alt={useCardType}
                src={`/card-type/${useCardType}.png`}
                className="card-item__typeImg"
              />
            </div>
          </div>

          <label className="card-item__number">
            <TransitionGroup className="slide-fade-up" component="div">
              {cardNumber ? (
                maskCardNumber(cardNumber).map((val, index) => (
                  <CSSTransition
                    classNames="slide-fade-up"
                    timeout={250}
                    key={index}
                  >
                    <div className="card-item__numberItem">{val}</div>
                  </CSSTransition>
                ))
              ) : (
                <CSSTransition classNames="slide-fade-up" timeout={250}>
                  <div className="card-item__numberItem">#</div>
                </CSSTransition>
              )}
            </TransitionGroup>
          </label>



          <div className="card-item__content">
            <label className="card-item__info">
              <div className="card-item__holder">Card Holder</div>
              <div className="card-item__name">
                <TransitionGroup component="div" className="slide-fade-up">
                  {cardHolder === 'FULL NAME' ? (
                    <CSSTransition classNames="slide-fade-up" timeout={250}>
                      <div>FULL NAME</div>
                    </CSSTransition>
                  ) : (
                    cardHolder
                      .split('')
                      .map(
                        (
                          val: boolean | string | null | undefined,
                          index: React.Key | null | undefined,
                        ) => (
                          <CSSTransition
                            timeout={250}
                            classNames="slide-fade-right"
                            key={index}
                          >
                            <span className="card-item__nameItem">{val}</span>
                          </CSSTransition>
                        ),
                      )
                  )}
                </TransitionGroup>
              </div>
            </label>

            <div className="card-item__country">
              <label className="card-item__dateTitle">Country</label>
              <label className="card-item__dateItem">
                <SwitchTransition in-out>
                  <CSSTransition
                    classNames="slide-fade-up"
                    timeout={200}
                    key={cardCountry}
                  >
                    <span
                      ref={countryRef}
                      style={{
                        display: '-webkit-box',
                        width: '60px',
                        overflowWrap: 'break-word',
                        WebkitLineClamp: '2',
                        WebkitBoxOrient: 'vertical',
                        fontSize: fontSize
                      }}
                    >
                      {countryText}
                    </span>
                  </CSSTransition>
                </SwitchTransition>
              </label>
            </div>


            <div className="card-item__date">
              <label className="card-item__dateTitle">Expires</label>
              <label className="card-item__dateItem">
                <SwitchTransition in-out>
                  <CSSTransition
                    classNames="slide-fade-up"
                    timeout={200}
                    key={cardMonth}
                  >
                    <span>{!cardMonth ? 'MM' : cardMonth} </span>
                  </CSSTransition>
                </SwitchTransition>
              </label>
              /
              <label htmlFor="cardYear" className="card-item__dateItem">
                <SwitchTransition out-in>
                  <CSSTransition
                    classNames="slide-fade-up"
                    timeout={250}
                    key={cardYear}
                  >
                    <span>
                      {!cardYear ? 'YY' : cardYear.toString().substr(-2)}
                    </span>
                  </CSSTransition>
                </SwitchTransition>
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="card-item__side -back">
        <div className="card-item__cover">
        </div>
        <div className="card-item__band" />
        <div className="card-item__cvv">
          <div className="card-item__cvvTitle">CVV</div>
          <div className="card-item__cvvBand">
            <TransitionGroup>
              {cardCvv
                .split('')
                .map((val: any, index: React.Key | null | undefined) => (
                  <CSSTransition
                    classNames="zoom-in-out"
                    key={index}
                    timeout={250}
                  >
                    <span>*</span>
                  </CSSTransition>
                ))}
            </TransitionGroup>
          </div>
          <div className="card-item__type">
            <img
              alt="card-type"
              src={`/card-type/${useCardType}.png`}
              className="card-item__typeImg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
