import React from 'react';
// import ReactDOM from 'react-dom';
import deepFreeze from 'deep-freeze';
import { Link, browserHistory } from 'react-router';
import styles from './main.scss';

const ProfileComponent = props => {
  // componentDidMount() {
  //   ReactDOM.findDOMNode(this).scrollIntoView();
  // }
  const human = props.harmony.selectedHuman;
  deepFreeze(props.people);
  const people = [...props.people.people];
  people.splice(4, people.length - 5);
  return (
    <section className={styles.profile}>
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
            <span>{human.age}, {human.location}</span>
          </figcaption>
        </figure>
      </header>
      <main>
        {human.about.map((item, index) => {
          return (<div key={index}><h2>{item.question}</h2><p>{item.answer}</p></div>);
        }) }
        <Link to="/mail">
          НАПИСАТЬ ПИСЬМО
        </Link>
      </main>
      <footer>
        <div />
        <section>
        {people.map((item, index) => (
          <figure key={'01' + index}>
            <img src={item.photo} alt={item.photo} />
          </figure>
          )
        ) }
        </section>
      </footer>

    </section>
  );
};

ProfileComponent.displayName = 'ProfileComponent';

// Uncomment properties you need
// ProfileComponent.propTypes = {};
// ProfileComponent.defaultProps = {};

export default ProfileComponent;
