import React from "react";
import PropTypes from "prop-types";
import { shallow } from "enzyme";
import each from "jest-each";
import sinon from "sinon";
import { itHasProperty, itHasValue, itHasType } from "lib/testUtils";

import * as ex from "exercices/03-more-on-props";

/**
 * 03-1 - A crashable component
 *
 * In this series of exercice, we are going to dive into some more advanced features with props.
 * To show you in context, let's start already
 *
 * export a funcional component named "CrashableTodoList", this component will accept a prop named "todos".
 * A todo object is an object with string "id" and string "task"
 *
 * It will return an ul and as content an array of li elements.
 * Each li must have a key with value "todo.id" and content the todo.task string
 *
 */
describe("03-1 - A crashable component", () => {
  const Component = ex.CrashableTodoList;
  const todos = [
    { id: "1", task: "task1" },
    { id: "2", task: "task2" },
    { id: "3", task: "task3" }
  ];
  const element = Component ? <Component todos={todos} /> : null;

  itHasProperty(ex, "CrashableTodoList");

  it("is a valid element", () => {
    expect(React.isValidElement(element)).toEqual(true);
  });

  it("returns a ul element", () => {
    const component = shallow(element);
    expect(component.type()).toEqual("ul");
  });

  it(`it renders li elements`, () => {
    const component = shallow(element);
    expect(component.children().find("li").length).toEqual(todos.length);
  });

  each(todos.map((t, i) => [i, t])).describe("li %#", (i, todo) => {
    it("has correct content", () => {
      const component = shallow(element);
      expect(component.childAt(i).text()).toEqual(todo.task);
    });
  });

  it("crashes if no props is passed", () => {
    if (!Component) throw new Error("component not implemented");
    const call = () => {
      shallow(<Component />);
    };
    expect(call).toThrow(TypeError);
  });
});

/**
 * 03-2 - Use crashable component
 *
 * Let see what happens, when you use your component and you forget to pass the "todos" list.
 *
 * First, export a variable named "weakTodoList". assign it an instance of CrashableTodoList but don't pass it any props.
 *
 * Run npm start and see what happens in your browser. You should get an error.
 * Before going to the next exercice, just pass an empty array as the todos prop.
 *
 */
describe("03-2 - Use crashable component", () => {
  const element = ex.weakTodoList;

  itHasProperty(ex, "weakTodoList");

  it("is a valid element", () => {
    expect(React.isValidElement(element)).toEqual(true);
  });

  it("is a CrashableTodoList", () => {
    const component = shallow(<div>{element}</div>);
    expect(component.find(ex.CrashableTodoList).length).toEqual(1);
  });

  it("can go to next exercice", () => {
    if (!element) throw new Error("element not implemented");
    const call = () => {
      shallow(element);
    };
    expect(call).not.toThrow(TypeError);
  });
});

/**
 * 03-3 - A javascript Solution
 *
 * Read about default parameters in javascript: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Default_parameters
 *
 * export a functional component named "DefaultParametersTodoList", this function will expect props as a parameter.
 * You'll assign the following default value to the props: "{ todos: [] }"
 *
 * this component should return the same content as exercice 1
 *
 */

describe("03-3 - A javascript Solution", () => {
  const Component = ex.DefaultParametersTodoList;
  const todos = [
    { id: "1", task: "task1" },
    { id: "2", task: "task2" },
    { id: "3", task: "task3" }
  ];
  const element = Component ? <Component todos={todos} /> : null;

  itHasProperty(ex, "DefaultParametersTodoList");

  it("is a valid element", () => {
    expect(React.isValidElement(element)).toEqual(true);
  });

  it("returns a ul element", () => {
    const component = shallow(element);
    expect(component.type()).toEqual("ul");
  });

  it(`it renders li elements`, () => {
    const component = shallow(element);
    expect(component.children().find("li").length).toEqual(todos.length);
  });

  each(todos.map((t, i) => [i, t])).describe("li %#", (i, todo) => {
    it("has correct content", () => {
      const component = shallow(element);
      expect(component.childAt(i).text()).toEqual(todo.task);
    });
  });
});

/**
 * 03-4 - Testing your javascript Solution
 *
 * export a variable named "jsWayTodoList" and  use your DefaultParametersTodoList component. Don't pass any props yet.
 *
 * Check your browser. Your app will still crash.
 * The reason is that react will always pass a prop object to your function.
 * If you don't pass props, you will receive an empty object ({}) and default parameters won't apply.
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

describe("03-4 - Testing your javascript Solution", () => {
  const Component = ex.DefaultParametersTodoList;
  const element = ex.jsWayTodoList;

  itHasProperty(ex, "jsWayTodoList");

  it("is a valid element", () => {
    expect(React.isValidElement(element)).toEqual(true);
  });

  it("is a DefaultParametersTodoList", () => {
    const component = shallow(<div>{element}</div>);
    expect(component.find(ex.DefaultParametersTodoList).length).toEqual(1);
  });

  it("doesn't crash if no props is passed", () => {
    if (!element) throw new Error("element not implemented");
    const call = () => {
      shallow(<Component />);
    };
    expect(call).not.toThrow(TypeError);
  });

  it("renders a ul if no props is passed", () => {
    if (!element) throw new Error("element not implemented");
    const component = shallow(<Component />);
    expect(component.type()).toEqual("ul");
  });

  it("doesn't render any li if no props is passed", () => {
    if (!element) throw new Error("element not implemented");
    const component = shallow(<Component />);
    expect(component.find("li").length).toEqual(0);
  });
});

/**
 * 03-5 - The React way
 *
 * The previous way work but React has another (better way) to set default Props.
 * The current solution adds hard to read code into your components and you can't extract the default props.
 * (Later you'll see about advanced component composition and You'll need to have access to the default props)
 *
 * Let's not keep the suspens, React way do define default props is to attach a "defaultProps" attribute to your component.
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

describe("03-5 - The React way", () => {
  const Component = ex.BestTodoList;
  const todos = [
    { id: "1", task: "task1" },
    { id: "2", task: "task2" },
    { id: "3", task: "task3" }
  ];
  const element = Component ? <Component todos={todos} /> : null;

  itHasProperty(ex, "BestTodoList");

  it("is a valid element", () => {
    expect(React.isValidElement(element)).toEqual(true);
  });

  it("returns a ul element", () => {
    const component = shallow(element);
    expect(component.type()).toEqual("ul");
  });

  it(`it renders li elements`, () => {
    const component = shallow(element);
    expect(component.children().find("li").length).toEqual(todos.length);
  });

  each(todos.map((t, i) => [i, t])).describe("li %#", (i, todo) => {
    it("has correct content", () => {
      const component = shallow(element);
      expect(component.childAt(i).text()).toEqual(todo.task);
    });
  });

  describe("defaultProps", () => {
    it("is attached to component", () => {
      expect(typeof Component.defaultProps).toBe("object");
    });
    it("has key todos", () => {
      expect(Component.defaultProps).toHaveProperty("todos");
    });
    it("has key todos with value []", () => {
      expect(Component.defaultProps).toHaveProperty("todos", []);
    });
  });
});

/**
 * 03-6 - Testing your last component
 *
 * export a variable named "bestTodoList" and use your previous component. Don't pass any props.
 * Your component should now render without crashing!
 *
 */
describe("03-6 - Testing your last component", () => {
  const Component = ex.BestTodoList;
  const element = ex.bestTodoList;

  itHasProperty(ex, "bestTodoList");

  it("is a valid element", () => {
    expect(React.isValidElement(element)).toEqual(true);
  });

  it("is a BestTodoList", () => {
    const component = shallow(<div>{element}</div>);
    expect(component.find(ex.BestTodoList).length).toEqual(1);
  });

  it("doesn't crash if no props is passed", () => {
    if (!element) throw new Error("element not implemented");
    const call = () => {
      shallow(<Component />);
    };
    expect(call).not.toThrow(TypeError);
  });

  it("renders a ul if no props is passed", () => {
    if (!element) throw new Error("element not implemented");
    const component = shallow(<Component />);
    expect(component.type()).toEqual("ul");
  });

  it("doesn't render any li if no props is passed", () => {
    if (!element) throw new Error("element not implemented");
    const component = shallow(<Component />);
    expect(component.find("li").length).toEqual(0);
  });
});

/**
 * 03-7 - Testing your last component again
 *
 * export a variable named "bestTodoListWithProps" and use your previous component. pass the "todos" array as a prop.
 * React uses your props!
 */
describe("03-7 - Testing your last component again", () => {
  const element = ex.bestTodoListWithProps;

  itHasProperty(ex, "bestTodoListWithProps");

  it("is a valid element", () => {
    expect(React.isValidElement(element)).toEqual(true);
  });

  it("is a BestTodoList", () => {
    const component = shallow(<div>{element}</div>);
    expect(component.find(ex.BestTodoList).length).toEqual(1);
  });

  it("doesn't crash if no props is passed", () => {
    if (!element) throw new Error("element not implemented");
    const call = () => {
      shallow(element);
    };
    expect(call).not.toThrow(TypeError);
  });

  each(ex.todos.map((t, i) => [i, t])).describe("li %#", (i, todo) => {
    it("has correct content", () => {
      const component = shallow(element);
      expect(component.childAt(i).text()).toEqual(todo.task);
    });
  });
});

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
 * attach a propTypes attribute to your "BestTodoList" component and type check your props.
 * You should only accept a prop "todos" with is an required array of object with shape {id: string, task: string}
 *
 * Read the documentation to learn how to do that!
 *
 */

describe("03-8 - prop type checking", () => {
  const Component = ex.BestTodoList;

  it("is as propTypes attached to component", () => {
    expect(typeof Component.propTypes).toBe("object");
  });
  it("has key todos", () => {
    expect(Component.propTypes).toHaveProperty("todos");
  });

  let stub;
  beforeEach(() => {
    stub = sinon.stub(console, "error");
  });
  afterEach(() => {
    console.error.restore();
  });

  it("fails if todos is not an array", () => {
    expect(() => shallow(<Component todos={"string"} />)).toThrow();
    expect(stub.calledOnce).toEqual(true);
    expect(
      stub.calledWithMatch(
        "Warning: Failed prop type: Invalid prop `todos` of type `string` supplied to `BestTodoList`, expected an array."
      )
    ).toEqual(true);
  });
  it("fails if todos is not an array of object", () => {
    expect(() => shallow(<Component todos={["string"]} />)).not.toThrow();
    expect(stub.called).toEqual(true);

    expect(stub.args[0][0]).toMatch(
      "Warning: Failed prop type: Invalid prop `todos[0]` of type `string` supplied to `BestTodoList`, expected `object`."
    );
  });
  it("fails if todos is not an array of object with key 'id'", () => {
    expect(() => shallow(<Component todos={[{}]} />)).not.toThrow();
    expect(stub.called).toEqual(true);

    expect(stub.args[0][0]).toMatch(
      "Warning: Failed prop type: The prop `todos[0].id` is marked as required in `BestTodoList`, but its value is `undefined`."
    );
  });

  it("fails if todos is not an array of object with 'id' of type string", () => {
    expect(() => shallow(<Component todos={[{ id: 1 }]} />)).not.toThrow();
    expect(stub.called).toEqual(true);

    expect(stub.args[0][0]).toMatch(
      "Warning: Failed prop type: Invalid prop `todos[0].id` of type `number` supplied to `BestTodoList`, expected `string`."
    );
  });
  it("fails if todos is not an array of object with key 'task'", () => {
    expect(() => shallow(<Component todos={[{ id: "1" }]} />)).not.toThrow();
    expect(stub.called).toEqual(true);

    expect(stub.args[0][0]).toMatch(
      "Warning: Failed prop type: The prop `todos[0].task` is marked as required in `BestTodoList`, but its value is `undefined`."
    );
  });

  it("fails if todos is not an array of object with 'task' of type string", () => {
    expect(() =>
      shallow(<Component todos={[{ id: "1", task: 1 }]} />)
    ).not.toThrow();
    expect(stub.called).toEqual(true);

    expect(stub.args[0][0]).toMatch(
      "Warning: Failed prop type: Invalid prop `todos[0].task` of type `number`supplied to `BestTodoList`, expected `string`."
    );
  });
});
