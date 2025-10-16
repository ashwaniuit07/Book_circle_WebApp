import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["mainBoxes", "schoolOptions"]

  connect() {
    console.log("Stimulus Hello Controller connected")
  }

  showSchoolOptions() {
    // Hide the main boxes with smooth transition
    this.mainBoxesTarget.classList.add("opacity-0")
    setTimeout(() => {
      this.mainBoxesTarget.classList.add("hidden")
      
      // Show school options
      this.schoolOptionsTarget.classList.remove("hidden")
      setTimeout(() => {
        this.schoolOptionsTarget.classList.remove("opacity-0")
      }, 50) // small delay for smooth fade-in
    }, 300) // wait for opacity transition
  }
}
