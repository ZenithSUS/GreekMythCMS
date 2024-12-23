// Endpoints for GreekMyth API
const posts_url = "http://localhost/GreekMythApi/api/posts.php";
const users_url = "http://localhost/GreekMythApi/api/users.php";
const groups_url = "http://localhost/GreekMythApi/api/groups.php";
const comments_url = "http://localhost/GreekMythApi/api/comments.php";


// Get User Id and Token from local storage
const token = localStorage.getItem('token');
const user_id = localStorage.getItem('user_id');

// Object to store the fetched data
let fetchedData;

// Fetch Admin Data
async function fetchAdminData() {
    try {
      const response = await fetch('http://localhost/GreekMythApi/api/users.php?user_id=' + user_id, {
          method: "GET",
          headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
          }
      });
      const data = await response.json();
      document.getElementById('username').innerHTML = data.data[0].username;
      document.getElementById('profile-pic').src = data.data[0].image_src;
    
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }

  
//Fetch Endpoints of GreekMyth API
const fetchApi = async (url) => {
    const response = await fetch(url, {
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
const fetchAllApis = async () => {
    try {
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
    
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  
  async function fetchData() {
    try {
      await fetchAllApis();

      if(fetchAllApis()){
        const currentURL = current_URL_Location();
        checkURL(currentURL);
        console.log("Fetched data:", fetchedData);
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