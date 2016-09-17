import React from 'react';
import { Link } from 'react-router';
// require('styles//Listfemale.scss');
import Footer from '../footer';
import styles from './main.scss';

const PeopleComponent = props => {
  return (
    <section className={styles.listpeople}>
      <h4>{props.facebook.location.name}</h4>
      <main>
        {props.people.people.map((human, index) => {
          const humanPhoto = (
            <figure>
              <img src={human.photo} alt={human.photo} />
            </figure>
          );
          const humanWelcome = (
            <article>
              <header>{human.name}, {human.age}</header>
              <p>{human.welcome}</p>
              <div />
            </article>
          );
          return (index % 2) === 0 ? (
            <section key={index} onClick={() => props.harmonyActions.viewHumanDetail(human.id)}>
              { humanPhoto }
              { humanWelcome }
            </section>
          ) : (
            <section key={index} onClick={() => props.harmonyActions.viewHumanDetail(human.id)}>
              { humanWelcome }
              { humanPhoto }
            </section>);
          })
        }
      </main>
      <Footer active="people" />
    </section>
  );
};

PeopleComponent.displayName = 'ListPeopleComponent';

// Uncomment properties you need
// ListfemaleComponent.propTypes = {};
// ListfemaleComponent.defaultProps = {};

export default PeopleComponent;
