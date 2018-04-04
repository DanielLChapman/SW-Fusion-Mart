import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {generateDefaultUserSettings} from './UserSettingExample';
import {cart1} from './CartExample';

Enzyme.configure({adapter: new Adapter() });

var localStorageMock = (function() {
  var store = {};
  return {
    getItem: function(key) {
    	if (key === 'userSettings') {
    		return JSON.stringify(generateDefaultUserSettings());
    	} else {
    		return JSON.stringify({cart1});
    	}
      	return store[key] || {};
    },
    setItem: function(key, value) {
      store[key] = value.toString() || {};
    },
    clear: function() {
      store = {};
    },
    removeItem: function(key) {
      delete store[key];
    }
  };
})();


Object.defineProperty(window, 'localStorage', { value: localStorageMock });