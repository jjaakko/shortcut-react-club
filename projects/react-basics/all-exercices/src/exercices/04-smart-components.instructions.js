/**
 * 04-1 - Your first smart component
 *
 * Let's get started, as you now know, functional (dumb) components can't be used to build a Counter component.
 * So it won't be much use to create your next Facebook App. So let's learn a new kind of components that are "smart".
 *
 * In React (using es6), when we want to create smart components we create JS classes.
 * Read all about classes here: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes
 * or here: https://dev.to/rainerhahnekamp/javascript-and-object-oriented-programming-55k6
 *
 * In React, our classes always start the same:
 *
 * class MyComponentName extends Component {
 *
 *   render() {
 *    const props = this.props;
 *
 *     return (
 *      //your JSX here
 *     )
 *   }
 * }
 *
 * 1.Make sure to import React, { Component } from "react"
 * 2. MyComponentName is the name of your component
 * 3. render(){} is a method of your class and is required. It is the most important piece of your component and returns JSX element.
 *
 * Now that you now everything about class components, it's your turn to code!
 *
 * Export a class component named "SmartCounter" that extends Component.
 *
 * Inside your render method, return a div. That div contains a button with text "click me" and a p (empty for now)
 *
 *
 *
 *
 *
 *
 *
 * 04-2 - adding memory to your state
 *
 * Instead of using the props.count, we are going to store the "count" inside the class component.
 *
 * Inside your class and before your render method. Create a "constructor" method. This methods expects a "props" argument.
 * Inside your constructor method, fist thing to do is to forward the props to React.Component, using the "super" keyword.
 * constructor(props) {
 *  super(props);
 *  // rest of your code
 * }
 *
 * After calling super, you are going to attach the property "state" to the component.
 * You can access your component with the keyword "this".
 *
 * Your state should be an object with one key: [number] 'count' and defaulting to 0
 *
 * Now inside your render method, assign the value of "this.state.count" to your 'p' component.
 *
 *
 *
 *
 *
 *
 *
 *
 * 04-3 viewing your component.
 *
 * Let's pause there and see what your component renders.
 *
 * export a variable named "myCounter" and assign it an instance of SmartCounter.
 * You should see on the browser your smartCounter and it's identical to badCounter1 and badCounter2
 *
 *
 *
 *
 *
 *
 *
 * 04-4 updating your state
 *
 * If we did all that, it was to fix a problem: "How can I change the count?"
 * So let's do just that.
 *
 * return to your SmartCounter component and create a method named "handleClick" between your constructor and render method.
 *
 * The handleClick method will be called with one argument but we don't need it, so let's the parameters empty.
 * add a prop "onClick" to the button and assign it the "handleClick" method (onClick={this.handleclick})
 *
 * Inside this function, we are going to update the state. First I'll show you how NOT to do it.
 *
 * Bad way of doing it:
 *  inside the handleClick, do something like : "this.state.count += 1". Save and try it in your browser...
 *  ...And it's crashing (at least it should)!
 *
 *
 * if it's not crashing, make sure your handleClick is defined like this: "handleClick() {}"
 *
 * if it's crashing... It's not because of your code but because of how es6 class works.
 * The error: "this is not defined". That's because the "this" keyword is not forwarded to the button's onClick prop.
 *
 * Two solutions for that: either using bind or using arrow function.
 *
 * The bind way: in your constructor method, do this "this.handleClick = this.handleClick.bind(this)"
 *
 * the arrow function way: replace "handleClick(){}" by "handleClick = () => {}"
 * This is the other way to fix the binding issues.
 *
 * This exercice is long enough, please ask on slack or github for more info.
 *
 * Now, that you fix the binding issue, try again...
 * ...And it's not working !
 *
 * That's because of state should never be modified directly.
 * It won't crash the same way as mutating props.count in BadCounter1 but it will behave the same as BadCounter2.
 * Try to add a 'console.log("count", this.state.count)' just after 'this.state.count += 1'
 * You'll see that the counter is being updated but your component won't re-render and update the DOM.
 *
 *
 *
 *
 *
 *
 *
 * 04-5 the React way to mutate state
 *
 * The current code doesn't work because React doesn't know that the state changed.
 * Because React only updates (calls render again) when the state or props changes, you need to do it the right way.
 *
 * The right way is to never mutate state or props yourself.
 * To update the state, you need to use a method provided by Component: "this.setState".
 *
 * We will go easy and just use the basic form of setState. In the basic form, setState expects a new object.
 * inside this object you will provide the new values for the attributes that changed in your state.
 * For now we only have "count" but if you had more, React would be smart enough to keep the unchanged ones and change only those who changed.
 *
 * example: this.setState({
 * count: this.state.count + 1
 * })
 *
 * note how we never change this.state.count but use it to create a new state object!
 *
 * In your handleClick method, replace "this.state.count +=1" to "this.setState(...)"
 * Remove the console.log line and try it in your browser...
 * ...And TADAAA! Finally working!
 *
 */
