import { useEffect, useState } from "react";
import "./App.css";

function App() {
	const [employees, setEmployees] = useState([]);
	const [offset, setOffset] = useState(0);
	const [isLoading, setIsLoading] = useState(false);
	const limit = 10;

	const goPreviousoffset = () => {
		if (offset >= 10) setOffset((prev) => prev - 10);
	};

	const goNextoffset = () => {
		const maxoffset = Math.floor(employees.length / limit) * 10;

		if (offset < maxoffset) setOffset((prev) => prev + 10);
	};

	const currentPageEmployees = employees.slice(offset, offset + limit);
	const currentPage = Math.floor(offset / 10) + 1;
	useEffect(() => {
		(async function () {
			setIsLoading(true);
			const url =
				"https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";

			try {
				const res = await fetch(url);
				const data = await res.json();
				if (data) {
					setEmployees(data);
				}
			} catch (error) {
				console.error(error);
				alert("failed to fetch data");
			} finally {
				setIsLoading(false);
			}
		})();
	}, []);

	return (
		<main>
			<h1>Employee Data Table</h1>
			{isLoading ? (
				<p>Loading...</p>
			) : (
				<>
					<table>
						<thead>
							<tr>
								<th align="left">ID</th>
								<th align="left">Name</th>
								<th align="left">Email</th>
								<th align="left">Role</th>
							</tr>
						</thead>
						<tbody>
							{currentPageEmployees &&
								currentPageEmployees.map(({ id, name, email, role }) => (
									<tr key={id}>
										<td>{id}</td>
										<td>{name}</td>
										<td>{email}</td>
										<td>{role}</td>
									</tr>
								))}
						</tbody>
					</table>
					<div className="pagination-control">
						<button onClick={goPreviousoffset} disabled={offset == 0}>
							Previous
						</button>
						<div>{currentPage}</div>
						<button
							onClick={goNextoffset}
							disabled={offset == Math.floor(employees.length / limit) * 10}
						>
							Next
						</button>
					</div>
				</>
			)}
		</main>
	);
}

export default App;
