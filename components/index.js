const indexDisplayData = (data) => {

    const overallData = (data) => {
        const totalUsers = document.getElementById('totalUsers');
        const totalPosts= document.getElementById('totalPosts');
        const totalGroups = document.getElementById('totalGroups');
        const totalComments = document.getElementById('totalComments');

        totalUsers.innerHTML = data.users.data.length ? data.users.data.length : "N/A";
        totalPosts.innerHTML = data.posts.data.length ? data.posts.data.length : "N/A";
        totalGroups.innerHTML = data.groups.data.length ? data.groups.data.length : "N/A";
        totalComments.innerHTML = data.comments.data.length ? data.comments.data.length : "N/A";
    }
    
    const recentPosts = (posts) => {
        const postsContainer = document.getElementById('recentPosts-container');
        postsContainer.innerHTML = posts.data.slice(0, 5).map(post => `
          <div class="post">
            <div class="post-header">
              <h3><a href='admin/posts/view_post.html?id=${post.post_id}' class="dashboard-post-title">${elipsisContent(post.title)}</a></h3>
              <h3>${DateFormat(post.created_at)}</h3>
            </div>
          </div>
        `).join(' ');
      };

    const mostFriends = (friends) => {
      const mostFriendsContainer = document.getElementById('mostfriends-container');
      mostFriendsContainer.innerHTML = friends.slice(0, 10).map((friend, index) => `
          <div class="friends">
            <h3>Top ${index + 1}: <a href='admin/users/view_user.html?id=${friend.user_id}'>${friend.username}</a></h3>
            <h3>Friends: ${friend.totalFriends}</h3>
          </div>
        `).join('');
    }
    
    const DateFormat = (date) => {
        const newDate = new Date(date);
        dateFormat = newDate.toLocaleString('default', { month: 'short' }) + ' ' + newDate.getDate() + ' '  + newDate.getFullYear();
        return dateFormat;
    }

    const sortTotalFriends = (friends) => {
      return friends.sort((a, b) => b.totalFriends - a.totalFriends)
    }

    const elipsisContent = (content) => {
      let elipsisText = " ";
      elipsisText = content.length <= 20 ? content : content.substr(0, 15) + '...';
      return elipsisText;
  }

    if(data){
      overallData(data);
      recentPosts(data.posts);
      mostFriends(sortTotalFriends(data.users.data));
    }
}