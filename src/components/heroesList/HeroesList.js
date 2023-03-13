import {useHttp} from '../../hooks/http.hook';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CSSTransition, TransitionGroup} from 'react-transition-group';
import { createSelector } from 'reselect';

import {fetchHeroes,heroRemoved} from './heroesSlice'
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';
import './heroesList.scss';



const HeroesList = () => {

    const filtredHeroesSelector = createSelector(
        state => state.filter.activeFilter,
        state => state.heroes.heroes,
        (activeFilter,heroes) =>{
            if(activeFilter === 'all'){
                return heroes
            }else{
                return heroes.filter(item=>item.elem === activeFilter)
            }
        }
    )


    const filteredHeroes = useSelector(filtredHeroesSelector)
    const  heroesLoadingStatus = useSelector(state => state.heroes.heroesLoadingStatus);
    const dispatch = useDispatch();
    const {request} = useHttp();

    useEffect(() => {
        dispatch(fetchHeroes())
    }, []);
     

    const heroRemove = useCallback((id) => {
       request(`http://localhost:3001/heroes/${id}`, "DELETE")
        .then(dispatch(heroRemoved(id)))
        .catch(err => console.log(err));
    }, [request]);


    if (heroesLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (heroesLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

  

    const renderHeroesList = (arr) => {
        if (arr.length === 0) {
            return (
                <CSSTransition
                    timeout={0}
                    classNames="hero">
                    <h5 className="text-center mt-5">Героев пока нет</h5>
                </CSSTransition>
            )
        }

        return arr.map(({id, ...props}) => {
            return (
                <CSSTransition 
                    key={id}
                    timeout={500}
                    classNames="hero">
                    <HeroesListItem  {...props} heroRemove={() => heroRemove(id)}/>
                </CSSTransition>
            )
        })
    }

    const elements = renderHeroesList(filteredHeroes);
    return (
        <TransitionGroup component="ul">
            {elements}
        </TransitionGroup>
    )
}

export default HeroesList;