import { useAppStore } from "../stores/useAppStore"
import { Drink } from "../types"

type DrinkCardProps = {
    drink: Drink
}

export const DrinkCard = ({drink}:DrinkCardProps) => {

  const selectRecipe = useAppStore( (store) => store.selectRecipe )

  return (
    <div className="border shadow-lg mt-5">
        <div className="overflow-hidden">
            <img
            className="hover:scale-125 transition-transform hover:rotate-2" 
            src={drink.strDrinkThumb} alt={`Imagen de ${drink.strDrink}`} />
        </div>
        <div className="p-5">
            <p className="text-2xl font-black truncate">{drink.strDrink}</p>
            <button className="bg-orange-400 hover:bg-orange-500 text-lg 
            text-white w-full font-bold p-3 mt-5"
            onClick={()=>selectRecipe(drink.idDrink)}
            >
                Ver Receta
            </button>
        </div>
    </div>
  )
}
