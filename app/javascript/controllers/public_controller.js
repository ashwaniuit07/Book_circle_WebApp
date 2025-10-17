import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["mainBoxes", "formSection", "signupForm", "loginForm"]

  connect() {
    console.log("✅ Public Controller connected")
  }

  showSignupForm() {
    // Hide main boxes
    this.mainBoxesTarget.classList.add("opacity-0")
    setTimeout(() => {
      this.mainBoxesTarget.classList.add("hidden")
      this.formSectionTarget.classList.remove("hidden")
      this.signupFormTarget.classList.remove("hidden")
      this.loginFormTarget.classList.add("hidden")
    }, 300)
  }

  showLoginForm() {
    this.signupFormTarget.classList.add("hidden")
    this.loginFormTarget.classList.remove("hidden")
  }

  closeForm() {
    this.formSectionTarget.classList.add("hidden")
    this.mainBoxesTarget.classList.remove("hidden")
    setTimeout(() => {
      this.mainBoxesTarget.classList.remove("opacity-0")
    }, 50)
  }
}
