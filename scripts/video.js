console.log("video scripts added")


function getTimeString(time) {
    const hour = parseInt(time / 3600);
    let reminingSecond = time % 3600;
    const minute = parseInt(reminingSecond / 60);
    reminingSecond = reminingSecond % 60;

    return `${hour}hrs ${minute}min ${reminingSecond}sec`
}

const remiveActiveClass = () => {

    const buttons = document.getElementsByClassName("category-btn")
    console.log(buttons)

    for (let btn of buttons) {
        btn.classList.remove("active")
    }


}

const loadCategories = () => {
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
        .then(res => res.json())
        .then(data => displayCategories(data.categories))
        .catch(error => console.log(error))
}


const loadVideos = (searchText = "") => {
    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
        .then(res => res.json())
        .then(data => displayVideos(data.videos))
        .catch(error => console.log(error))

}

function loadCategorisVideo(id) {

    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
        .then(res => res.json())
        .then(data => {
            // call remove active button 

            remiveActiveClass()

            const activeBtn = document.getElementById(`btn-${id}`)
            activeBtn.classList.add("active")
            console.log(activeBtn)
            displayVideos(data.category)

        })
}


const loadDetalis = async (videoId) => {
    console.log(videoId);
    const url = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`
    const res = await fetch(url)
    const data = await res.json()
    displyeDetalis(data.video)
}

const displyeDetalis = (video) => {
    console.log(video)
    const detalisConatainer = document.getElementById('model-contant');


    detalisConatainer.innerHTML =
        `
    <img src="${video.thumbnail}" />
    <p>${video.description}</p>
    <p class=" font-semibold text-red-700"> ${video.others.views}</p>
    `

    //way 1 
    // document.getElementById("showModelData").click();

    //way 2
    document.getElementById("customModel").showModal();


}
// const cardDamo = {
//     "category_id": "1001",
//     "video_id": "aaaa",
//     "thumbnail": "https://i.ibb.co/L1b6xSq/shape.jpg",
//     "title": "Shape of You",
//     "authors": [
//         {
//             "profile_picture": "https://i.ibb.co/D9wWRM6/olivia.jpg",
//             "profile_name": "Olivia Mitchell",
//             "verified": ""
//         }
//     ],
//     "others": {
//         "views": "100K",
//         "posted_date": "16278"
//     },
//     "description": "Dive into the rhythm of 'Shape of You,' a captivating track that blends pop sensibilities with vibrant beats. Created by Olivia Mitchell, this song has already gained 100K views since its release. With its infectious melody and heartfelt lyrics, 'Shape of You' is perfect for fans looking for an uplifting musical experience. Let the music take over as Olivia's vocal prowess and unique style create a memorable listening journey."
// }

const displayVideos = (videos) => {
    const videosContainer = document.getElementById("videos")
    videosContainer.innerHTML = " ";

    if (videos.length == 0) {
        videosContainer.classList.remove("grid");
        videosContainer.innerHTML =
            `
    <div class=" min-h-[300px] flex flex-col gap-5 justify-center items-center">
        <img src="assets/icon.png" />
        <h2 class=" text-center text-xl font-bold text-red-600">No Content Here in this Categery</h2>
    </div>
    `

    }
    else {
        videosContainer.classList.add("grid")

    }

    console.log(videos)
    videos.forEach(video => {
        console.log(video);

        const card = document.createElement("div");
        card.classList = "card card-compact"
        card.innerHTML = `
        <figure class ="h-[200px] relative">
    <img
      src=${video.thumbnail}
      class="h-full w-full object-cover"
      alt="Shoes" />
      ${video.others.posted_date?.length == 0 ? " " : `<span class=" absolute text-sm right-2 bottom-2 p-1 bg-black text-white rounded">${getTimeString(video.others.posted_date)}</span>`}
      
  </figure>
  <div class="px-0 py-2 flex gap-2">
     <div>
     <img class="w-11 h-10 rounded-full object-cover" src=${video.authors[0].profile_picture} />
     </div>
    <div>
         <h2 class="font-bold">${video.title} </h2>
        <div class=" flex items-center gap-2 ">
            <p class=" text-gray-400">${video.authors[0].profile_name}</p>
           
        ${video.authors[0].verified == true ? `<img class=" w-5" src="https://img.icons8.com/?size=48&id=D9RtvkuOe31p&format=png"/>` : " "}


        </div>
        <p> <button onClick="loadDetalis('${video.video_id}')"  class="btn btn-sm btn-error"> Detalis </button></p>
    </div>
        
  </div>
         `;
        videosContainer.append(card);

    });
}

const displayCategories = (categories) => {

    const categoriesContainer = document.getElementById('category')

    categories.forEach(item => {

        console.log(item)


        const buttonContainer = document.createElement("div");
        buttonContainer.innerHTML =
            `
       <button id="btn-${item.category_id}" onClick="loadCategorisVideo(${item.category_id})" class="btn  category-btn"> ${item.category}</button>
       `

        categoriesContainer.append(buttonContainer);
    });

}

document.getElementById('search-input').addEventListener("keyup", (evant) => {
    loadVideos(evant.target.value);

})

loadCategories()
loadVideos()