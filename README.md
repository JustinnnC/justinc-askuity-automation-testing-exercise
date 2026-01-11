# Askuity Automation Testing Exercise 

Developed with Typescript. Test Automation Tool with Cypress

Name: Justin Chung
Email: justinchungyyz@gmail.com
Phone: (647)-228-3966

## Prerequisites

Before you begin, ensure you have the following installed: 

- Node.js
- npm or yarn

## Setup

1. **Clone the repository**
   
   ```bash
   git clone <repository-url>
   ```
2.  **Navigate to the project directory:**

    ```bash
    cd cypressFramework
    ```

3.  **Install the dependencies:**

    ```bash
    npm install
    ```
   This will install:
   - Cypress - end-to-end testing framework
   - TypeScript - for type-safe test scripting
   - @types/node - TypeScript types for Node.js

## Running the Tests

1. **Running Cypress Test in Interactive Mode (UI)**
   
   ```bash
   npm run cypress:open
   ```   
2. **Running Cypress Test headless. Results in terminal**

   ```bash
   npm run cypress:run
   ```
3. **Shortcut (same as npm run cypress:run)**

   ```bash
   npm test
   ```

## Overview of Structure 

cypressFramework/
├── cypress/
│   ├── constants/              
│   │   └── config.ts                         # Configuration for BASEURL and Fallback (support multiple enviornments if needed)
│   ├── e2e/               
│   │   └── shoppingCartValidation.cy.ts.     # End-to-end flow of shopping cart logic and validation
│   ├── fixtures/             
│   │   └── testExample.json                  # Test data of a shopping list
│   ├── pages/           
│   │   ├── cartPanel.ts                      # Page for the cart panel 
│   │   ├── storePage.ts                      # Page for the store page
│   │   └── testData.ts                       # Page to load and set the test data (fixture file)
│   ├── support/            
│   │   └── storeUtils.ts                     # Utility file to store supporting functions (subtotal calculation)
│   ├── types/            
│   │   └── index.ts                          # Fixtures interface structure
├── cypress.config.ts        
├── package.json
├── tsconfig.json
└── README.md

## Error handling

   storePage.ts
   - Try/Catch when unable to click on size filter
   - Try/Catch on mismatch product count values
   - Timeout handling on getting size checkbox

   cartPanel.ts
   - Throw error when cart amount does not equal subtotal amount

## Additional Notes

I did notice that the HTML of the store page could have included better IDs. In my previous role, adding additional IDs or attributes was part of our workflow for improve selector stability. I would have followed the same practice in this exercise as well. Some areas where I would have added IDs and attributes are: 
      - Add ID to 'Add to Cart' on the store page
      - Add ID to '-' and '+' on the cart panel
      - Add ID to 'X' on the cart panel 
      - Add ID to 'Quantity' and value on the cart panel
      - ADD IDs to Subtotal container and value on the cart panel 

Thank you for your time and consideration! I appreciate the opportunity to demonstrate what I can bring to your team! 
