import { makeObservable, observable, action } from "mobx";

/**
 * Базовый класс с состоянием.
 * @class
 */
class BaseStore {
  constructor() {
    /**
     * Состояние загрузки.
     * @observable
     * @type {boolean}
     */
    this.isLoading = false;

    /**
     * Метод для установки сообщения об ошибке.
     * @action
     * @param {string} errorMessage - Сообщение об ошибке.
     */
    this.setError = errorMessage => console.error(errorMessage);

    /**
     * Метод для сброса состояния загрузки.
     * @action
     */
    this.resetState = () => this.isLoading = false;

    makeObservable(this, {
      isLoading: observable,
      setError: action,
      resetState: action,
    });
  }
}

export default BaseStore;

// observable (наблюдаемое): помечает свойство или объект как наблюдаемое, т.е. MobX будет отслеживать эти изменения.

// action (действие): все наблюдаемые изменения внутри этого метода будут оповещены наблюдателями (реактивными компонентами), только после завершения выполнения всего действия.

// computed (вычисляемое свойство): результат вычислений, зависящих от одного или нескольких наблюдаемых свойств. MobX автоматически отслеживает эти зависимости, и когда одно из зависимых свойств изменяется, вычисляемое свойство автоматически пересчитывается.
