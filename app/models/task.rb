class Task < ActiveRecord::Base

	enum availableStatus: { active:0 , in_progress:1, completed:2 }

	validates :status, 
			  :inclusion=> { :in => Task.availableStatuses.values ,
			  :message => "Value '#{@status}' is not included in available statuses #{Task.availableStatuses}" }

	validates :description, presence: true , allow_blank: false

end
