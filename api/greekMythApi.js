// Endpoints for GreekMyth API
const posts_url = "http://localhost/GreekMythApi/api/posts.php";
const users_url = "http://localhost/GreekMythApi/api/users.php";
const groups_url = "http://localhost/GreekMythApi/api/groups.php";
const comments_url = "http://localhost/GreekMythApi/api/comments.php";

// Get User Id and Token
const token = localStorage.getItem('token');
const user_id = localStorage.getItem('user_id');

let fetchedData;

// Fetch Admin Data
async function fetchUserData() {
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
      // Deconstruct the data fetched
      const [postData, userData, groupData, commentData] = await Promise.all([
        fetchApi(posts_url),
        fetchApi(users_url),
        fetchApi(groups_url),
        fetchApi(comments_url),
      ]);
  
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
  

  fetchAllApis().then(() => {

    const currentURL = current_URL_Location();

    if(currentURL === "index.html"){
      indexDisplayData(fetchedData);
    }
    if(currentURL === "users.html") {
      userDisplayData(fetchedData.users);
    }

    console.log("Fetched data:", fetchedData);
  });

  fetchUserData();


const santizeInput = (input) => {
    return input.replace(/&/g, '&amp;')
                .replace(/>/g, "&gt;")
                .replace(/</g, '&lt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#39;');
}

const current_URL_Location = () => {
  const pathname = window.location.pathname;
  const lastPathSegment = pathname.split('/').pop();
  return lastPathSegment;
}