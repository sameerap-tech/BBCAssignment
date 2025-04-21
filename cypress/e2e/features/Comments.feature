Feature: Login Feature
  Description: The purpose of this feature is to test the comments module of BBC

  Feature: Automate test scenarios for Comments service
  
    Scenario: Verify that Signed in user can post comment on the article
        Given A valid user has signed in to comments module
        When user clicks on the view comments button
        Then user can post a 'comment' on the article
        #Then user can see the new comment on the article

    Scenario: Verify that Signed in user can post reply on the article
        Given A valid user has signed in to comments module
        And user clicks on the view comments button
        When user clicks on the reply button
        Then user can post a 'reply' on the article

    Scenario: Verify that Signed in user can react to comment on the article
        Given A valid user has signed in to comments module
        And user clicks on the view comments button
        When user clicks on the reaction button
        Then user can see his reaction

    Scenario: Verify that unsigned in user cannot post comment on the article
        Given A unsigned user accesses the comments article
        When user clicks on the view comments button
        Then user can see the login button