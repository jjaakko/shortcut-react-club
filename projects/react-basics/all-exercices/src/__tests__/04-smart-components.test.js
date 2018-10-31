import React from "react";
import PropTypes from "prop-types";
import { shallow } from "enzyme";
import each from "jest-each";
import sinon from "sinon";
import { itHasProperty, itHasValue, itHasType } from "lib/testUtils";

import * as ex from "exercices/04-smart-components";

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
 */

describe("04-1 - Your first smart component", () => {
    const Component = ex.SmartCounter;
    const element = Component ? <Component /> : null;

    itHasProperty(ex, "SmartCounter");

    it("is a valid element", () => {
        expect(React.isValidElement(element)).toEqual(true);
    });

    it("is a class component", () => {
        const component = shallow(element);

        expect(component.instance()).not.toBe(null);
    });

    it("has a render method", () => {
        const component = shallow(element);

        expect(component.instance().render).not.toBe(undefined);
    });

    it("returns a div element", () => {
        const component = shallow(element);
        expect(component.type()).toEqual("div");
    });

    describe("div element", () => {
        it("has two children", () => {
            const component = shallow(element);
            expect(component.children().length).toEqual(2);
        });
        it("contains a button", () => {
            const component = shallow(element);
            expect(component.find("button").length).toEqual(1);
        });
        it("has button as first child", () => {
            const component = shallow(element);
            expect(component.childAt(0).type()).toEqual("button");
        });
        it("has button with text 'Click me'", () => {
            const component = shallow(element);
            expect(component.childAt(0).text()).toEqual("Click me");
        });
        it("contains a p", () => {
            const component = shallow(element);
            expect(component.find("p").length).toEqual(1);
        });
    });
});

/**
 * 04-2 adding memory to your state
 *
 * Instead of using the props.count, we are going to store the "count" inside the class component.
 *
 * Inside your class and before your render method.Create a "constructor" method.This methods expects a "props" argument.
 * Inside your constructor method, fist thing to do is to forward the props to React.Component, using the "super" keyword.
 * constructor(props) {
 * super(props);
 *  // rest of your code
 * }
 *
 * After calling super, you are going to attach the property "state" to the component.
 * You can access your component with the keyword "this".
 *
 * Your state should be an object with one key: [number] 'count' and defaulting to 0
 *
 * Now inside your render method, assign the value of "this.state.count" to your 'p' component.
 */
describe("04-2 adding memory to your state", () => {
    const Component = ex.SmartCounter;
    const element = Component ? <Component /> : null;

    itHasProperty(ex, "SmartCounter");

    it("has a state attribute", () => {
        const component = shallow(element);

        expect(component.state()).not.toBe(undefined);
    });

    describe("state", () => {
        it("has a count property", () => {
            const component = shallow(element);

            expect(component.state("count")).not.toBe(undefined);
        });
        it("has a count with value 0", () => {
            const component = shallow(element);

            expect(component.state("count")).toBe(0);
        });
    });

    describe("p element", () => {
        it("contains '0' by default", () => {
            const component = shallow(element);
            expect(component.find("p").text()).toEqual(
                String(component.state("count"))
            );
        });
        each([-5, 1, 2, 3, 10, 15, 42, 100]).it(
            "contains the correct value when this.state.count is %d ",
            i => {
                const component = shallow(element);
                component.setState({ count: i });
                expect(component.find("p").text()).toEqual(String(i));
            }
        );
    });
});

/**
 *
 * 04-3 viewing your component.
 *
 * Let's pause there and see what your component renders.
 *
 * export a variable named "myCounter" and assign it an instance of SmartCounter.
 * You should see on the browser your smartCounter and it's identical to badCounter1 and badCounter2
 *
 */
describe("04-3 viewing your component", () => {
    const element = ex.myCounter;

    itHasProperty(ex, "myCounter");

    it("is an instance of SmartCounter", () => {
        const component = shallow(<div>{element}</div>);

        expect(component.find(ex.SmartCounter).length).toEqual(1);
    });
});

/**
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
 * The error: "this is not defined". That's because the this keyword is not forwarded to your handleClick.
 *
 * Two solutions for that: either using bind or using arrow function.
 *
 * The bind way: in your constructor method, do this "this.handleClick = this.handleClick.bind(this)"
 * This works because constructor method (and also render method) are already bound with the this keyword.
 *
 * the arrow function way: replace "handleClick(){}" by "handleClick = () => {}"
 * This is the other way to fix the binding issues.
 *
 * This exercices are big enough, pleas ask on slack or github for more info.
 *
 * Now, that you fix the binding issue, try again...
 * ...And it's not working !
 *
 * That's because of state should never be modified directly.
 * It won't crash the same way as mutating props.count in BadCounter1 but it will behave the same as BadCounter2.
 * Try to add a 'console.log("count", this.state.count)' just after 'this.state.count += 1'
 * You'll see that the counter is being updated but your component won't re-render and update the DOM.
 *
 */

describe("04-4 updating your state", () => {
    const Component = ex.SmartCounter;
    const element = Component ? <Component /> : null;
    let component;

    beforeEach(() => {
        component = shallow(element);
    });

    it("has 'handleClick' method", () => {
        expect(component.instance().handleClick).not.toBe(undefined);
    });

    describe("button", () => {
        it("has a prop onClick", () => {
            expect(component.find("button").prop("onClick")).toBeDefined();
        });
        it("handleClick is assigned to onClick", () => {
            expect(component.find("button").prop("onClick")).toBe(
                component.instance().handleClick
            );
        });
    });
    describe("handleClick", () => {
        it("expect 0 arguments", () => {
            expect(component.instance().handleClick.length).toEqual(0);
        });
        it("forwards the 'this' (using bind or arrow function)", () => {
            expect(() => {
                component.find("button").simulate("click");
            }).not.toThrow();
        });

        it("is mutating the state", () => {
            component.find("button").simulate("click");
            component.update();
            expect(component.state("count")).toEqual(1);
        });
    });
});

/**
 * 04-5 the React way to mutate state
 *
 * The current code doesn't work because React doesn't know that the state changed.
 * Because React only updare (calls render again) when the state or props changes, you need to do it the right way.
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
 * This will tell react to change the value of this.count and (if the count is different from the previous sate) call render again!
 *
 * note how we never change this.state.count but use it to create a new state object!
 *
 * In your handleClick method, replace "this.state.count +=1" to "this.setState(...)"
 * Remove the console.log line and try it in your browser...
 * ...And TADAAA! Finally working!
 *
 */
describe("04-5 the React way to mutate state", () => {
    const Component = ex.SmartCounter;
    const element = Component ? <Component /> : null;
    let component;

    beforeEach(() => {
        component = shallow(element);
    });

    it("has 'handleClick' method", () => {
        expect(component.instance().handleClick).not.toBe(undefined);
    });

    describe("handleClick", () => {
        it("is mutating the state", () => {
            component.find("button").simulate("click");
            component.update();
            expect(component.state("count")).toEqual(1);
        });
    });

    describe("setState", () => {
        let stub;
        let component;
        beforeEach(() => {
            stub = sinon.stub(ex.SmartCounter.prototype, "setState");
            component = shallow(<ex.SmartCounter />);
        });
        afterEach(() => {
            stub.restore();
        });

        it("is called", () => {
            component.find("button").simulate("click");
            component.update();
            expect(stub.called).toBe(true);
        });

        it("is called with object containing count 1", () => {
            component.find("button").simulate("click");
            component.update();
            expect(stub.calledWith({ count: 1 })).toBe(true);
        });
    });
});

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

describe("04-6 Conclusion(ish)", () => {
    const element1 = ex.myCounter;
    const element2 = ex.mySecondCounter;
    let comp1;
    let comp2;

    beforeEach(() => {
        comp1 = shallow(element1);
        comp2 = shallow(element2);
    });

    itHasProperty(ex, "myCounter");
    itHasProperty(ex, "mySecondCounter");

    it("is an instance of SmartCounter", () => {
        const component = shallow(<div>{element2}</div>);

        expect(component.find(ex.SmartCounter).length).toEqual(1);
    });

    describe("myCounter", () => {
        it("mutates on click", () => {
            comp1.find("button").simulate("click");
            comp1.update();
            comp2.update();
            expect(comp1.state("count")).toEqual(1);
        });
        it("doesn't mutates mySecondCounter on click", () => {
            comp1.find("button").simulate("click");
            comp1.update();
            comp2.update();
            expect(comp2.state("count")).toEqual(0);
        });
    });

    describe("mySecondCounter", () => {
        it("mutates on click", () => {
            comp2.find("button").simulate("click");
            comp2.update();
            comp1.update();
            expect(comp2.state("count")).toEqual(1);
        });
        it("doesn't mutates myCounter on click", () => {
            comp2.find("button").simulate("click");
            comp2.update();
            comp1.update();
            expect(comp1.state("count")).toEqual(0);
        });
    });
});
