import React from 'react';
import Router from "../../components/Router";
import NotFound  from "../../components/NotFound";
import { shallow, mount } from 'enzyme';



function setup() {
	const wrapper = shallow(<NotFound />);
	//console.log(wrapper.find('Header').dive().debug());

	return {wrapper}

}


describe('Not Found Component', () => {
	it('Header Should Contain a H2', () => {
		const {wrapper} = setup();
		expect(wrapper.find('h2').length).toBe(1);
	});
	it('Header Should Contain a div with class fourofour', () => {
		const {wrapper} = setup();
		expect(wrapper.find('.fourofour').length).toBe(1);
	});
}) 

