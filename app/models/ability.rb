class Ability
  include CanCan::Ability

  def initialize(user)
      unless user.is_a? Seller
        can :manage, :all
      else
        can :read, :all
      end
  end
end
