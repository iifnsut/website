// Section 6,7, 8 @DS
// Do not modify the below following code
/**
 * Represents a class for managing achievements.
 * @class
 */
class OurAchievements {
  /**
   * Creates an instance of OurAchievements.
   * @param {Array} data - JSON Objects of Achievements List containing icon, count, and title in Dictionary format.
   * @param {String} target - Id of the target element.
   */
  constructor(data = null, target = "OA-List") {
    if (data === null) {
      this.data = [
        {
          icon: "fa-solid fa-rocket",
          count: 45,
          title: "Startup Incubated",
        },
        {
          icon: "fa-solid fa-user",
          count: 500,
          title: "Entrepreneur Engaged",
        },
        {
          icon: "fas fa-hand-holding-usd",
          count: "18Cr",
          title: "Fund Raised",
        },
        {
          icon: "fa-solid fa-bullseye",
          count: "150",
          title: "Job Created",
        },
        {
          icon: "fa-solid fa-graduation-cap",
          count: "12",
          title: "Graduated",
        },
        {
          icon: "fa-solid fa-arrow-up-right-dots",
          count: "50Cr",
          title: "Valuation",
        },
      ];
    } else {
      this.data = data;
    }
    this.target = target;
  }

  /**
   * Adds an achievement to the target element.
   * @param {JSON} elem - JSON Object of Achievement containing icon, count, and title.
   * @returns {void}
   * @example
   * let OA = new OurAchievements();
   * OA.addAchievement({
   *   icon: "fa-solid fa-rocket",
   *   count: 50,
   *   title: "Startup Incubated",
   * });
   */
  addElements(elem = null) {
    if (elem === null) {
      elem = this.data;
    } else {
      if (!Array.isArray(elem)) {
        elem = [elem];
      } else if (Object.prototype.toString.call(elem) === "[object Object]") {
        elem = this.data;
      }
    }

    for (let i = 0; i < elem.length; i++) {
      let target = document.getElementById(this.target);
      let div = document.createElement("div");
      div.classList.add("OA-items");
      div.innerHTML = `
          <div class="OA-items-logo flext-center">
            <i class="flext-center ${elem[i].icon}"></i>
          </div>
          <div class="OA-items-data">
            <div class="OA-items-data-num">
              <span>${elem[i].count}</span>+
            </div>
            <div class="OA-items-data-text">
              <span>${elem[i].title}</span>
            </div>
          </div>
      `;
      target.appendChild(div);
    }
  }
}

/**
 * Represents a class for managing Latest Events.
 * @class
 */
class LatestEvents {
  /**
   * Creates an instance of LatestEvents.
   * @param {JSON} data - JSON Object of Latest Events containing img, title, date, and desc.
   * @param {String} target - Id of the target element.
   * @param {String} sliderTarget - Id of the target element for slider.
   */

  constructor(data = null, target = "LE-List", sliderTarget = "LE-dot-slider") {
    if (data === null) {
      this.data = [
        {
          img: "Assets/Events/LE10.jpg",
          title: "",
          date: "10/10/2021",
          desc: "",
        },
        {
          img: "Assets/Events/LE04.jpg",
          title: "",
          date: "10/10/2021",
          desc: "",
        },
        {
          img: "Assets/Events/LE07.jpg",
          title: "",
          date: "10/10/2021",
          desc: "",
        },
        {
          img: "Assets/Events/LE14.jpg",
          title: "",
          date: "10/10/2021",
          desc: "",
        },
        {
          img: "Assets/Events/LE15.jpg",
          title: "",
          date: "16/12/2023",
          desc: "",
        },
        {
          img: "Assets/Events/LE16.jpg",
          title: "",
          date: "16/12/2023",
          desc: "",
        },
        {
          img: "Assets/Events/LE05.jpg",
          title: "",
          date: "10/10/2021",
          desc: "",
        },
        {
          img: "Assets/Events/LE11.jpg",
          title: "",
          date: "10/10/2021",
          desc: "",
        },
        {
          img: "Assets/Events/LE03.jpg",
          title: "",
          date: "10/10/2021",
          desc: "",
        },
        {
          img: "Assets/Events/LE01.jpg",
          title: "",
          date: "10/10/2021",
          desc: "",
        },
        {
          img: "Assets/Events/LE09.jpg",
          title: "",
          date: "10/10/2021",
          desc: "",
        },
        {
          img: "Assets/Events/LE06.jpg",
          title: "",
          date: "10/10/2021",
          desc: "",
        },
        {
          img: "Assets/Events/LE08.jpg",
          title: "",
          date: "10/10/2021",
          desc: "",
        },
        {
          img: "Assets/Events/LE12.jpg",
          title: "",
          date: "10/10/2021",
          desc: "",
        },
        {
          img: "Assets/Events/LE13.jpg",
          title: "",
          date: "10/10/2021",
          desc: "",
        },
        {
          img: "Assets/Events/LE01.jpg",
          title: "",
          date: "10/10/2021",
          desc: "",
        },
      ];
    } else {
      this.data = data;
    }
    this.target = target;
    this.scoller_elem = null;
    this.sliderTarget = sliderTarget;
    this.next = true;
    let esper = this;
    $(".LE-ctr").click(function (e) {
      if (esper.next === true) {
        esper.next = false;
        let LE_List = $(".LE-slider-items");
        let dot_List = $(".LE-items-dot");
        clearInterval(esper.scoller_elem);
        if (e.target.classList.contains("LE-dr-lt")) {
          let elem = LE_List[0];
          LE_List[0].remove();
          document.getElementById(esper.target).append(elem);
          document.getElementById(esper.sliderTarget).append(dot_List[0]);
          // console.log('Left');
        } else if (e.target.classList.contains("LE-dr-rt")) {
          let elem = LE_List[LE_List.length - 1];
          LE_List[LE_List.length - 1].remove();
          // console.log(esper)
          document.getElementById(esper.target).prepend(elem);
          document
            .getElementById(esper.sliderTarget)
            .prepend(dot_List[dot_List.length - 1]);
          // console.log('Right');
        }
        setTimeout(() => {
          esper.next = true;
        }, 200);
        setTimeout(() => {
          clearInterval(esper.scoller_elem);
          esper.setSlider();
        }, 10000);
      }
    });
  }

  /**
   * Adds an Latest Events to the target element.
   * Imortant Note: The minimum no of element msut be 5.
   * @param {JSON} elem - JSON Object of Latest Events containing img, count, title, date and desc.
   * @returns {void}
   * @example
   * let LE = new LatestEvents();
   * LE.addAchievement({
   *   img: "https://nsutiif.in/img/gallery/2.jpeg",
   *   title: "Startup Incubated",
   *   date: "10/10/2021",
   *   desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, voluptatum.",
   * });
   */
  addElements(elem = null) {
    if (elem === null) {
      elem = this.data;
    } else {
      if (!Array.isArray(elem)) {
        elem = [elem];
      } else if (Object.prototype.toString.call(elem) === "[object Object]") {
        elem = this.data;
      }
    }
    for (let i = 0; i < elem.length; i++) {
      let loderTarget = document.getElementById(this.sliderTarget);
      let target = document.getElementById(this.target);
      let div = document.createElement("div");
      div.classList.add("LE-slider-items");
      div.innerHTML = `
      <div class="LE-items-contens">
        <img src="${elem[i].img}" alt=""/>
        <div class="LE-text">
          <h3>${elem[i].title}</h3>
          <p>
            ${elem[i].desc}
          </p>
        </div>
      </div>
      `;

      let dot = document.createElement("div");
      dot.classList.add("LE-items-dot");

      target.appendChild(div);
      loderTarget.appendChild(dot);
    }
  }

  /**
   * Adds an sliding effect to Latest Events section.
   * @param {Number} delay - Delay in milliseconds.
   * @returns {void}
   * @example
   * let LE = new LatestEvents();
   * LE.setSlider(1000);
   */
  setSlider(delay = 5000) {
    this.scoller_elem = setInterval(() => {
      let LE_List = $(".LE-slider-items");
      let dot_List = $(".LE-items-dot");
      let elem = LE_List[0];
      let dot = dot_List[0];
      LE_List[0].remove();
      dot_List[0].remove();
      document.getElementById(this.target).append(elem);
      document.getElementById(this.sliderTarget).append(dot);
      // console.log("Sorry for the delay");
    }, delay);
  }
}

/**
 * Represents a class for managing Success Stories.
 * @class
 */
class SuccessStories {
  /**
   * Creates an instance of SuccessStories.
   * @param {JSON} data - JSON Object of Success Stories containing img, title, and desc.
   * @param {String} target - Id of the target element.
   * @returns {void}
   * @example
   * let SS = new SuccessStories();
   * SS.addElements({
   *  img: "https://nsutiif.in/img/gallery/2.jpeg",
   * title: "Startup Incubated",
   * desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, voluptatum.",
   * });
   */
  constructor(data = null, target = "SSS-List") {
    if (data === null) {
      this.data = [
        {
          img: "Assets/Startup/Zalonin.jpeg",
          title: "",
          desc: `Zalonin received the first prize at Shark Tank, held at JMC on November 08 2019.`,
        },
        {
          img: "Assets/Startup/team-feet.jpg",
          title: "",
          desc: `NSUT IIF invested startup Feet Wings Pvt Ltd received investment of Rs. 1.1 Crore
          from PadUp and Elina Capital.`,
        },
        {
          img: "Assets/Startup/Neem-Tree-Agro-Solution.jpg",
          title: "",
          desc: `One of our startup Neem Tree Agro Solution received funding of Rs. 5 Lakhs from
          NASSCOM Foundation. Neem Tree also received first price in Agri hackathon
          organized by IIT Delhi and received a grand of Rs. 7 Lakhs by Govt. of India.`,
        },
        {
          img: "Assets/Startup/VivaFeet.jpeg",
          title: "",
          desc: `VivaFeet raised INR 10 lakhs from NIDHI Prayas scheme and INR 30 Lakhs from ASIIM.`,
        },
        {
          img: "Assets/Startup/the-healthy-company.jpg",
          title: "",
          desc: `AlNourish (The Healthy Company), which provides super foods and consultation received a funding of USD 350,000 from
          Gurgaon based accelerator, Huddle and has raised another confidential amount from DSG Consumer Partners and Get
          Vantage.`,
        },
        // {
        //   img: "Assets/Startup/Bonfarmo.jpg",
        //   title: "",
        //   desc: `Bonfarmo, an agri-tech company incubated at NSUT IIF has received funding of Rs.
        //   25 Lakhs from PUSA Incubator, IARI and another grant of INR 5,00,000.`,
        // },
      ];
    } else {
      this.data = data;
    }
    this.target = target;
    this.pos = 0;

    document.getElementById("SSS-add").addEventListener("click", (e) => {
      let arrow = document.querySelector("#SSS-add>i");
      let no = 0;
      if (arrow.classList.contains("fa-angle-down")) {
        this.addElements();
      } else {
        let target = document.getElementById(this.target);
        let window_width = $(window).width();
        if (window_width > 895) {
          no = 4;
        } else {
          no = 2;
        }
        let pos = target.childElementCount;
        for (let i = no; i < pos; i++) {
          target.removeChild(target.lastChild);
          this.pos -= 1;
        }
        arrow.classList.remove("fa-angle-up");
        arrow.classList.add("fa-angle-down");
      }
    });
  }

  /**
   * Adds an Success Stories to the target element.
   * @param {JSON} elem - JSON Object of Success Stories containing img, title, and desc.
   * @param {Number} no - Number of elements to be added.
   * @returns {void}
   * @example
   * let SS = new SuccessStories();
   * SS.addElements({
   * img: "https://nsutiif.in/img/gallery/2.jpeg",
   * title: "Startup Incubated",
   * desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, voluptatum.",
   * }, 2);
   */
  addElements(elem = null, no = null) {
    if (elem === null) {
      elem = this.data;
    } else {
      if (!Array.isArray(elem)) {
        elem = [elem];
      } else if (Object.prototype.toString.call(elem) === "[object Object]") {
        elem = this.data;
      }
    }

    let window_width = $(window).width();
    if (no == null || no == 0) {
      if (window_width > 895) {
        no = 4;
      } else {
        no = 2;
      }
    }

    // console.log(elem);
    let current_pos = this.pos;
    if (current_pos + no >= elem.length) {
      let arrow = document.querySelector("#SSS-add>i");
      arrow.classList.remove("fa-angle-down");
      arrow.classList.add("fa-angle-up");
    }
    for (
      let i = current_pos;
      i < Math.min(current_pos + no, elem.length);
      i++
    ) {
      let target = document.getElementById(this.target);
      let div = document.createElement("div");
      div.classList.add("SSS-items");
      div.innerHTML = `
      <div class="SSS-sudo-box">
            <div class="SSS-items-img">
              <img src="${elem[i].img}" alt=""  loading="lazy" />
            </div>
            <div class="SSS-items-data">
              <h4>${elem[i].title}</h4>
              <p>
                ${elem[i].desc}
              </p>
            </div>
          </div>
      `;
      target.appendChild(div);
      
      this.pos += 1;
    }
  }
}

$(document).ready(function () {
  let delElem = null;
  // Initialize the OurAchievements Class
  let OA = new OurAchievements();
  // // Clear the hard Achievements List
  delElem = $("#OA-List").children();
  // // Adding the Achievements to the target element
  OA.addElements();
  delElem.remove();

  // Initialize the LatestEvents Class
  let LE = new LatestEvents();
  // Clear the hard Latest Events List
  delElem = $("#LE-List").children();
  // Adding the Latest Events to the target element
  LE.addElements();
  delElem.remove();
  // Adding the sliding effect to Latest Events section
  LE.setSlider();

  // Initialize the SuccessStories Class
  let SS = new SuccessStories();
  // // Clear the hard Success Stories List
  delElem = $("#SSS-List").children();
  // // Adding the Success Stories to the target element
  SS.addElements();
  delElem.remove();
});

// Secction 6,7,8 @DS End

//marquee start - stop
function stopMarquee() {
  var marquee = document.getElementById("marquee");
  marquee.stop();
}

function startMarquee() {
  var marquee = document.getElementById("marquee");
  marquee.start();
}

//------------------------------------------------------------------------------------------------------------------------------------------




//Offerings and Collaborations Script Start @Shivam Goswami
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

//Offerings and Collaborations Script End @Shivam Goswami


