import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = [
    "mainBoxes",
    "schoolOptions",
    "schoolAdminForm",
    "schoolAdminLogin",
    "studentSignup",
    "studentLogin"
  ]

  connect() {
    console.log("Stimulus Hello Controller connected")
    this.hideAllSectionsOnLoad()

    // Optional: toggle student signup/login links that exist in forms
    document.getElementById("show-login")?.addEventListener("click", (e) => {
      e.preventDefault()
      this.showStudentLogin()
    })
    document.getElementById("show-signup")?.addEventListener("click", (e) => {
      e.preventDefault()
      this.showStudentSignup()
    })
  }

  // Hide student & admin sections initially; keep mainBoxes visible
  hideAllSectionsOnLoad() {
    if (this.schoolOptionsTarget) this.schoolOptionsTarget.classList.add("hidden")
    if (this.schoolAdminFormTarget) this.schoolAdminFormTarget.classList.add("hidden")
    if (this.schoolAdminLoginTarget) this.schoolAdminLoginTarget.classList.add("hidden")
    if (this.hasStudentSignupTarget) this.studentSignupTarget.classList.add("hidden")
    if (this.hasStudentLoginTarget) this.studentLoginTarget.classList.add("hidden")
  }

  // Hide everything (used when switching between screens)
  hideAllSections() {
    if (this.hasMainBoxesTarget) this.mainBoxesTarget.classList.add("hidden")
    if (this.hasSchoolOptionsTarget) this.schoolOptionsTarget.classList.add("hidden")
    if (this.hasSchoolAdminFormTarget) this.schoolAdminFormTarget.classList.add("hidden")
    if (this.hasSchoolAdminLoginTarget) this.schoolAdminLoginTarget.classList.add("hidden")
    if (this.hasStudentSignupTarget) this.studentSignupTarget.classList.add("hidden")
    if (this.hasStudentLoginTarget) this.studentLoginTarget.classList.add("hidden")
  }

  // Show the School / Student options screen (cards)
  showSchoolOptions() {
    // animate/hide mainBoxes and show schoolOptions
    if (this.hasMainBoxesTarget && this.hasSchoolOptionsTarget) {
      // fade out then hide mainBoxes
      this.mainBoxesTarget.classList.add("opacity-0")
      setTimeout(() => {
        this.mainBoxesTarget.classList.add("hidden")
        this.schoolOptionsTarget.classList.remove("hidden")
        // ensure visible (animation)
        setTimeout(() => this.schoolOptionsTarget.classList.remove("opacity-0"), 50)
      }, 200)
    } else {
      // fallback
      this.hideAllSections()
      if (this.hasSchoolOptionsTarget) this.schoolOptionsTarget.classList.remove("hidden")
    }
  }

  // Show School Admin signup form
  showSchoolAdminForm() {
    this.hideAllSections()
    if (this.hasSchoolAdminFormTarget) this.schoolAdminFormTarget.classList.remove("hidden")
  }

  // Show School Admin login form
  showSchoolAdminLogin() {
    this.hideAllSections()
    if (this.hasSchoolAdminLoginTarget) this.schoolAdminLoginTarget.classList.remove("hidden")
  }

  // Show student signup (from schoolOptions)
  showStudentSignup() {
    this.hideAllSections()
    if (this.hasStudentSignupTarget) this.studentSignupTarget.classList.remove("hidden")
  }

  // Show student login
  showStudentLogin() {
    this.hideAllSections()
    if (this.hasStudentLoginTarget) this.studentLoginTarget.classList.remove("hidden")
  }

  // Called by cross icons — return to the cards (schoolOptions)
  backToSchoolOptions() {
    this.hideAllSections()
    if (this.hasSchoolOptionsTarget) {
      // show the schoolOptions cards
      this.schoolOptionsTarget.classList.remove("hidden")
      // if mainBoxes were hidden, keep them hidden (we show schoolOptions only)
    } else if (this.hasMainBoxesTarget) {
      // fallback: show main boxes
      this.mainBoxesTarget.classList.remove("hidden")
    }
  }
}
