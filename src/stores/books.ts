import { ref, computed } from 'vue'
import { acceptHMRUpdate, defineStore } from 'pinia'

export type Book = {
  id: string;
  title: string;
  subtitle: string;
  isbn: string;
  abstract: string;
  author: string;
  publisher: string;
  price: string;
  numPages: number;
  cover: string;
  userId: number;
  isFavorite: boolean;
}

export const useBookStore = defineStore('books', () => {
  const url = 'http://localhost:4730/books?_limit=10'

  const books = ref<Book[]>([])
  const isLoadingBooks = ref(false)

  async function getBooks() {
    isLoadingBooks.value = true
    try {
      const response = await fetch(url)
      const data: Omit<Book, 'isFavorites'>[] = await response.json()

      books.value = data.map((book) => ({
        ...book,
        isFavorite: false
      }))
    } catch (error) {
      console.error(error)
    } finally {
      isLoadingBooks.value = false
    }
  }

  const favoriteBooks = computed(() => books.value.filter((book) => book.isFavorite))

  function toggleFavorite(id: string) {
    const book = books.value.find((book) => book.id === id)
    if (book) {
      book.isFavorite = !book.isFavorite
    }
  }

  const searchByBookTitle = ref('')

  const filteredBooks = computed(() => {
    if(!searchByBookTitle.value) return books.value

    const result = books.value.filter((book) => {
      return book.title.toLowerCase().includes(searchByBookTitle.value.toLowerCase())
    })

    if(!selectedPublisher.value) return result

    return result.filter((book) => book.publisher === selectedPublisher.value)
  })

  const selectedPublisher = ref('')

  const bookPublishers = computed(() => {
    if(!books.value.length) return []

    return new Set(books.value.map((book) => book.publisher))
  })

  return {
    isLoadingBooks,
    searchByBookTitle,
    selectedPublisher,
    bookPublishers,
    filteredBooks,
    favoriteBooks,
    getBooks,
    toggleFavorite,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useBookStore, import.meta.hot))
}