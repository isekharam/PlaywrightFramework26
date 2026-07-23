import { test, expect } from '@playwright/test';
import { Loginpage } from '../pages/Loginpage';
import { POManager } from '../pages/POManager';

test.describe('Login', () => {

  let poManager;

  test.beforeEach(async ({ page }) => {
    poManager = new POManager(page);
  });

test('TC_POS_01 Verify successful login with valid credentials', async ({ page }) => {
    const loginPage = poManager.getLoginPage();
    await loginPage.launchURL();
    await loginPage.enterUsername('dummydol@yahoo.com');
    await loginPage.enterPassword('Hyderabad@12345');
    await loginPage.clickLoginButton();
    await loginPage.isLogoutButtonVisible();
    await loginPage.clickLogoutButton();
    await expect(page).toHaveURL('https://eventhub.rahulshettyacademy.com/login');
    await expect(page).toHaveTitle('EventHub — Discover & Book Events');
    console.log('Username has been navigated to event dashboard successfully');

  });

test('TC_POS_02 Verify navigation to the Registration page', async ({ page }) => {

    const loginPage = poManager.getLoginPage();
    await loginPage.launchURL();
    await loginPage.isRegisterpageVisible();
    console.log('User has been navigated to register page successfully');

  });


test('TC_POS_03 - Verify form element visibility', async ({ page }) => {

    const loginPage = poManager.getLoginPage();

    await loginPage.launchURL();

    // Step 2: Assert Email field is visible and enabled
    await expect(loginPage.username).toBeVisible();
    await expect(loginPage.username).toBeEnabled();

    // Step 3: Assert Password field is visible and enabled
    await expect(loginPage.password).toBeVisible();
    await expect(loginPage.password).toBeEnabled();

    // Step 4: Assert Sign In button is visible and enabled
    await expect(loginPage.loginButton).toBeVisible();
    await expect(loginPage.loginButton).toBeEnabled();

    console.log("All login elements are visible and responsive");

  });


  test('TC_POS_04 - Verify password masking', async ({ page }) => {

    const loginPage = poManager.getLoginPage();

    // Step 1: Navigate to login URL
    await loginPage.launchURL();

    // Step 2: Type into Password field
    await loginPage.enterPassword("SamplePassword123");

    // Step 3: Assert input type = "password"
    const inputType = await loginPage.password.getAttribute("type");
    console.log("Input type of password field:", inputType);
    expect(inputType).toBe("password");
    console.log("Password field is masked correctly");

  });


  test('TC_NEG_01 - Verify login failure with empty fields', async ({ page }) => {


    const loginPage = poManager.getLoginPage();

    // Step 1: Navigate to login URL
    await loginPage.launchURL();
    // Step 3: Click Sign In
    await loginPage.clickLoginButton();

    await loginPage.isUserNameErrorVisible();
    await loginPage.isPasswordErrorVisible();

    console.log("Validation errors displayed correctly for empty fields");
  });


  test("TC_NEG_02 - Verify invalid email syntax", async ({page}) => {

    const loginPage = poManager.getLoginPage();
    await loginPage.launchURL();
    await loginPage.enterUsername('abcd');
    await loginPage.enterPassword('Hyderabad@12345');
    await loginPage.clickLoginButton();
    await loginPage.isUserNameErrorVisible();
    

    });


test("TC_NEG_03 - Verify login failure with unregistered email", async ({page}) => {

    const loginPage = poManager.getLoginPage();
    await loginPage.launchURL();
    await loginPage.enterUsername('rara@tetse.com');
    await loginPage.enterPassword('Hyderabad@12345');
    await loginPage.clickLoginButton();
    await loginPage.isInvalidCredentialsErrorVisible();
    });


    test("TC_NEG_04 - Verify login failure with incorrect password", async ({page}) => {

    const loginPage = poManager.getLoginPage();
    await loginPage.launchURL();
    await loginPage.enterUsername('dummydol@yahoo.com');
    await loginPage.enterPassword('Hy@12345');
    await loginPage.clickLoginButton();
    await loginPage.isInvalidCredentialsErrorVisible();

    });

});