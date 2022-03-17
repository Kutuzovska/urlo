browser
	.storage
	.sync
	.get('urls')
    .then(result => {
		let { urls } = result;
		urls = JSON.parse(result.urls);
        urls.forEach((url) => {
            if (window.location.host === url) window.location.href = 'http://google.com';
        });
    });
