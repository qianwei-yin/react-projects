import React, { useState, useEffect } from "react";
import { useFetch } from "./useFetch";
import Follower from "./Follower";
function App() {
	const { loading, data } = useFetch();
	const [page, setPage] = useState(0);
	const [followers, setFollowers] = useState([]);

	useEffect(() => {
		if (loading) return;
		setFollowers(data[page]);
	}, [loading, page, data]);

	function prevPage() {
		if (page === 0) {
			return;
		}
		setPage(page - 1);
	}

	function nextPage() {
		if (page === data.length - 1) {
			return;
		}
		setPage(page + 1);
	}

	return (
		<main>
			<div className="section-title">
				<h1>{loading ? "loading..." : "pagination"}</h1>
				<div className="underline"></div>
			</div>
			<section className="followers">
				<div className="container">
					{followers.map((follower) => {
						return <Follower key={follower.id} {...follower} />;
					})}
				</div>
				{loading ? null : (
					<div className="btn-container">
						<button className="prev-btn" onClick={prevPage}>
							prev
						</button>
						{data.map((_, index) => {
							return (
								<button
									key={index}
									className={`${
										index === page ? "active-btn" : null
									} page-btn`}
									onClick={() => setPage(index)}
								>
									{index + 1}
								</button>
							);
						})}
						<button className="next-btn" onClick={nextPage}>
							next
						</button>
					</div>
				)}
			</section>
		</main>
	);
}

export default App;
