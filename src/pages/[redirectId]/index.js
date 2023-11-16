import Head from "next/head";
import { useEffect, useState } from "react";

export default function Redirect() {

    let redirectId;

    const [ redirectUrl, setRedirectUrl ] = useState("");

    useEffect(() => {
        // Setting default theme to light
        document.body.dataset.bsTheme = "light";

        // Getting redirectId from URL
        redirectId = window.location.pathname.replace("/", "");
    }, [])

    useEffect(() => {
        // Sending Request for Redirect URL
        const url = `https://short-url-website.vercel.app/api/redirect?redirectId=${redirectId}`;

        fetch(url, {
            method: "GET"
        })
        .then((res) => res.json())
        .then(data => {
            if(data.code === 200) {
                // Setting Redirect URL for Frontend
                setRedirectUrl(data.redirectInfo.redirectUrl);

                // Redirecting
                window.location.href = data.redirectInfo.redirectUrl;
            }else {
                // Redirecting to Error Page if wrong request
                window.location.href = "/_error";
            }
        })
        .catch(err => {
            // Redirecting to Error Page if error in request
            window.location.href = "/_error";
            console.error(err);
        })
    }, [])

    return (
        <>
            <Head>
                <title>Redirecting...</title>
                <meta name="robots" content="noindex, nofollow" />
            </Head>
            <div>
                <h1 className="text-center mt-5">Redirecting...</h1>
                <p className="text-center mt-3">URL: {redirectUrl}</p>
            </div>
        </>
    )
}