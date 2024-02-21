import  React  from "react";
import Cookies from "universal-cookie";
import axios from "axios";

const cookie = new Cookies();


class App extends React.Component{
	
	constructor(props){
		super(props);
		this.state={
			username: "",
			password: "",
			error: "",
			isAuthenticated: false,
			posts: [], 
		};

	};
	componentDidMount = () => {
		this.getSession();
		this.getPosts();
	} 
	getSession = () => {
		fetch("/api/session", 
		{
			credentials: "same-origin",

		})
		.then((res)=>res.json())
		.then((data)=>{
			console.log(data)
			if(data.isAuthenticated){
				this.setState({isAuthenticated: true});
			}else{
				this.setState({isAuthenticated: false});
			}
			})
		.catch((err)=>{
			console.log(err);
		})
	}	
	whoami = () =>{
		fetch("/api/whoami", {
			headers:{
				"Content-Type": "application/json",
			},
			credentials:"same-origin"
		})
		.then((res)=> res.json)
		.then((data)=> {
			console.log("Bem vindo a Selva, " + data.username);
		})
		.catch((err) => {
			console.log(err)
		});

	}
	handlePassChange = (event) =>{
		this.setState({password: event.target.value});

	}
	handleUsernameChange = (event) =>{
		this.setState({username: event.target.value});

	}
	ifResOk(res){
		if (res.status>=200 && res.status<=299){
			return response.json();
		}else{
			throw Error(response.statusText);
		}

	}
	login = (event) => {
		event.preventDefault();
		// Make a post request
		fetch("/api/login",{
			method: "POST",
			headers: {
				"Content-Type": "application/json", 
				"X-CSRFToken": cookies.get("csrftoken"),// Importante para saber quando o CSRF é adicionando
			},
			credentials: "same-origin",
			body: JSON.stringify({
				username: this.state.username,
				password: this.state.password,
			})
		})
		.then(this.ifResOk)
		.then((data)=>{
			console.log(data);
			this.setState({
				isAuthenticated: true,
				username: "", 
				password: "",
				error: ""
			});
		})
		.catch((err)=>{
			console.log(err);
			this.setState({error: "Errrou!"})
		});
	}
	logout = () => {
		fetch("/api/logout",{
			credentials: "same-origin",
		})
		.then(this.isResOk)	
		.then((data) =>{
			console.log(data);
			this.setState({isAuthenticated: false});
		})
		.catch((e)=>{
			console.log(e);
		})
	}
	getPosts = () => {
		fetch("/api/posts/")
		.then((res) => res.json())
		.then((data) => {
			this.setState({posts: data});
		})
		.catch((err)=>{
			console.log(err);
		})
	}
	// Fazer um card para cada post e limitar a quantidade de caracteres renderizados.
	renderPosts = () =>{
		const posts = this.state.posts;
		return posts.map( p => (
			<li key={p.id}>
				<h2>{p.title}</h2>
				<span>{p.content}</span>
			</li>
		))
	}
	render(){
		if(!this.state.isAuthenticated){
			// Não haverá o componente de login 
			return(
				<div>
				<h1 >Só a Ideia - Online</h1>
				{this.renderPosts()}
				</div>
			); 
		}
		return(
			<div>
			{this.whoami()}
			<p>Tamo dentro</p>
			<p>( ͡° ͜ʖ ͡°)</p>
			</div>
		)

	}
}

export default App;
