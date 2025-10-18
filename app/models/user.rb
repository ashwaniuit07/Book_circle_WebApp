class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  # ✅ Single combined enum
  enum role: {
    public_user: "public_user",
    student: "student",
    admin: "admin",
    school_admin: "school_admin"
  }

  after_initialize :set_default_role, if: :new_record?

  private

  def set_default_role
    self.role ||= "public_user"
  end
end
