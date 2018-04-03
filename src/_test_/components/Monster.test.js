import React from 'react';
import Router from "../../components/Router";
import Monster  from "../../components/Monster";
import { shallow, mount } from 'enzyme';
import ReactDOM from 'react-dom';


describe('Not Found Component', () => {
	var wrapper, props, mounted ;

	beforeEach(function() {
		props = {
		 	monster: {
				currentStars: 5,
				neededStars: 5,
				element: 'light', 
				highEle: 20,
				midEle: 10,
				lowEle: 0,
				highMagic: 15,
				midMagic: 5,
				lowMagic: 0,
				requires: ['kaz', 'lingling', 'harmonia', 'loren'],
				unawakenedName: 'Paladin',
				image: 'https://vignette.wikia.nocookie.net/summoners-war-sky-arena/images/f/ff/Paladin_%28Light%29_Icon.png/revision/latest/scale-to-width-down/85?cb=20170928142407'
	 		},
		 	add: jest.fn(),
		  	index: "jeanne"
		}
		wrapper = shallow(<Monster {...props} />);
	});

	it("Does expects a div with className Monster", () => {
		expect(wrapper.find('.monster').length).toBe(1);
	});
	it("Does expects to find two spans", () => {
		expect(wrapper.find('.monster-text-span').length).toBe(2);
	});
	it("Does expects an img", () => {
		expect(wrapper.find('img').length).toBe(1);
	});
	it("Does expects a button", () => {
		expect(wrapper.find('button').length).toBe(1);
	});
	it("Does expects a button to have an onclick", () => {
		mounted = mount(<Monster {...props} />);
		mounted.find('button').simulate('click');
		expect(props.add).toBeCalled();
	})
}) 

