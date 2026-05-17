import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { supabase } from "../../lib/supabaseClient";
import { useNavigate } from "react-router-dom";
import "./AccountPage.css";

type Section = "email" | "password" | "delete" | null;

export default function AccountPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [activeSection, setActiveSection] = useState<Section>(null);

  const [newEmail, setNewEmail] = useState("");
  const [emailMsg, setEmailMsg] = useState<{ text: string; ok: boolean } | null>(null);
  const [emailLoading, setEmailLoading] = useState(false);


  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [passwordMsg, setPasswordMsg] = useState<{ text: string; ok: boolean } | null>(null);
  const [passwordLoading, setPasswordLoading] = useState(false);



  const [deleteConfirm, setDeleteConfirm] = useState("");
  const [deleteMsg, setDeleteMsg] = useState<{ text: string; ok: boolean } | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  function toggle(section: Section) {
    setActiveSection((prev) => (prev === section ? null : section));
    setEmailMsg(null);
    setPasswordMsg(null);
    setDeleteMsg(null);
    setNewEmail("");
    setNewPassword("");
    setConfirmPassword("");
    setDeleteConfirm("");
  }

  async function handleEmailChange(e: React.ChangeEvent) {
    e.preventDefault();
    if (!newEmail) return;
    setEmailLoading(true);
    setEmailMsg(null);
    const { error } = await supabase.auth.updateUser({ email: newEmail });
    setEmailLoading(false);
    if (error) setEmailMsg({ text: error.message, ok: false });
    else setEmailMsg({ text: "Email de confirmation envoyé à " + newEmail, ok: true });
  }

  function isValidPassword(password: string) {
    return (
      password.length >= 6 &&
      /[0-9]/.test(password) &&
      /[^A-Za-z0-9]/.test(password)
    );
  }

  async function handlePasswordChange(e: React.ChangeEvent) {
    e.preventDefault();
    setPasswordMsg(null);

    if (!isValidPassword(newPassword)) {
      setPasswordMsg({
        text: "Le mot de passe doit contenir au moins 6 caractères, un chiffre et un caractère spécial",
        ok: false,
      });
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordMsg({ text: "Les mots de passe ne correspondent pas", ok: false });
      return;
    }

    setPasswordLoading(true);
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    setPasswordLoading(false);

    if (error) setPasswordMsg({ text: error.message, ok: false });
    else {
      setPasswordMsg({ text: "Mot de passe mis à jour avec succès", ok: true });
      setNewPassword("");
      setConfirmPassword("");
    }
  }

  async function handleDeleteAccount(e: React.ChangeEvent) {
    e.preventDefault();
    if (deleteConfirm !== "SUPPRIMER") {
      setDeleteMsg({ text: 'Tapez exactement "SUPPRIMER" pour confirmer', ok: false });
      return;
    }

    setDeleteLoading(true);
    setDeleteMsg(null);


    const { error } = await supabase.functions.invoke("delete-user");

    setDeleteLoading(false);

    if (error) {
      setDeleteMsg({ text: error.message, ok: false });
    } else {
      await logout();
      navigate("/");
    }
  }

  return (
    <div className="account-page">
      <div className="account-header">
        <h1>Mon compte</h1>
        <p className="account-email">{user?.email}</p>
      </div>

      <div className="account-sections">

        <div className={`account-card ${activeSection === "email" ? "open" : ""}`}>
          <button className="card-trigger" onClick={() => toggle("email")}>
            <div className="card-trigger-left">
              <div>
                <span className="card-title">Adresse mail</span>
                <span className="card-sub">{user?.email}</span>
              </div>
            </div>
            <span className={`card-chevron ${activeSection === "email" ? "rotated" : ""}`}>›</span>
          </button>

          {activeSection === "email" && (
            <div className="card-body">
              <form onSubmit={handleEmailChange}>
                <label>
                  Nouvel email
                  <input
                    type="email"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    placeholder="nouveau@exemple.com"
                    required
                  />
                </label>
                {emailMsg && (
                  <p className={`form-msg ${emailMsg.ok ? "ok" : "err"}`}>{emailMsg.text}</p>
                )}
                <button className="cta" type="submit" disabled={emailLoading}>
                  {emailLoading ? "Envoi..." : "Changer l'email"}
                </button>
              </form>
            </div>
          )}
        </div>

        {/* ── Password ── */}
        <div className={`account-card ${activeSection === "password" ? "open" : ""}`}>
          <button className="card-trigger" onClick={() => toggle("password")}>
            <div className="card-trigger-left">
              <div>
                <span className="card-title">Mot de passe</span>
                <span className="card-sub">••••••••</span>
              </div>
            </div>
            <span className={`card-chevron ${activeSection === "password" ? "rotated" : ""}`}>›</span>
          </button>

          {activeSection === "password" && (
            <div className="card-body">
              <form onSubmit={handlePasswordChange}>
                <label>
                  Nouveau mot de passe
                  <div className="input-row">
                    <input
                      type={showNew ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Nouveau mot de passe"
                      required
                    />
                    <button type="button" className="cta toggle-btn" onClick={() => setShowNew(v => !v)}>
                      {showNew ? "Masquer" : "Voir"}
                    </button>
                  </div>
                </label>

                <label>
                  Confirmer le mot de passe
                  <div className="input-row">
                    <input
                      type={showConfirm ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirmer le mot de passe"
                      required
                    />
                    <button type="button" className="cta toggle-btn" onClick={() => setShowConfirm(v => !v)}>
                      {showConfirm ? "Masquer" : "Voir"}
                    </button>
                  </div>
                </label>

                {passwordMsg && (
                  <p className={`form-msg ${passwordMsg.ok ? "ok" : "err"}`}>{passwordMsg.text}</p>
                )}
                <button className="cta" type="submit" disabled={passwordLoading}>
                  {passwordLoading ? "Mise à jour..." : "Changer le mot de passe"}
                </button>
              </form>
            </div>
          )}
        </div>

        {/* ── Delete ── */}
        <div className={`account-card danger-card ${activeSection === "delete" ? "open" : ""}`}>
          <button className="card-trigger" onClick={() => toggle("delete")}>
            <div className="card-trigger-left">
              <div>
                <span className="card-title">Supprimer le compte</span>
                <span className="card-sub">Action irréversible</span>
              </div>
            </div>
            <span className={`card-chevron ${activeSection === "delete" ? "rotated" : ""}`}>›</span>
          </button>

          {activeSection === "delete" && (
            <div className="card-body">
              <p className="danger-warning">
                Cette action est <strong>irréversible</strong>. Toutes vos données seront supprimées définitivement.
              </p>
              <form onSubmit={handleDeleteAccount}>
                <label>
                  Tapez <strong>SUPPRIMER</strong> pour confirmer
                  <input
                    type="text"
                    value={deleteConfirm}
                    onChange={(e) => setDeleteConfirm(e.target.value)}
                    placeholder="SUPPRIMER"
                    required
                  />
                </label>
                {deleteMsg && (
                  <p className={`form-msg ${deleteMsg.ok ? "ok" : "err"}`}>{deleteMsg.text}</p>
                )}
                <button className="cta danger-btn" type="submit" disabled={deleteLoading}>
                  {deleteLoading ? "Suppression..." : "Supprimer définitivement"}
                </button>
              </form>
            </div>
          )}
        </div>

      </div>

      <button className="cta logout-btn" onClick={async () => { await logout(); navigate("/"); }}>
        Se déconnecter
      </button>
    </div>
  );
}