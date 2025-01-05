// Endpoints for GreekMyth API
const posts_url = "https://zenithsus.infinityfreeapp.com/GreekMythApi/api/posts.php";
const users_url = "https://zenithsus.infinityfreeapp.com/GreekMythApi/api/users.php";
const groups_url = "https://zenithsus.infinityfreeapp.com/GreekMythApi/api/groups.php";
const comments_url = "https://zenithsus.infinityfreeapp.com/GreekMythApi/api/comments.php";


// Get the current URL
const current_URL_Location = () => {
  const pathname = window.location.pathname;
  const lastPathSegment = pathname.split('/').pop();
  return lastPathSegment;
}

// Check the current URL and display the data
const checkURL = (currentURL) => {
  if(currentURL === "index.html"){
    indexDisplayData(fetchedData);
  }
  if(currentURL === "users.html") {
    userDisplayData(fetchedData.users);
  }
  if(currentURL === "posts.html"){
    postDisplayData(fetchedData.posts);
  }
  if(currentURL === "comments.html"){
    commentDisplayData(fetchedData.comments);
  }
  if(currentURL === "groups.html"){
    groupDisplayData(fetchedData.groups);
  }
}


// Get User data from local storage
const token = localStorage.getItem('token');
const user_id = localStorage.getItem('user_id');
const theme = localStorage.getItem('theme');
const font_style = localStorage.getItem('font-style');

// Object to store the fetched data
let fetchedData;

// Fetch Admin Data
async function fetchAdminData() {
    try {
      const response = await fetch('https://zenithsus.infinityfreeapp.com/GreekMythApi/api/users.php?user_id=' + user_id, {
          method: "GET",
          headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
          }
      });
      const data = await response.json();
      document.getElementById('username').innerHTML = data.data[0].username;
      document.getElementById('profile-pic').src = data.data[0].image_src;
      return data;
    } catch (error) {
      console.error('Error fetching user data:', error);
      return null;
    }
  }

  
const fetchApi = async (url, page = 1, limit = 10) => {
    let fetchurl = '';
    if (current_URL_Location() !== "index.html") {
        fetchurl = `${url}?page=${page}&limit=${limit}`;
    } else {
      fetchurl = url;
    }
    
    const response = await fetch(fetchurl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
    });

    const data = await response.json();
    return data;
}


// Fetch the Endpoints at the same time
const fetchAllApis = async (page) => {
    try {
      if(current_URL_Location() === "index.html"){
        // Deconstruct the data fetched from the API
      const [postData, userData, groupData, commentData] = await Promise.all([
        
        fetchApi(posts_url),
        fetchApi(users_url),
        fetchApi(groups_url),
        fetchApi(comments_url),
      ]);
      
      // Store the fetched data in an object
      fetchedData = {
          posts: postData, 
          users: userData, 
          groups : groupData,
          comments: commentData
        };
      } 

      if(current_URL_Location() === "groups.html"){
        const groupData = await fetchApi(groups_url, page);
        fetchedData = { groups: groupData }
      }

      if(current_URL_Location() === "users.html"){
        const userData = await fetchApi(users_url, page);
        fetchedData = { users: userData };
      }

      if(current_URL_Location() === "posts.html"){
        const postData = await fetchApi(posts_url, page);
        fetchedData = { posts: postData }; 
      }

      if(current_URL_Location () === "comments.html"){
        const commentData = await fetchApi(comments_url, page);
        fetchedData = { comments: commentData };
      }
      
    
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  let currentPage = 1;
  
  async function fetchData(page = currentPage) {
    try {
      await fetchAllApis(page);

      if(fetchAllApis()){
        const currentURL = current_URL_Location();
        checkURL(currentURL);
        if(fetchedData) {
          console.log("Fetched data:", fetchedData);
        }
        
      }
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  }

  fetchData();
  fetchAdminData();


// Santize Input for HTML to prevent XSS
const santizeInput = (input) => {
    return input.replace(/&/g, '&amp;')
                .replace(/>/g, "&gt;")
                .replace(/</g, '&lt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#39;');
}

