# Employee management app

Run `docker compose up -d --build` to launch all services.

Front-end application should be available at `http://localhost:4200`.

# Further improvements
* Implement employee (soft) delete endpoint.
* Create types for API responses and properly get and show errors on the client side.
* Refactor client app state management to fully leverage NgRx store capabilities and dispatch API failures and show them to users.
* Implement employee search functionality i.e. search by tag, office, and employee first name, last name etc.
* Improve prisma setup flow so that seeds are applied outside API execution context using prisma package.json dedicated configuration.