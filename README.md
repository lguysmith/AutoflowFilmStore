# AutoFlow Tech Test Instructions
You are invited to complete the AutoFlow Tech Test as part of the next stage in our interview process. We ask that you submit your solution prior to your upcoming interview, where we’ll review your work and discuss the decisions you made during the exercise.

We’ve provided a website that has been built to meet the acceptance criteria detailed below. However, the developer who wrote the website was in a rush and has cut corners here and there. We would like you to add some automated tests to the website in any way which you feel best demonstrates your skills and strengths. You may also discuss in the interview any issues which you feel should be addressed or improvements that could be made to the website before it's released to our customers.

You should aim to spend no more than 1–2 hours on this task. If you run out of time, rather than spend longer, you may discuss with us in the interview the additional work you would have done. You’re welcome to use AI tools to assist you, but please note that we’ll ask questions during the review to assess your understanding of the code and the approach you’ve taken. 

## The Website
The AutoFlow Film Store allows users to view a list of films with information about the year it was released, the name of the director, and it’s rating. It also includes functionality to add new film entries to the collection.

### Acceptance Criteria

**Scenario: Films list**

Given there are existing films in the collection
When I open the default page
Then I see a list of films showing the title, release year, director, and rating for each film

Given films are displayed in the list
When I scan the list
Then each film shows the name of the film, a 4-digit year (e.g., 1999), the directors name, and a rating in the allowed range of 0–10

**Scenario: Add Film**

Given I am on the default page
When the page loads
Then I see an “Add New Film” section below the films list, containing fields for Title (required), Year (required), Director (required), and Rating (required) with an "Add Film" button

Given I am on the default page
When I fill in all required fields with valid data and click the "Add Film" button
Then the form clears, and the new film immediately appears at the bottom of the film list without a page reload

**Scenario: Form Validation**

Given I am on the default page
When I click the "Add Film" button without filling in one or more required fields
Then inline error messages appear next to each missing field, explaining what is required, and the new film is not added to the list

Given I am on the default page
When I enter a non-numeric or non-4-digit year and click the "Add Film" button
Then an inline validation message appears for the Year field explaining the valid format (e.g., “Enter a 4-digit year between 1888 and current year”), and the film is not added

Given I am on the default page
When I enter a rating outside the allowed range and click the "Add Film" button
Then I see an inline error message showing the acceptable range (e.g., 1–10), and the film is not added

**Scenario: Responsive layout**

Given my viewport width is 375px or less (mobile)
When the page loads
Then text remains readable and interactive controls span the width of the screen without scrolling

**Scenario: Accessible content**

Given the Film Store is loaded
When I inspect the page
Then there is a logical heading hierarchy

Given I use only the keyboard
When I tab through interactive elements
Then focus moves in a logical order, all controls are reachable, and a visible focus indicator is always present


## Running the website locally

The website has been written using the Angular Framework and uses Typescript and CSS. The default unit test framework has been installed but feel free to change this to your prefered option if you choose to write unit tests. No e2e test framework has been installed, you are free to add whatever framework you prefer if you decide to write e2e tests.

Angular requires an active LTS or maintenance LTS version of Node. To confirm which version of node.js you have installed, run the following command: 

```bash
node --version
```

Confirm that the version number displayed meets the requirements. If you do not have a version of node.js installed, please follow the directions for installation on nodejs.org

With node.js installed, the next step is to install the Angular CLI.

From a Terminal window run the following command: 

```bash
npm install -g @angular/cli.
```

Once node and Angular are set up, open the project in your favourite IDE

To run the project locally, run the following command:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.


## Running tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```
