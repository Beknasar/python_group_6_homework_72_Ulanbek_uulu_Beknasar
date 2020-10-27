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
                <h5>Рейтинг: ${data[i].rating}</h5>
                <a href="${BASE_API_URL}quote/${data[i].id}" class="more">Подробнее...</a>`
            div.classList.add('my-3', 'quote-v1', 'p-2');
            container.appendChild(div);
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
            <textarea name="text" id="id_text" placeholder="Enter your text" required="true"></textarea><br />
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


// async function onUnlike(event) {
//     event.preventDefault();
//     let unlikeBtn = event.target;
//     let url = unlikeBtn.href;
//
//     try {
//         let response = await makeRequest(url, 'DELETE');
//         let data = await response.text();
//         console.log(data);
//         const counter = unlikeBtn.parentElement.getElementsByClassName('counter')[0];
//         counter.innerText = data;
//     }
//     catch (error) {
//         console.log(error);
//     }
//
//     unlikeBtn.classList.add('hidden');
//     const likeBtn = unlikeBtn.parentElement.getElementsByClassName('like')[0];
//     likeBtn.classList.remove('hidden');
// }

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
