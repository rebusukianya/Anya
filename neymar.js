module.exports = {
	config: {
		name: "neymar",
		aliases: ["njr", "neymar"],
		version: "1.0",
		author: "Rifat",
		countDown: 5,
		role: 0,
		shortDescription: "send you pic of Neymar Jr",
		longDescription: "",
		category: "football",
		guide: "{pn}"
	},

	onStart: async function ({ message }) {
		var link = [
			"https://i.imgur.com/1P1BXzd.jpg",
			"https://i.imgur.com/3y6ZwZn.jpg",
			"https://i.imgur.com/9pH3ahR.jpg",
			"https://i.imgur.com/FbpNsFg.jpg",
			"https://i.imgur.com/kds7E4h.jpg",
			"https://i.imgur.com/ZK0uCjV.jpg",
			"https://i.imgur.com/qYXTOti.jpg",
			"https://i.imgur.com/9rLQC6L.jpg",
			"https://i.imgur.com/rwUzAGG.jpg",
			"https://i.imgur.com/ubEDfN7.jpg",
			"https://i.imgur.com/9IVJ82M.jpg",
			"https://i.imgur.com/6XU5DqZ.jpg",
			"https://i.imgur.com/bwACZj5.jpg",
			"https://i.imgur.com/3PYFODy.jpg",
			"https://i.imgur.com/XK8vA9p.jpg"
		];

		let img = link[Math.floor(Math.random() * link.length)];
		message.send({
			body: '「 Neymar Jr in Action ⚽ 」',
			attachment: await global.utils.getStreamFromURL(img)
		});
	}
};
