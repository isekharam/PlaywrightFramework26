import { test } from '@playwright/test';
import { POManager } from '../pages/POManager';

test.describe('Event Booking', () => {

  let poManager;

  test.beforeEach(async ({ page }) => {
    poManager = new POManager(page);
  });

  test('TC_BOOK_01 Verify successful event booking', async ({ page }) => {
    const loginPage = poManager.getLoginPage();
    const eventBookingPage = poManager.getEventBookingPage();

    await loginPage.launchURL();
    await loginPage.enterUsername('dummydol@yahoo.com');
    await loginPage.enterPassword('Hyderabad@12345');
    await loginPage.clickLoginButton();

    await eventBookingPage.clickBrowseEvents();
    await eventBookingPage.selectConferenceCategory();
    await eventBookingPage.bookFirstEvent();
    await eventBookingPage.enterFullName('Automation User');
    await eventBookingPage.enterEmail('test@raga.com');
    await eventBookingPage.enterPhoneNumber('7565344344');
    await eventBookingPage.clickConfirmBooking();
    await eventBookingPage.verifyBookingConfirmation();
    await eventBookingPage.clickMyBookings();
    await eventBookingPage.verifyBookingInMyBookings();
    await eventBookingPage.cancelRecentBooking();
    await eventBookingPage.verifyBookingCancellation();
    await loginPage.clickLogoutButton();

   
    console.log('Event booking was completed successfully');
  });
});
