## Table of Contents

- [Folder Structure](#folder-structure)
- [Available Scripts For Client](#available-scripts-for-client)
  - [npm start](#npm-start)
  - [npm test](#npm-test)
  - [npm run build](#npm-run-build)
  - [npm run eject](#npm-run-eject)
  - [npm run watch-css](#npm-run-watch-css)
  - [npm run build-css](#npm-run-build-css)
- [Available Scripts For Server](#available-scripts-for-server)
  - [npm start](#npm-start)
  - [npm run db-deploy](#npm-run-db-deploy)
  - [npm run graphql-playground](#npm-run-graphql-playground)
  - [npm run dev](#npm-run-dev)
  - [npm run lint](#npm-run-lint)


## Folder Structure

Project structure for both server and client:

```
server-graphql-prisma/
  node_modules/
  package.json
  .envexample
  .eslintrc.json
  .graphqlconfig.yml
  database/
    datamodel.graphql
    prisma.yml
  src/
    generated/
      prisma.graphql
    resolvers/
      Mutations/
        auth.js
        category.js
        events.js
        index.js
      Queries/
        categories.js
        events.js
        index.js
        info.js
        users.js
      Subscriptions/
        index.js
        newDislike.js
        newEvent.js
        newLike.js
        newUser.js
      AuthPayload.js
      CategoryFeed.js
      EventFeed.js
      UserFeed.js
    utils/
      authenticated.js
      email.js
      upload.js
    index.js
    schema.graphql

web-client/
  README.md
  node_modules/
  package.json
  public/
    index.html
    favicon.ico
  src/
    assets/
      fonts/
        NotoSerifSC-Black.otf
        NotoSerifSC-Bold.otf
        NotoSerifSC-ExtraLight.otf
        NotoSerifSC-Light.otf
        NotoSerifSC-Medium.otf
        NotoSerifSC-Regular.otf
        NotoSerifSC-SemiBold.otf
    components/
      Admin/
        AdminCategoriesManagement/
          AdminCategoriesManagement.js
        AdminDashboard/
          AdminDashboardUtility/
            AdminDashboardAreaChart.js
            AdminDashboardBarChart.js
            AdminDashboardPieChart.js
            AdminDashboardStats.js
          AdminDashboard.css
          AdminDashboard.js
          AdminDashboard.scss
        AdminEventsManagement/
          AdminEventsManagement.js
        AdminLayout/
          AdminLayoutUtility/
            AdminLayoutFooter.js
            AdminLayoutHeader.js
            AdminLayoutSidebbar.js
          AdminLayout.css
          AdminLayout.js
          AdminLayout.scss
        AdminUsersManagement/
          AdminUsersManagementUtility/
            AdminUsersManagementMedia.js
            AdminUsersManagementModal.js
          AdminUsersManagement.css
          AdminUsersManagement.js
          AdminUsersManagement.scss
      Client/
        LandingPageLayout/
          LandingPageLayout.js
        LoginLayout/
          LoginLayout.css
          LoginLayout.js
          LoginLayout.scss
      Global/
        Button/
          Button.css
          Button.js
          Button.scss
        Card/
          Card.js
        Dropdown/
          Dropdown.js
        Error/
          ErrorUI.js
        Input/
          Input.js
        Loader/
          Loader.css
          Loader.js
          Loader.scss
        Logo/
          Logo.css
          Logo.js
          Logo.scss
        Modal/
          Modal.js
        Pagination/
          Pagination.js
      Helpers/
        AuthService.js
        WithAuth.js
      Pages/
        AdminPage.js
        LandingPage.js
        LoginPage.js
        NotFoundPage.js
        PortalPage.js
        SignupPage.js
    routes/
      index.js
    styles/
      scss/
        base/
          _base.scss
          _mixins.scss
          _typography.scss
          _variables.scss
        components/
          Admin/
            AdminDashboard/
              _AdminDashboard.scss
            AdminLayout/
              _AdminLayout.scss
            AdminUsersManagement/
              _AdminUsersManagement.scss
          Client/
            LoginLayout
              _LoginLayout.scss
          Global/
            Button/
              _Button.scss
            Loader/
              _Loader.scss
            Logo/
              _Logo.scss
        _index.scss
    utilities/
      constants.js
    Apolloclient.js
    index.css
    index.js
    index.scss
    serviceWorker.js
```
#### Further instructions for client side of things
For the project to build, **these files must exist with exact filenames**:

* `public/index.html` is the page template;
* `src/index.js` is the JavaScript entry point.

From the entry file, which is src/index.js. The router component goes in. This router components loads different pages pending on the chosen routes. Some routes are however public while some are not. The AdminPage component for instance is private and needs admin permission to access its content. This AdminPage components does two things- one it takes you to the AdminLayout area if user is authenticated and has the right permission, two, it redirect user to the login page if not authenticated or permitted to view admin page. If user is authenticated they can view the AdminLayout and subsequent inners screens available.
So in the Admin area, the AdminLayout component serves as a new entry point for the remainder of the admin components...


## Available Scripts For Client

For the client side of things, Inside the root directory (web-client), you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>


### `npm run watch-css`
To compile all `scss` extension files to css run this script


### `npm run build-css`
To compile all `scss` extension files to css and also minify them run this script


## Available Scripts For Server

For the server side of things, Inside the root directory (server-graphql-prisma), you can run:


### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:4000](http://localhost:4000) to view it in the browser.


### `npm run db-deploy`

Run this script to deploy prisma schema to remote server.<br>

### `npm run graphql-playground`

Run script to see a browser view of graphql docs and queries<br>


### `npm run dev`

Run script to start server and boot up graphql playground at the same time.<br>

### `npm run lint`

Run script to check all lint errors and fixes. Read more on ESLint docs

