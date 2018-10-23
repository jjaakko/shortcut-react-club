import React from "react";
import PropTypes from "prop-types";

/**
 * 03-1 - A crashable component
 *
 * In this series of exercices, we are going to dive into some more advanced features with props.
 * To show you in context, let's start already.
 *
 * export a funcional component named "CrashableTodoList". This component will accept a prop named "todos".
 * A todo object is an object with a string "id" and a string "task"
 *
 * It will return a ul and, as content, an array of li elements.
 * Each li must have a key with the value "todo.id", and the content should be the todo.task string
 *
 */

export const CrashableTodoList = props => {
  const todos = props.todos.map(todo => <li key={todo.id}>{todo.task}</li>);
  return <ul>{todos}</ul>;
};

/**
 * 03-2 - Use crashable component
 *
 * Let see what happens when you use your component and you forget to pass the "todos" list.
 *
 * First, export a variable named "weakTodoList". Assign it an instance of CrashableTodoList but don't pass any props to it.
 *
 * Run npm start and see what happens in your browser. You should get an error.
 * Before going to the next exercice, just pass an empty array as the todos prop.
 *
 */

/**
 * 03-3 - A javascript Solution
 *
 * Read about default parameters in javascript: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Default_parameters
 *
 * export a functional component named "DefaultParametersTodoList". This function will expect props as a parameter.
 * You'll assign the following default value to the props: "{ todos: [] }"
 *
 * This component should return the same content as exercice 1
 *
 */

/**
 * 03-4 - Testing your javascript Solution
 *
 * export a variable named "jsWayTodoList" and  use your DefaultParametersTodoList component. Don't pass any props yet.
 *
 * Check your browser. Your app will still crash.
 * The reason is that React will always pass a prop object to your function.
 * If you don't pass props, you will receive an empty object ({}), and default parameters won't apply.
 *
 * If you want to use this solution with React components, you need to also use destructuring assignments.
 * Read: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
 * also read this part: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#Default_values_2
 *
 * Now go back to your DefaultParametersTodoList and make sure the beginning of your function looks like this:
 *
 * export function DefaultParametersTodoList(props) {
 *     const { todos = [] } = props;
 *
 *     return (
 *       ...
 *
 * And instead of doing "props.todos.map()", just do "todos.map()".
 * Now your app should work (and the tests should pass)
 */

/**
 * 03-5 - The React way
 *
 * The previous way works, but React has another (better)  way of setting default Props.
 * The current solution adds hard to read code into your components and you can't extract the default props.
 * (Later you'll see about advanced component composition and you'll need to have access to the default props)
 *
 * Let's not keep the suspense. The React way to define default props is to attach a "defaultProps" attribute to your component.
 *
 * Here is the template (from React Docs):
 *
 * //first create your component
 * function MyButton(props) {
 *   //...
 * }
 *
 * //then attach the defaultProps attribute to the function
 * MyButton.defaultProps = {
 *   color: "blue"
 * }
 *
 * So let's do just that.
 *
 * export a functional component named "BestTodoList". This function is the same as exercice one.
 * attach the defaultProps property with a "todos" prop that should be an empty array.
 *
 */

/**
 * 03-6 - Testing your last component
 *
 * export a variable named "bestTodoList" and use your previous component. Don't pass any props.
 * Your component should now render without crashing!
 *
 */

/**
 * 03-7 - Testing your last component again
 *
 * export a variable named "bestTodoListWithProps" and use your previous component. Pass the "todos" array as a prop.
 * React uses your props!
 */

export const todos = [
  { id: "1", task: "learn JSX" },
  { id: "2", task: "learn props" },
  { id: "3", task: "learn defaultProps" }
];

/**
 * 03-8 - prop type checking
 *
 * defaultProps are useful because they can add default behavior to your component.
 * It is also useful as a kind of documentation for the developer.
 * Just by reading the defaultProps, we can understand the expected usage of your component.
 *
 * But to add more security and more completness to your documentation, in React we can "type check" your props.
 * You can use advanced tools like flow or typescript. But we are going to stick with the built-in and JS way: propTypes.
 * Read https://reactjs.org/docs/typechecking-with-proptypes.html
 * Read https://www.npmjs.com/package/prop-types
 *
 * prop-types are already included in this project, we are going to focus on using it.
 *
 * Attach a propTypes attribute to your "BestTodoList" component and type check your props.
 * You should only accept a prop "todos" wich is a required array of objects with the following shape: {id: string, task: string}
 *
 * Read the documentation to learn how to do that!
 *
 */

/**
 * Congrats! Now you should better understand props and React Prop api!
 *
 * Just some gotchas:
 * prop-types only check and warn you if you are giving the wrong prop, it won't prevent your app from crashing.
 * But the warnings and documentation that come with it actually help when you are building larger applications.
 *
 */
