const form = document.getElementsByTagName('form')[0];
const tbody = document.getElementsByTagName('tbody')[0];
const render = () => {
    tbody.innerHTML = '';
    urls.list.forEach(item => {
        const url = document.createElement('span');
        url.innerText = item;

        const button = document.createElement('button');
        button.classList.add('button', 'is-small', 'is-danger', 'is-outlined', 'm-0');
        button.innerText = 'Remove';
        button.addEventListener('click', () => urls.remove(item));

        const tr = document.createElement('tr');
        let td = document.createElement('td');
        td.appendChild(url);
        tr.appendChild(td);

        td = document.createElement('td');
        td.appendChild(button);
        td.style.width = '1%';
        tr.appendChild(td);

        tbody.appendChild(tr);
    });
};

const urls = new Urls();
urls.on(render);

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const { value } = event.target.url;

    await urls.add(value);
    event.target.url.value = '';
});
