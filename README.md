# Medical Device Project (React with TypeScript)

This project have only three fuctionality - login, user profile and user can add new device.


## Explanation of choices technologies

This is a dummy ReactJS project which must need TypeScript.

So, I choose ReactJs with TypeScript.

For routing system I use React-Router, I think no need to use any Server Side Rendering using like NextJS or Gatsby.

I use axios for data fetching, because it has promise based functionality which is cool think for asynchronous JavaScript.

I use formik with yup for form handling with showing error, which is obviously recommanded from ReactJS team.

For UI, I choose Material-UI which has great UI component.

And finally js-cookie for set cookies for client.

## Available Scripts

You can run this project locally. To do this, 1st you need to clone this repo from main branch.

Then Run from base directory:

### `yarn install`

To get all necessary node packages.

### `yarn start`

To start the project locally.

### NB. If there have no (.env) file then create it following (.env.example)

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
