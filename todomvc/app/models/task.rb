class Task < ActiveRecord::Base

	enum availableStatus: { active:0 , in_progress:1, completed:2 }

	validates_inclusion_of :status, in: Task.availableStatuses
	validates :description, presence: true , allow_blank: false

end
