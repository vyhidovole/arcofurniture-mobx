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

    setFormData({
      ...formData,
      [name]: value, // Обновляем значение поля в state формы
    });

    // Обновляем состояние формы для текущего поля
    const updatedFormData = { ...formData, [name]: value };
    setFormData(updatedFormData);

    // Валидируем только текущее поле
    const validationErrors = {
      ...errors,
      [name]: validateForm({ [name]: value })[name],
    };

    // Обновляем состояние ошибок
    setErrors(validationErrors);
  };

  /**
   * Обработчик при отправке данных
   *
   * @param {Event} e - Объект события отправки формы
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    // Проверка наличия пустых полей
    const isEmptyField = Object.values(formData).some(
      (value) => value.trim() === ""
    );

    if (isEmptyField) {
      console.log("Поля обязательны к заполнению");
    } else {
      // Передать новые данные
      setNewState(formData);

      // Очистить форму
      resetForm();
    }
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
  };
}

export default useForm;
