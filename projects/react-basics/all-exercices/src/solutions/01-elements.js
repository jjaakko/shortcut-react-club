import React from "react";
/**
 * 01-1 - A first JSX element
 */

export const helloWorld = <h1>Hello World!</h1>;

//Your answer here

/**
 * 01-2 - nested JSX
 */

/**
 * Notes:
 * - make sure you use () and the correct indentation to improve readability
 * - "className" is the JSX equivalent of "class" if HTML. It's used to add styles and meaning to your markup
 */
export const nestedJSX = (
	<div className="card">
		<h4>John Doe</h4>
		<p>Age: 42</p>
	</div>
);

/**
 * 01-3 - interpolating data part 1
 */

export const interpolateText = "I am a JS string";

/**
 * Notes:
 * - you can evaluate any expression between {} but this expression must return a primitive value.
 * - null, undefined, false and "" will be ignored by React (you will have empty data)
 * - an exception is made with Arrays, see exercice 01-5
 */
export const interpolatingPart1 = <div>{interpolateText}</div>;

/**
 * 01-4 - interpolating data part 2
 */

export const interpolateUser = { name: "Jeanne", age: 30 };

/**
 * Notes:
 * - Here we store our data in an object instead of multiple variables. But usage is the same
 * - Be careful, if you try to interpolate an object, you'll get an error
 *
 */
export const interpolatingPart2 = (
	<div className="card">
		<h4>{interpolateUser.name}</h4>
		<p>Age: {interpolateUser.age}</p>
	</div>
);

/**
 * 01-5 - interpolating data part 3
 */
export const interpolateArray = [
	{ flavor: "chocolate", cost: 2 },
	{ flavor: "vanilla", cost: 1.5 },
	{ flavor: "papaya", cost: 3 },
];

/**
 * Notes:
 * - React can interpolate Arrays. If you pass an Array, React will iterate over it automatically
 * - Arrays must Return JSX markup or primitives (or arrays that again return JSX, primitivies or arrays...)
 * - Below 4 versions of the same exercice. All of them work fine.
 * - First version uses arrow function and function scope '{}' and return statement
 * - Second version uses a classic function
 * - Third version uses arrow function with the short return syntax (() => 'direct return value')
 * - Fourth version stores the data in an array ouside of the ul and the interpolate the list.
 *
 * - First and Second version use string templating `I'm a string template ${1+1}` -> "I'm a string template 2"
 * - String template are fine but prefer using it for props: (ex: className={`btn ${color}`})
 *
 * - Thrid and Fourth version use JSX interpolating method. Prefered in this usecase.
 * - Fourth version is less recommended, since it makes it harder to read and understand the code.
 * - Prefer nesting like previous version or if needed, create another component (will see that later)
 *
 * - the key attribute in li must be something unique within the array.
 * - uniqueness depends on your dataset. In the example, "flavor" is unique.
 * - in a todo app, you'll need to use another key (createdAd or generated id).
 * - using array's position index as key is not recommended because if you sort the array, the content changes but not the index.
 *
 */

export const interpolatingPart3 = (
	<ul>
		{interpolateArray.map(item => {
			return (
				<li key={item.flavor}>
					<h4>{`Flavor: ${item.flavor}`}</h4>
					<p>{`Price: ${item.cost}€`}</p>
				</li>
			);
		})}
	</ul>
);

export const interpolatingPart3_V2 = (
	<ul>
		{interpolateArray.map(function(item) {
			return (
				<li key={item.flavor}>
					<h4>{`Flavor: ${item.flavor}`}</h4>
					<p>{`Price: ${item.cost}€`}</p>
				</li>
			);
		})}
	</ul>
);

export const interpolatingPart3_V3 = (
	<ul>
		{interpolateArray.map(value => (
			<li key={value.flavor}>
				<h4>Flavor: {value.flavor}</h4>
				<p>Price: {value.cost}€</p>
			</li>
		))}
	</ul>
);

const list = interpolateArray.map((value, index) => (
	<li key={value.flavor}>
		<h4>Flavor: {value.flavor}</h4>
		<p>Price: {value.cost}€</p>
	</li>
));

export const interpolatingPart3_V4 = <ul>{list}</ul>;

/**
 * 01-6 - interpolating data part 4
 */

/**
 * 01-7 - interpolating dynamic data part 1
 */

/**
 * Notes:
 * - We still use interpolating but we use a function to avoid code duplication (let's say you have a list of user that you want to render)
 * - This example is a naive way of doing element factories (function that only return JSX elements)
 */

// example usage could be:
export const exampleUsage = (
	<div>
		<h2>Users</h2>
		<ul>
			<li>{elementFactory("John Doe", 42)}</li>
			<li>{elementFactory("Marie Jeanne", 30)}</li>
		</ul>
	</div>
);

/**
 * Notes (cont.):
 *
 * - In this example usage, with this implementation can be a bit naive
 * - If you where tasked to update your elementFactory and add a nex parameter, you'll have to change it everywhere you use it
 * - If you where to create other element factories (for other purpose), you'll have to know what each of them take as parameter and in what order
 *
 * - In the next erxercice, we wil see how to make the same function in a React way and see how usage also change.
 *
 */

export function elementFactory(name, age) {
	return (
		<div className="card">
			<h4>{name}</h4>
			<p>Age: {age}</p>
		</div>
	);
}

/**
 * 01-8 - interpolating dynamic data part 2
 */

/**
 * Notes:
 * - our function is now called "UserCardComponent"
 * - it starts with a capital letter (Component is a visual aid to demonstrate that it is a React Component)
 * - we now use an object as parameter.
 * - the this parameter is called "props" and when using the component, it's up to the user to pass the correct props values (name and age here)
 * - now if you create a 100 components, each will have the same signature (all return a JSX markup and takes a props as argument)
 * - having components share the same signature makes it easy to use and combine them.
 * - We will have more exercices about components in the next exercices.
 *
 * IMPORTANT NOTE:
 * - when creating functional components, use "function ComponentName{}" syntax
 * - DO NOT use arrow function syntax to create components.
 * - arrow function are made to be "anonymous" but React refers to the component name for debuging.
 * - if you use arrow function, you may have the issue where the debugger will tell you "error in component `<anonymous>`"
 * - to avoid this issue, just use named function like below
 */

export function UserCardComponent(props) {
	return (
		<div className="card">
			<h4>{props.name}</h4>
			<p>Age: {props.age}</p>
		</div>
	);
}

export const exampleUsage2 = (
	<div>
		<h2>User List</h2>
		<ul>
			<li>
				<UserCardComponent age={42} name={"John Doe"} />
			</li>
			<li>
				<UserCardComponent age={30} name={"Marie Jeanne"} />
			</li>
		</ul>
	</div>
);
