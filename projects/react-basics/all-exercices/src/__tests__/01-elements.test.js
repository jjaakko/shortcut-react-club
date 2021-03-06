import React from "react"
import { shallow } from "enzyme"
import each from 'jest-each'
import { itHasProperty, itHasValue, itHasType } from "lib/testUtils"

import * as ex from "exercices/01-elements"

/**
 * 01-1 - A first JSX element
 * 
 * 
 * JSX is javascript XML. it let you write HTML-like markup in Javascript.
 * Let's give it a test
 * 
 * export a variable named "helloWorld" and assign it a JSX element.
 * The JSX element must have the text "Hello World!" wrapped in a h1 element
 * 
 * NB: we are not creating components but assiging HTML-like markup into a Javascript variable.
 *  
 */

describe("01-1 - A first JSX element", () => {

	const element = ex.helloWorld;

	itHasProperty(ex, "helloWorld");

	it("is a valid element", () => {
		expect(React.isValidElement(element)).toEqual(true)
	})
	
	it("has the text 'Hello World!'", () => {
		const component = shallow(element);
		expect(component.text()).toEqual("Hello World!")
	})

	it("is wrapped inside a h1 element", () => {
		const component = shallow(element);
		expect(component.type()).toEqual("h1")
	})
})

/**
 * 01-2 - nested JSX
 *  
 * Now let's make a more complex element.
 * 
 * export a variable named "nestedJSX" and assign it a JSX element.
 * The outer element should be a div with an attribute `className` of "card".
 * Inside the  div, insert a h4 with content "John Doe" and a p element with content "Age: 42" 
 * 
 * NB: convention for complex JSX.
 * 1. To improve readibility, wrap your element in parenthesis ()
 * 2. One JSX element per line
 * 3. Use indentation
 * 
 * exemple:
 * //bad
 * const element = <div><input/><button>Click me</button></div>
 * 
 * //OK
 * const element = (
 * 		<div>
 * 			<input />
 * 			<button>Click me</button>
 * 		</div>
 * )
 * 
 */

describe("01-2 - nested JSX", () => {

	const element = ex.nestedJSX;

	itHasProperty(ex, "nestedJSX");

	it("is a valid element", () => {
		expect(React.isValidElement(element)).toEqual(true)
	})

	it("is wrapped inside a div element", () => {
		const component = shallow(element);
		expect(component.type()).toEqual("div")
	})

	it("has a className with value 'card'", () => {
		const component = shallow(element);
		expect(component.prop("className")).toEqual("card")
	})

	it("contains two elements", () => {
		const component = shallow(element);
		expect(component.children().length).toEqual(2)
	})

	it("has a h4", () => {
		const component = shallow(element);
		expect(component.find("h4").length).toEqual(1)
	})
	it("has a h4 with text 'John Doe'", () => {
		const component = shallow(element);
		expect(component.find("h4").text()).toEqual("John Doe")
	})

	it("has a p", () => {
		const component = shallow(element);
		expect(component.find("p").length).toEqual(1)
	})
	it("has a p with text 'Age: 42'", () => {
		const component = shallow(element);
		expect(component.find("p").text()).toEqual("Age: 42")
	})
})

/**
 * 01-3 - interpolating data part 1
 * 
 * So far we only created JSX only content. You could have just created a html file.
 * Now we are going to mix Javascript inside it.
 * 
 * Below is a Javascript variable. You are going to insert that variable inside your JSX.
 * To do so, you have to wrap your JS experession inside curly braces {}. 
 * 
 * export a variable named "interpolatingPart1" that has a div element.
 * Inside that div should be the content of the variable 'interpolateTest"
 *  
 */

describe("01-3 - interpolating data part 1", () => {

	const element = ex.interpolatingPart1;
	const inject = ex.interpolateText;

	itHasProperty(ex, "interpolatingPart1");
	it("is a valid element", () => {
		expect(React.isValidElement(element)).toEqual(true)
	})

	it("is wrapped inside a div element", () => {
		const component = shallow(element);
		expect(component.type()).toEqual("div")
	})

	it("has the text from interpolateText", () => {
		const component = shallow(element);
		expect(component.text()).toEqual(inject);
	})
})

/**
 * 01-4 - interpolating data part 2
 *  
 * String and Numbers are easy because they are primitives.
 * Let's create a more complex element by trying to interpolate an object.
 * 
 * Below is a Javascript Object. You are going to print it's attributes inside a card.
 * 
 * export a variable "interpolatingPart2". The content should be the same as the exercice 2 with execptions:
 * - the h4 should print the correct user name
 * - the p should print the correct age
 */

describe("01-4 - interpolating data part 2", () => {

	const element = ex.interpolatingPart2;
	const inject = ex.interpolateUser;

	itHasProperty(ex, "interpolatingPart2");

	it("is a valid element", () => {
		expect(React.isValidElement(element)).toEqual(true)
	})

	it("is wrapped inside a div element", () => {
		const component = shallow(element);
		expect(component.type()).toEqual("div")
	})

	it("has a className with value 'card'", () => {
		const component = shallow(element);
		expect(component.prop("className")).toEqual("card")
	})

	it("contains two elements", () => {
		const component = shallow(element);
		expect(component.children().length).toEqual(2)
	})

	it("has a h4", () => {
		const component = shallow(element);
		expect(component.find("h4").length).toEqual(1)
	})
	it("has a h4 with text from 'interpolateUser.name'", () => {
		const component = shallow(element);
		expect(component.find("h4").text()).toEqual(inject.name)
	})

	it("has a p", () => {
		const component = shallow(element);
		expect(component.find("p").length).toEqual(1)
	})
	it(`has a p with text 'Age: ${inject.age}'`, () => {
		const component = shallow(element);
		expect(component.find("p").text()).toEqual(`Age: ${inject.age}`)
	})
})

/**
* 01-5 - interpolating data part 3
*  
* Now an even more complex element.
* 
* Below is an array of Object. The goal is to render an unordered list (ul) with interpolating the content of the array below.
* 
* export a variable "interpolatingPart3". It should contain an ul with the correct number of li elements.
* In order to do so, you have to use the Array.protoptype.map() method in between your ul tags.
* 
* The Array.prototype.map() takes a callback function. The callback function will be called with each element in the array a parameter.
* For each of the item in the array you must return some JSX element.
* 
* the returned JSX should be a li with two children:
* - a h4 element with text "flavor: " + the flavor
* - a p element with text: "price" + the price + "€"
* 
*/

describe("01-5 - interpolating data part 3", () => {

	const element = ex.interpolatingPart3;
	const inject = ex.interpolateArray;

	itHasProperty(ex, "interpolatingPart3");

	it("is a valid element", () => {
		expect(React.isValidElement(element)).toEqual(true)
	})

	it("is wrapped inside a ul element", () => {
		const component = shallow(element);
		expect(component.type()).toEqual("ul")
	})

	it("has the correct number of li", () => {
		const component = shallow(element);
		expect(component.find("li").length).toEqual(inject.length)
	})

	each(inject.map((_,i) =>i)).describe("li n°%i", (index) => {
		const { flavor, cost } = inject[index];
		
		it(`has a h4 element`, () => {
			const component = shallow(element);
			expect(component.find("li").at(index).find("h4").length).toEqual(1)
		})
		
		it(`has a p element`, () => {
			const component = shallow(element);
			expect(component.find("li").at(index).find("p").length).toEqual(1)
		})

		it(`has a h4 with text 'Flavor: ${flavor}'`, () => {
			const component = shallow(element);
			expect(component.find("li").at(index).find("h4").text()).toEqual(`Flavor: ${flavor}`)
		})
		
		it(`has a p with text 'Price: ${cost}€'`, () => {
			const component = shallow(element);
			expect(component.find("li").at(index).find("p").text()).toEqual(`Price: ${cost}€`)
		})
	})
})

 /**
 * 01-6 - interpolating data part 4
 *  
 * If you run the previous exercice, you might have seen this warning: 
 * Warning: Each child in an array or iterator should have a unique "key" prop.
 * Check the top-level render call using <ul>. See https://fb.me/react-warning-keys for more information.
 * in li (at 01-elements.js:85)
 * 
 * Follow the link and fix the error in the previous exercice.
 * In this context, you can assume that each flavour is unique in the array. It should then be the correct key to use.
 * 
 * Check that you don't have the warning anymore.
 */


 /**
 * 01-7 - interpolating dynamic data part 1
 *  
 * Now we are going to make some slightly more interesting elements: We are giving ourselve the possibility to reuse the elements!
 * 
 * export a function named "elementFactory". This function accepts two parameters:
 * - name: String
 * - age: Number
 * It should return the same JSX element as exercice 2 and 4 but uses the parameter of the function as data source
 */

 describe("01-7 - interpolating dynamic data part 1", () => {
	 const factory = ex.elementFactory;

	 itHasProperty(ex, "elementFactory");

	 it("is a function", () => {
		 expect(typeof factory).toEqual("function")
	 })

	 it("accepts two arguments", () => {
		 expect(factory.length).toEqual(2)
	 })

	 it("returns a React Element", () => {
		 expect(React.isValidElement(factory())).toEqual(true)
	 })


	 describe("return value", () => {
		 const name ="Person.Name";
		 const age = 123;
		 let element;

		 beforeEach(() => {
			 element = factory(name, age);
		 })

		 it("is wrapped inside a div element", () => {
			 const component = shallow(element);
			 expect(component.type()).toEqual("div")
		 })

		 it("has a className with value 'card'", () => {
			 const component = shallow(element);
			 expect(component.prop("className")).toEqual("card")
		 })

		 it("contains two elements", () => {
			 const component = shallow(element);
			 expect(component.children().length).toEqual(2)
		 })

		 it("has a h4", () => {
			 const component = shallow(element);
			 expect(component.find("h4").length).toEqual(1)
		 })
		 it("has a h4 with correct text", () => {
			 const component = shallow(element);
			 expect(component.find("h4").text()).toEqual(name)
		 })

		 it("has a p", () => {
			 const component = shallow(element);
			 expect(component.find("p").length).toEqual(1)
		 })
		 it(`has a p with correct text 'Age: ${age}'`, () => {
			 const component = shallow(element);
			 expect(component.find("p").text()).toEqual(`Age: ${age}`)
		 })
	 })
});

/**
 * 01-8 - interpolating dynamic data part 2
 *  
 * The previous example works fine but what if you want to have dozen of parameters? You would have to refactor your code every time.
 * So let's have a slightly more generic approach.
 * 
 * export a function named "UserCardComponent" that accepts a parameter named "props". This parameter will be an object.
 * 
 * You will expect the "props" parameter to have a property "name" of type String and "age" of type Number.
 * 
 * Your function will return the same JSX as exercie 7 but you will have to extract the data from the props this time.
 */

describe("01-8 - interpolating dynamic data part 2", () => {
	const Component = ex.UserCardComponent;

	itHasProperty(ex, "UserCardComponent");

	it("is a React component", () => {
		expect(React.isValidElement(Component && <Component/>)).toEqual(true)
	})

	describe("return value", () => {
		const name = "Person.Name";
		const age = 123;
		const element = Component ? <Component name={name} age={age} /> : null;

		it("is wrapped inside a div element", () => {
			const component = shallow(element);
			expect(component.type()).toEqual("div")
		})

		it("has a className with value 'card'", () => {
			const component = shallow(element);
			expect(component.prop("className")).toEqual("card")
		})

		it("contains two elements", () => {
			const component = shallow(element);
			expect(component.children().length).toEqual(2)
		})

		it("has a h4", () => {
			const component = shallow(element);
			expect(component.find("h4").length).toEqual(1)
		})
		it("has a h4 with correct text", () => {
			const component = shallow(element);
			expect(component.find("h4").text()).toEqual(name)
		})

		it("has a p", () => {
			const component = shallow(element);
			expect(component.find("p").length).toEqual(1)
		})
		it(`has a p with correct text 'Age: ${age}'`, () => {
			const component = shallow(element);
			expect(component.find("p").text()).toEqual(`Age: ${age}`)
		})
	})
});
