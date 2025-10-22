# Film Store Defect Report

## 📋 Overview

This document outlines known defects identified in the Film Store application. For a proper defect write-up, each issue should be accompanied by:

- Steps to reproduce
- Highlighted screenshots or screen recordings
- Full URL of the affected page
- Version number or build details (where applicable)
- environment e.g. browser details/screen resolution etc

---

## 🐞 Defects

### 1. Missing or Incorrect Data

- Several films in the list have missing values for **Title** and **Director**.
- Some entries contain incorrect values for **Release Year** and **Rating**.

### 2. UI Text Issues

- Typos in labels and button text:
  - `"Directer"` instead of `"Director"`
  - `"Ad Film"` instead of `"Add Film"`
- Inconsistent capitalization in the **Title** field label.

### 3. Validation Gaps

- No in-page validation for:
  - **Release Year**: accepts empty strings and non-numeric input.
  - **Director** and **Rating**: accepts invalid or empty values.
  - No error messages shown on screen for **Release Year** **Director** and **Rating**

### 4. Responsive Layout Bug

- The `"Ad Film"` button exceeds the screen width when viewed at **375px** (mobile breakpoint).

### 5. Rating Logic Error

- Newly added films always display a rating of **0 / 10**, regardless of input.

### 6. Error Message Formatting

- The error message for the **Title** field has poor capitalization and inconsistent styling.

### 7. Accessibility & Navigation

- Tab order starts on **Release Year** instead of the first input field (**Title**).
- The film table uses `<th>` tags inside `<tbody>`, which is semantically incorrect and affects accessibility.
- **Release Year**, **Director**, and **Rating** fields are missing associated `<label>` elements.
- The page lacks a first-level heading (`<h1>`), and heading levels are skipped.

### 8. Performance

- The Core Web Vitals scores for First Contentful Paint and Largest Contentful Paint are both poor.

---

## ✅ Recommendations

- Implement client-side validation for all required fields.
- Correct typos and standardize label formatting.
- Ensure responsive layout integrity at mobile breakpoints.
- Fix rating logic to reflect user input accurately.
- Improve semantic HTML structure for accessibility.
- Review tab order and heading hierarchy for usability and screen reader compatibility.
- Check Core Web Vitals meet acceptable thresholds
