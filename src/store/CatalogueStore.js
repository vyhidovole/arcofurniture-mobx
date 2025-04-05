import BaseStore from "./BaseStore";
import { makeObservable, observable, action, runInAction } from "mobx";

/**
 * Класс для управления состоянием товаров.
 */
class CatalogueStore extends BaseStore {

  products = []; // Инициализируем массив товаров
  workItems = []; // Инициализируем массив работ
  basket = []; // Корзина
  quantity = 0;

  constructor() {
    super();
    makeObservable(this, {
      products: observable, // Делаем products наблюдаемым
      workItems: observable, // Делаем workItems наблюдаемым
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
      clearProduct: action,

    });
  }

  /**
   * Функции для получения товаров с сервера.
   * Использует fetch для отправки запроса на сервер и обновляет массив товаров.
   */
  // getProducts(url) {
  //   fetch(`${this.baseUrl}${url}`) // Используем базовый URL
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error(`HTTP error! status: ${response.status}`);
  //       }
  //       return response.json();
  //     })
  //     .then((data) => {
  //       runInAction(() => {
  //         this.products.replace(data); // Обновляем состояние с полученными данными
  //       });
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching products:", error);
  //     });
  // }
  async getProducts(url) {
    try {
        const response = await fetch(`${this.baseUrl}${url}`);
        if (!response.ok) {
            throw new Error(`Ошибка HTTP: ${response.status}`);
        }
        const data = await response.json();
        this.products = data; // Предполагаем, что данные - это массив продуктов
    } catch (error) {
        console.error("Ошибка при загрузке продуктов:", error);
    }
}

async getWorkItems(url) {
  try {
      const response = await fetch(`${this.baseUrl}${url}`);
      if (!response.ok) {
          throw new Error(`Ошибка HTTP: ${response.status}`);
      }
      const data = await response.json();
      runInAction(() => {
          this.workItems = data; // Предполагаем, что данные - это массив работ
      });
  } catch (error) {
      console.error("Ошибка при загрузке работ:", error);
  }
}


  addProductToBasket(item) {
    console.log("Добавляем продукт в корзину:", item); // Логируем добавляемый продукт
    const existingProduct = this.basket.find(product => product.id === item.id);

    if (existingProduct) {
      // Если продукт уже есть в корзине, увеличиваем его количество
      existingProduct.quantity += 1;
      console.log(`Увеличиваем количество для ${item.name}: ${existingProduct.quantity}`);
    } else {
      // Если продукта нет в корзине, добавляем его
      this.basket.push({ ...item, quantity: 1 });
      console.log(`Товар ${item.name} добавлен в корзину с количеством 1`);
    }

    // Обновляем количество уникальных товаров в корзине
    this.updateCount();
    this.saveToLocalStorage();
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
      this.updateCount();
    }
    console.log("количество товаров увеличено")
  }

  // Метод для уменьшения количества товара
  decrementProductQuantity(productId) {
    const product = this.basket.find(item => item.id === productId);
    if (product && product.quantity > 1) {
      product.quantity -= 1; // Уменьшаем количество на 1
      this.updateCount();
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
    console.log("Удаляем товар с ID:", itemId);
    console.log("Текущая корзина:", this.basket);

    runInAction(() => {
      const existingProduct = this.basket.find(item => item.id === itemId);

      if (existingProduct) {
        const itemIndex = this.basket.findIndex(item => item.id === itemId);
        if (itemIndex !== -1) {
          this.basket.splice(itemIndex, 1); // Удаляем товар из корзины
        }
        this.updateCount(); // Обновляем количество уникальных товаров
        this.saveToLocalStorage(); // Сохраняем изменения в localStorage
      } else {
        console.error("Товар не найден в корзине с ID:", itemId);
      }
    });
  }
  // Обновление количества товаров в корзине
  // updateCount() {
  //   this.quantity = this.basket.length; // Обновляем quantity, равный количеству уникальных товаров
  //   console.log("Количество уникальных товаров обновлено:", this.quantity);
  // }
  updateCount() {
    this.quantity = this.basket.reduce((total, product) => total + product.quantity, 0);
    console.log("Обновлено количество товаров в корзине:", this.quantity);
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
    this.updateCount(); // Обновляем количество после очистки
    console.log("Корзина очищена"); // Отладочное сообщение
  }

}


const catalogueStore = new CatalogueStore();
catalogueStore.initializeBasket();

export default catalogueStore;
