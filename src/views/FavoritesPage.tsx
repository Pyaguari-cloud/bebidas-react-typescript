import { useMemo } from "react"
import { useAppStore } from "../stores/useAppStore"
import { DrinkCard } from "../components/DrinkCard"

const FavoritesPage = () => {

  const favorite = useAppStore((state) => state.favorite)
  const hasFavorites = useMemo(() => favorite.length, [favorite])
  return (
    <>
      <h1 className="text-6xl font-extrabold">Favoritos</h1>

      {
        hasFavorites
          ? (
            <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 my-10 gap-10">
              {
                favorite.map(drink => (
                  <DrinkCard
                    key={drink.idDrink}
                    drink={drink}
                  />
                ))
              }
            </div>
          ) : (
            <p className="my-10 text-center text-2xl ">
              Los favoritos se mostraran aquí.
            </p>
          )
      }

    </>
  )
}

export default FavoritesPage;
