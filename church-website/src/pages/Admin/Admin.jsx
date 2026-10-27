import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { supabase } from "../../lib/supabase";
import { listEvents, saveEvent, deleteEvent, uploadEventImage } from "../../lib/events";
import "./Admin.css";

const emptyForm = {
  id: null,
  title: "",
  description: "",
  image_url: "",
  event_date: "",
  event_time: "",
  location: "",
};

function LoginForm() {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setError(t("admin.loginError"));
    setBusy(false);
  };

  return (
    <form className="admin-panel admin-login" onSubmit={handleSubmit}>
      <h2>{t("admin.loginTitle")}</h2>
      <label>
        {t("admin.email")}
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </label>
      <label>
        {t("admin.password")}
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </label>
      {error && <p className="admin-error">{error}</p>}
      <button className="btn" type="submit" disabled={busy}>
        {t("admin.login")}
      </button>
    </form>
  );
}

function EventForm({ initial, onSaved, onCancel }) {
  const { t } = useTranslation();
  const [form, setForm] = useState(initial);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(initial.image_url);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    setForm(initial);
    setFile(null);
    setPreview(initial.image_url);
  }, [initial]);

  const update = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const handleFile = (e) => {
    const chosen = e.target.files[0];
    if (!chosen) return;
    setFile(chosen);
    setPreview(URL.createObjectURL(chosen));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const image_url = file ? await uploadEventImage(file) : form.image_url;
      await saveEvent({
        ...form,
        image_url: image_url || null,
        event_date: form.event_date || null,
      });
      onSaved();
    } catch (err) {
      setError(err.message);
    }
    setBusy(false);
  };

  return (
    <form className="admin-panel event-form" onSubmit={handleSubmit}>
      <h2>{form.id ? t("admin.editEvent") : t("admin.newEvent")}</h2>

      <label>
        {t("admin.fields.title")} *
        <input value={form.title} onChange={update("title")} required />
      </label>

      <label>
        {t("admin.fields.description")}
        <textarea rows={6} value={form.description || ""} onChange={update("description")} />
      </label>

      <label>
        {t("admin.fields.image")}
        <input type="file" accept="image/*" onChange={handleFile} />
      </label>
      {preview && <img className="event-form-preview" src={preview} alt="" />}

      <div className="event-form-row">
        <label>
          {t("event-details-page.labels.date")}
          <input type="date" value={form.event_date || ""} onChange={update("event_date")} />
        </label>
        <label>
          {t("event-details-page.labels.time")}
          <input value={form.event_time || ""} onChange={update("event_time")} placeholder="10:00" />
        </label>
      </div>

      <label>
        {t("event-details-page.labels.location")}
        <input value={form.location || ""} onChange={update("location")} />
      </label>

      {error && <p className="admin-error">{error}</p>}

      <div className="event-form-actions">
        <button className="btn" type="submit" disabled={busy}>
          {busy ? t("admin.saving") : t("admin.save")}
        </button>
        {form.id && (
          <button className="btn btn-ghost" type="button" onClick={onCancel}>
            {t("admin.cancel")}
          </button>
        )}
      </div>
    </form>
  );
}

export default function Admin() {
  const { t } = useTranslation();
  const [session, setSession] = useState(null);
  const [events, setEvents] = useState([]);
  const [editing, setEditing] = useState(emptyForm);

  useEffect(() => {
    if (!supabase) return;
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data } = supabase.auth.onAuthStateChange((_event, s) => setSession(s));
    return () => data.subscription.unsubscribe();
  }, []);

  const refresh = () => listEvents().then(setEvents);

  useEffect(() => {
    if (session) refresh();
  }, [session]);

  if (!supabase) {
    return (
      <div className="admin-page">
        <div className="admin-panel">
          <h2>{t("admin.title")}</h2>
          <p>{t("admin.notConfigured")}</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="admin-page">
        <LoginForm />
      </div>
    );
  }

  const handleDelete = async (event) => {
    if (!window.confirm(t("admin.confirmDelete", { title: event.title }))) return;
    await deleteEvent(event.id);
    if (editing.id === event.id) setEditing(emptyForm);
    refresh();
  };

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1>{t("admin.title")}</h1>
        <button className="btn btn-ghost" onClick={() => supabase.auth.signOut()}>
          {t("admin.logout")}
        </button>
      </div>

      <div className="admin-layout">
        <EventForm
          initial={editing}
          onSaved={() => {
            setEditing({ ...emptyForm });
            refresh();
          }}
          onCancel={() => setEditing({ ...emptyForm })}
        />

        <div className="admin-panel">
          <h2>{t("admin.allEvents")}</h2>
          {events.length === 0 && <p>{t("home-page.noEvents")}</p>}
          <ul className="admin-event-list">
            {events.map((event) => (
              <li key={event.id}>
                {event.image_url && <img src={event.image_url} alt="" />}
                <div className="admin-event-info">
                  <strong>{event.title}</strong>
                  <span>{event.event_date}</span>
                </div>
                <button className="link-btn" onClick={() => setEditing(event)}>
                  {t("admin.edit")}
                </button>
                <button className="link-btn danger" onClick={() => handleDelete(event)}>
                  {t("admin.delete")}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
