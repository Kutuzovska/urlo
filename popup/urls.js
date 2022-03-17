class Urls {
	constructor() {
		this.listeners = [];
		this._get();
	}

	async _get() {
		let { urls } = await browser.storage.sync.get('urls');
		if (urls) urls = JSON.parse(urls);
		if (!Array.isArray(urls)) urls = [];

		this.list = urls;
		this._emit();
	}

	async _set() {
		await browser.storage.sync.set({ urls: JSON.stringify(this.list) });
		this._emit();
	}

	async remove(url) {
		const index = this.list.findIndex((item) => item === url);
		if (index !== -1) {
			this.list.splice(index, 1);
			await this._set();
		}
	}

	async add(url) {
		try {
			const { host } = new URL(url);
			if (this.list.includes(host)) return;

			this.list.push(host);
			await this._set();
		} catch(e) {}
    }

	_emit() {
		this.listeners.forEach((cb) => cb());
	}

	on(cb) {
		this.listeners.push(cb);
	}
}
