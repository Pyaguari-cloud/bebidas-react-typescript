import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react"
import { NavLink, useLocation } from "react-router-dom"
import { useAppStore } from "../stores/useAppStore"

export const Header = () => {

  const [formData, setFormData] = useState({
    ingrediente: '',
    categoria: ''
  })

  const {pathname} = useLocation()
  const isHome = useMemo(()=>pathname==='/' ,[pathname])
  
  const fetchCategories = useAppStore( (state) => state.fetchCategories )
  const {drinks} = useAppStore( (state) => state.categories )
  const searchFilters = useAppStore( (state) => state.searchFilters )
  const showNotification = useAppStore( (state) => state.showNotification )

  useEffect( ()=> {
    fetchCategories()
  },[])

  const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.id] : e.target.value
    })
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if(Object.values(formData).includes('')){
      showNotification( { text: 'Todos los campos son obligatorios', error: true } )
      return
    }
    searchFilters(formData)
  }

  return (
    <header className={ isHome ? 'headerImage' : 'bg-slate-800' }>
      <div className="mx-auto container px-5 py-16">
        <div className="flex justify-between items-center">
          <div>
            <img className="w-32" src="/logo.svg" alt="logo Bebidas" />
          </div>
          <nav className="flex gap-4">
            <NavLink 
              className={ ({isActive})=> (
                isActive 
                ? 'uppercase text-orange-500 font-bold' 
                : 'uppercase text-white font-bold'
              )} 
              to='/'>Inicio</NavLink>
            <NavLink 
              className={ ({isActive})=> (
                isActive 
                ? 'uppercase text-orange-500 font-bold' 
                : 'uppercase text-white font-bold'
              )}  
              to='/favoritos'>Favoritos</NavLink>
          </nav>
        </div>
          {isHome && (
            <form 
              className="md:w-1/2 2xl:w-1/3 bg-orange-400 my-40 p-10 rounded-lg space-y-6"
              onSubmit={handleSubmit}
              >

              <div className="space-y-4">
                <label htmlFor="ingrediente" 
                className="block text-white font-extrabold uppercase text-lg">
                  Nombre o ingredientes</label>

                <input type="text" name="ingrediente" id="ingrediente" 
                  placeholder="Nombre o ingrediente Ej. Vodka, Tequila, Coffe"
                  className="w-full p-3 focus:outline-none bg-white rounded-lg"
                  onChange={handleChange}
                  value={formData.ingrediente}
                />
              </div>

              <div className="space-y-4">
                <label
                htmlFor="categoria"
                className="block text-white font-extrabold uppercase text-lg">
                  Categoría</label>

                <select
                  id="categoria"
                  name="categoria"
                  className="w-full p-3 focus:outline-none bg-white rounded-lg"
                  onChange={handleChange}
                  value={formData.categoria}
                  >
                  <option value="">-- Selecciona una categoría --</option>
                  {
                    drinks && (
                      drinks.map( drink => (
                        <option key={drink.strCategory} value={drink.strCategory}>{drink.strCategory}</option>
                      ))
                    )
                  }
                </select>
              </div>
              <input type="submit" 
                className="w-full p-2 text-white uppercase rounded-lg font-extrabold bg-orange-800 hover:bg-amber-900"
                value="Buscar recetas"
              />
            </form>
          )}
      </div>

    </header>
  )
} 

// const modal = useAppStore((state) => state.modal)
// const closeModal = useAppStore((state) => state.closeModal)