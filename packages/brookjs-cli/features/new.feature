@new
Feature: new command
  In order to start a project
  As a developer
  I want to bootstrap a new application with configuration

  Scenario:
    When I run beaver with "new test-app"
    And I respond to the prompts with:
      | text                                          | response           |
      | What is the application version? (0.0.0)      | 1.0.0              |
      | What is the application description? ()       | A test application |
      | Where will the application source live? (src) | client             |
      | Choose a license. (Use arrow keys)            | KEY:DOWN           |
      | Confirm your app configuration:               | y                  |
    And I wait for the command to finish with code 0
    Then I see a project dir called "test-app" with:
      | filename                   | fixture              |
      | package.json               | package.json         |
      | .babelrc                   | .babelrc             |
      | .beaverrc.js               | .beaverrc.js         |
      | .eslintrc.js               | .eslintrc.js         |
      | client/app.js              | app.js               |
      | client/dom.js              | dom.js               |
      | client/view.hbs            | view.hbs             |
      | client/actions/app.js      | actions--app.js      |
      | client/actions/index.js    | actions--index.js    |
      | client/components/index.js | components--index.js |
      | client/deltas/index.js     | deltas--index.js     |
      | client/reducers/index.js   | reducers--index.js   |
      | client/selectors/index.js  | selectors--index.js  |
      | client/services/index.js   | services--index.js   |

  Scenario:
    When I run beaver with "new test-app -y"
    And I wait for the command to finish with code 0
    Then I see a project dir called "test-app" with:
      | filename                | fixture               |
      | package.json            | package__default.json |
      | .babelrc                | .babelrc              |
      | .beaverrc.js            | .beaverrc__default.js |
      | .eslintrc.js            | .eslintrc.js          |
      | src/app.js              | app.js                |
      | src/dom.js              | dom.js                |
      | src/view.hbs            | view.hbs              |
      | src/actions/app.js      | actions--app.js       |
      | src/actions/index.js    | actions--index.js     |
      | src/components/index.js | components--index.js  |
      | src/deltas/index.js     | deltas--index.js      |
      | src/reducers/index.js   | reducers--index.js    |
      | src/selectors/index.js  | selectors--index.js   |
      | src/services/index.js   | services--index.js    |