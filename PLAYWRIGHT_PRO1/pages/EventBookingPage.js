import { expect } from '@playwright/test';

export class EventBookingPage {

    constructor(page) {
        this.page = page;
        this.browseEventsLink = page.locator("a[href='/events']").filter({ hasText: 'Browse Events' }).first();
        this.categoryDropdown = page.getByRole('combobox').first();
        this.bookNowButton = page.getByRole('link', { name: 'Book Now' }).first();
        this.fullName = page.locator("input[placeholder='Your full name']");
        this.email = page.locator("input[placeholder='you@email.com']");
        this.phoneNumber = page.locator("input[placeholder='+91 98765 43210']");
        this.confirmBookingButton = page.locator("button:has-text('Confirm Booking')");
        this.bookingConfirmationHeading = page.locator('h3:has-text("Booking Confirmed")');
        this.myBookingsLink = page.locator("a[href='/bookings']").filter({ hasText: 'My Bookings' }).first();
        this.myBookingsHeading = page.getByRole('heading', { name: 'My Bookings' });
        this.cancelBookingButton = page.locator('button#cancel-booking-btn').first();
        this.cancelBookingConfirmButton = page.locator('button', { hasText: 'Yes, cancel it' });
        this.bookingCards = page.locator('#booking-card');
        this.bookingCancleconformationCloseButton = page.locator("//button[@aria-label='Dismiss']");
    }

    async clickBrowseEvents() {
        await this.browseEventsLink.click();
        await expect(this.page.getByRole('heading', { name: 'Upcoming Events' })).toBeVisible();
        console.log('Browse Events page is opened');
    }

    async selectConferenceCategory() {
      
        await this.categoryDropdown.selectOption('Conference');
        await expect(this.categoryDropdown).toContainText('Conference');
        console.log('Conference category is selected');
    }

    async bookFirstEvent() {
        await this.bookNowButton.click();
        await expect(this.page.getByRole('heading', { name: /Book Tickets/i })).toBeVisible();
        console.log('First event booking form is opened');
    }

    async enterFullName(name) {
        await this.fullName.fill(name);
    }

    async enterEmail(email) {
        await this.email.fill(email);
    }

    async enterPhoneNumber(phone) {
        await this.phoneNumber.fill(phone);
    }

    async clickConfirmBooking() {
        await this.confirmBookingButton.click();
    }

    async verifyBookingConfirmation() {

        
        await expect(this.bookingConfirmationHeading).toBeVisible();
        await expect(this.page).toHaveURL(/\/events\/\d+/);
        console.log('Booking confirmation is visible');
    }

    async clickMyBookings() {
       
        await this.goToMyBookings();
    }

    async verifyBookingInMyBookings() {
        await expect(this.myBookingsHeading).toBeVisible();
        await expect(this.bookingCards.first()).toBeVisible();
        console.log('Booking is visible in My Bookings');
    }

 
    async verifyBookingCancellation() {
      
        await expect(this.page).toHaveURL(/\/bookings/);
        // verify there are no booking cards remaining
        const remaining = await this.bookingCards.count();
        await expect(remaining).toBe(0);

        console.log(remaining + ' booking cards remaining after cancellation');
        console.log('Booking cancellation verified (no remaining booking cards)');
    }

    async goToMyBookings() {
        await this.myBookingsLink.click();
        await expect(this.myBookingsHeading).toBeVisible();
        console.log('Navigated to My Bookings');
    }

    async cancelRecentBooking() {
      
        const initialCount = await this.bookingCards.count();
        await expect(this.cancelBookingButton).toBeVisible();
        await this.cancelBookingButton.click();
        await expect(this.cancelBookingConfirmButton).toBeVisible();
        await this.cancelBookingConfirmButton.click();
        await this.bookingCancleconformationCloseButton.click();

        if (initialCount > 0) {
            await expect(this.bookingCards).toHaveCount(initialCount - 1);
        }
        console.log('Recent booking canceled');
    }
}
