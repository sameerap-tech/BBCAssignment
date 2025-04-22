import {Given, When, Then} from "cypress-cucumber-preprocessor/steps";
import userData from '../../fixtures/example.json'

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

And('the user sorts the comments to latest order', function() {
    cy.get('select[data-testid="select"]').select(0);
});

Then('user can post a {string} on the article', (actionType) => {
    const id = Cypress._.random(0, 1e6);        //Random number generator, number between 0 to 10^6
    const commentText = `testcommentname_${id}`;
    const replyText = `testreplyname_${id}`;
    switch(actionType) {
        case "comment":
            cy.get('textarea[placeholder="Add your comment..."]').type(commentText);
            break;

        case "reply":
            cy.get('textarea[placeholder="Add your comment..."]').eq(1).type(replyText);
            break;

        default:
            cy.log('Invalid post action');
            return;
    }
    cy.get('button[data-testid="post-comment"]').click();
    cy.get('div[data-testid="comment-success"]').invoke('text').should('eq', 'Thanks, your comment has been posted.');
});

When('user clicks on the reply button', function() {
    cy.get('button[data-testid="comment-reply-button"]').first().click();
});

When('user clicks on the reaction button', function() {
    cy.get('button[data-testid="positive-reaction"]').first().click();
    })

Then('user can see his reaction', function() {
    cy.get('button[data-testid="positive-reaction"]').first().should('have.attr', 'aria-label', 'You have liked this comment. Number of likes: 1');
});

Given('An unsigned in user accesses the comments article', function() {
    cy.visit('https://www.test.bbc.co.uk/sport/articles/cj2ne09x2j0o?mode=testData');
});

Then('user can see the sign in message and post button is not available', function() {
    cy.get('.ssrcss-8ukms6-Greeting').invoke('text').should('eq', 'Sign in to comment, reply and react');
    cy.get('[placeholder="Add your comment..."]').should('not.to.exist');
});