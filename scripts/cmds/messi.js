module.exports = {
	config: {
		name: "messi",
		aliases: ["leo", "messi"],
		version: "1.0",
		author: "Rifat",
		countDown: 5,
		role: 0,
		shortDescription: "send you pic of Lionel Messi",
		longDescription: "",
		category: "football",
		guide: "{pn}"
	},

	onStart: async function ({ message }) {
		var link = [
			"https://i.imgur.com/1KZOlXW.jpg",
			"https://i.imgur.com/5Ngfyba.jpg",
			"https://i.imgur.com/TfFqtV3.jpg",
			"https://i.imgur.com/vqzXQQ3.jpg",
			"https://i.imgur.com/Z2yZhxY.jpg",
			"https://i.imgur.com/kYXlfJs.jpg",
			"https://i.imgur.com/ylmXYPl.jpg",
			"https://i.imgur.com/1GUBwOq.jpg",
			"https://i.imgur.com/3Cm0xA1.jpg",
			"https://i.imgur.com/j5smxBQ.jpg",
			"https://i.imgur.com/lF29YED.jpg",
			"https://i.imgur.com/4kGHOgJ.jpg",
			"https://i.imgur.com/EqGYYXz.jpg",
			"https://i.imgur.com/oCQ6GNC.jpg",
			"https://i.imgur.com/TZzONxz.jpg"
		];

		let img = link[Math.floor(Math.random() * link.length)];
		message.send({
			body: '「 Here Comes The Legend 🐐 」',
			attachment: await global.utils.getStreamFromURL(img)
		});
	}
};
