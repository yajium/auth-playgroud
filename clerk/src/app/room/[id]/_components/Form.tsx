"use client";

import { createChatAction } from "@/app/_components/action";
import { useRef, useState } from "react";

export default function Form({
  roomId,
  userId,
}: {
  roomId: number;
  userId: string;
}) {
  const [ispending, setIspending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(formData: FormData) {
    setIspending(true);
    setError(null);

    const message = formData.get("message");

    if (!message || typeof message !== "string") {
      setError("1文字以上の文字列を入力してください");
      setIspending(false);
      return;
    }

    await createChatAction(roomId, userId, message);
    setIspending(false);
    formRef.current?.reset();
  }

  return (
    <div className="my-10 bg-white">
      <form
        className="flex items-center border-t border-gray-200 p-4"
        action={handleSubmit}
        ref={formRef}
      >
        {error && (
          <div>
            <p className="text-red-500">{error}</p>
          </div>
        )}
        <input
          type="text"
          name="message"
          autoComplete="off"
          className="flex-grow rounded-lg border px-4 py-2 focus:border-blue-300 focus:outline-none focus:ring"
          placeholder="メッセージを入力..."
        />
        <button
          type="submit"
          disabled={ispending}
          className="ml-4 rounded-lg bg-blue-500 px-4 py-2 text-white focus:border-blue-300 focus:outline-none focus:ring"
        >
          送信
        </button>
      </form>
    </div>
  );
}
