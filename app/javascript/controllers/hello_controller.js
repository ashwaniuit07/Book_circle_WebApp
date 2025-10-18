import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["mainBoxes", "schoolOptions", "schoolAdminForm", "schoolAdminLogin"]

  connect() {
    console.log("Stimulus Hello Controller connected")
    this.hideAllSectionsOnLoad()
  }

  // Only hide forms initially; keep mainBoxes visible
  hideAllSectionsOnLoad() {
    if (this.schoolOptionsTarget) this.schoolOptionsTarget.classList.add("hidden")
    if (this.schoolAdminFormTarget) this.schoolAdminFormTarget.classList.add("hidden")
    if (this.schoolAdminLoginTarget) this.schoolAdminLoginTarget.classList.add("hidden")
  }

  // Hide everything (used when switching between sections)
  hideAllSections() {
    if (this.mainBoxesTarget) this.mainBoxesTarget.classList.add("hidden")
    if (this.schoolOptionsTarget) this.schoolOptionsTarget.classList.add("hidden")
    if (this.schoolAdminFormTarget) this.schoolAdminFormTarget.classList.add("hidden")
    if (this.schoolAdminLoginTarget) this.schoolAdminLoginTarget.classList.add("hidden")
  }

  // Show the School / Student options screen
  showSchoolOptions() {
    this.hideAllSections()
    this.schoolOptionsTarget.classList.remove("hidden")
  }

  // Show School Admin signup form
  showSchoolAdminForm() {
    this.hideAllSections()
    this.schoolAdminFormTarget.classList.remove("hidden")
  }

  // Show School Admin login form
  showSchoolAdminLogin() {
    this.hideAllSections()
    this.schoolAdminLoginTarget.classList.remove("hidden")
  }

  // Go back to School / Student options screen
  backToSchoolOptions() {
    this.hideAllSections()
    this.schoolOptionsTarget.classList.remove("hidden")
  }
}
