"use client";

import { AlertCircle, CheckCircle2, Loader2, Send } from "lucide-react";
import { useId, useState } from "react";

import { Button } from "@/components/ui/Button";
import { links } from "@/data/site";
import { cn } from "@/lib/utils";

/**
 * Set NEXT_PUBLIC_WEB3FORMS_KEY to make the form actually send mail. Until then
 * it degrades to composing the message in the visitor's mail client, so the
 * submit button is never a no-op and no backend is faked.
 */
const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;
const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

type Field = "name" | "email" | "message";
type FormValues = Record<Field, string>;
type FormErrors = Partial<Record<Field, string>>;
type Status = "idle" | "submitting" | "success" | "error";

const EMPTY: FormValues = { name: "", email: "", message: "" };
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};

  if (values.name.trim().length < 2) {
    errors.name = "Please enter your name.";
  }

  if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }

  if (values.message.trim().length < 10) {
    errors.message = "A little more detail helps — at least 10 characters.";
  }

  return errors;
}

export function ContactForm() {
  const formId = useId();
  const [values, setValues] = useState<FormValues>(EMPTY);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const setField = (field: Field) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const next = { ...values, [field]: event.target.value };
    setValues(next);

    // Only clear errors while typing; never introduce new ones mid-keystroke.
    if (errors[field]) {
      setErrors(validate(next));
    }
  };

  const blurField = (field: Field) => () => {
    setTouched((current) => ({ ...current, [field]: true }));
    setErrors(validate(values));
  };

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validate(values);
    setErrors(nextErrors);
    setTouched({ name: true, email: true, message: true });

    if (Object.keys(nextErrors).length > 0) {
      setStatus("error");
      setStatusMessage("Please fix the highlighted fields and try again.");
      return;
    }

    if (!WEB3FORMS_KEY) {
      const subject = encodeURIComponent(`Portfolio enquiry from ${values.name}`);
      const body = encodeURIComponent(
        `${values.message}\n\n— ${values.name} (${values.email})`,
      );

      // Handing the mailto: to an anchor lets the OS mail handler take it,
      // which a location assignment does not reliably do.
      const anchor = document.createElement("a");
      anchor.href = `mailto:${links.email}?subject=${subject}&body=${body}`;
      anchor.rel = "noopener";
      anchor.click();

      setStatus("success");
      setStatusMessage("Opening your mail app with the message ready to send.");
      return;
    }

    setStatus("submitting");
    setStatusMessage("");

    try {
      const response = await fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `Portfolio enquiry from ${values.name}`,
          from_name: "Portfolio contact form",
          name: values.name,
          email: values.email,
          message: values.message,
        }),
      });

      if (!response.ok) throw new Error(`Request failed: ${response.status}`);

      setStatus("success");
      setStatusMessage("Thanks — your message is on its way. I'll reply soon.");
      setValues(EMPTY);
      setTouched({});
    } catch {
      setStatus("error");
      setStatusMessage(
        `Something went wrong. Please email me directly at ${links.email}.`,
      );
    }
  }

  const showError = (field: Field) => Boolean(touched[field] && errors[field]);

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField
          id={`${formId}-name`}
          label="Name"
          value={values.name}
          onChange={setField("name")}
          onBlur={blurField("name")}
          error={showError("name") ? errors.name : undefined}
          autoComplete="name"
          placeholder="Jane Doe"
        />

        <TextField
          id={`${formId}-email`}
          label="Email"
          type="email"
          value={values.email}
          onChange={setField("email")}
          onBlur={blurField("email")}
          error={showError("email") ? errors.email : undefined}
          autoComplete="email"
          placeholder="jane@company.com"
        />
      </div>

      <TextField
        id={`${formId}-message`}
        label="Message"
        multiline
        value={values.message}
        onChange={setField("message")}
        onBlur={blurField("message")}
        error={showError("message") ? errors.message : undefined}
        placeholder="Tell me about the role, project or idea…"
      />

      {/* Honeypot: real people never see or fill this. */}
      <input
        type="checkbox"
        name="botcheck"
        tabIndex={-1}
        aria-hidden
        className="hidden"
      />

      <div className="flex flex-wrap items-center gap-4">
        <Button
          type="submit"
          size="lg"
          disabled={status === "submitting"}
          leading={
            status === "submitting" ? (
              <Loader2 aria-hidden className="h-4 w-4 animate-spin" />
            ) : (
              <Send aria-hidden className="h-4 w-4" />
            )
          }
        >
          {status === "submitting" ? "Sending…" : "Send Message"}
        </Button>

        {!WEB3FORMS_KEY ? (
          <p className="text-[12px] leading-relaxed text-subtle">
            Opens in your mail app — no message is stored anywhere.
          </p>
        ) : null}
      </div>

      <p
        role="status"
        aria-live="polite"
        className={cn(
          "flex items-start gap-2 text-[13px] leading-relaxed",
          status === "success" && "text-accent",
          status === "error" && "text-red-500 dark:text-red-400",
          (status === "idle" || status === "submitting") && "sr-only",
        )}
      >
        {status === "success" ? (
          <CheckCircle2 aria-hidden className="mt-0.5 h-4 w-4 shrink-0" />
        ) : null}
        {status === "error" ? (
          <AlertCircle aria-hidden className="mt-0.5 h-4 w-4 shrink-0" />
        ) : null}
        {statusMessage}
      </p>
    </form>
  );
}

type TextFieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  onBlur: () => void;
  error?: string;
  type?: string;
  multiline?: boolean;
  placeholder?: string;
  autoComplete?: string;
};

function TextField({
  id,
  label,
  value,
  onChange,
  onBlur,
  error,
  type = "text",
  multiline = false,
  placeholder,
  autoComplete,
}: TextFieldProps) {
  const errorId = `${id}-error`;

  const shared = {
    id,
    name: id,
    value,
    onChange,
    onBlur,
    placeholder,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? errorId : undefined,
    className: cn(
      "w-full rounded-xl border bg-surface px-4 py-3 text-[14.5px] text-foreground transition-colors placeholder:text-subtle focus:outline-none focus-visible:border-accent",
      error ? "border-red-500/60" : "border-border hover:border-border-strong",
    ),
  };

  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-[13px] font-medium text-muted"
      >
        {label}
      </label>

      {multiline ? (
        <textarea {...shared} rows={5} className={cn(shared.className, "resize-y")} />
      ) : (
        <input {...shared} type={type} autoComplete={autoComplete} />
      )}

      {error ? (
        <p id={errorId} className="mt-2 text-[12.5px] text-red-500 dark:text-red-400">
          {error}
        </p>
      ) : null}
    </div>
  );
}
