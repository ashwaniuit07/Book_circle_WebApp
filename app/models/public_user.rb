class PublicUser < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  # ✅ Attach profile picture using Active Storage
  has_one_attached :profile_picture

  # ✅ Validations for additional profile details
  validates :name, presence: true, length: { minimum: 2 }, allow_nil: true
  validates :phone, length: { is: 10 }, allow_blank: true
  validates :location, length: { maximum: 100 }, allow_blank: true
  validates :bio, length: { maximum: 300 }, allow_blank: true
end
