require "csv"
require "json"

namespace :import do
  desc "Import CBSE school data"
  task cbse: :environment do
    filepath = Rails.root.join("app", "data", "cbse.csv")
    unless File.exist?(filepath)
      puts "❌ CBSE CSV not found at #{filepath}"
      exit
    end

    data = CSV.read(filepath, headers: true)
    json_data = data.map do |row|
      {
        school_name: row["name"] || "Unknown",
        affiliation_number: row["aff_no"] || "N/A",
        state: row["state"] || "Unknown",
        city: row["district"] || "Unknown",
        location: row["address"] || "Unknown"
      }
    end

    output_path = Rails.root.join("app", "data", "cbse_data.json")
    File.write(output_path, JSON.pretty_generate(json_data))
    puts "✅ CBSE JSON created successfully at #{output_path}"
  end

  desc "Import ICSE school data"
  task icse: :environment do
    filepath = Rails.root.join("app", "data", "icse.csv")
    unless File.exist?(filepath)
      puts "❌ ICSE CSV not found at #{filepath}"
      exit
    end

    data = CSV.read(filepath, headers: true)
    json_data = data.map do |row|
      # Try to extract city-like part from the address
      address = row["address"] || "Unknown"
      possible_city = address.split(",")[1]&.strip || address.split(" ")[0] || "Unknown"

      {
        school_name: row["name"] || "Unknown",
        affiliation_number: row["code"] || "N/A",
        state: row["state"] || "Unknown",
        city: possible_city,
        location: address
      }
    end

    output_path = Rails.root.join("app", "data", "icse_data.json")
    File.write(output_path, JSON.pretty_generate(json_data))
    puts "✅ ICSE JSON created successfully at #{output_path}"
  end
end
