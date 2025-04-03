import { StateCreator } from "zustand";
import { Recipe } from "../types";
import { createNotificationSlice, NotificationSliceType } from "./notificationSlice";

export type FavoriteSliceType = {
    favorite: Recipe[],
    hadleClickFavorite: ( recipe: Recipe ) => void,
    favoriteExists: (id: Recipe['idDrink']) => boolean,
    loadFavorites: () => void
}

export const createFavoriteSlice : StateCreator<FavoriteSliceType & 
NotificationSliceType, [], [], FavoriteSliceType> = (set, get, api) => ({
    favorite: [],
    hadleClickFavorite: (recipe) => {
        if( get().favorite.some( (favorite) => favorite.idDrink === recipe.idDrink)) {
            set( (state)=>({
                favorite: state.favorite.filter( (favorite) => favorite.idDrink !== recipe.idDrink )
            }))
            createNotificationSlice(set, get, api).showNotification({ text: 'Se eliminó de favoritos', error: true })
        } else {
            set((state)=>({
                favorite: [...state.favorite, recipe]
            }))
            createNotificationSlice(set, get, api).showNotification({ text: 'Se agrego a favoritos', error: false })
        }
        localStorage.setItem('favorites', JSON.stringify(get().favorite))
    },
    favoriteExists: (id) => {
        return get().favorite.some( (favorite) => favorite.idDrink === id)
    },
    loadFavorites: () => {
        const storedFavorite = localStorage.getItem('favorites')
        if(storedFavorite){
            set({
                favorite: JSON.parse(storedFavorite)
            })
        }
    }
})