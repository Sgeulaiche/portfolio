import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function ProjectDetail({ userName }) {
	const [loading, setLoading] = useState(false);
	const [project, setProject] = useState([]);
	const { name } = useParams();

	useEffect(() => {
		async function fetchData() {
			const data = await fetch(
				`https://api.github.com/repos/${userName}/${name}`,
			);
			const result = await data.json();

			if (result) {
				setProject(result);
				setLoading(false);
			}
			console.log(result);
		}

		if (userName && name) {
			fetchData();
		}
	}, [userName, name]);

	return (
		<div className="Project-container">
			<h2>Project: {project.name}</h2>
			{loading ? (
				<span>Loading...</span>
			) : (
				<p>{project.description}</p>
			)}
		</div>
	);
}