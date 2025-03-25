// Ранее использовался отдельно, сейчас используем useForm
import React, { useState } from "react";
import { validateForm } from "../utils/validators";

/**
 * Хук для управления состоянием формы, валидацией и обработки отправки данных.
 *
 * @param {Object} initialState - Начальное состояние формы.
 * @param {function} setNewState - Функция для обновления состояния формы.
 * @returns {Object} - Объект с состоянием формы, ошибками и функциями.
 */
function useForm(initialState, setNewState) {
  // Состояние формы (значения полей)
  const [formData, setFormData] = useState(initialState);


  // Состояние для отслеживания ошибок валидации
  const [errors, setErrors] = useState({});



  /**
   * Обработчик при смене данных на элементе формы
   *
   * @param {Event} e - Объект события изменения данных на элементе формы
   */
  const handleChange = (e) => {
    // Извлекаем имя поля и его новое значение из события
    const { name, value } = e.target;

     // Обновляем состояние формы для текущего поля
    const updatedFormData = { ...formData, [name]: value };
    setFormData(updatedFormData);

    // Валидируем только текущее поле
    // const validationErrors = {
    //   ...errors,
    //   [name]: validateForm({ [name]: value })[name],
    // };
    // Валидируем всю форму
    const validationErrors = validateForm(updatedFormData); // Используйте обновленные данные

    // Обновляем состояние ошибок
    setErrors(validationErrors);

    console.log('Обновленное состояние формы:', updatedFormData);
    console.log('Ошибки после изменения:', validationErrors);
  };

  /**
   * Обработчик при отправке данных
   *
   * @param {Event} e - Объект события отправки формы
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    // Логируем состояние перед отправкой
    console.log('Состояние формы перед отправкой:', formData);
    console.log('Ошибки перед отправкой:', errors);
   
    // Проверка наличия ошибок
    const validationErrors = validateForm(formData);
    setErrors(validationErrors); // Устанавливаем ошибки

    if (Object.keys(validationErrors).length > 0) {
      console.log("Форма содержит ошибки:", validationErrors);
      return false; // Возвращаем false, если есть ошибки
    }

    // Если ошибок нет, передаем новые данные
    if (typeof setNewState === 'function') {
      console.log('Состояние формы перед отправкой:', formData);
      setNewState(formData);
    }

    // Сохраняем данные в localStorage
    localStorage.setItem('formData', JSON.stringify(formData));
    console.log('Данные сохранены в localStorage:', formData);
    // Проверка наличия пустых полей
    const isEmptyField = Object.values(formData).some(
      (value) => value.trim() === ""
    );

    if (isEmptyField) {
      console.log("Поля обязательны к заполнению");

    } else {
      // Передать новые данные
      if (typeof setNewState === 'function') {
        setNewState(formData); // Проверяем, что setNewState является функцией
      } else {
        console.error("setNewState не является функцией");
      }
      //Сохраняем данные в localStorage
      localStorage.setItem('formData', JSON.stringify(formData))
      console.log('Данные сохранены в localStorage:', formData)

      // Очистить форму
      resetForm();
    }
    // Имитация отправки данных
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Данные успешно отправлены:', formData); // Логируем данные
        resolve(true); // Успешная "отправка"
      }, 2000); // Задержка 2 секунды
    });


  };

  /**
   * Функция для сброса состояния формы.
   */
  const resetForm = () => {
    setFormData(initialState);
    setErrors({});
  };

  return {
    formData,
    errors,
    handleChange,
    handleSubmit,
    resetForm,
  };
}

export default useForm;
