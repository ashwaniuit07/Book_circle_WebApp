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

    console.log("Stimulus Hello Controller connected ✅")

    this.hideAllSectionsOnLoad()

    this.setupGenerateButton() // ✅ add generate button listener if page has it

  }

  

  hideAllSectionsOnLoad() {

    if (this.hasSchoolOptionsTarget) this.schoolOptionsTarget.classList.add("hidden")

    if (this.hasSchoolAdminFormTarget) this.schoolAdminFormTarget.classList.add("hidden")

    if (this.hasSchoolAdminLoginTarget) this.schoolAdminLoginTarget.classList.add("hidden")

    if (this.hasStudentSignupTarget) this.studentSignupTarget.classList.add("hidden")

    if (this.hasStudentLoginTarget) this.studentLoginTarget.classList.add("hidden")

  }

  
  hideAllSections() {

    if (this.hasMainBoxesTarget) this.mainBoxesTarget.classList.add("hidden")

    if (this.hasSchoolOptionsTarget) this.schoolOptionsTarget.classList.add("hidden")

    if (this.hasSchoolAdminFormTarget) this.schoolAdminFormTarget.classList.add("hidden")

    if (this.hasSchoolAdminLoginTarget) this.schoolAdminLoginTarget.classList.add("hidden")

    if (this.hasStudentSignupTarget) this.studentSignupTarget.classList.add("hidden")

    if (this.hasStudentLoginTarget) this.studentLoginTarget.classList.add("hidden")

  }

  

  showSchoolOptions() {

    this.hideAllSections()

    if (this.hasSchoolOptionsTarget) this.schoolOptionsTarget.classList.remove("hidden")

  }

  

  showSchoolAdminForm() {

    this.hideAllSections()

    if (this.hasSchoolAdminFormTarget) this.schoolAdminFormTarget.classList.remove("hidden")

  }

  

  showSchoolAdminLogin() {

    this.hideAllSections()

    if (this.hasSchoolAdminLoginTarget) this.schoolAdminLoginTarget.classList.remove("hidden")

  }

  

  showStudentSignup() {

    this.hideAllSections()

    if (this.hasStudentSignupTarget) this.studentSignupTarget.classList.remove("hidden")

  }

  

  showStudentLogin() {

    this.hideAllSections()

    if (this.hasStudentLoginTarget) this.studentLoginTarget.classList.remove("hidden")

  }

  

  backToSchoolOptions() {

    this.hideAllSections()

    if (this.hasSchoolOptionsTarget) this.schoolOptionsTarget.classList.remove("hidden")

  }

  

  async fetchSchoolName(event) {

    const board = document.getElementById("school-board").value.trim()

    const affCode = document.getElementById("affiliation-code").value.trim()

    const schoolNameField = document.getElementById("school-name")

    const cityField = document.getElementById("school-city")

    const locationField = document.getElementById("school-location")

    const stateField = document.getElementById("school-state")

    const spinner = document.getElementById("spinner-icon")

  

    if (!board || !affCode) {

      spinner.classList.add("hidden")

      schoolNameField.value = ""

      cityField.value = ""

      locationField.value = ""

      stateField.value = ""

      return

    }

  

    schoolNameField.value = ""

    cityField.value = ""

    locationField.value = ""

    stateField.value = ""

  

    clearTimeout(this.typingTimer)

    spinner.classList.remove("hidden")

  

    this.typingTimer = setTimeout(async () => {

      try {

        const response = await fetch(`/api/schools?board=${board}&aff_code=${affCode}`)

        const data = await response.json()

  

        if (data && data.school_name) {

          schoolNameField.value = data.school_name || ""

          cityField.value = data.city || ""

          locationField.value = data.location || ""

          stateField.value = data.state || ""

        } else {

          schoolNameField.value = "Not Found"

        }

      } catch (error) {

        console.error("Error fetching school details:", error)

        schoolNameField.value = "Error fetching data"

      } finally {

        spinner.classList.add("fade-out")

        setTimeout(() => spinner.classList.add("hidden"), 300)

        spinner.classList.remove("fade-out")

      }

    }, 600)

  }

  

  // ✅ Generate Code feature with AJAX save

  setupGenerateButton() {

    const button = document.getElementById("generateBtn")

    const input = document.getElementById("generatedCode")

  

    if (!button || !input) return

  

    button.addEventListener("click", async () => {

      button.disabled = true

      button.textContent = "Loading..."

  

      const code = this.generateCode()

      input.value = code

  

      try {

        const response = await fetch("/save_generated_code", {

          method: "POST",

          headers: {

            "Content-Type": "application/json",

            "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]').getAttribute("content")

          },

          body: JSON.stringify({ generated_code: code })

        })

  

        const data = await response.json()

  

        if (data.success) {

          button.textContent = "Generated ✅"

          button.classList.add("opacity-70", "cursor-not-allowed")

        } else {

          button.disabled = false

          button.textContent = "Generate Code"

          alert("Failed to save code: " + (data.errors || data.message))

        }

      } catch (err) {

        button.disabled = false

        button.textContent = "Generate Code"

        alert("Error saving code: " + err)

      }

    })

  }

  

  generateCode() {

    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"

    let code = ""

    for (let i = 0; i < 6; i++) {

      code += chars.charAt(Math.floor(Math.random() * chars.length))

    }

    return code

  }


// ✅ Toggle Password Visibility (added)
togglePasswordVisibility(event) {
  const button = event.currentTarget;
  const input = button.previousElementSibling;

  // If input or button missing, exit
  if (!input) return;

  const isHidden = input.type === "password";
  input.type = isHidden ? "text" : "password";

  // Swap icon using Rails asset path
  const iconPath = isHidden
    ? "/assets/eye-off.svg"   // eye-off (hide)
    : "/assets/eye.svg";    // eye-open (show)

  // Replace SVG with the correct image
  button.innerHTML = `<img src="${iconPath}" alt="Toggle" class="w-5 h-5 filter grayscale">`;
}

}