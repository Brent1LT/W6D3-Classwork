const APIUtil = require('./api_util.js');

class FollowToggle {
  constructor(el){
    this.$el = $(el);
    this.userId = this.$el.data('user-id');
    this.followState = this.$el.data("initial-follow-state");
    this.render();
    this.$el.on("click", this.handleClick.bind(this));
  }
  
  render() {
    if(this.followState === "following" || "unfollowing") this.$el.attr('disabled');
    if (this.followState === "followed") {
      // if(this.$el.prop('disabled')) this.$el.attr('enabled');
      this.$el.text("Unfollow!");
    } else {
      // if (this.$el.prop('disabled')) this.$el.attr('enabled');
      this.$el.text("Follow!");
    }

  }
  
  handleClick(e) {
    e.preventDefault();
    if(this.followState === "followed") {
      // this.followState = "unfollowing";
      // this.render();
      APIUtil.unfollowUser(this.userId).then(() => this.followState = 'unfollowed');
    } else {
      // this.followState = "following";
      // this.render();
      APIUtil.followUser(this.userId).then(() => this.followState = 'followed');
    }
    this.render();
  }
}

module.exports = FollowToggle;