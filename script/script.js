class Achivement {
    constructor(name, description, image) {
        this.Data = [
            {
                'title': "Startups Incubated",
                'value': 10,
                'description': 'Startups Incubated',
                'icon': 'https://img.freepik.com/premium-vector/business-incubator-businesspeople-investors-supporting-new-businesses-money-professional-assistance-start-up-project-flat-vector-illustration_277904-23829.jpg?w=740',
            },
            {
                'title': "Entrepreneurs Engaged",
                'value': 10,
                'description': 'Entrepreneurs Engaged',
                'icon': 'https://previews.123rf.com/images/bilahstudio/bilahstudio2102/bilahstudio210200292/175360238-business-graphic-vector-creative-illustration-entrepreneurs-engaged-in-teamwork-building-business.jpg',
            },
            {
                'title': "Funds",
                'value': 10,
                'description': 'Funds Provided to Startups',
                'icon': 'https://cdn.fundsindia.com/prelogin/slideshow/welcome-to-fundsindia.webp',
            },
            {
                'title': "Jobs Created",
                'value': 10,
                'description': 'Jobs Created by Startups Incubated',
                'icon': 'https://i.pinimg.com/736x/59/89/b1/5989b169e93d36c18b1db3064349135f.jpg',
            },
            {
                'title': "Graduated",
                'value': 10,
                'description': 'Graduated from Incubation Program',
                'icon': 'https://www.freeiconspng.com/uploads/graduation-icon-9.png',
            },
            {
                'title': "Valuation",
                'value': 10,
                'description': 'Valuation of Startups Incubated',
                'icon': 'https://info.sapphirecapitalpartners.co.uk/hubfs/Blog_Photos/shutterstock_503293813.jpg',
            }
        ]
    }

    setAchivements(elem) {
        let content = `
        <a class="col achivlink"  href="/achivment/${elem.title}">
        <div class="card h-100 achiv-card">
            <img src="${elem.icon}"
                class="card-img-top" alt="${elem.title}">
            <div class="card-body">
                <h5 class="card-title">${elem.title}</h5>
                <p class="card-text">${elem.description}</p>

            </div>
        </div>

    </a>`
        $('#achivements').append(content);



    }
}

$(document).ready(function () {

    let achivements = new Achivement();
    $('#achivements').empty();
    achivements.Data.forEach(function (elem) {
        achivements.setAchivements(elem);
    });

});