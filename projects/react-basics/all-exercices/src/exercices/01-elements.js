import React from "react"
/**
 * 01-1 - A first JSX element
 *
 *
 * JSX is javascript XML. It lets you write HTML-like markup in Javascript.
 * Let's give it a test.
 *
 * Export a variable named "helloWorld" and assign it a JSX element.
 * The JSX element must have the text "Hello World!" wrapped in an h1 element.
 *
 * NB: we are not creating components but assiging HTML-like markup into a Javascript variable.
 *
 */

 //Your answer here
 export const helloWorld = <h1>Hello World!</h1>;

 /**
 * 01-2 - nested JSX
 *
 * Now let's make a more complex element.
 *
 * Export a variable named "nestedJSX" and assign it a JSX element.
 * The outer element should be a div with an attribute `className` of "card".
 * Inside the div, insert a h4 with content "John Doe" and a p element with content "Age: 42"
 *
 * NB: convention for complex JSX.
 * 1. To improve readability, wrap your element in parentheses ()
 * 2. One JSX element per line
 * 3. Use indentation
 *
 * Example:
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

export const nestedJSX = (
  <div className="card">
    <h4>John Doe</h4>
    <p>
      Age: 42
    </p>
  </div>
);


/**
 * 01-3 - interpolating data part 1
 *
 * So far, we've created JSX-only content. You could have just created an html file.
 * Now we are going to mix Javascript inside it.
 *
 * Below is a Javascript variable. You are going to insert that variable inside your JSX.
 * To do so, you have to wrap your JS expression inside curly braces {}.
 *
 * Export a variable named "interpolatingPart1" that has a div element.
 * Inside that div should be the content of the variable 'interpolateTest"
 *
 */

export const interpolateText = "I am a JS string"
export const interpolatingPart1 = (
  <div>
    {interpolateText}
  </div>
);


/**
 * 01-4 - interpolating data part 2
 *
 * String and Numbers are easy because they are primitives.
 * Let's create a more complex element by trying to interpolate an object.
 *
 * Below is a Javascript Object. You are going to print its attributes inside a card.
 *
 * Export a variable "interpolatingPart2". The content should be the same as the exercice 2, with execptions:
 * - the h4 should print the correct user name
 * - the p should print the correct age
 */

export const interpolateUser = {name: "Jeanne", age: 30};

export const interpolatingPart2 = (
  <div className="card">
    <h4>{interpolateUser.name}</h4>
    <p>
      Age: {interpolateUser.age}
    </p>
  </div>
);


 /**
 * 01-5 - interpolating data part 3
 *
 * Now an even more complex element.
 *
 * Below is an array of Object. The goal is to render an unordered list (ul) with interpolating the content of the array below.
 *
 * Export a variable "interpolatingPart3". It should contain an ul with the correct number of li elements.
 * In order to do so, you have to use the Array.protoptype.map() method in between your ul tags.
 *
 * The Array.prototype.map() takes a callback function. The callback function will be called with each element in the array as parameter.
 * For each of the item in the array you must return some JSX element.
 *
 * The returned JSX should be a li with two children:
 * - an h4 element with text `Flavor: ${the flavor}`
 * - a p element with text: `Price: ${the price}€`
 *
 */
export const interpolateArray = [{flavor: "chocolate", cost: 2}, {flavor: "vanilla", cost: 1.5}, {flavor: "papaya", cost: 3}];

export const list = interpolateArray.map(
  (element, index) => {
    const content = (
      <li key={index}>
        <h4>Flavor: {element.flavor}</h4>
        <p>{`Price: ${element.cost}€`}</p>
      </li>
    );
    return content;
  }
);

export const interpolatingPart3 = (
  <ul>
    {list}
  </ul>
);

//const var1 = `string ${}`


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
 * Now we are going to make some slightly more interesting elements: we are giving ourselves the possibility to reuse the elements!
 *
 * Export a function named "elementFactory". This function accepts two parameters:
 * - name: String
 * - age: Number
 * It should return the same JSX element as exercice 2 and 4 but uses the parameter of the function as data source.
 */

export const elementFactory = (name, age) => (
    <div className="card">
    <h4>
      {name}
    </h4>
    <p>
      Age: {age}
    </p>
  </div>
);

// This would work as well!
// export const elementFactory = (name, age) => {
//   return (
//     <div className="card">
//       <h4>
//         {name}
//       </h4>
//       <p>
//         Age: {age}
//       </p>
//     </div>
//   );
// }

  /**
 * 01-8 - interpolating dynamic data part 2
 *
 * The previous example works fine, but what if you want to have dozens of parameters? You would have to refactor your code every time.
 * So let's have a slightly more generic approach.
 *
 * Export a function named "UserCardComponent" that accepts a parameter named "props". This parameter will be an object.
 *
 * You will expect the "props" parameter to have a property "name" of type String and "age" of type Number.
 *
 * Your function will return the same JSX as exercie 7 but you will have to extract the data from the props this time.
 */

export const UserCardComponent = (props) => (
  <div className="card">
  <h4>
    {props.name}
  </h4>
  <p>
    Age: {props.age}
  </p>
  </div>
);
















 /**
  * Congratulations !
  *
  * Your last exercices is actually a valid React Components!
  *
  * React components are just this: functions that returns JSX (HTML-like) templates!
  * The "props" are the data you inject into your components to make them dynamic.
  *
  * In the next exercices we will dive deeper into the usage of "props" !
  *
  */
