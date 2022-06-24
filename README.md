# Lyrics Savant

## `Tech Stack`
Python, Flask, Sqlalchemy, Postgres, Javascript, React, CSS, HTML.
### External Libraries
#### Python
NLTK, MatPlotLib, WordCloud.
#### Javascript
Material UI, Chart.js, React-Search-Autocomplete, React-Load-Spinner.

## `Summary`

Lyrics Savant is a data-driven User Interface that leverages the Lyrics Genius API to webscrape an artist's lyrics to display a module that includes their biographical information, a sample of their lyrics, and statistical insights regarding their vocabulary and polarity scores of their lyrics. Artists can be compared side-by-side to help users visualize such data insights. If an artist is not already present in our database, users have the option to contribute to the project by submitting an http request to our API to seed said artist to our database. Learn more about our RESTFUL API below. 

## `Lyrics Savant API`

We have built an API using Restful principles to handle the flow of data between the user interface, our own Postgres database, and the Lyrics Genius web-scraping API. Due to the fact that the Lyrics Genius API doesn't directly store lyrical data and instead relies on sending HTTP requests for each song by an artist, I decided to build my own API to interface between users and our database. At the time of writing, over 1000 popular artists, each having a sample of 40 lyrics amongst other information have been saved to our Postgres database. In v2, a program will be added to automatically find new artists not already included in the database, and will proceed to seed those artists. Our API interacts with the front-end by responding to GET requests asking for song and artist information, as well has handling POST requests to seed a new artist to the database. 

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
