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
  	<h4>{props.monster.unawakenedName}</h4>
  	<h5>{capitalizeFirstLetter(props.monster.element)}</h5>
  	{returnImageForMonster(props.monster)}
 	<button className="button" onClick={() => {props.add(props.index)}}></button>
  </div>
);

Monster.propTypes = {
  monster: PropTypes.object.isRequired,
  add: PropTypes.func,
  index: PropTypes.string.isRequired
};

export default Monster;