// Section 6,7, 8

// Do not modify the below following code
class Achivement {
  constructor(data = null, target = "#achivements") {
    this.Target = target;
    if (data) {
      this.Data = data;
    } else {
      this.Data = [
        {
          title: "Startups Incubated",
          value: 10,
          description: "Startups Incubated",
          icon: "https://img.freepik.com/premium-vector/business-incubator-businesspeople-investors-supporting-new-businesses-money-professional-assistance-start-up-project-flat-vector-illustration_277904-23829.jpg?w=740",
        },
        {
          title: "Entrepreneurs Engaged",
          value: 10,
          description: "Entrepreneurs Engaged",
          icon: "https://previews.123rf.com/images/bilahstudio/bilahstudio2102/bilahstudio210200292/175360238-business-graphic-vector-creative-illustration-entrepreneurs-engaged-in-teamwork-building-business.jpg",
        },
        {
          title: "Funds",
          value: 10,
          description: "Funds Provided to Startups",
          icon: "https://cdn.fundsindia.com/prelogin/slideshow/welcome-to-fundsindia.webp",
        },
        {
          title: "Jobs Created",
          value: 10,
          description: "Jobs Created by Startups Incubated",
          icon: "https://i.pinimg.com/736x/59/89/b1/5989b169e93d36c18b1db3064349135f.jpg",
        },
        {
          title: "Graduated",
          value: 10,
          description: "Graduated from Incubation Program",
          icon: "https://www.freeiconspng.com/uploads/graduation-icon-9.png",
        },
        {
          title: "Valuation",
          value: 10,
          description: "Valuation of Startups Incubated",
          icon: "https://info.sapphirecapitalpartners.co.uk/hubfs/Blog_Photos/shutterstock_503293813.jpg",
        },
      ];
    }
  }

  setData(elem) {
    let content = `
          <a class="col achivlink"  href="/achivment/${elem.title}">
          <div class="card achiv-card">
              <img src="${elem.icon}"
                  class="card-img-top" alt="${elem.title}">
              <div class="card-body">
                  <h5 class="card-title text-uppercase text-wrap">${elem.title}</h5>
                  <p class="card-text text-wrap">${elem.description}</p>
  
              </div>
          </div>
  
      </a>`;
    $(this.Target).append(content);
  }
}

class LatestEvent {
  constructor(data = null, target = "#eventList") {
    this.Target = target;
    if (data) {
      this.Data = data;
    } else {
      this.Data = [
        {
          id: 1,
          title: "Event 1",
          description: "Event 1 Description",
          date: "2023-10-30",
          image: "https://nsutiif.in/img/event/event3.png",
        },
        {
          id: 2,
          title: "Event 2",
          description: "Event 2 Description",
          date: "2023-10-30",
          image: "https://nsutiif.in/img/event/event3.png",
        },
        {
          id: 3,
          title: "Event 3",
          description: "Event 3 Description",
          date: "2023-10-30",
          image: "https://nsutiif.in/img/event/event3.png",
        },
        {
          id: 4,
          title: "Event 4",
          description: "Event 4 Description",
          date: "2023-10-30",
          image: "https://nsutiif.in/img/event/event3.png",
        },
        {
          id: 5,
          title: "Event 5",
          description: "Event 5 Description ",
          date: "2023-10-30",
          image: "https://nsutiif.in/img/event/event3.png",
        },
        {
          id: 6,
          title: "Event 6",
          description: "Event 6 Description",
          date: "2023-10-30",
          image: "https://nsutiif.in/img/event/event3.png",
        },
      ];
    }
  }
  setData(elem) {
    let date = new Date(elem.date);
    let content = `<div class="ev-sudo">
          <div class="card ev-cd m-2 border-0 p-0">
          <a href=  "/event?${
            elem.id
          }" class="position-relative text-decoration-none text-light">
            <div class="position-absolute bg-secondary p-1 date">
              <div class="date-day">${date.getDate()}</div>
              <div class="date-month">${date.toLocaleString("default", {
                month: "short",
              })}</div>
              <div class="date-year">${date.getFullYear()}</div>
            </div>
            <img
              src="${elem.image}"
              alt="${elem.title}"
              class="card-img-top ev-cd-img"
            />
          </a>
          <div class="card-body pb-1">
            <a
              href="/event?${elem.id}"
              class="card-title my-1 text-dark text-capitalize font-weight-bold text-decoration-none h5"
              >${elem.title}</a
            >
            <p class="card-text my-2">
              ${elem.description}
            </p>
            <a href="/event?${elem.id}" class="btn btn-secondary my-3"
              >Read More <i class="fa-solid fa-arrow-right"></i
            ></a>
          </div>
        </div>
          </div>`;
    $(this.Target).append(content);
  }
}

class SuccessStory {
  constructor(data = null, target = "#successStory") {
    this.Target = target;
    if (data) {
      this.Data = data;
    } else {
      this.Data = [
        {
          startup: "Startup 1",
          postion: "Founder",
          story:
            "Startup 1 Story,Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse nemo magnam tempora perferendis eveniet doloremque labore nobis cum ullam blanditiis reiciendis vero est quaerat quas id atque, quibusdam ut nisi?",
          image: "https://nsutiif.in/img/event/event3.png",
        },
        {
          startup: "Startup 2",
          postion: "Founder",
          story:
            "Startup 2 Story,Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse nemo magnam tempora perferendis eveniet doloremque labore nobis cum ullam blanditiis reiciendis vero est quaerat quas id atque, quibusdam ut nisi?",
          image: "https://nsutiif.in/img/event/event3.png",
        },
        {
          startup: "Startup 3",
          postion: "Founder",
          story:
            "Startup 3 Story, Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse nemo magnam tempora perferendis eveniet doloremque labore nobis cum ullam blanditiis reiciendis vero est quaerat quas id atque, quibusdam ut nisi?",
          image: "https://nsutiif.in/img/event/event3.png",
        },
        {
          startup: "Startup 4",
          postion: "Founder",
          story:
            "Startup 4 Story, Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse nemo magnam tempora perferendis eveniet doloremque labore nobis cum ullam blanditiis reiciendis vero est quaerat quas id atque, quibusdam ut nisi?",
          image: "https://nsutiif.in/img/event/event3.png",
        },
        {
          startup: "Startup 5",
          postion: "Founder",
          story:
            "Startup 5 Story, Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse nemo magnam tempora perferendis eveniet doloremque labore nobis cum ullam blanditiis reiciendis vero est quaerat quas id atque, quibusdam ut nisi?",
          image: "https://nsutiif.in/img/event/event3.png",
        },
        {
          startup: "Startup 6",
          postion: "Founder",
          story:
            "Startup 6 Story, Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse nemo magnam tempora perferendis eveniet doloremque labore nobis cum ullam blanditiis reiciendis vero est quaerat quas id atque, quibusdam ut nisi?",
          image: "https://nsutiif.in/img/event/event3.png",
        },
      ];
    }
  }
  setData(elem) {
    let content = `<div class="sCard-sudo">
      <div class="card sCard">
        <div class="sStory-header">
          <div class="sStory-img">
            <img
              src="${elem.image}"
              alt="${elem.startup}"
              srcset=""
              class=""
            />
          </div>
          <h3>${elem.postion} of <span>${elem.startup}</span></h3>
        </div>
        <hr>
        <p class="pt-0 card-body m-0">
          ${elem.story}
        </p>
      </div>
    </div>`;
    $(this.Target).append(content);
  }
}

// Do not modify the above following code

// Please modify the following code according to your need at time of creating Class object
$(document).ready(function () {
  // Push the data from here using data argument to pass json data

  let achivements = new Achivement();
  $("#achivements").empty();
  achivements.Data.forEach(function (elem) {
    achivements.setData(elem);
  });
  let latestEvent = new LatestEvent();
  $("#eventList").empty();
  latestEvent.Data.forEach(function (elem) {
    latestEvent.setData(elem);
  });

  let successStory = new SuccessStory();
  $("#successStory").empty();
  successStory.Data.forEach(function (elem) {
    successStory.setData(elem);
  });

  $(".left").click(function () {
    var leftPos = $("div#eventList").scrollLeft();
    // console.log(leftPos);
    $("div#eventList").animate(
      {
        scrollLeft: leftPos - 300,
      },
      800
    );
  });

  $(".right").click(function () {
    var leftPos = $("div#eventList").scrollLeft();
    // console.log(leftPos);
    $("div#eventList").animate(
      {
        scrollLeft: leftPos + 300,
      },
      800
    );
  });
});




//Section 8(Offerings and Collaborations) JS
//Collaboration Container
const carousel1 = document.querySelector(".collaboration-carousel");
firstImg = carousel1.querySelectorAll("img")[0];
arrowIcons = document.querySelectorAll(".collaboration-wrapper i");

let isDragStart1 = false, isDragging1 = false, prevPageX, prevScrollLeft, positionDiff;




const showHideIcons = () => {
    // getting max scrollable width
    let scrollWidth = carousel1.scrollWidth - carousel1.clientWidth;
    let scrollLeft = carousel1.scrollLeft;

    // setting a threshold for comparison
    let threshold = 1;

    // If the scroll position is less than the threshold, hide the left arrow
    arrowIcons[0].style.display = scrollLeft <= threshold ? "none" : "block";

    // If the scroll position is within a threshold of the max scrollable width, hide the right arrow
    arrowIcons[1].style.display = scrollLeft >= scrollWidth - threshold ? "none" : "block";
};




arrowIcons.forEach(icon => {
    icon.addEventListener("click", () => {
        let firstImgWidth = firstImg.clientWidth + 14; // getting first img width & adding 14 margin value
        // if clicked icon is left, reduce width value from the carousel scroll left else add to it
        carousel1.scrollLeft += icon.id == "left" ? -firstImgWidth : firstImgWidth;
        setTimeout(() => showHideIcons(), 60); // calling showHideIcons after 60ms
    });
});

const autoSlide = () => {
    // if there is no image left to scroll then return from here
    if(carousel1.scrollLeft - (carousel1.scrollWidth - carousel1.clientWidth) > -1 || carousel1.scrollLeft <= 0) return;

    positionDiff = Math.abs(positionDiff); // making positionDiff value to positive
    let firstImgWidth = firstImg.clientWidth + 14;
    // getting difference value that needs to add or reduce from carousel left to take middle img center
    let valDifference = firstImgWidth - positionDiff;

    if(carousel1.scrollLeft > prevScrollLeft) { // if user is scrolling to the right
        return carousel1.scrollLeft += positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
    }
    // if user is scrolling to the left
    carousel1.scrollLeft -= positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
}

const dragStart1 = (e) => {
    // updatating global variables value on mouse down event
    isDragStart1 = true;
    prevPageX = e.pageX || e.touches[0].pageX;
    prevScrollLeft = carousel1.scrollLeft;
}

const dragging1= (e) => {
    // scrolling images/carousel to left according to mouse pointer
    if(!isDragStart1) return;
    e.preventDefault();
    isDragging1 = true;
    carousel1.classList.add("dragging1");
    positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
    carousel1.scrollLeft = prevScrollLeft - positionDiff;
    showHideIcons();
}

const dragStop1 = () => {
    isDragStart1 = false;
    carousel1.classList.remove("dragging1");

    if(!isDragging1) return;
    isDragging1 = false;
    autoSlide();
}

carousel1.addEventListener("mousedown", dragStart1);
carousel1.addEventListener("touchstart", dragStart1);

document.addEventListener("mousemove", dragging1);
carousel1.addEventListener("touchmove", dragging1);

document.addEventListener("mouseup", dragStop1);
carousel1.addEventListener("touchend", dragStop1);


//---------------------------------------------------------------------------------------------------------------------


//Mobile View Offering Container
const wrapper = document.querySelector(".offering-wrapper");
const carousel = document.querySelector(".offering-carousel");
const firstCardWidth = carousel.querySelector(".offering-box").offsetWidth;
const arrowBtns = document.querySelectorAll(".offering-wrapper i");
const carouselChildrens = [...carousel.children];

let isDragging = false, isAutoPlay = true, startX, startScrollLeft, timeoutId;

// Get the number of cards that can fit in the carousel at once
let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

// Insert copies of the last few cards to beginning of carousel for infinite scrolling
carouselChildrens.slice(-cardPerView).reverse().forEach(section3_box => {
    carousel.insertAdjacentHTML("afterbegin", section3_box.outerHTML);
});

// Insert copies of the first few cards to end of carousel for infinite scrolling
carouselChildrens.slice(0, cardPerView).forEach(section3_box => {
    carousel.insertAdjacentHTML("beforeend", section3_box.outerHTML);
});

// Scroll the carousel at appropriate postition to hide first few duplicate cards on Firefox
carousel.classList.add("no-transition");
carousel.scrollLeft = carousel.offsetWidth;
carousel.classList.remove("no-transition");

// Add event listeners for the arrow buttons to scroll the carousel left and right
arrowBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        carousel.scrollLeft += btn.id == "left" ? -firstCardWidth : firstCardWidth;
    });
});

const dragStart = (e) => {
    isDragging = true;
    carousel.classList.add("dragging");
    // Records the initial cursor and scroll position of the carousel
    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft;
}

const dragging = (e) => {
    if(!isDragging) return; // if isDragging is false return from here
    // Updates the scroll position of the carousel based on the cursor movement
    carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
}

const dragStop = () => {
    isDragging = false;
    carousel.classList.remove("dragging");
}

const infiniteScroll = () => {
    // If the carousel is at the beginning, scroll to the end
    if(carousel.scrollLeft === 0) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
        carousel.classList.remove("no-transition");
    }
    // If the carousel is at the end, scroll to the beginning
    else if(Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.offsetWidth;
        carousel.classList.remove("no-transition");
    }

    // Clear existing timeout & start autoplay if mouse is not hovering over carousel
    clearTimeout(timeoutId);
    if(!wrapper.matches(":hover")) autoPlay();
}

const autoPlay = () => {
    if(window.innerWidth < 800 || !isAutoPlay) return; // Return if window is smaller than 800 or isAutoPlay is false
    // Autoplay the carousel after every 2500 ms
    timeoutId = setTimeout(() => carousel.scrollLeft += firstCardWidth, 2500);
}
autoPlay();

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", infiniteScroll);
wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
wrapper.addEventListener("mouseleave", autoPlay);

