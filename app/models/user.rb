
class User < ApplicationRecord
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  enum role: { public_user: "public_user", school_admin: "school_admin", student: "student" }

  after_initialize :set_default_role, if: :new_record?

  def set_default_role
    self.role ||= "public_user"
  end
end
