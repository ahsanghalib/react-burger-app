import React, { Component } from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import { isObject } from 'util';

class Burger extends Component {
	burgerIng = ingredients => {
		if (isObject(ingredients)) {
			return Object.keys(ingredients)
				.map(ing => {
					return [...Array(ingredients[ing])].map((v, i) => {
						return <BurgerIngredient key={ing + i} type={ing} />;
					});
				})
				.reduce((arr, el) => {
					return arr.concat(el);
				}, []);
		} else {
			return 'Not Object but received a ' + typeof ingredients;
		}
	};

	render() {
        
		let transformedIngredients = Object.keys(this.props.ingredients)
			.map(ing => {
				return [...Array(this.props.ingredients[ing])].map((v, i) => {
					return <BurgerIngredient key={ing + i} type={ing} />;
				});
			})
			.reduce((arr, el) => {
				return arr.concat(el);
            }, []);
            
        if(transformedIngredients.length === 0) {
            transformedIngredients = <p>Please start adding ingredients!</p>;
        }

		return (
			<div className={classes.Burger}>
				<BurgerIngredient type="bread-top" />
				{transformedIngredients}
				<BurgerIngredient type="bread-bottom" />
			</div>
		);
	}
}

export default Burger;
