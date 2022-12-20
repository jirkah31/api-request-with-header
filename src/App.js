import React from 'react'
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import qs from "qs";
import image from './getthumbnail.jpg'

function App() {

	//GET API-KEY

	const userName = "Jirka"
	const userPassword = "JirkaHeslo"

	const apiKeyOption = {
		method: 'post',
		url: 'https://fullstack.exercise.applifting.cz/tenants',
		data: {
			"name": userName,
			"password": userPassword
		}
	}

	axios.request(apiKeyOption)
		.then(res => {
			axios.defaults.headers['x-api-key'] = res.data.apiKey;
			localStorage.setItem("api", JSON.stringify(res.data.apiKey))
		})
		.catch(err => {
			console.log(err)
		})



	//GET ACCESS_TOKEN

	let apiString = localStorage.getItem("api").replaceAll('"', '')

	const accessTokenOption = {
		method: 'post',
		url: 'https://fullstack.exercise.applifting.cz/login',
		data: {
			"username": userName,
			"password": userPassword
		},
		headers: {
			"X-API-KEY": apiString
		}
	}

	axios.request(accessTokenOption)
		.then((response) => {
			axios.defaults.headers.post['X-API-KEY'] = localStorage.getItem("api")
			localStorage.setItem("access_token", JSON.stringify(response.data.access_token))
		})
		.catch(error => {
			console.log(error)
		})


	//VLOŽENÍ image DO API	
	// let accessToken = localStorage.getItem("access_token").replaceAll('"', '');

	/* axios({
		method: 'post',
		url: 'https://fullstack.exercise.applifting.cz/images',
		headers: {
			"X-API-KEY": apiString,
			"Authorization": accessToken
		},
		data: image
	}).then((response) => {
		console.log(response);

	}).catch(error => { console.log(error) }); */



	const accessToken = localStorage.getItem("access_token").replaceAll('"', '');

	/* //ZÍSKÁNÍ ARTICLU

	const getArticles = {
		method: 'get',
		url: 'https://fullstack.exercise.applifting.cz/articles',
		headers: {
			"X-API-KEY": apiString,
			"Authorization": accessToken
		}
	}

	axios.request(getArticles)
		.then((response) => {
			console.log(response.data)
		})
		.catch(error => {
			console.log(error)
		}) */

	//ADD ARTICLE TO API
	console.log(accessToken)

	const setArticle = {
		method: 'post',
		url: 'https://fullstack.exercise.applifting.cz/articles',
		data: {
			title: 'Titulek článku',
			article: 'text článku'
		},
		headers: {
			"X-API-KEY": apiString,
			"Authorization": accessToken //vrací chybu 403, neplatný, chybějící nebo expirovaný token
		}
	}

	axios.request(setArticle)
		.then((response) => {
			console.log(response.data)
		})
		.catch(error => {
			console.log(error)
		})

	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<p>
					Edit <code>src/App.js</code> and save to reload.
				</p>
				<a
					className="App-link"
					href="https://reactjs.org"
					target="_blank"
					rel="noopener noreferrer"
				>
					Learn React
				</a>
			</header>
		</div>
	);
}

export default App;
