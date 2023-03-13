

import { useState } from "react";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from 'uuid';
import { useSelector } from "react-redux";

import { useHttp } from "../../hooks/http.hook";
import { heroCreated } from '../heroesList/heroesSlice';

const HeroesAddForm = () => {
    const [newHeroName,setName] = useState('')
    const [newHeroDescr,setDescr] = useState('')
    const [newElemDescr,setElem] = useState('')

    const dispatch = useDispatch()
    const {filters, filtersLoadingStatus} = useSelector(state => state.filter);
    const {request} = useHttp()

    const onSubmitHendler = (e) =>{
        e.preventDefault()
        const newHero = {
            id:uuidv4(),
            name:newHeroName,
            descr:newHeroDescr,
            elem:newElemDescr
        }
        request("http://localhost:3001/heroes",'POST', JSON.stringify(newHero))
            .then(dispatch(heroCreated(newHero)))
            .catch(err=>console.log(err))
        
        setName('')
        setDescr('')
        setElem('')
    }
    const renderFilters = (filters, status) => {
        if (status === "loading") {
            return <option>Загрузка элементов</option>
        } else if (status === "error") {
            return <option>Ошибка загрузки</option>
        }
        
        // Если фильтры есть, то рендерим их
        if (filters && filters.length > 0 ) {
            return filters.map(({name, label}) => {
                // Один из фильтров нам тут не нужен
                // eslint-disable-next-line
                if (name === 'all')  return;

                return <option key={name} value={name}>{label}</option>
            })
        }
    }

    return (
        <form className="border p-4 shadow-lg rounded" onSubmit={onSubmitHendler}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                <input 
                    required
                    type="text" 
                    name="name" 
                    className="form-control" 
                    id="name" 
                    placeholder="Как меня зовут?"
                    value={newHeroName}
                    onChange ={(e)=>setName(e.target.value)}/>
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">Описание</label>
                <textarea
                    required
                    name="text" 
                    className="form-control" 
                    id="text" 
                    placeholder="Что я умею?"
                    style={{"height": '130px'}}
                    value = {newHeroDescr}
                    onChange = {(e)=> setDescr(e.target.value)}/>
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                <select 
                    required
                    className="form-select" 
                    id="element" 
                    name="element"
                    value={newElemDescr}
                    onChange ={(e)=>setElem(e.target.value)}>
                    <option >Я владею элементом...</option>
                    {renderFilters(filters, filtersLoadingStatus)}
                </select>
            </div>

            <button type="submit" className="btn btn-primary">Создать</button>
        </form>
    )
}

export default HeroesAddForm;