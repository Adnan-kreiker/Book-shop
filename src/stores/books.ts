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
}

export type BookWithFavorite = Book & {
  isFavorite: boolean;
}

export const BaseURL = 'http://localhost:4730/'

export const useBooksStore = defineStore('books', () => {

  const books = ref<BookWithFavorite[]>([])
  const isLoadingBooks = ref(false)

  async function getBooks() {
    isLoadingBooks.value = true
    try {
      const response = await fetch(`${BaseURL}books?_limit=10`)
      const data: Book[] = await response.json()

      const favoritesFromLocalStorage = JSON.parse(localStorage.getItem('favorites') ?? '[]') as string[]

      books.value = data.map((book) => ({
        ...book,
        isFavorite: favoritesFromLocalStorage.includes(book.isbn)
      }))
    } catch (error) {
      console.error(error)
    } finally {
      isLoadingBooks.value = false
    }
  }


  const favoriteBooks = computed<BookWithFavorite[]>(() => books.value.filter((book) => book.isFavorite))

  const filteredFavoriteBooks = computed<BookWithFavorite[]>(() => {

    if(!searchByBookTitle.value && selectedPublisher.value == '-') return favoriteBooks.value

    const result = favoriteBooks.value.filter((book) => {
      return book.title.toLowerCase().includes(searchByBookTitle.value.toLowerCase())
    })

    if(selectedPublisher.value == '-') return result

    return result.filter((book) => book.publisher === selectedPublisher.value)
  })

  function toggleFavorite(isbn: string) {
    const favoritesFromLocalStorage = JSON.parse(localStorage.getItem('favorites') ?? '[]') as string[]
    console.log(favoritesFromLocalStorage);
    const index = favoritesFromLocalStorage.indexOf(isbn)

    if (index === -1) {
      favoritesFromLocalStorage.push(isbn)
    } else {
      favoritesFromLocalStorage.splice(index, 1)
    }

    localStorage.setItem('favorites', JSON.stringify(favoritesFromLocalStorage))

    const book = books.value.find((book) => book.isbn === isbn)
    if (book) {
      book.isFavorite = !book.isFavorite
    }
  }

  const searchByBookTitle = ref<string>('')

  const selectedPublisher = ref<string>('-')

  const filteredBooks = computed<BookWithFavorite[]>(() => {
    if(!searchByBookTitle.value && selectedPublisher.value == '-') return books.value

    const result = books.value.filter((book) => {
      return book.title.toLowerCase().includes(searchByBookTitle.value.toLowerCase())
    })

    if(selectedPublisher.value == '-') return result

    return result.filter((book) => book.publisher === selectedPublisher.value)
  })

  const numberOfFilteredBooks = computed<number>(() => filteredBooks.value.length)

  const bookPublishers = computed<string[]>(() => {
    if(!books.value.length) return []

    return [...new Set(books.value.map((book) => book.publisher))]
  })

  const selectedBookISBN = ref<string|null>(null)

  const selectedBook = computed<BookWithFavorite|null>(() => {
    if(!selectedBookISBN.value) return null

    return books.value.find((book) => book.isbn === selectedBookISBN.value) as BookWithFavorite
  })


  return {
    isLoadingBooks,
    searchByBookTitle,
    numberOfFilteredBooks,
    selectedPublisher,
    selectedBookISBN,
    selectedBook,
    bookPublishers,
    filteredBooks,
    favoriteBooks,
    filteredFavoriteBooks,
    getBooks,
    toggleFavorite,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useBooksStore, import.meta.hot))
}