import React, { useState, useRef } from "react";
import { sendContactForm } from "services";

const Contact = () => {
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const formRef = useRef();
  const [isLoading, setIsLoading] = useState(false);

  const submitContact = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(async () => {
      const res = await sendContactForm({
        name: e.target[0].value,
        email: e.target[1].value,
        comment: e.target[2].value,
      });

      setIsLoading(false);

      if (res === 0) {
        setMessage("Дякуємо за повідомлення!");
        formRef.current.reset();
      } else {
        setMessage("Упс, щось пішло не по плану, спробуйте ще!");
      }

      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
      }, 3000);
    }, 2000);
  };

  return (
    <div className="webdesigntuts-workshop bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 max-w-2xl py-12">
        <h1 className="text-3xl font-semibold text-gray-800 dark:text-white mb-8">
          Зворотній звя'зок! 
        </h1>
        {showMessage && (
          <div className="text-green-400 mb-4 bg-white rounded p-4 shadow">
            {message}
          </div>
        )}
        <form
          ref={formRef}
          onSubmit={submitContact}
          className="webdesigntuts-workshop form space-y-6 relative"
        >
          <div>
            <label
              htmlFor="name"
              className="text-gray-800 dark:text-white block mb-1"
            >
              Ім'я*
            </label>
            <input
              id="name"
              required
              type="text"
              minLength={3}
              maxLength={25}
              className="webdesigntuts-workshop input w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="Введіть ваше ім'я"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="text-gray-800 dark:text-white block mb-1"
            >
              Поштова адреса*
            </label>
            <input
              id="email"
              required
              type="email"
              className="webdesigntuts-workshop input w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="Введіть свою пошту"
            />
          </div>
          <div>
            <label
              htmlFor="comment"
              className="text-gray-800 dark:text-white block mb-1"
            >
              Ваше повідомлення*
            </label>
            <textarea
              id="comment"
              required
              rows={5}
              className="webdesigntuts-workshop input w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="Введіть своє повідомлення"
            ></textarea>
          </div>
          <button
            type="submit"
            className="  btn-neon "
            disabled={isLoading}
          >
            {isLoading ? (
             "Відправка..."
            ) : (
              "Надіслати"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
 
export default Contact;
