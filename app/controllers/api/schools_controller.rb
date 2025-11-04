class Api::SchoolsController < ApplicationController
  def index
    board = params[:board]
    aff_code = params[:aff_code]

    # ✅ Select file based on board
    file_path =
      case board&.downcase
      when "cbse"
        Rails.root.join("app", "data", "cbse_data.json")
      when "icse"
        Rails.root.join("app", "data", "icse_data.json")
      else
        return render json: { error: "Invalid or missing board parameter" }, status: :bad_request
      end

    return render json: { error: "Data file not found" }, status: :not_found unless File.exist?(file_path)

    data = JSON.parse(File.read(file_path))

    # ✅ Match by affiliation number
    school = data.find { |s| s["affiliation_number"].to_s.strip == aff_code.to_s.strip }

    if school
      render json: {
        school_name: school["school_name"],
        affiliation_number: school["affiliation_number"],
        state: school["state"],
        city: school["city"],
        location: school["location"]
      }
    else
      render json: { message: "No school found with the provided affiliation number" }, status: :not_found
    end
  end
end
