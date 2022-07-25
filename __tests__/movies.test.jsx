import {render} from "react-dom";
import {ListMovies} from "../index";

describe("movie pages", () => {

    it("show movies list", () => {
        const element = document.createElement("div");
        render(<ListMovies />, element);
        expect(element.innerHTML).toMatchSnapshot();

    });

    it("lets the user add a new movie", () => {

    });

});