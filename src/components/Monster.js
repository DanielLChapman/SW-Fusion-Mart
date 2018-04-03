import React from 'react';
import PropTypes from "prop-types";
import {capitalizeFirstLetter} from './App';

const returnImageForMonster = (monster) => {
	let unawakenedName = monster.unawakenedName; 
	unawakenedName = unawakenedName.split(' ').join('_');
	unawakenedName+=`_(${capitalizeFirstLetter(monster.element)})_Icon.png`;
	return (<img src={`../images/${unawakenedName}`} alt={monster.unawakenedName} />)
}

const Monster = props => (

  <div className="monster">
 	{returnImageForMonster(props.monster)}
 	<section className="monster-text">
 		<span className="monster-text-span">{capitalizeFirstLetter(props.monster.element)}</span><br />
  		<span className="monster-text-span">{props.monster.unawakenedName}</span>
  	</section>
  	<section className="monster-add">
 		<button className="button monster-add-button" onClick={() => {props.add(props.index)}}>
 			<i className="fas fa-plus"></i>
 		</button>
 	</section>
  </div>
);

Monster.propTypes = {
  monster: PropTypes.object.isRequired,
  add: PropTypes.func,
  index: PropTypes.string.isRequired
};

export default Monster;