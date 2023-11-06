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
        <a href=  "/event?${elem.id}" class="position-relative text-decoration-none text-light">
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
          story: "Startup 1 Story,Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse nemo magnam tempora perferendis eveniet doloremque labore nobis cum ullam blanditiis reiciendis vero est quaerat quas id atque, quibusdam ut nisi?",
          image: "https://nsutiif.in/img/event/event3.png",
        },
        {
          startup: "Startup 2",
          postion: "Founder",
          story: "Startup 2 Story,Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse nemo magnam tempora perferendis eveniet doloremque labore nobis cum ullam blanditiis reiciendis vero est quaerat quas id atque, quibusdam ut nisi?",
          image: "https://nsutiif.in/img/event/event3.png",
        },
        {
          startup: "Startup 3",
          postion: "Founder",
          story: "Startup 3 Story, Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse nemo magnam tempora perferendis eveniet doloremque labore nobis cum ullam blanditiis reiciendis vero est quaerat quas id atque, quibusdam ut nisi?",
          image: "https://nsutiif.in/img/event/event3.png",
        },
        {
          startup: "Startup 4",
          postion: "Founder",
          story: "Startup 4 Story, Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse nemo magnam tempora perferendis eveniet doloremque labore nobis cum ullam blanditiis reiciendis vero est quaerat quas id atque, quibusdam ut nisi?",
          image: "https://nsutiif.in/img/event/event3.png",
        },
        {
          startup: "Startup 5",
          postion: "Founder",
          story: "Startup 5 Story, Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse nemo magnam tempora perferendis eveniet doloremque labore nobis cum ullam blanditiis reiciendis vero est quaerat quas id atque, quibusdam ut nisi?",
          image: "https://nsutiif.in/img/event/event3.png",
        },
        {
          startup: "Startup 6",
          postion: "Founder",
          story: "Startup 6 Story, Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse nemo magnam tempora perferendis eveniet doloremque labore nobis cum ullam blanditiis reiciendis vero est quaerat quas id atque, quibusdam ut nisi?",
          image: "https://nsutiif.in/img/event/event3.png",
        }
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

$(document).ready(function () {
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
});
