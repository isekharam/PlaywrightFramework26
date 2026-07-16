import { Loginpage } from "./Loginpage";
import { EventBookingPage } from "./EventBookingPage";

export class POManager{
    constructor(page) {
        this.page = page;
        this.loginPage = new Loginpage(this.page);
        this.eventBookingPage = new EventBookingPage(this.page);
    }

    getLoginPage() {
        return this.loginPage;
    }

    getEventBookingPage() {
        return this.eventBookingPage;
    }
}