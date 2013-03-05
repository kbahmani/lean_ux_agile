class User < ActiveRecord::Base
  attr_accessible :email, :family, :name
end
