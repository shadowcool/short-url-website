import { QuickDB } from 'quick.db';
import validator from 'validator';
import { devMode } from '@/deploy.json' assert { type: 'json' };
import path from 'path';

const dbPath = path.resolve(process.cwd(), 'json.sqlite');

const db = new QuickDB({
    filePath: dbPath,
});

export default async function handler(req, res) {

    // GET Method: Get Redirect URL

    if (req.method === "GET") {
        const { redirectId } = req.query;

        // Returning Error if Redirect ID Not Provided

        if (!redirectId || redirectId === "") {
            return res.status(400).json({ error_message: "Redirect ID Not Found", code: 400 });
        }

        // Finding Redirect URL in Database

        const redirect = await db.get(redirectId)

        const redirectUrl = redirect;

        // Returning Error if Redirect URL Not Found

        if (!redirect) {
            return res.status(404).json({ error_message: "Redirect URL Not Found", code: 404 });
        }

        return res.status(200).json({ redirectInfo: { redirectId, redirectUrl }, code: 200 });
    }

    // POST Method: Create Redirect URL

    if (req.method === "POST") {
        const { redirectId, redirectUrl } = req.body;

        // Returning Error if Redirect ID Not Provided

        if (!redirectId || redirectId === "") {
            return res.status(400).json({ error_message: "Redirect ID Not Found", code: 400 });
        }

        // Returning Error if Redirect URL Not Provided

        if(!redirectUrl || redirectUrl === "") {
            return res.status(400).json({ error_message: "Redirect URL Not Found", code: 400 });
        }

        // Validating URL

        if (!validator.isURL(redirectUrl, { protocols: ['http', 'https'], require_tld: true, require_protocol: true })) {
            return res.status(400).json({ error_message: "Redirect URL Not Valid", code: 400 });
        }

        // Finding if URL is already in Database

        let redirect = await db.get(redirectId)

        // Returning Error if Redirect URL Already There

        const baseUrl = devMode ? "http://localhost:3000" : "https://short-url-website.vercel.app";

        if(redirect) {
            return res.status(409).json({ error_message: "Redirect URL Already There", code: 409, redirectInfo: { redirectId, redirectUrl: `${baseUrl}/${redirectId}` } });
        }

        // Setting Redirect URL in Database

        await db.set(redirectId, redirectUrl);

        redirect = await db.get(redirectId, redirectUrl);

        return res.status(200).json({ redirectInfo: { redirectId, redirectUrl }, code: 200 });
    }

    // DELETE Method: Delete Redirect URL [Not Used/Experimental]

    if (req.method === "DELETE") {
        const { redirectId } = req.body;

        // Returning Error if Redirect ID Not Provided

        if (!redirectId || redirectId === "") {
            return res.status(400).json({ error_message: "Redirect ID Not Found", code: 400 });
        }

        // Finding Redirect URL in Database

        let redirect = await db.get(redirectId);

        // Returning Error if Redirect URL Not Found

        if(!redirect) {
            return res.status(404).json({ error_message: "Redirect URL Not Found", code: 404 });
        }

        // Deleting Redirect URL from Database

        redirect = await db.delete(redirectId);

        return res.status(200).json({ redirectInfo: { redirectId, redirectUrl: redirect }, code: 200 });
    }

  return res.status(405).json({ error_message: "Method Not Allowed", code: 405 });
}
