import React from 'react';
import { browserHistory } from 'react-router';
import BemyButton from '../button';
import styles from './main.scss';

const MailComponent = props => {
  const human = props.people.selectedHuman;
  return (
    <section className={styles.mail}>
      <header>
        <button onClick={() => browserHistory.push('/people')}>
          <svg width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <g id="App-2" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
              <g id="Atoms" transform="translate(-108.000000, -2360.000000)">
                <g id="ic_close" transform="translate(102.000000, 2354.000000)">
                  <polygon id="Shape" fill="#C2C2C2" points="25.3333333 8.54666667 23.4533333 6.66666667 16 14.12 8.54666667 6.66666667 6.66666667 8.54666667 14.12 16 6.66666667 23.4533333 8.54666667 25.3333333 16 17.88 23.4533333 25.3333333 25.3333333 23.4533333 17.88 16" />
                  <polygon id="Shape" points="0 0 32 0 32 32 0 32" />
                </g>
              </g>
            </g>
          </svg>
        </button>
        <h3>Сообщение</h3>
        {/* <figure>
          <img src={human.photo} alt={human.photo} />
          <figcaption>
            <h3>{human.name}</h3>
          </figcaption>
        </figure> */}
      </header>
      <main>
        <div>
          <textarea placeholder={human.gender === 'female' ? 'Напишите  пару слов о себе и что вам понравилось в девушке' : 'Напишите  пару слов о себе и что вам понравилось в парне'}  />
        </div>
        <BemyButton enabled to="/profile" title="Отправить сейчас" />
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
