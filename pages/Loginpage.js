import { expect } from "@playwright/test";

export class Loginpage {

    constructor(page) {
        this.page = page;
        this.username = page.locator('//*[@id="email"]');
        this.password = page.locator("//*[@id='password']");
        this.loginButton = page.locator("//*[@id='login-btn']");
        this.logoutButton = page.locator("//button[@id='logout-btn']");
        this.regesterLink = page.locator("//a[contains(text(),'Register')]");
        this.userNameError = page.locator("//*[contains(text(),'Enter a valid email')]");
        this.passwordError = page.locator("//*[contains(text(),'Password must be at least 6 characters')]");
        this.InvalidCredentialsError = page.locator("//div[@class='pointer-events-auto']//p[contains(text(),'Invalid email or password')]");

    }


    async launchURL() {
        await this.page.goto('https://eventhub.rahulshettyacademy.com/login');
        console.log("URL launched successfully");
    }


    async enterUsername(username) {
        await this.username.fill(username);
    }

    async enterPassword(password) {
        await this.password.fill(password);
    }

    async clickLoginButton() {

        await this.loginButton.click();
    }

    async clickLogoutButton() {

        await this.logoutButton.click();
    }

    async isLogoutButtonVisible() {
        
        await this.logoutButton.waitFor({ state: 'visible' });
        expect(await this.logoutButton.isVisible()).toBe(true);

    }

    async isRegisterpageVisible() {
      
        await expect(this.regesterLink).toBeVisible();
        await this.regesterLink.click();
        await expect(this.page).toHaveURL('https://eventhub.rahulshettyacademy.com/register');
    }

    async isUserNameErrorVisible() {

        const userErrorMessage = await this.userNameError.textContent();
        console.log("User name error message is displayed: " + userErrorMessage);
        const isUserNameErrorVisible = await this.userNameError.isVisible();
        console.log("Email field visible:", isUserNameErrorVisible);

    }

    async isPasswordErrorVisible() {
        
        await this.password.isVisible();
    }

    async isInvalidCredentialsErrorVisible() {
        
        const invalidCredentialsErrorMessage = await this.InvalidCredentialsError.textContent();
        console.log("Invalid credentials error message is displayed: " + invalidCredentialsErrorMessage);
        const isInvalidCredentialsErrorVisible = await this.InvalidCredentialsError.isVisible();
        console.log("Invalid credentials error visible:", isInvalidCredentialsErrorVisible);
    }


}