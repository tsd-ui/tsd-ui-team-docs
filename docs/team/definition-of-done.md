# Definition of Done

## Acceptance Criteria

Acceptance Criteria are, essentially, high level tests to prove the backlog item does what it's supposed to do.

:::info

To make this easier, we might consider using a [Jira template](https://deviniti.com/blog/application-lifecycle-management/jira-ticket-epic-templates-ultimate-guide/) to provide a brief reminder to provide Acceptance Criteria during task creation.

:::

Each product backlog item should have an associated set of Acceptance Criteria, to facilitate testing and review, and to account for situations where there is not enough context to complete a task.

## Definition of Done (DoD)

The Definition of Done (DoD) is an important agile concept that acts as a shared understanding between the team and stakeholders, regarding what it means for a task, user story, or project to be considered complete. It helps with aligning expectations, reducing technical debt, amongst other benefits.

Our DoD a living document, located here: tbd

### Review

At the start of the review phase, the reviewer should assign themselves as the **Tester** in the Jira issue to take ownership of the verification. Once assigned, the focus is on the following:

1. **Definition of Done**: Ensure the implementation meets the criteria outlined in the **DoD**. This includes verifying that all acceptance criteria are met, the feature works as expected, and any non-functional requirements (e.g., performance, security, usability) are addressed. The issue should fully resolve the problem described without introducing new issues.
2. **Functionality on Release Candidate**: Verify that the feature works as expected and hasn’t been broken by other changes.
3. **Documentation**: Confirm that all necessary documentation is provided.
4. **Test Coverage**: Check that appropriate tests have been added.
   - We track test coverage via the **"Test coverage"** field in the Jira tracker. This field can be set by either the assignee or the tester, and it reflects whether the changes are covered by tests. It can be set to:
     - **"+"**: The changes are covered by regression tests. This indicates that either new tests have been created or existing tests already cover the changes.

         :::note[Example]
         New features covered by unit tests during development, or changes, that are already cover by e2e or structural tests (newer versions of images).
         :::

     - **"-"**: The changes are not covered by regression tests. This might be acceptable if the risk of not having automated coverage is deemed 
     low, or if manual testing has been determined to suffice.

         :::note[Example]
         Typically documentation, which is checked once during Review. Or tasks for tests automation - these are not covered by tests themselves.
         :::

     - **"?"**: It’s unclear if the changes are covered by tests. This status often indicates a need for further investigation, potentially leading to:
       - Creation of new automated tests (e.g., unit, integration, or end-to-end tests).
       - Returning the issue to the developer for additional testing or clarifying coverage.

       :::note[Example]
       New features, which are not covered by tests yet, but should be. Till the automated tests are created, it is tested manually.
       :::

   - **Manual vs. Automated Testing**: 
     - **Automated Testing**: Whenever possible, automated tests should be preferred, as they ensure continuous validation of changes across future releases. This includes unit tests, integration tests, and end-to-end (e2e) tests.
     - **Manual Testing**: There may be instances where manual testing is acceptable, particularly for features that are difficult or impractical to automate. In such cases, the reason for skipping automation should be documented, and the **Test Coverage** field set to **"-"**.

6. **Release Notes**: Review the release notes for clarity and completeness.

#### Verification Outcomes

1. **Passed Verification**: If the issue has been successfully verified:
   - Change the issue status to **"Release Pending"**.
   - Add a comment specifying which version of the build was used for verification.
   
2. **Failed Verification**: If the issue fails verification:
   - Move the issue to the **"Waiting"** state.
   - Add a comment detailing the problem(s) discovered during the verification process.


These are universal tasks, though we might occasionally overlook something. It's important that the review is conducted by someone other than the person who resolved the issue. Ideally, the review should be performed by the original reporter if possible.


## Acceptance Criteria vs DoD

Acceptance Criteria should be specified for each item, while DoDs refer to a more bread set of criteria that all issues should adhere to.

Let's say you have an ecommerce site, and you want to allow visitors to search for wine and be able to buy it.

| Feature                                                 | Acceptance Criteria                                                                               | Definition of DONE                                                                                                                     |
|---------------------------------------------------------|---------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------|
| Site visitors the ability to search for wine            | - Search by type of wine<br/>- Search by price range<br/>- Search by ratings                      | - The item has been thoroughly tested<br/>- The code is checked in<br/>- The website works in Chrome, Firefox, Safari, Edge, and Opera |
| Allow users to pay for the items in their shopping cart | If a credit card is declined, the buyer is notified and given a chance to edit the card's details | - The item has been thoroughly tested<br/>- The code is checked in<br/>- The website works in Chrome, Firefox, Safari, Edge, and Opera |

- DoD would be a lot of work to add these to all the backlog items, so instead we define one single universal DoD
- You'll occasionally have items on the backlog that don't need to meet every part of the definition of done (i.e. no browser)


