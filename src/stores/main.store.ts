import { defineStore } from 'pinia'

export interface Level {
  num: number
  code: string
  answer: string
}

export interface Item {
  lang: string
  type: string
  levels: Level[]
}

interface LS_Item {
  type: string
  num: number
}

interface StoreState {
  items: Item[]
  my_levels: LS_Item[]
  isLoading: boolean
}

const LS_NAME = 'my-levels'
const lsData = localStorage.getItem(LS_NAME)

export const useMainStore = defineStore('main', {
  state: (): StoreState => ({
    items: [],
    my_levels: lsData ? JSON.parse(lsData) : [],
    isLoading: false,
  }),
  actions: {
    confirmLevel(type: string, num: number): void {
      const item = this.my_levels.find((item) => item.type === type)

      if (item) item.num = num
      else this.my_levels.push({ type, num })

      localStorage.setItem(LS_NAME, JSON.stringify(this.my_levels))
    },
    async loadItems() {
      try {
        this.isLoading = true
        const resp = await fetch(import.meta.env.VITE_API_URL_ITEMS)
        const data = await resp.json()

        if (!resp.ok) {
          throw new Error(data.message || 'Something went wrong')
        }

        this.items = data
      } catch (err) {
        if (err instanceof Error) {
          console.log(err.message)
        }
      } finally {
        this.isLoading = false
      }
    },
  },
})
