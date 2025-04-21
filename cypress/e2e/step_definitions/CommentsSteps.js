import {Given, When, Then, Before} from "cypress-cucumber-preprocessor/steps";
import userData from '../../fixtures/example.json'

const id = Math.random().toString().substr(2, 6);
const testname = `testname_${id}`;

Given('A valid user has signed in to comments module', function() {
    cy.visit('https://www.test.bbc.co.uk/sport/articles/cj2ne09x2j0o?mode=testData');
    cy.get('a.ssrcss-dradq6-NavigationLink-AccountLink').click();
    cy.get('input[name="username"]').type(userData.username);
    cy.get('#submit-button').click();
    cy.get('input[name="password"]').type(userData.password);
    cy.get('#submit-button').click();
});

When('user clicks on the view comments button', function() {
    cy.get('button:contains("View comments")').click();
});

Then('user can post a {string} on the article', (actionType) => {
    switch(actionType) {
        case "comment":
            cy.get('textarea[placeholder="Add your comment..."]').type(testname);
            break;

        case "reply":
            cy.get('textarea[placeholder="Add your comment..."]').eq(1).type('reply');
            break;

        default:
            cy.log('Invalid post action');
            return;
    }
    cy.get('button[data-testid="post-comment"]').click();
    cy.get('.ssrcss-12cqr8y-SuccessPanel').invoke('text').should('eq', 'Thanks, your comment has been posted.');
});

When('user clicks on the reply button', function() {
    cy.get('.ssrcss-1rgelzq-ReplyButtonText').first().click();
});

And('user posts a reply on the article', function() {
    cy.get('textarea[placeholder="Add your comment..."]').eq(1).type('reply');
    cy.get('button[data-testid="post-comment"]').click();
    cy.get('.ssrcss-12cqr8y-SuccessPanel').invoke('text').should('eq', 'Thanks, your comment has been posted.');
});

When('user clicks on the reaction button', function() {
    cy.get('button[data-testid="positive-reaction"]').first().click();
    })

Then('user can see his reaction', function() {
    cy.get('button[data-testid="positive-reaction"]').first().should('have.attr', 'aria-label', 'You have liked this comment. Number of likes: 1');
});

Given('A unsigned user accesses the comments article', function() {
    cy.visit('https://www.test.bbc.co.uk/sport/articles/cj2ne09x2j0o?mode=testData');
});

Then('user can see the login button', function() {
    cy.get('.ssrcss-8ukms6-Greeting').invoke('text').should('eq', 'Sign in to comment, reply and react');
});