@build
Feature: build command
  In order to deploy a project
  As a developer
  I want to use webpack to produce a distributible bundle

  Scenario:
    Given I have a project
    When I run beaver with "build --env development"
    And I wait for the command to finish with code 0
    Then I see "dist/app.js" with a file size between 940000 and 960000 bytes

  Scenario:
    Given I have a project
    When I run beaver with "build --env production"
    And I wait for the command to finish with code 0
    Then I see "dist/app.js" with a file size between 195000 and 200000 bytes
