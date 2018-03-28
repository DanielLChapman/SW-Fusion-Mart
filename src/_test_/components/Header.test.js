import React from 'react';
import Router from "../../components/Router";
import Header  from "../../components/Header";
import { shallow, mount } from 'enzyme';



function setup(boolToUse = true) {
	const wrapper = shallow(<Header displayInformation={boolToUse}/>);
	//console.log(wrapper.find('Header').dive().debug());

	return {wrapper}

}


describe('Header Component', () => {
	it('Header Prop === True', () => {
		const {wrapper} = setup(true);
		expect(wrapper.find('.tagline').length).toBe(1);
	});
	it('Header Prop === False', () => {
		const {wrapper} = setup(false);
		expect(wrapper.find('.tagline').length).toBe(0);
	});
	it('Header Should Contain a H1', () => {
		const {wrapper} = setup(true);
		expect(wrapper.find('h1').length).toBe(1);
	});
	it('Header Should Contain a Nav', () => {
		const {wrapper} = setup(true);
		expect(wrapper.find('nav').length).toBe(1);
	});
	it('Contains a Mini Cart', () => {
		const {enzymeWrapper, wrapper} = setup();
		expect(wrapper.find('Connect(MiniCart)')['length']).toBe(1);
	})
}) 

