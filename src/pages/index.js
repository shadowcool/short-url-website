import Head from "next/head";
import styles from '../styles/index.module.css';
import Navbar from "@/components/Navbar";

export default function Home() {

  // Setting the New URL Function

  const setNewUrl = () => {
    
    // Getting the Base URL and New URL from the input fields
    const baseUrl = document.getElementById('base-url-input').value;
    const newUrl = document.getElementById('new-url-input').value;

    // Checking if the input fields are empty
    if(baseUrl === '' || newUrl === '') {
      alert('Please fill all fields!');
    }

    const url = `http://localhost:3000/api/redirect`;

    // Fetching the API

    fetch(url, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        redirectId: newUrl,
        redirectUrl: `https://${baseUrl}`
      })
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)
      if(data.code === 409) {
        alert('URL Already Exists!');
      }else if(data.code === 200) {
        alert('URL Created!');
      }else {
        alert('Something went wrong!');
      }
    })
  }

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Short URL | Home</title>
      </Head>
      <Navbar/>
      <main>
        <h1 className="text-center">Short URL Website</h1>

        <div className={`text-center ${styles.oldUrlDiv}`}>

          <label htmlFor="base-url-input" className="form-label">Base URL:</label>

          <div className="input-group w-50 mx-auto">
            <span className="input-group-text">https://</span>
            <input type="text" className="form-control" id="base-url-input" />
          </div>

          <br />

          <label htmlFor="new-url-input" className="form-label">New URL:</label>

          <div className="input-group w-50 mx-auto">
            <span className="input-group-text">https://short-url.vercel.app/</span>
            <input type="text" className="form-control" id="new-url-input" />
          </div>

          <br /><br />

          <button className="btn btn-primary" onClick={setNewUrl}>Shorten</button>

        </div>
      </main>
    </>
  )
}
