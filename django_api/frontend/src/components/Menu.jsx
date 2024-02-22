import  React from "react";
import "../styles/Nav.css";

export default function Menu(){
	return(
		<>
		<nav className="sticky-top">
			<a href="/home"><li className="home text-center ">Home</li></a>
			<a href="/blog"><li className="blog text-center">Blog</li></a>
			<a href="/trilhas"><li className="trilhas text-center">Trilhas</li></a>
		</nav>
		</>
	)
}
