import {heroesFetching,heroesFetched,heroesFetchingError,heroRemoved} from '../components/heroesList/heroesSlice'

// export const fetchHeroes = (request) => (dispatch) => {
//     dispatch(heroesFetching);
//      request("http://localhost:3001/heroes")
//             .then(data => dispatch(heroesFetched(data)))
//             .catch(() => dispatch(heroesFetchingError()))

//         // eslint-disable-next-line
// }

// export const removeHero = (request,id) => (dispatch) =>{
//     request(`http://localhost:3001/heroes/${id}`, "DELETE")
//         .then(dispatch(heroRemoved(id)))
//         .catch(err => console.log(err));
// }






