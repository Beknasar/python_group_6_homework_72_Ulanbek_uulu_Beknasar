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
        }
        let more = document.getElementsByClassName('more')
        for (let i = 0; i < more.length; i++) {
        more[i].onclick = async function showQuote(event) {
            event.preventDefault();
            let response = await makeRequest(more[i].href, 'GET')
            data = await response.json();
            console.log(data);
            const container = document.getElementsByClassName('container')[1];
            container.innerHTML = '';
            let div = document.createElement('div')
            div.classList.add('my-3', 'quote-v1', 'p-3')
            container.append(div)
            div.innerHTML = `<h3>${data.author}</h3>
                    <p>${data.email} | ${data.status_display}</p>
                    <p>"${data.text}"</p>
                    <h5>Рейтиг: ${data.rating}</h5><br/>
                    <p>${data.created_at}</p>`
                     }};
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
        <form action="" method="post">
            <input type="text" name="author" placeholder="Enter your name" required="true" /><br /><br />
            <input type="email" name="email" placeholder="Enter your email" required="true"/><br /><br />
            <textarea  name="text" placeholder="Enter your text" required="true"></textarea><br /><br />
            <input type="submit" name="submit" />
        </form>`
        container.appendChild(div)
    }
    catch (error) {
        console.log(error);
    }
}


async function addQuote(event) {
    event.preventDefault();
    let response = await makeRequest(BASE_API_URL + 'quote/create/', 'POST', {
        author: document.getElementById('id_author').value,
        text: document.getElementById('id_text').value,
        email: document.getElementById('id_email').value
    });
    let data = await response.json();
    console.log(data.pk);
    window.location.href = `${BASE_URL}quote/${data.pk}/`;
}
// async function onVotePlus(event) {
//     event.preventDefault();
//     let plusBtn = event.target;
//     let url = plusBtn.href;
//
//     try {
//         let response = await makeRequest(url, 'POST');
//         let data = await response.text();
//         console.log(data);
//         const counter = plusBtn.parentElement.getElementsByClassName('counter')[0];
//         counter.innerText = data;
//     }
//     catch (error) {
//         console.log(error);
//     }
//
//     plusBtn.classList.add('hidden');
//     const unlikeBtn = plusBtn.parentElement.getElementsByClassName('unlike')[0];
//     unlikeBtn.classList.remove('hidden');
// }

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
    const form = document.getElementsByTagName('form');
    //

    // const likeButtons = document.getElementsByClassName('like');
    // const unlikeButtons = document.getElementsByClassName('unlike');
    form.onsubmit = addQuote;
    homeBtn.onclick = Home;
    formdiv.onclick = FormHome;
    // for (let btn of likeButtons) {btn.onclick = onVotePlus}
    // for (let btn of unlikeButtons) {btn.onclick = onUnlike}
});
