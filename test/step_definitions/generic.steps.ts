import {Given} from "@badeball/cypress-cucumber-preprocessor";

Given(/^ng-apimock has been initialized$/,
    () => cy.initializeNgApimock());
