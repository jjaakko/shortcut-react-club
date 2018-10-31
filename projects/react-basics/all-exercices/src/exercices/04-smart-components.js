import React, { Component } from "react";

/**
 * 04-0 - Intro to smart components
 *
 * Until now we created "functional components" also known as "stateless components" or "dump components"
 *
 * Those components are called like this because they can only return JSX based on the props that we give them.
 * In this section, we are going to learn what are "smart components" (or "stateful components")
 *
 * Let's take the example of a Counter component. A counter is a component that renders a button and a "count" (number).
 * When you click on the button, you want your component to be "smart" and increment the "count".
 *
 * Unfortunately, our functional components are dumb, they receive read-only props and can't do much about it.
 * Take the example of the two components below, "BadCounter1" and "BadCounter2":
 *
 * - BadCounter1 receive a count as prop, and when we click on a button, we try to mutate the props.count
 *   I'll let you try that on the browser (npm start) and see what happens. (refresh page or click on the 'x' when done)
 *
 * - Let's try with BadCounter2, we decice to go against React methodology and use the count directly
 *  the count act as a global variable, let's also try that on the browser....
 *  You should see that the component doesn't work. It as nothing to do with the code but with React.
 *  (You can check your browser's console, you'll see that the count is updating)
 *  React will only update the DOM if the props (or 'state', comming soon) changes. But here something outside React changed, hence no update.
 *
 *  So, you can't update the props directly, and passing data outside of props, will not work... What should we do?
 *  Let's see that on the next exercices !
 *
 * NB: note on the "onClick" prop:
 *   all builtin components (starting with lowercase like 'div', 'input', 'button', ....) accept a lot of props.
 *   You already seen the "className" prop (same as class in html), now you have discovered the "onClick" (same as "onclick" in html)
 *   onClick expects a function and whenever the button is clicked, the function will be called. (think addEventListener)
 *   In these examples we try to mutate (change the value of) our count.
 *   We are going to use eventListeners from now on, for more info read: https://reactjs.org/docs/handling-events.html
 *
 */

let count = 0;
export function BadCounter1(props) {
    function updateCount() {
        ++props.count;
    }

    return (
        <div>
            <button onClick={updateCount}>Click me</button>
            <p>{props.count}</p>
        </div>
    );
}

export function BadCounter2() {
    function updateCount() {
        ++count;
        console.log("new count:", count);
    }

    return (
        <div>
            <button onClick={updateCount}>Click me</button>
            <p>{count}</p>
        </div>
    );
}

export const badCounter1 = <BadCounter1 count={count} />;
export const badCounter2 = <BadCounter2 />;

/**
 * 04-1 to 04-5
 *  Read the instructions in the file 04-smart-components.instructions.js
 *  Write your solution in this file, below!
 */

/**
 * 04-6 Conclusion(ish)
 *
 * I'm sorry for the long exercice but once you understand state and how to update it, it will become super easy to use.
 * The exercices are going faster and faster, this is also to encourage you to ask questions during the sessions and on slack.
 * Otherwise I would have to write a thousand line of instruction and dozens of exercices, which would be complicated to do.
 *
 * Now you have made your first smart component and seen a bit of event handling in React.
 * From now on we will be using both functional and class components.
 *
 * We will use functional components when the component doesn't need to be "smart" (store and mutate state).
 * We will use class components to store the state and "command" the "dumb" components.
 *
 * Before we go to the next step,
 * In order to demonstrate why we need to store the state inside the component (and not outside like in BadCounter2),
 *
 * You're going to export a variabled named "mySecondCounter" and assign it another instance of "SmartCounter".
 * Now go to your browser and click on either one or the other counters.
 *
 * You'll see that they are independant, each component owns its own state and each component manages its own state.
 * This is part of what makes React powerful, being able to reuse and compose stateless and statefull components alike.
 * Another part is that React will only update the DOM if the props or the state changed,
 * and because you'll never mutate (change) either of them yourself (always use setState), React will be able to perfom it's task efficiently!
 */
