import React, { useState } from "react";

function ExpenseForm() {
    const [dateTime, setDateTime] = useState("");
    const [author, setAuthor] = useState("");
    const [sum, setSum] = useState("");
    const [category, setCategory] = useState("");
    const [comment, setComment] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const transactionData = { dateTime, author, sum, category, comment };

        try {
            const response = await fetch(
                "http://localhost:3000/api/transactions",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(transactionData),
                }
            );

            if (!response.ok) {
                throw new Error("Ошибка при сохранении данных");
            }

            console.log("Данные успешно сохранены!");
        } catch (error) {
            console.error("Ошибка:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Дата:
                <input
                    type="datetime-local"
                    value={dateTime}
                    onChange={(e) => setDateTime(e.target.value)}
                />
            </label>
            <label>
                Автор:
                <input
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                />
            </label>
            <label>
                Сумма:
                <input
                    type="number"
                    value={sum}
                    onChange={(e) => setSum(e.target.value)}
                />
            </label>
            <label>
                Категория:
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option value="">Выберите категорию</option>
                    <option value="еда">Еда</option>
                    <option value="транспорт">Транспорт</option>
                    <option value="развлечения">Развлечения</option>
                </select>
            </label>
            <label>
                Комментарий:
                <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
            </label>
            <button type="submit">Добавить расход</button>
        </form>
    );
}

export default ExpenseForm;
