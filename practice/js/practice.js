class MovieSearch {
    constructor (searchInput, submitBtn) {
        this.searchInput = searchInput;
        this.submitBtn = submitBtn;
        this.news = document.querySelector('#news');

        this.submitBtn.addEventListener('click', this.onSubmit);
        this.searchInput.addEventListener('input', this.clearPage);
    }
    onSubmit = async () => {
        this.userInput = this.searchInput.value;
        try {
            const result = await axios.get("http://www.omdbapi.com/", {
            params : {
                Apikey: 'de79e88b',
                s: this.userInput
            }
        })
        this.results = result.data;
        this.provideResult();    
        }
        catch (e) {
          this.news.innerHTML = `Please check:
          ====> Search input
          ====> Data Connection`
        }
    }
    provideResult = () => {
        this.results.Search.forEach((each) => {
            const div = document.createElement('div')
            const figure = document.createElement('figure')
            const img = document.createElement('img')
            const figCaption = document.createElement('figcaption')
            const imdb = document.createElement('p');
            const year = document.createElement('p')
            
            img.src = each.Poster;
            figCaption.innerText = each.Title;
            imdb.innerText = `Imdb Code: ${each.imdbID}`;
            year.innerText = `Year: ${each.Year}`;

            //Append each element to Each other
            figure.append(img, figCaption);
            div.append(figure, imdb, year)
            div.classList.toggle('result')
            this.news.appendChild(div)
        })
    }
    clearPage = () => {
        if(this.news.children.length > 0)
            this.news.innerHTML = ""   
    }
    error = () => {
        return "Please Check your Internet Connection or Search"
    }

}

const searchInput = document.querySelector("#input")
const submitBtn = document.querySelector("#submit")
const search = new MovieSearch(searchInput, submitBtn)