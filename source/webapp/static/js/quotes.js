async function Home(event) {
    event.preventDefault();
    try {
        let response = await makeRequest(BASE_API_URL + 'quote/', 'GET');
        let data = await response.json();
        console.log(data);
        let container = document.getElementsByClassName('container')[1];
        container.innerHTML = ''
        container.innerHTML = '<h1>Citats:</h1>'
        for (let i = 0; i < data.length; i++) {
            let div = document.createElement('div');

            div.innerHTML = `<h4>${data[i].author}</h4>
                <p>"${data[i].text}"</p>
                <a href="${BASE_API_URL}quote/${data[i].id}" class="more">Подробнее...</a> <br/>
                <a href="${BASE_URL}quotes/${data[i].id}/vote/" class="mr-3 plus"><i class="fas fa-plus"></i></a>
                <span class="counter mr-3">${data[i].rating}</span>
                <a href="${BASE_URL}quotes/${data[i].id}/unvote/" class="minus"><i class="fas fa-minus"></i></a>`

            div.classList.add('my-3', 'quote-v1', 'p-2');
            container.appendChild(div);
            const voteButtons = document.getElementsByClassName('plus');
            const unvoteButtons = document.getElementsByClassName('minus');
            for (let btn of voteButtons) {btn.onclick = onVote};
            for (let btn of unvoteButtons) {btn.onclick = onVote};
            const moreButtons = document.getElementsByClassName('more');
            for (let btn of moreButtons) {btn.onclick = DetailQuote};
        }
    }
    catch (error) {
        console.log(error);
    }
}


async function DetailQuote(event) {
    event.preventDefault();
    let btn=this;
    let url = btn.href
    console.log(url)
    try {
        let response = await makeRequest(url, 'GET')
        let data = await response.json();
        console.log(data);
        const container = document.getElementsByClassName('container')[1];
        container.innerHTML = '';
        let div = document.createElement('div')
        div.classList.add('my-3', 'quote-v1', 'p-3')
        container.append(div)
        div.innerHTML = `<h3>${data.author}</h3>
                <p>Почта: <br/>${data.email}</p>
                <p>Статус: ${data.status_display}</p>
                <p>Содержимое:<br/>
                "${data.text}"</p>
                <h5>Рейтинг: ${data.rating}</h5><br/>
                <p>Дата создания: ${data.created_at}</p>`

    }
    catch (error) {
        console.log(error);
    }
}


async function FormHome(event) {
    event.preventDefault();
    try {
        let response = await makeRequest(BASE_API_URL, 'GET');
        let data = await response.json();
        console.log(data);
        let container = document.getElementsByClassName('container')[1];
        container.innerHTML = ''
        let div = document.createElement('div');
        div.innerHTML = `<h3 class="m-3">Добавить цитату: </h3>
        <form id="quote_form" action="" method="post">
            <input type="text" id="id_author" name="author" placeholder="Enter your name" required="true" /><br /><br />
            <input type="email" id="id_email" name="email" placeholder="Enter your email" required="true"/><br /><br />
            <textarea name="text" id="id_text" class="pre" placeholder="Enter your text" required="true"></textarea><br />
        </form>`
        container.appendChild(div)
        let btn = document.createElement('button')
        btn.innerText = 'Создать'
        btn.classList.add('btn-info', 'mt-1', 'btn')
        btn.id = "submit"
        div.append(btn)
        btn.onclick = addQuote;
    }
    catch (error) {
        console.log(error);
    }
}


async function addQuote(event) {
    event.preventDefault();
    let response = await makeRequest(BASE_API_URL + 'quote/', 'POST', {
        author: document.getElementById('id_author').value,
        text: document.getElementById('id_text').value,
        email: document.getElementById('id_email').value
    });
    let data = await response.json();
    console.log(data);
    let container = document.getElementsByClassName('container')[1];
    container.innerHTML = ''
    let div = document.createElement('div')
        div.classList.add('my-3', 'quote-v1', 'p-3')
        container.append(div)
        div.innerHTML = `<h3>${data.author}</h3>
                <p>Почта: <br/>${data.email}</p>
                <p>Статус: ${data.status_display}</p>
                <p>Содержимое:<br/>
                "${data.text}"</p>
                <h5>Рейтинг: ${data.rating}</h5><br/>
                <p>Дата создания: ${data.created_at}</p>`
}


async function onVote(event) {
    event.preventDefault();
    let voteBtn = this;
    console.log(voteBtn)
    let url = voteBtn.href;
    console.log(url)

    try {
        let response = await makeRequest(url, 'POST');
        console.log(response)
        let data = await response.json();
        console.log(data);
        const counter = voteBtn.parentElement.getElementsByClassName('counter')[0];
        counter.innerText = data;
    }
    catch (error) {
        console.log(error);
    }
}

window.addEventListener('load', function() {
    let homeBtn = document.getElementById('home');
    let formdiv = document.getElementById('add_cits');
    // const form =  document.getElementById('quote_form');
    //

    // const unlikeButtons = document.getElementsByClassName('unlike');
    // form.addEventListener('submit', addQuote);

    // form.onsubmit = addQuote;
    homeBtn.onclick = Home;
    formdiv.onclick = FormHome;

    // for (let btn of unlikeButtons) {btn.onclick = onUnlike}
});
