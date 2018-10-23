import React from "react";
import "exercices/02-social-media.css";

/**
 * 02-1 - Mini Project Into Components
 *
 * In this series of exercices, we will build a small Social Media posting platform.
 * We will reuse what we learned from the previous exercice and add some small new things.
 *
 * First, export a function named "Author". This functional Component accepts a props object as parameter.
 *
 * This functional component will expect to receive the following properties:
 * - [String] name: the name of the author
 * - [String] picture: The URL of the author's profile picture
 * - [String] bio: a short biography
 *
 * Your function should return a JSX div with className "so-me author"
 * Inside this div you will have 4 children:
 * - img with className "so-me user-img", img as picture prop and alt as author's name
 * - h4 with the author's name as content
 * - p with className "so-me bio" and the bio as content
 * - a with className "so-me profile-link", href "#/profile" and "View Profile" as content
 *
 */

export const Author = props => (
  <div className="so-me author">
    <img className="so-me user-img" src={props.picture} alt={props.name} />
    <h4>{props.name}</h4>
    <p className="so-me bio">{props.bio}</p>
    <a className="so-me profile-link" href="#/profile">
      View Profile
    </a>
  </div>
);

/**
 * 02-2 - Using the Author component
 *
 *
 * Now that we have our first component we are going to create a React Element from it.
 *
 * But first, some notes about the previous exercice:
 *
 * If you know about constructor function and JS conventions, you should have seen some similarities with the Author function.
 * In js, with a constructor function, you would have used the "new" keyword to create a new instance.
 * In React, when we want to use a functional component, we use JSX and we do it Like so: <Author />
 * Because your components expect props, you'll need to pass them: <Author name="John Doe" bio="Lorem Ipsum" picture="htpps://..." />
 *
 * Now that you know everything, export a variable named "stephenKingCard" and assign it an instance of an Author using the JSX syntax.
 * You will use the data from "stephenKing" object as prop values (use interpolation).
 *
 * Conventions:
 *  If you want to improve readibility, sometimes you want to display one prop per line (expecially when there is more than 3 props)
 * To do so, here is the template:
 *
 * const element = (
 * 	<MyComponent
 *     propA={someLongVariableThatNeedsALotOfSpace}
 *     propB={valueB}
 *     propC={() => {return "some inline function"}}
 *     propD={....}
 *  />
 * )
 *
 */

export const stephenKing = {
  name: "Stephen King",
  picture: "http://www.famousbirthdays.com/headshots/stephen-king-1.jpg",
  bio:
    "Stephen Edwin King is an American author of horror, supernatural fiction,..."
};

export const stephenKingCard = (
  <Author
    name={stephenKing.name}
    bio={stephenKing.bio}
    picture={stephenKing.picture}
  />
);

/**
 * 02-3 - a Post component
 *
 * export a function named "Post". Post is a functional Component, so it's expecting a "props" argument.
 *
 * You will expect the following props:
 * - [Object] author: an object with the keys: "name", "bio" and "picture"
 * - [String] title: the title of the Post
 * - [String] postedOn: the date of the post
 * - [Boolean] liked: if the post has been liked or not
 * - [React.Children] children: the inner elements passed to the component.
 *
 * Your function will return a div with className "so-me post".
 * The div will contain the following children:
 *  - Author: your Author component from exercice 1 with the props from the props.author object
 *  - div with className "so-me content" and following children:
 *    - h3 with className "so-me title" and the following children:
 *      - the title of the post
 *      - a (<a>) with href "#/like", className "so-me thumb" and a i (<i>) as children with className:
 *        - "fas fa-thumbs-up" if the props.liked is true
 *        - "far fa-thumbs-up" if the props.liked is false
 *    - div with className "so-me text" and as content your props.children
 *    - p with className "so-me metadata" and content "Posted on " + your postedOn prop
 *
 *
 * Help with the <i> element:
 *  With {} you can interpolate most Javascript expressions.
 *  You can't evaluate an if else statement but you can evaluate a ternary operator
 *  "like ? <truthy statement> : <falsy statement>". I'll let you google "Javascript Ternary Operator"
 *
 * Help with the props.children:
 *  Props are the parameters you pass to your component. When doing something like <MyButton>Click Me</MyButton>,
 *  the text "Click Me" is the inner element of MyButton, which makes it a parameter of MyButton, therefore a props of MyButton.
 *  In React, any inner attribute will be stored into your props as "children". It's up to you to pass it down or skip it.
 *  Check the react documentation about children for more details.
 */

export const Post = props => (
  <div className="so-me post">
    <Author
      name={props.author.name}
      bio={props.author.bio}
      picture={props.author.picture}
    />
    <div className="so-me content">
      <h3 className="so-me title">
        {props.title}
        <a className="so-me thumb" href="#/like">
          {props.liked ? (
            <i className="fas fa-thumbs-up" />
          ) : (
            <i className="far fa-thumbs-up" />
          )}
        </a>
      </h3>
      <div className="so-me text">{props.children}</div>
      <p className="so-me metadata">Posted on {props.postedOn}</p>
    </div>
  </div>
);

/**
 * 02-4 - Using your Post component
 *
 * Now that your component is created, let's use it:
 *
 * export a variable named stephenKingPost and assign it an instance of your Post component.
 * Your component will have the following props:
 *  - title: "Trump's Conference"
 *  - postedOn: "26/09/18"
 *  - author: the stephenKing object from exercice 2
 *
 * Your component will have as children (the inner content):
 *  - p element with the content "Trump’s news conference is like listening to a nut calling in to a radio sports talk show."
 *
 * Source: https://twitter.com/StephenKing/status/1045064042816180224
 */
export const stephenKingPost = (
  <Post title="Trump's Conference" postedOn="26/09/18" author={stephenKing}>
    <p>
      Trump’s news conference is like listening to a nut calling in to a radio
      sports talk show.
    </p>
  </Post>
);

/**
 * 02-5 SocialMedia component
 *
 * Now that we can create new posts, we are going to create a SocialMedia App !
 *
 * export a function named "SocialMedia". It expects the following props:
 *  - [String] title: the name of your SocialMedia app!
 *  - [Array] posts: a list of posts with id, title, author, date, content and liked
 *
 *  Your component should return a div with id "SocialMedia" and the following children:
 *  - h1 with id "title" and the prop title as content
 *  - div with className "so-me container".
 *    - You will use the Array.prototype.map() to map over the posts array and return an array of Post components
 *    - these components will each have the following props:
 *      - key required with list of react elements. The key will be the post.id property
 *      - author with the post.author property
 *      - title with the post.title property
 *      - postedOn with the post.date property
 *      - liked with the post.liked property
 *      - children: the post.content property
 *
 */

export const SocialMedia = props => {
  const posts = props.posts.map(post => (
    <Post
      key={post.id}
      author={post.author}
      title={post.title}
      postedOn={post.date}
      liked={post.liked}
    >
      {post.content}
    </Post>
  ));
  return (
    <div id="SocialMedia">
      <h1 id="title">{props.title}</h1>
      <div className="so-me container">{posts}</div>
    </div>
  );
};

/**
 * 02-6 Using your SocialMedia component
 *
 * Last exercice, export a variable named "newsFeed" and assign it your SocialMedia element.
 *
 * It will expect the following props:
 *  - title: "News Feed"
 *  - posts: the newsPost array
 *
 */

export const newsPosts = [
  {
    id: 1,
    author: stephenKing,
    title: "Trump's Conference",
    date: "26/09/18",
    content: (
      <p>
        Trump’s news conference is like listening to a nut calling in to a radio
        sports talk show.
      </p>
    )
  },
  {
    id: 2,
    author: {
      name: "J. K. Rowling",
      picture: "https://duckduckgo.com/i/181bb6c8.jpg",
      bio:
        "Joanne Rowling is best known for writing the Harry Potter fantasy series."
    },
    title: "Fantastic Beasts",
    date: "25/09/18",
    liked: true,
    content: (
      <p>I cannot move against Grindelwald.' He has a reason. Be patient...</p>
    )
  }
];

export const newsFeed = <SocialMedia title="News Feed" posts={newsPosts} />;

/**
 * Congratulations!
 *
 * You just made your first react Application!
 * If you haven't done so yet, run npm start and navigate to the "02-social-media" page and admire your app.
 *
 * Now you should have a good understanding of React Elements, Components and props. Ready for the next step?
 */
