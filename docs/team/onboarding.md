---
description: "A guide for onboarding new team members to the TSD UI project"
---

# 🛳️ Onboarding

_A guide for onboarding new team members to the TSD UI project_

:::warning
This page is a work in progress. If you find anything that may be useful to the onboarding process please feel free to add to the doc.
:::

:::info[Note]
All of these documents should be available to all team members. If you do not have access to a document listed here, please reach out to the team.
:::


## Communications

See [Communications](communications.md).

## Product security

* [Security Training Required for Software Engineers and Quality Engineering](https://docs.engineering.redhat.com/display/PRODSEC/Secure+Development+training)

## Setting up your environment

Let's add some docs here, or a link to docs for our teammates to be able to set up their environments easily.

## Other things to know

* We have a daily standup (only required for engineering)
* Weekly meetings: Program call, Jira triage

:::info[Note]
Always refer to the TSD UI Google Calendar for the most up-to-date information about team meetings
:::

---

## Example Workflow

### Development Process

The workflow for each team member is different depending on what specific thing they are working on, but here is a general example of the process for working on RHTAS:

1. Prioritize features and bug fixes with the team in Sprint Planning calls (this may have already been done), evaluating time frames and identifying possible areas of risk
2. Work on fixes/features/maintenance
3. Push to the `securesign` component repo
4. When the team is ready for a release, a container image [will be created](#user-content-fn-1)[^1] for each component, and the SHA for that image will be added to the component matrix

For more information on the release process, please see [here](../release-coordination/).

### Daily Workflow

TBD