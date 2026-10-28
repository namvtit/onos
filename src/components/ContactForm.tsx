"use client";

import { useState, type ComponentProps } from "react";

/** Retains the original form node and fields; no personal data leaves the browser. */
export function ContactForm({ children, ...props }: ComponentProps<"form">) {
  const [submitted, setSubmitted] = useState(false);
  const password = props.className?.includes("w-password-page");
  return (
    <form {...props} onSubmit={(event) => {
      event.preventDefault();
      if (event.currentTarget.reportValidity()) setSubmitted(true);
    }}>
      {children}
      {submitted && <p role="status" className="local-form-status">
        {password
          ? "This demo has no password authentication service."
          : "This demo does not send submissions. Email onospod.com@gmail.com for production enquiries."}
      </p>}
    </form>
  );
}
