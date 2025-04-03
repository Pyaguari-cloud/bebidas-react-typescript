import { StateCreator } from "zustand"
import { getCategories, getRecipe, getRecipes } from "../services/RecipeService"
import { Categories, Drink, Drinks, Recipe, SearchFilters } from "../types"


export type RecipesSliceType = {
    categories: Categories,
    drinks: Drinks,
    selectedRecipe: Recipe,
    modal: boolean,
    fetchCategories: () => Promise<void>,
    searchFilters: (searchFilter : SearchFilters) => Promise<void>,
    selectRecipe: (id:Drink['idDrink']) => Promise<void>,
    closeModal: () => void
}

export const createRecipeSlice : StateCreator<RecipesSliceType> = (set) => ({
    categories: {
        drinks: []
    },
    drinks: {
        drinks: []
    },
    selectedRecipe: {} as Recipe,
    modal: false,
    fetchCategories: async () => {
        const categories = await getCategories()
        set({
            categories
        })
    },
    searchFilters: async (searchFilter) => {
        const drinks = await getRecipes(searchFilter)
        set({
            drinks
        })
    },
    selectRecipe: async (id) => {
        const selectedRecipe = await getRecipe(id)
        set({
            selectedRecipe,
            modal: true
        })
    },
    closeModal: () => {
        set({
            selectedRecipe: {} as Recipe,
            modal: false
        })
    },
})