# Best Practices

TBD–Best practices on things like reviewing pull requests, writing commit messages, linting, formatting? Do we want to adopt some kind of standard across the team? Ideally, not too specific to tooling, as our work varies from project to project.

## Reviewing pull requests

### Requesting a review

- Review your own PR before asking for a review.
- One approval is sufficient for merge.
- Pull requests shouldn't stay open longer than 24 hours if waiting on a review. If no feedback has been received in 24 hours and the author is confident that they are shipping code that won't cause breaking changes, the author should be allowed to self-merge.

### Reviewing a pull request

Focus less on semantics and more on security, whether the changes will break another part of the code base, security implications, readability, etc.

## Code quality

TBD. Linting, formatting, commit messages.

Resources: [MDN Web Docs](https://developer.mozilla.org/en-US/), Google [web.dev](https://web.dev)

We mainly use Dependabot to manage dependency bumps, and CodeQL for quality checks.

## Testing

Proper testing allows us to ship code that we are confident in. Any UI that relies on user interactivity should have E2E tests. And, of course, never trust a test you've not seen fail.

Resources: [Kent Dodds](https://kentcdodds.com/)

### Code coverage

When possible, we should strive to reach at least 70% code coverage (unit tests) on every project we are responsible for. Code coverage is not a silver bullet, but it's another check that can help us be more confident that our code works as expected. By that token, the not all coverage is made equal. Please ensure that you are prioritizing testing business logic or any data mutations. Don't bother testing library APIs.

## Usability

To ensure consistency across Red Hat products, we use a pattern library called [PatternFly](https://www.patternfly.org/). Sometimes, we have to create custom components that are not PatternFly-specific. We should ensure those components are well tested.

### Accessibility

All products should be compliant with Red Hat's accessibility standards and policy.

Resources: [Red Hat Accessibility Policy](https://drive.google.com/file/d/12HAvFDFi8txQEp66_J98sxDIle7jPnen/view), [Red Hat DXS Accessibility Program](https://source.redhat.com/projects_and_programs/dxs_accessibility_program)

## Using AI

Ensure your commits are labeled with `"Assisted-By: <model>"`.

Resources: [Company policy on AI Use](https://source.redhat.com/departments/legal/products_privacy_and_innovation/legal_wiki/policy_on_the_use_of_ai_technology), [Approved tools and use cases](https://source.redhat.com/projects_and_programs/ai/ai_tools_and_use_cases)
