import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["mainBoxes", "schoolOptions"]

  connect() {
    console.log("Stimulus Hello Controller connected")

    // Add listeners for signup/login toggle
    document.getElementById("show-login")?.addEventListener("click", this.showLogin.bind(this))
    document.getElementById("show-signup")?.addEventListener("click", this.showSignup.bind(this))
  }

  showSchoolOptions() {
    this.mainBoxesTarget.classList.add("opacity-0")
    setTimeout(() => {
      this.mainBoxesTarget.classList.add("hidden")
      this.schoolOptionsTarget.classList.remove("hidden")
      setTimeout(() => this.schoolOptionsTarget.classList.remove("opacity-0"), 50)
    }, 300)
  }

  showStudentSignup() {
    this.schoolOptionsTarget.classList.add("hidden")
    document.getElementById("student-signup").classList.remove("hidden")
  }

  showLogin(event) {
    event.preventDefault()
    document.getElementById("student-signup").classList.add("hidden")
    document.getElementById("student-login").classList.remove("hidden")
  }

  showSignup(event) {
    event.preventDefault()
    document.getElementById("student-login").classList.add("hidden")
    document.getElementById("student-signup").classList.remove("hidden")
  }
}
