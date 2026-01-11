/* 
    For the simplicity of this automation test, the fallback is just BASE_URL. 
    However if we have multiple environments we would want to map them here
    Or with this setup we can even run ex: 'npm run cypress:open -- --env BASE_URL={ENV_URL}' as well
*/
export const BASE_URL = Cypress.env('BASE_URL') || "https://automation-interview.vercel.app/"; 

// Timeouts (for example), page loadings, API calls, page interactions
export const TIMEOUTS = { 
    SHORT: 500, 
    DEFAULT: 5000, 
    LONG: 10000,
}; 