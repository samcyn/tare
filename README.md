from the entry file, which is src/index.js. The routers components goes in. The routers components loads different pages pending on the routes chosen. Some routes are however public while some are not. The AdminPage component for instance is private and needs admin permission to access its content. This AdminPage components does two things- one it takes you to the AdminLayout area if user is authenticated and has the right permission, two, it redirect user to the login page if not authenticated or permitted to view admin page. If user is authenticated they can view the AdminLayout and subsequent inners screens available.
So in the Admin area, the AdminLayout component serves as entry point for the admin components...
