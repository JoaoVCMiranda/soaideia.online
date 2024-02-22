import  React from "react";
export default function HomePost(props){

	return(
		<>
		<div id={props.id} className="m-5 p-5 border border-primary rounded h-10">		
			<h2>{props.title}</h2>
			<span className="text-muted">{props.descr}</span>
			<br/>
			<p>{props.content}</p>
		</div>
		</>
	)
}
