import React from 'react';
import { browserHistory } from 'react-router';
import styles from './main.scss';

const MailComponent = props => {
  const human = props.harmony.selectedHuman;
  return (
    <section className={styles.mail}>
      <header>
        <svg width="16px" height="16px" viewBox="0 0 16 16" onClick={() => browserHistory.push('/people')}>
          <g id="App" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <g id="Profile" transform="translate(-22.000000, -44.000000)">
              <g id="ic_arrow_back_24px" transform="translate(18.000000, 40.000000)">
                <polygon id="Shape" points="0 0 24 0 24 24 0 24" />
                <polygon className={styles.arrow} id="Shape" fill="#9B9B9B" points="20 11 7.83 11 13.42 5.41 12 4 4 12 12 20 13.41 18.59 7.83 13 20 13" />
              </g>
            </g>
          </g>
        </svg>
        <figure>
          <img src={human.photo} alt={human.photo} />
          <figcaption>
            <h3>{human.name}</h3>
          </figcaption>
        </figure>
      </header>
      <main>
        <div>
          <textarea placeholder={human.gender === 'female' ? 'Напишите  пару слов о себе и что вам понравилось в девушке' : 'Напишите  пару слов о себе и что вам понравилось в парне'}  />
        </div>
        <button onClick={() => props.harmonyActions.sendMail(human.id)}>
          ОТПРАВИТЬ
        </button>
        <span>ответ вам прийдет на {props.facebook.email }</span>
      </main>
    </section>
  );
};

MailComponent.displayName = 'MailComponent';

// Uncomment properties you need
// MailComponent.propTypes = {};
// MailComponent.defaultProps = {};

export default MailComponent;
