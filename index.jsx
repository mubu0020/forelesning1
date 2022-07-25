import * as React from "react";
import * as ReactDOM from "react-dom";
import {BrowserRouter, HashRouter, Link, Route, Routes, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";


function FontPage() {
    return <div>
        <h1>Movie Database</h1>
        <ul>
            <li><Link to={"/movies"}>Show movies</Link></li>
            <li><Link to={"/movies/new"}>Create new movie</Link></li>
        </ul>
    </div>;
}

const Movies = [
    {
        title: "Don't look up",
        plot: "Impending disaster, but will politicians act?",
        year: 2021
    },
    {
        title: "Remix",
        plot: "Handler om en grooving som skal InshAllah dunke dette faget",
        year: 2022
    }
]

function MovieCard(props) {
    const {title, plot, year} = props.movie

    return <div>
        <h2>{title} ({year})</h2>
        <p>{plot}</p>
    </div>;
}

export function ListMovies() {
    return <div>
        <h1>Movies</h1>
        {Movies.map(movie => <MovieCard key={movie.title} movie={movie}/>)}
    </div>
}

function CreateMovies() {
    const [title, setTitle] = useState("");
    const [year, setYear] = useState("");
    const [plot, setPlot] = useState("");

    const [newMovie, setNewMovie] = useState({});

    const navigate = useNavigate();


    useEffect(() => {
    setNewMovie({title, year, plot});
    }, [title, year, plot]);

    function handleSubmit(event){
        event.preventDefault();
        Movies.push(newMovie);
        navigate("..");
    }

    return <form onSubmit={handleSubmit}>
        <h1>Create new movie</h1>;
        <div>
            Title:
            <input value={title} onChange={event => setTitle(event.target.value)}/>
        </div>
        <div>
            Year:
            <input value={year} onChange={event => setYear(event.target.value)}/>
        </div>
        <div>
            <div>:Plot</div>
            <textarea value={plot} onChange={event => setPlot(event.target.value)}/>
        </div>
        <button>Save</button>
        <pre>
            {JSON.stringify(newMovie)}
        </pre>
    </form>
        }

function MovieApplication(){
    return <Routes>
        <Route path={"/"} element={<ListMovies/>} />
        <Route path={"/new"} element={<CreateMovies/>}/>
        <Route path={"*"} element={<h1>Movie not Found</h1>} />

    </Routes>
}

function Application() {
    return <BrowserRouter>
        <Routes>
            <Route path={"/"} element={<FontPage />} />
            <Route path={"/movies/*"} element={<MovieApplication />}/>
            <Route path={"*"} element={<h1>Not Found</h1>} />
        </Routes>
    </BrowserRouter>;
}

ReactDOM.render(
    <Application/>,
    document.getElementById("app")
);