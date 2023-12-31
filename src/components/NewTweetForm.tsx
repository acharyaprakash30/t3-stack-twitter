import type { NextPage } from "next";
import React, { useState, useRef, useCallback, useLayoutEffect } from "react";
import Button from "./Button";
import { ProfileImage } from "./ProfileImage";
import { useSession } from "next-auth/react";

function updateTextAreaSize(textArea?: HTMLTextAreaElement) {
  if (textArea == null) return;
  textArea.style.height = "0";
  textArea.style.height = `${textArea.scrollHeight}px`;
}

const NewTweetForm: NextPage = () => {


  const session = useSession();
  if (session.status !== "authenticated") return null;
  return <Form />;
  function Form() {
      const session = useSession();
      const [inputValue, setInputValue] = useState("");
    const textAreaRef = useRef<HTMLTextAreaElement>();
    const inputRef = useCallback((textArea: HTMLTextAreaElement) => {
      updateTextAreaSize(textArea);
      textAreaRef.current = textArea;
    }, []);
    useLayoutEffect(() => {
      updateTextAreaSize(textAreaRef.current);
    }, [inputValue]);

    return (
      <form className="flex flex-col gap-2 border-b px-4 py-2">
        <div className="flex gap-4">
          {/* <ProfileImage src={session.data.user.image} /> */}
          <textarea
            ref={inputRef}
            style={{ height: 0 }}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="flex-grow resize-none overflow-hidden p-4 text-lg outline-none"
            placeholder="What's happening?"
          />
        </div>

        <Button className="self-end" small={false} gray={false}>
          Tweet Now
        </Button>
      </form>
    );
  }
};

export default NewTweetForm;
