import { useRef, useState, type FormEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import ArrowLink from "../components/ArrowLink";
import PageShell from "../components/PageShell";
import { ARTISTS } from "../data/artists";
import { STYLES } from "../data/works";
import { SITE } from "../data/site";
import { EASE } from "../lib/motion";
import { useSeo } from "../lib/seo";
import styles from "./Booking.module.css";

type Fields = {
  name: string;
  email: string;
  phone: string;
  artist: string;
  style: string;
  placement: string;
  size: string;
  idea: string;
  date: string;
  consent: boolean;
};

type Errors = Partial<Record<keyof Fields, string>>;

const EMPTY: Fields = {
  name: "",
  email: "",
  phone: "",
  artist: "No preference",
  style: "",
  placement: "",
  size: "",
  idea: "",
  date: "",
  consent: false,
};

const MAX_FILES = 5;
const MAX_BYTES = 8 * 1024 * 1024;

function validate(f: Fields): Errors {
  const e: Errors = {};
  if (!f.name.trim()) e.name = "Please tell us your name.";
  if (!f.email.trim()) e.email = "We need an email address to reply to.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.trim())) e.email = "That email address doesn't look right.";
  if (!f.idea.trim()) e.idea = "Describe the idea, even roughly.";
  else if (f.idea.trim().length < 12) e.idea = "A little more detail helps us match you to an artist.";
  if (!f.consent) e.consent = "We need your consent before we can hold your details.";
  return e;
}

export default function Booking() {
  const reduced = useReducedMotion() ?? false;
  const [fields, setFields] = useState<Fields>(EMPTY);
  const [files, setFiles] = useState<File[]>([]);
  const [fileError, setFileError] = useState<string | null>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [prepared, setPrepared] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  useSeo({
    title: "Book a session",
    path: "/booking",
    description:
      "Request a tattoo session at GADELLAA ARTS TATTOO STUDIO in Nyeri, Kenya. Tell us the idea, the placement and the artist you'd like to work with.",
  });

  const set = <K extends keyof Fields>(key: K, value: Fields[K]) => {
    setFields((f) => ({ ...f, [key]: value }));
    setErrors((e) => (e[key] ? { ...e, [key]: undefined } : e));
  };

  const onFiles = (list: FileList | null) => {
    setFileError(null);
    if (!list) return;
    const picked = Array.from(list);
    if (picked.length > MAX_FILES) {
      setFileError(`Please choose ${MAX_FILES} images or fewer.`);
      return;
    }
    const tooBig = picked.find((f) => f.size > MAX_BYTES);
    if (tooBig) {
      setFileError(`"${tooBig.name}" is over 8MB. Please send a smaller version.`);
      return;
    }
    setFiles(picked);
  };

  /** Compose the request as plain text. Nothing is transmitted from here. */
  const compose = (f: Fields, refs: File[]) =>
    [
      `TATTOO SESSION REQUEST — ${SITE.name}`,
      "",
      `Name:               ${f.name}`,
      `Email:              ${f.email}`,
      `Phone:              ${f.phone || "—"}`,
      `Preferred artist:   ${f.artist}`,
      `Style:              ${f.style || "Not sure yet"}`,
      `Placement:          ${f.placement || "—"}`,
      `Approximate size:   ${f.size || "—"}`,
      `Preferred date:     ${f.date || "Flexible"}`,
      `Reference images:   ${refs.length ? refs.map((r) => r.name).join(", ") : "None attached"}`,
      "",
      "The idea:",
      f.idea,
      "",
      `Consent given to hold these details for the purpose of this enquiry: yes`,
    ].join("\n");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const found = validate(fields);
    setErrors(found);

    if (Object.keys(found).length > 0) {
      // Move focus to the first problem rather than leaving it to be hunted for.
      const first = Object.keys(found)[0];
      const el = formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`);
      el?.focus();
      return;
    }

    setPrepared(compose(fields, files));
    setCopied(false);
  };

  const reset = () => {
    setFields(EMPTY);
    setFiles([]);
    setErrors({});
    setFileError(null);
    setPrepared(null);
  };

  const copy = async () => {
    if (!prepared) return;
    try {
      await navigator.clipboard.writeText(prepared);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  const mailto = prepared
    ? `mailto:${SITE.contact.email}?subject=${encodeURIComponent(
        `Session request — ${fields.name}`,
      )}&body=${encodeURIComponent(prepared)}`
    : "#";

  return (
    <PageShell
      eyebrow="Booking"
      lines={["Ready for", "your next piece?"]}
      intro="Tell us what you're imagining. We'll help shape the idea, choose the right artist and plan your session. Consultations are free."
    >
      <section className={["section", "theme-light", styles.section].join(" ")} aria-label="Booking request">
        <div className={["shell", styles.grid].join(" ")}>
          <div className={styles.formCol}>
            {prepared ? (
              <motion.div
                className={styles.done}
                initial={reduced ? { opacity: 0 } : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reduced ? 0.2 : 0.6, ease: EASE }}
                role="status"
              >
                <p className="label">Request prepared</p>
                <h2 className={["display", styles.doneHeading].join(" ")}>
                  Not sent yet — this site has no booking backend.
                </h2>
                <p className={["body-text", styles.doneBody].join(" ")}>
                  Your request has been assembled below but nothing has been transmitted. Send it with the button
                  below, or wire this form up to the studio's own booking or email system. Any reference images you
                  chose stay on your device — attach them to the email yourself.
                </p>

                <pre className={styles.summary}>{prepared}</pre>

                <div className={styles.doneActions}>
                  <ArrowLink href={mailto} variant="button">
                    Send by email
                  </ArrowLink>
                  <ArrowLink onClick={copy}>{copied ? "Copied to clipboard" : "Copy request"}</ArrowLink>
                  <ArrowLink onClick={reset}>Start again</ArrowLink>
                </div>

                <p className={["label", styles.devNote].join(" ")}>
                  For the developer: submit handling lives in src/pages/Booking.tsx — replace the compose step with a
                  POST to the studio's endpoint.
                </p>
              </motion.div>
            ) : (
              <form ref={formRef} className={styles.form} onSubmit={onSubmit} noValidate>
                <fieldset className={styles.fieldset}>
                  <legend className={["label", styles.legend].join(" ")}>About you</legend>

                  <div className={styles.row}>
                    <Field
                      label="Name"
                      name="name"
                      required
                      value={fields.name}
                      error={errors.name}
                      onChange={(v) => set("name", v)}
                      autoComplete="name"
                    />
                    <Field
                      label="Email"
                      name="email"
                      type="email"
                      required
                      value={fields.email}
                      error={errors.email}
                      onChange={(v) => set("email", v)}
                      autoComplete="email"
                    />
                  </div>

                  <div className={styles.row}>
                    <Field
                      label="Phone"
                      name="phone"
                      type="tel"
                      value={fields.phone}
                      onChange={(v) => set("phone", v)}
                      autoComplete="tel"
                      hint="Optional"
                    />
                    <Select
                      label="Preferred artist"
                      name="artist"
                      value={fields.artist}
                      onChange={(v) => set("artist", v)}
                      options={["No preference", ...ARTISTS.map((a) => a.name)]}
                    />
                  </div>
                </fieldset>

                <fieldset className={styles.fieldset}>
                  <legend className={["label", styles.legend].join(" ")}>The piece</legend>

                  <div className={styles.row}>
                    <Select
                      label="Style"
                      name="style"
                      value={fields.style}
                      onChange={(v) => set("style", v)}
                      options={["Not sure yet", ...STYLES]}
                    />
                    <Field
                      label="Placement"
                      name="placement"
                      value={fields.placement}
                      onChange={(v) => set("placement", v)}
                      hint="e.g. inner forearm"
                    />
                  </div>

                  <div className={styles.row}>
                    <Field
                      label="Approximate size"
                      name="size"
                      value={fields.size}
                      onChange={(v) => set("size", v)}
                      hint="e.g. 12cm"
                    />
                    <Field
                      label="Preferred date"
                      name="date"
                      type="date"
                      value={fields.date}
                      onChange={(v) => set("date", v)}
                      hint="Optional"
                    />
                  </div>

                  <Field
                    label="The idea"
                    name="idea"
                    textarea
                    required
                    value={fields.idea}
                    error={errors.idea}
                    onChange={(v) => set("idea", v)}
                    hint="What it is, what it's for, and anything you'd rather we avoided."
                  />

                  <div className={styles.field}>
                    <label htmlFor="refs" className={["label", styles.label].join(" ")}>
                      Reference images
                      <span className={styles.hint}>Up to {MAX_FILES} images, 8MB each. Optional.</span>
                    </label>
                    <input
                      id="refs"
                      name="refs"
                      type="file"
                      accept="image/*"
                      multiple
                      className={styles.file}
                      onChange={(e) => onFiles(e.target.files)}
                      aria-describedby={fileError ? "refs-error" : undefined}
                    />
                    {files.length > 0 && (
                      <ul className={styles.fileList}>
                        {files.map((f) => (
                          <li key={f.name}>
                            {f.name} · {(f.size / 1024 / 1024).toFixed(1)}MB
                          </li>
                        ))}
                      </ul>
                    )}
                    {fileError && (
                      <p id="refs-error" className={styles.error} role="alert">
                        {fileError}
                      </p>
                    )}
                  </div>
                </fieldset>

                <div className={styles.consent}>
                  <input
                    id="consent"
                    name="consent"
                    type="checkbox"
                    checked={fields.consent}
                    onChange={(e) => set("consent", e.target.checked)}
                    aria-invalid={errors.consent ? "true" : undefined}
                    aria-describedby={errors.consent ? "consent-error" : undefined}
                    className={styles.checkbox}
                  />
                  <label htmlFor="consent" className={styles.consentLabel}>
                    I'm happy for {SITE.shortName} to hold these details in order to answer my enquiry.
                    <span className={styles.required} aria-hidden="true">
                      {" "}
                      *
                    </span>
                  </label>
                </div>
                {errors.consent && (
                  <p id="consent-error" className={styles.error} role="alert">
                    {errors.consent}
                  </p>
                )}

                <div className={styles.submit}>
                  <ArrowLink type="submit" variant="button">
                    Prepare request
                  </ArrowLink>
                  <p className={["label", styles.submitNote].join(" ")}>
                    Nothing is sent automatically — you'll see the request before it goes anywhere.
                  </p>
                </div>
              </form>
            )}
          </div>

          <aside className={styles.aside}>
            <dl className={styles.info}>
              <div>
                <dt className="label">Studio</dt>
                <dd>
                  {SITE.city}, {SITE.country}
                </dd>
              </div>
              <div>
                <dt className="label">Hours</dt>
                <dd>{SITE.contact.hours}</dd>
              </div>
              <div>
                <dt className="label">Email</dt>
                <dd>
                  <a href={`mailto:${SITE.contact.email}`} className={styles.infoLink}>
                    {SITE.contact.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="label">Phone</dt>
                <dd>
                  <a href={SITE.contact.phoneHref} className={styles.infoLink}>
                    {SITE.contact.phone}
                  </a>{" "}
                  ·{" "}
                  <a href={SITE.contact.whatsapp} target="_blank" rel="noreferrer noopener" className={styles.infoLink}>
                    WhatsApp
                  </a>
                </dd>
              </div>
            </dl>
          </aside>
        </div>
      </section>
    </PageShell>
  );
}

/* ---- inputs -------------------------------------------------------------- */

type FieldProps = {
  label: string;
  name: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  textarea?: boolean;
  error?: string;
  hint?: string;
  autoComplete?: string;
};

function Field({ label, name, value, onChange, type = "text", required, textarea, error, hint, autoComplete }: FieldProps) {
  const describedBy = [error ? `${name}-error` : null, hint ? `${name}-hint` : null].filter(Boolean).join(" ");

  return (
    <div className={styles.field}>
      <label htmlFor={name} className={["label", styles.label].join(" ")}>
        {label}
        {required && (
          <span className={styles.required} aria-hidden="true">
            {" "}
            *
          </span>
        )}
        {hint && (
          <span id={`${name}-hint`} className={styles.hint}>
            {hint}
          </span>
        )}
      </label>

      {textarea ? (
        <textarea
          id={name}
          name={name}
          rows={6}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={[styles.input, styles.textarea, error ? styles.inputError : ""].filter(Boolean).join(" ")}
          aria-invalid={error ? "true" : undefined}
          aria-describedby={describedBy || undefined}
          required={required}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={[styles.input, error ? styles.inputError : ""].filter(Boolean).join(" ")}
          aria-invalid={error ? "true" : undefined}
          aria-describedby={describedBy || undefined}
          autoComplete={autoComplete}
          required={required}
        />
      )}

      {error && (
        <p id={`${name}-error`} className={styles.error} role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

type SelectProps = {
  label: string;
  name: string;
  value: string;
  onChange: (v: string) => void;
  options: readonly string[];
};

function Select({ label, name, value, onChange, options }: SelectProps) {
  return (
    <div className={styles.field}>
      <label htmlFor={name} className={["label", styles.label].join(" ")}>
        {label}
      </label>
      <div className={styles.selectWrap}>
        <select
          id={name}
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={[styles.input, styles.select].join(" ")}
        >
          {value === "" && <option value="">Select…</option>}
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
        <svg className={styles.chevron} viewBox="0 0 12 8" width="12" height="8" aria-hidden="true">
          <path d="M1 1.5 6 6.5l5-5" fill="none" stroke="currentColor" strokeWidth="1" />
        </svg>
      </div>
    </div>
  );
}
