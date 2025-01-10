const speedTest = require('speedtest-net');

module.exports = {
  config: {
    name: "speedtest",
    aliases: ["speed"],
    version: "1.0",
    author: "Rifat",
    countDown: 10,
    role: 0,
    shortDescription: "Check internet speed",
    longDescription: "Check download, upload, and ping speed of the system.",
    category: "owner",
    guide: "{pn}"
  },
  onStart: async function ({ api, event }) {
    try {
      console.log('Starting speed test...');
      const testResults = await speedTest({ acceptLicense: true, acceptGdpr: true });

      console.log('Speed test completed:', testResults);
      const message = `Internet Speed Test Results:\n\n` +
        `➠ Download Speed: ${testResults.download.bandwidth / 125000} Mbps\n` +
        `➠ Upload Speed: ${testResults.upload.bandwidth / 125000} Mbps\n` +
        `➠ Ping: ${testResults.ping.latency} ms\n` +
        `➠ ISP: ${testResults.isp}`;

      console.log('Sending message:', message);
      return api.sendMessage(message, event.threadID, event.messageID);
    } catch (error) {
      console.error('Error occurred:', error);
      return api.sendMessage("Error occurred during the speed test. Please try again later.", event.threadID, event.messageID);
    }
  }
};
