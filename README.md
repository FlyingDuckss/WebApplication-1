# Accessibility Report for PRO DBA

## Executive Summary
This report analyzes the accessibility of a job portal website developed for the Creating Web Application course. The evaluation follows the Web Content Accessibility Guidelines (WCAG) 2.1, focusing on the principles of Perceivable, Operable, Understandable, and Robust. The findings highlight areas of compliance and areas needing improvement to enhance accessibility for all users, including those using assistive technologies.

## Introduction
The website analyzed serves as a job portal, providing job listings, application processes, and company details. The objective of this report is to assess its accessibility against WCAG 2.1 standards, identifying potential issues and recommending improvements for inclusivity.

## Method of Analysis
The accessibility evaluation was conducted using both automated tools and manual testing. Automated tools identified initial issues, while manual testing ensured a comprehensive assessment of user experience aspects.

## Tools Used for Analysis
- **WAVE (Web Accessibility Evaluation Tool):** Automated detection of accessibility issues.
- **axe Accessibility Checker:** Chrome and Firefox extension for identifying WCAG violations.
- **WCAG Contrast Checker:** Evaluates color contrast ratios for readability.
- **Manual Testing:** Includes navigating the website using only a keyboard and screen readers.

## Findings of the Analysis
### 1. Perceivable
- The website was evaluated using WAVE, axe, and contrast checkers.
- Some images lacked alternative text.
- Color contrast issues were identified.

### 2. Operable
- The website is largely accessible via keyboard navigation.
- Focus indicators need improvement.
- Adding skip navigation links would enhance accessibility for screen reader users.

### 3. Understandable
- Content is generally clear but contains technical job descriptions that may be difficult for some users.
- Predictable user experience with no unexpected behaviors.
- Error messages lack detailed guidance for corrections.

### 4. Robust
- The website is compatible with multiple browsers (Chrome, Firefox) and assistive technologies (NVDA screen reader).
- Standard HTML and ARIA roles contribute to accessibility.

## Areas for Improvement
- **Color Contrast:** Adjust text and background colors to meet WCAG contrast requirements.
- **Alternative Text:** Ensure all images, including decorative ones, have appropriate alt attributes.
- **Skip Navigation Links:** Facilitate easier navigation for screen reader users.
- **Error Messages:** Provide detailed and clear instructions for correcting form errors.
- **Focus Indicators:** Improve visibility to aid keyboard navigation.

## Conclusion
The website partially meets WCAG 2.1 standards. Implementing the recommended improvements will enhance compliance and make the site more accessible to all users, including those relying on assistive technologies.

## References
1. [WCAG 2.1 - W3C](http://www.w3.org/TR/WCAG/)
2. [Introduction to Web Accessibility - WebAIM](http://webaim.org/articles/)
3. [University of Michigan - Web Accessibility](http://hr.umich.edu/webaccess/)
