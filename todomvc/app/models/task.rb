class Task < ActiveRecord::Base

	enum availableStatus: { active:0 , in_progress:1, completed:2 }

	validates_inclusion_of :status, in: Task.availableStatuses

	after_initialize :init

	def init
		@status = Task.availableStatuses[:active]
		@description = 'to do'
	end

end
