import BaseStore from "./BaseStore";
import { observable, action,runInAction} from "mobx";

/**
 * Класс для управления состоянием товаров.
 */
class CatalogueStore extends BaseStore {
  constructor() {
    super();

    /**
     * Observable массив товаров.
     * @observable
     * @type {Array}
     */
    this.products = observable([]);

    /**
     * Привязка метода к экземпляру класса. Метод для получения товаров с сервера.
     * @action
     */
    this.getProducts = action(this.getProducts.bind(this));

    /**
     * Привязка метода к экземпляру класса. Метод для добавления нового товара.
     * @action
     */
    this.addProduct = action(this.addProduct.bind(this));
  }

  /**
   * Функция для получения товаров с сервера.
   * Использует fetch для отправки запроса на сервер и обновляет массив товаров.
   */
  getProducts = () => {
    fetch(`http://localhost:3000/CatalogueProducts`)
      .then((response) => {
        if(!response.ok){
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      return response.json()

      })
      
      .then((data) => {
        runInAction(() => {
            this.products.replace(data); // Обновляем состояние с полученными данными
        });
    })
    .catch((error) => {
        console.error("Error fetching products:", error);
    });
  };

  /**
   * Метод для добавления нового продукта в массив товаров и отправки на сервер.
   * @action
   * @param {Object} newProduct - Данные нового продукта.
   * @param {string} newProduct.name - Название нового продукта.
   * @param {string} newProduct.category - Категория нового продукта.
   * @param {number} newProduct.price - Цена нового продукта.
   */
  addProduct = newProduct => {
    fetch("http://localhost:3000/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        this.products.push(data);
      })
      .catch((error) => {
        console.error("Error adding product:", error);
      });
  };
}
const сatalogueStore = new CatalogueStore();
export default сatalogueStore
