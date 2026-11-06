# Help Me Up (HMU) — Non-Profit Organisation Website

**Student:** Lethabo Mmako
**Student Number:** ST10533051
**Module:** WEDE5020 — Web Development
**Programme:** Higher Certificate in Mobile Application and Web Development
**Institution:** The IIE — Rosebank College
**Repository:** https://github.com/mosesthegreat555-ceaser/assignment-step-1

---

## 1. Project Overview

This repository contains the website developed for **Help Me Up (HMU)**, a South African
non-profit organisation registered in 2017 that began operating in 2018. HMU helps Grade 12
learners prepare for life after school by making information about universities, colleges,
bursaries and other opportunities easier to find — particularly for learners in rural and
township communities who may not have easy access to that information.

The website was built as part of the WEDE5020 module and is developed in stages across the
assignment parts.

### Target Audience

| Audience | What they need from the site |
|---|---|
| Grade 12 learners | Information on tertiary study, bursaries and applications |
| Parents and guardians | An understanding of what support is available to their child |
| Schools | A way to enquire about HMU school visits and workshops |
| Volunteers and donors | Information on how to get involved or support HMU |

---

## 2. Website Goals and Objectives

The purpose of the site is to bring scattered information into one place so that learners do
not have to search across many different websites.

The site aims to:

- Provide information about tertiary education opportunities.
- Share information about bursaries and scholarships.
- Explain the programmes and projects offered by HMU.
- Raise awareness of the organisation.
- Allow schools and learners to submit enquiries.
- Give visitors information about volunteering and supporting HMU.

Success will be measured by the number of website visits, the number of enquiries submitted,
views of the resource pages, and the number of people making contact with HMU.

---

## 3. Website Structure

The website consists of the following pages:

| Page | File | Purpose |
|---|---|---|
| Home | `index.html` | Short introduction to HMU and what the organisation does |
| About Us | `about.html` | History, mission and vision of the organisation |
| Projects | `projects.html` | The Schools Project, Help Me Inspire, Outreach, Help Me Empower |
| Enquiry | `enquiry.html` | Form allowing learners, schools and supporters to send questions |
| Contact | `contact.html` | Contact details and social media links |

> **Update the filenames above to match the actual files in your repository.**

### Folder Structure

```
assignment-step-1/
├── index.html
├── about.html
├── projects.html
├── enquiry.html
├── contact.html
├── css/
│   └── style.css        # All styling for the website
├── images/              # Images used across the site
└── README.md
```

### Navigation

A navigation menu appears on every page so that a visitor can move between any two pages
without using the browser back button. The menu is placed inside a `<nav>` element in the
header of each page and links to the five pages listed above using relative paths.

---

## 4. Design and User Experience

### Colour Palette

| Colour | Hex | Where it is used | Reason |
|---|---|---|---|
| Blue | `#______` | Header, navigation, primary buttons | Professional and trustworthy appearance |
| Green | `#______` | Accents, call-to-action highlights | Represents growth and a fresh start |
| White | `#FFFFFF` | Page background, text on dark areas | Keeps the layout clean and readable |

> **Fill in the exact hex codes from your stylesheet.**

### Typography

State the font family used and why it was chosen (for example, a sans-serif family for on-screen
readability by a younger audience).

### Layout Decisions

Content is divided into clear sections so that learners are not faced with large blocks of text.
Important actions — **Get Help**, **Get Involved** and **Contact Us** — are given prominent
buttons so they are easy to find on any page.

---

## 5. Technologies Used

| Technology | Purpose |
|---|---|
| HTML5 | Semantic structure of all five pages |
| CSS3 | Layout, colour scheme, typography and spacing |
| JavaScript | Client-side validation of the enquiry form |
| Visual Studio Code | Code editor used for development |
| Git and GitHub | Version control and change tracking |

### CSS Approach

Explain, in your own words, how your stylesheet is organised. For example:

- A single external stylesheet (`css/style.css`) linked to all five pages, so the design stays
  consistent and only one file needs editing to change the look of the whole site.
- CSS is grouped into sections: reset and base styles, layout, navigation, typography,
  components (cards, buttons, forms), and media queries.
- Layout is built with [Flexbox / CSS Grid / floats — state which] because [reason].
- Media queries at [breakpoint] adapt the layout for smaller screens.

> **This section matters.** Your lecturer flagged the CSS as possibly copied. Explaining your own
> structure and naming the techniques you used — and referencing any tutorial or template you
> adapted — is how you answer that.

---

## 6. How to View the Website

1. Clone the repository:
   ```bash
   git clone https://github.com/mosesthegreat555-ceaser/assignment-step-1.git
   ```
2. Open the project folder in Visual Studio Code.
3. Open `index.html` in a web browser, or use the Live Server extension in VS Code.

No build tools, frameworks or server setup are required — the site is plain HTML, CSS and
JavaScript.

---

## 7. Changelog

All notable changes to this project are recorded here, most recent first.

### [Part 1] — YYYY-MM-DD
**Added**
- Created repository and initial folder structure.
- Added `index.html` with header, navigation and introduction to HMU.
- Added `about.html`, `projects.html`, `enquiry.html` and `contact.html`.
- Added `css/style.css` with the blue, green and white colour scheme.
- Added images to the `images/` folder.
- Added navigation menu linking all five pages.

**Changed**
- Adjusted heading sizes for better readability on smaller screens.

**Fixed**
- Corrected broken relative link on the Contact page navigation menu.

> **Replace the entries above with your real commits.** Run `git log --oneline` in the project
> folder to list them, then group them by date under Added / Changed / Fixed.

---

## 8. Roadmap

| Part | Planned work |
|---|---|
| Part 1 | Proposal, research, HTML structure and basic content |
| Part 2 | Full CSS styling and responsive layout |
| Part 3 | JavaScript form validation and interactivity |
| Final | Testing, accessibility checks, optimisation and submission |

---

## 9. References

Help Me Up (2026) *HMU – Ensuring a Bright Future for Leaders of Tomorrow*. Available at:
https://______ (Accessed: 17 August 2026).

HMU Foundation (2026) *HMU Foundation*. LinkedIn. Available at: https://______
(Accessed: 17 August 2026).

Mozilla (2026) *HTML: HyperText Markup Language*. MDN Web Docs. Available at:
https://developer.mozilla.org/en-US/docs/Web/HTML (Accessed: ______).

Mozilla (2026) *CSS: Cascading Style Sheets*. MDN Web Docs. Available at:
https://developer.mozilla.org/en-US/docs/Web/CSS (Accessed: ______).

W3Schools (2026) *CSS Flexbox*. Available at:
https://www.w3schools.com/css/css3_flexbox.asp (Accessed: ______).

> **Add a reference for every external source you used**, including any tutorial, template,
> code snippet, colour palette generator, font or image source. Images need a source and a
> licence note. Use the IIE Harvard style your module requires, and make sure every URL is a
> real, complete web address — a reference that just says "HMU official website" will be
> marked as incorrectly formatted.

### Image Credits

| Image file | Source | Licence |
|---|---|---|
| `images/______.jpg` | ______ | ______ |

---

## 10. Author

Lethabo Mmako (ST10533051)
Higher Certificate in Mobile Application and Web Development
The IIE — Rosebank College
