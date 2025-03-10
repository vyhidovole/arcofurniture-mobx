import BaseStore from "./BaseStore";
import { makeObservable, observable, action, runInAction } from "mobx";

/**
 * Класс для управления состоянием товаров.
 */
class CatalogueStore extends BaseStore {
  products = []; // Инициализируем массив товаров
  basket = []; // Корзина
  quantity = 0;

  constructor() {
    super();
    makeObservable(this, {
      products: observable, // Делаем products наблюдаемым
      basket: observable, // Делаем basket наблюдаемым
      quantity: observable, // Делаем quantity наблюдаемым
      getProducts: action, // Делаем getProducts действием
      addProductToBasket: action, // Делаем addProduct действием
      deleteProductFromBasket: action, // Делаем deleteProductFromBasket действием
      initializeBasket: action,
      incrementProductQuantity: action,
      decrementProductQuantity: action,
      updateCount: action,
      saveToLocalStorage: action,
      
    });
  }

  /**
   * Функции для получения товаров с сервера.
   * Использует fetch для отправки запроса на сервер и обновляет массив товаров.
   */
  getProducts(url) {
    fetch(`${this.baseUrl}${url}`) // Используем базовый URL
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        runInAction(() => {
          this.products.replace(data); // Обновляем состояние с полученными данными
        });
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }

  /**
   * Метод для добавления нового продукта в массив товаров и отправки на сервер.
   * @action
   * @param {Object} newProduct - Данные нового продукта.
   * @param {string} newProduct.name - Название нового продукта.
   * @param {string} newProduct.category - Категория нового продукта.
   * @param {number} newProduct.price - Цена нового продукта.
   */


  addProductToBasket(product) {
    runInAction(() => {
      // Добавляем товар с количеством 1, игнорируя предыдущее количество
      const existingProduct = this.basket.find(item => item.id === product.id);
      if (!existingProduct) {

        // Если товара нет, добавляем его с количеством 1
        this.basket.push({ ...product, quantity: 1 });
      } else {
        // Если товар уже есть, увеличиваем его количество
        existingProduct.quantity += 1;
      }

      this.updateCount();
      this.saveToLocalStorage();
      console.log(localStorage.getItem("quantity"));

    });
  }
  // Метод для установки начального состояния корзины
  setBasket(savedBasket) {
    runInAction(() => {
      console.log("Установка корзины:", savedBasket); // Отладочное сообщение
      this.basket = savedBasket;
      this.updateCount(); // Обновляем количество после установки
    });
  }

  // Метод для увеличения количества товара
  incrementProductQuantity(productId) {
    const product = this.basket.find(item => item.id === productId);
    if (product) {
      product.quantity += 1; // Увеличиваем количество на 1
    }
    console.log("количество товаров увеличено")
  }

  // Метод для уменьшения количества товара
  decrementProductQuantity(productId) {
    const product = this.basket.find(item => item.id === productId);
    if (product && product.quantity > 1) {
      product.quantity -= 1; // Уменьшаем количество на 1
    } else if (product && product.quantity === 1) {
      // Если количество товара 1, можно удалить его из корзины
      this.deleteProductFromBasket(productId);
    }
    console.log("количество товаров уменьшено")
  }

  /**
     * Удаляет товар из корзины по его ID.
     * @param {string} itemId - ID товара, который нужно удалить.
     */

  deleteProductFromBasket(itemId) {
    console.log("Удаляем товар с ID:", itemId); // Логируем ID товара
    console.log("Текущая корзина:", this.basket); // Логируем текущее состояние корзины

    runInAction(() => {

      const existingProduct = this.basket.find(item => item.id === itemId);

      if (existingProduct) {
        if (existingProduct.quantity > 1) {
          // Уменьшаем количество, если оно больше 1
          existingProduct.quantity -= 1;
        } else {
          // Удаляем товар, если его количество равно 1
          const itemIndex = this.basket.findIndex(item => item.id === itemId);
          if (itemIndex !== -1) {
            this.basket.splice(itemIndex, 1); // Удаляем товар из корзины
          }
        }
        this.updateCount(); // Обновляем количество уникальных товаров
        this.saveToLocalStorage(); // Сохраняем изменения в localStorage
      } else {
        console.error("Товар не найден в корзине с ID:", itemId); // Логируем, если товар не найден
      }
    });
  }
  // Обновление количества товаров в корзине
  updateCount() {
    this.quantity = this.basket.length; // Обновляем quantity, равный количеству уникальных товаров
    console.log("Количество уникальных товаров обновлено:", this.quantity);
  }
  
  saveToLocalStorage() {
    try {
        if (typeof window !== 'undefined') {
            localStorage.setItem("basket", JSON.stringify(this.basket));
            localStorage.setItem("quantity", this.quantity);
            console.log("Сохранено в localStorage:", this.basket, this.quantity); // Отладочное сообщение
        }
    } catch (error) {
        console.error("Ошибка при сохранении в localStorage:", error);
    }
}
  // Инициализация корзины из localStorage
  initializeBasket() {
    if (typeof window !== 'undefined') { // Проверяем, что код выполняется в браузере
        const savedBasket = JSON.parse(localStorage.getItem("basket")) || [];
        this.basket = savedBasket;
        this.updateCount();
        console.log("Корзина инициализирована:", this.basket); // Отладочное сообщение
    } else {
        console.warn("localStorage недоступен, инициализация корзины не выполнена.");
    }
}
clearProduct(id) {
  this.basket = this.basket.filter(item => item.id !== id); // Удаляем товар с указанным id
}
}


const catalogueStore = new CatalogueStore();
catalogueStore.initializeBasket(); 
export default catalogueStore;
