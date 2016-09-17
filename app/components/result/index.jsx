import React from 'react';
import { Link } from 'react-router';
import styles from './main.scss';

const ResultComponent = props => {
  // console.log('RESULT');
  const petals = [];
  const people = (props.people && props.people.people) || [];
  const petalCount = people.length;
  // if (typeof window === undefined) {
  //   console.log('RENDER');
  // }
  // console.log(window || 'window');
  const size = window.innerWidth * 0.8;
  const petalSize = (size * 0.22) + 8;
  const radius = size * 0.35;
  people.forEach((human, index) => {
    const radian = (2 / petalCount) * index * Math.PI;
    const angle = 180 - ((radian * 180) / Math.PI);
    // console.log(angle);
    const left = ((radius * Math.sin(radian)) - (petalSize / 2)) + (size / 2);
    const top = ((radius * Math.cos(radian)) - (petalSize / 2)) + (size / 2);
    const style = {
      top: `${top}px`,
      left: `${left}px`,
      width: `${petalSize}px`,
      height: `${petalSize}px`,
      backgroundImage: `url(${human.photo})`,
      transform: `rotate(${angle}deg)`
    };
    petals.push(<div style={style} key={human.id} />);
  });
  return (
    <section className={styles.result}>
      <h4>Поздравляем</h4>
      <h1>{ props.facebook.firstName } мы подобрали людей с которыми вам будет приятно и легко</h1>
      <div style={{ width: `${size}px`, height: `${size}px` }}>
        <figure>
          <img src={props.facebook.photo} alt="" />
        </figure>
        {petals.map(petal => petal)}
      </div>
      <Link to="/people">ПРОДОЛЖИТЬ</Link>
    </section>
  );
};

ResultComponent.displayName = 'ResultComponent';

// Uncomment properties you need
// ResultComponent.propTypes = {};
// ResultComponent.defaultProps = {};

export default ResultComponent;
