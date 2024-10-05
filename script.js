//Auto load post inside a function from All posts api
const loadPosts = async (category) => {
  // console.log(`https://openapi.programming-hero.com/api/retro-forum/posts${category?`?category=${category}`:""}`);

  // if(category){
  //     console.log(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${category}`);
  // }
  // else{
  //     console.log(`https://openapi.programming-hero.com/api/retro-forum/posts`);
  // }

  const res = await fetch(
    `https://openapi.programming-hero.com/api/retro-forum/posts${
      category ? `?category=${category}` : ""
    }`
  );
  const data = await res.json();
  displayAllPost(data.posts);
};


//Latest post 
const loadLatestPost = async () => {
  const uri = "https://openapi.programming-hero.com/api/retro-forum/latest-posts";
  
    const res = await fetch(uri);
    const data = await res.json();
    displayLatestPost(data);
  
}

const displayLatestPost = (posts) => {
  posts.forEach(post => {
    const latestPostContainer = document.getElementById("latest-post-container");
    console.log("hi post", post);
    //create new card for showing latest post
    const div = document.createElement("div")
    div.classList.add("card", "lg:w-96", "pb-5", "bg-base-100", "shadow-2xl");
    div.innerHTML = `

          <figure class="lg:px-6 px-4 pt-4 lg:pt-8">
              <img
                  src="${post.cover_image
                  }"
                  alt="Shoes"
                  class="rounded-xl"
              />
          </figure>
          <div class="p-5 lg:p-10 space-y-4 lg:space-y-5">
              <p class="opacity-50 text-start">
                  <i class="fa-solid fa-calendar-days me-2"></i>${post.author.posted_date ? post.author.posted_date : "No publish date"}
              </p>
              <h2 class="card-title text-start">${post.title}</h2>
              <p class="text-start">
                  ${post.description}
              </p>
              <div class="card-actions flex gap-5 items-center">
                  <div class="avatar">
                      <div
                          class="lg:w-12 w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2"
                      >
                          <img
                          src="${post.profile_image}"
                          />
                      </div>
                  </div>
              <div>
              <h3 class="text-start font-extrabold">${post.author.name}</h3>
              <p class="text-start opacity-60">${post.author.designation ? post.author.designation : "Unknown"}</p>
          </div>
    `
    latestPostContainer.appendChild(div);
  })
}

const displayAllPost = (posts) => {
  const postContainer = document.getElementById("post-container");
  postContainer.innerHTML = "";
  posts.forEach((post) => {
    console.log(post);
    const div = document.createElement("div");
    div.classList.add(
      "flex",
      "gap-6",
      "p-10",
      "bg-[#F3F3F5]",
      "rounded-2xl"
    );
    div.innerHTML = `
        <div class="indicator ">
                  <span class="indicator-item badge ${post.isActive ? "bg-green-600" : "bg-red-500"
                  }"></span>
                  <div class = "avatar">
                  <div class="bg-white grid w-[72px] h-[72px] place-items-center rounded-2xl">
                  <img src="${post.image}" />
                  </div>
                  </div>
                </div>
                <!-- right side -->
                <div class="w-full">
                  <div class="border-b-4 border-dashed pb-5 space-y-4">
                    <div  class="flex gap-5 text-sm font-medium">
                      <p>#${post.category} </ span>
                      <p>Author: ${post.author.name}</ span>
                    </div>
                    <h2 class="text-xl font-bold">${post.title}</h2>
                    <p class="text-gray-500">${post.description}</p>
                  </div>
                  <!-- icons -->
                  <div class="flex justify-between mt-6">
                    <div class="flex gap-[25px]">
                      <div class="flex items-center gap-4 text-gray-500">
                        
                        <p><i class="fa-regular fa-message w-[21px] h-[20px] text-gray-500"></i></p>
                        <p class="">${post.
                            comment_count}</p>
                      </div>
                      <div class="flex items-center gap-4 ">
                        <p><i class="fa-regular fa-eye w-[21px] h-[20px] text-gray-500"></i></p>
                        <p class="text-gray-500">${post.view_count
                        }</p>
                      </div>
                      <div class="flex items-center gap-4">
                        <p><i class="fa-regular fa-clock w-[21px] h-[20px] text-gray-500"></i></p>
                        <p class="text-gray-500">${post.posted_time

                        }</p>
                      </div>
                    </div>
                    <button id="addToList" onclick = "markAsRead('${post.description}', '${post.view_count}')"  class="w-7 h-7 bg-[#10B981] opacity-100 flex justify-center items-center rounded-full text-white text-[18px]"><i class="fa-solid fa-envelope-open-text"></i></button>
                    
                  </div>
              </div>
        `;
    postContainer.appendChild(div);
  });
};

loadPosts();
loadLatestPost();

const handleSearchByCategory = () => {
  const searchText = document.getElementById("searchPosts").value;
  // console.log(searchText);
  loadPosts(searchText);
};

//To do list function
const markAsRead = (description, viewCount) => {
    const markAsReadContainer = document.getElementById("markAsReadContainer");
    let getMarkCounter = document.getElementById("markAsReadCounter");
    const markCounter = Number(getMarkCounter.innerText) + 1;

    //Way-1 to add value
    // document.getElementById("markAsReadCounter").innerText = markCounter;

    //way-2 to add value
    getMarkCounter.innerText = markCounter;
    
    
    const div = document.createElement("div");

    div.classList.add("flex", "justify-between", "items-center", "bg-white", "p-4", "rounded-2xl")
    div.innerHTML = `
    <h3 class = "font-semibold text-black">${description}</h3>
    <div class="flex items-center gap-4 ">
        <p><i class="fa-regular fa-eye w-[21px] h-[20px] text-gray-500"></i></p>
        <p class="text-gray-500">${viewCount}</p>
    </div>
    `
    markAsReadContainer.appendChild(div);
}

// {
//     "id": 101,
//     "category": "Comedy",
//     "image": "https://i.ibb.co/0QRxkd5/pexels-jan-kop-iva-3525908.jpg",
//     "isActive": true,
//     "title": "10 Kids Unaware of Their Costume",
//     "author": {
//         "name": "John Doe"
//     },
//     "description": "It is one thing to subject yourself to a costume mishap",
//     "comment_count": 560,
//     "view_count": 1568,
//     "posted_time": 5
// }


// Uncaught SyntaxError: missing ) after argument list (at index.html:1:12)