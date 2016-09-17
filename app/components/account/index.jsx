import React from 'react';
import { Link } from 'react-router';
import styles from './main.scss';
import Footer from '../footer';

const AccountComponent = props => {
  // console.log(JSON.stringify(props.facebook));
  let age = props.facebook.age;
  age = age.toString();
  age = age[age.length - 1];
  // console.log(age);
  const style = {
    background: 'url(' + props.facebook.photo + ') no-repeat center',
    backgroundSize: 'cover'
  };
  return (
    <section className={styles.account}>
      <header>
        <figure>
          <div style={style} />
          <figcaption>
            <h3>{props.facebook.firstName}</h3>
            <span>{props.facebook.age} {(age > 0 && age < 5) ? (age === 1) ? 'год' : 'года' : 'лет'}, {props.facebook.location.name}</span>
          </figcaption>
        </figure>
      </header>
      <main>
        <div>
          <h2>Обо мне</h2>
          <p>Девушку я выбираю себе сам. Мною трудно крутить и вертеть, потому что я исключительно трезвомыслящий человек, двумя ногами стоящий на земле. Иногда меня можно ненавязчиво и деликатно подталкивать к выбору, который я сделаю сам только, в конце концов, после того, как все обдумаю.</p>
        </div>
        <Link to="/">РЕДАКТИРОВАТЬ</Link>
        <Link to="/">НАСТРОЙКИ УВЕДОМЛЕНИЙ</Link>
      </main>
      <Footer active="me" />
    </section>
  );
};

AccountComponent.displayName = 'AccountComponent';

// Uncomment properties you need
// AccountComponent.propTypes = {};
// AccountComponent.defaultProps = {};

export default AccountComponent;
