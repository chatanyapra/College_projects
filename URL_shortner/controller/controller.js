const Url = require('../model/userModel.js')
const { v4: uuidv4 } = require("uuid");

const createUrl = async function (req, res) {
    try {
        const { originalUrl } = req.body;
        console.log("originalUrl-----------------", originalUrl);

        if (!originalUrl) {
            return res.send("NO url found");
        }

        const exist = await Url.findOne({ originalUrl });
        console.log("exist----------------", exist);

        if (exist) {
            return res.send("Url Already Present");
        }

        const code = uuidv4().split('-')[0];
        console.log("Code==========", code);

        const urlCreated = await Url.create({
            originalUrl,
            urlcode: code,
        });
        console.log("urlCreated-------", urlCreated);


        return res.status(200).json({
            message: "Url created",
            urlCreated
        })
    } catch (err) {
        return res.status(500).send("Error in url creation");
    }
}

const redirectUrl = async function (req, res) {
    try {
        const { code } = req.params;
        const url = await Url.findOneAndUpdate(
            { urlcode: code },
            { $inc: { count: 1 } },
            { new: true }
        );
        if (!url) {
            return res.status(404).send("URL not found");
        }
        return res.redirect(url.originalUrl);
    } catch (err) {
        return res.status(500).send("Error in redirecting URL");
    }
}

const getStats = async (req, res) => {
    try {
        const { code } = req.params;
        const urlDoc = await Url.findOne({ urlcode: code });
        if (!urlDoc) {
            return res.status(404).json({ error: 'URL not found' });
        }
        res.json({
            originalUrl: urlDoc.originalUrl,
            accessCount: urlDoc.count,
            urlcode: urlDoc.urlcode
        });
    } catch (err) {
        return res.status(500).json({ error: 'Error retrieving stats' });
    }
}

module.exports = { redirectUrl, createUrl, getStats };