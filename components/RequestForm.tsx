"use client";

import { useMemo, useState } from "react";
import type { ServiceFormType } from "@/lib/content";
import { CONTACT } from "@/lib/content";

type Props = {
  serviceTitle: string;
  serviceCategory: string;
  formType: ServiceFormType;
};

type Status = "idle" | "loading" | "ok" | "error";

const urgenceOptionsByType: Record<
  ServiceFormType,
  Array<{ value: string; label: string }>
> = {
  debouchage: [
    { value: "immediate", label: "Immédiate" },
    { value: "aujourdhui", label: "Aujourd’hui" },
    { value: "24-48h", label: "Dans 24–48h" },
    { value: "non-urgente", label: "Non urgente" },
  ],
  fuite: [
    { value: "immediate", label: "Immédiate" },
    { value: "aujourdhui", label: "Aujourd’hui" },
    { value: "24-48h", label: "Dans 24–48h" },
    { value: "non-urgente", label: "Non urgente" },
  ],
  inspection: [
    { value: "aujourdhui", label: "Aujourd’hui" },
    { value: "24-48h", label: "Dans 24–48h" },
    { value: "cette-semaine", label: "Cette semaine" },
    { value: "non-urgente", label: "Non urgente" },
  ],
  nettoyage: [
    { value: "24-48h", label: "Dans 24–48h" },
    { value: "cette-semaine", label: "Cette semaine" },
    { value: "date-a-definir", label: "Date à définir" },
  ],
  generic: [
    { value: "non-urgente", label: "Non urgente" },
    { value: "24-48h", label: "Dans 24–48h" },
  ],
};

function labelForType(formType: ServiceFormType) {
  switch (formType) {
    case "debouchage":
      return "Débouchage / Urgence";
    case "fuite":
      return "Fuite / Humidité";
    case "inspection":
      return "Inspection / Égouts";
    case "nettoyage":
      return "Nettoyage / Sinistre";
    default:
      return "Demande";
  }
}

export default function RequestForm({
  serviceTitle,
  serviceCategory,
  formType,
}: Props) {
  const [status, setStatus] = useState<Status>("idle");
  const [feedback, setFeedback] = useState<string>("");

  const urgenceOptions = useMemo(
    () => urgenceOptionsByType[formType],
    [formType]
  );

  const showAssurance = formType === "fuite" || formType === "inspection";
  const showFuiteExtras = formType === "fuite";
  const showInspectionExtras = formType === "inspection";
  const showNettoyageExtras = formType === "nettoyage";

  const isUrgenceType = formType === "debouchage";

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setFeedback("");

    const fd = new FormData(e.currentTarget);

    // honeypot anti-spam
    const hp = String(fd.get("website") || "");
    if (hp.trim().length > 0) {
      setStatus("ok");
      window.location.href = `/merci?service=${encodeURIComponent(
        serviceTitle
      )}`;
      return;
    }

    const payload = {
      meta: {
        serviceTitle,
        serviceCategory,
        formType,
        page: typeof window !== "undefined" ? window.location.pathname : "",
        submittedAt: new Date().toISOString(),
      },

      description: String(fd.get("description") || ""),
      urgence: String(fd.get("urgence") || ""),
      logement: String(fd.get("logement") || ""),
      etage: String(fd.get("etage") || ""),
      adresse: String(fd.get("adresse") || ""),
      disponibilites: String(fd.get("disponibilites") || ""),
      paiement: String(fd.get("paiement") || ""),

      nom: String(fd.get("nom") || ""),
      telephone: String(fd.get("telephone") || ""),
      email: String(fd.get("email") || ""),

      // extras fuite
      fuiteType: String(fd.get("fuiteType") || ""),
      signes: String(fd.get("signes") || ""),
      assurance: String(fd.get("assurance") || ""),

      // extras inspection
      acces: String(fd.get("acces") || ""),
      odeurs: String(fd.get("odeurs") || ""),
      assuranceInspection: String(fd.get("assuranceInspection") || ""),

      // extras nettoyage
      contexteNettoyage: String(fd.get("contexteNettoyage") || ""),
      niveau: String(fd.get("niveau") || ""),
      evacuation: String(fd.get("evacuation") || ""),
    };

    // validation minimale
    if (
      !payload.description.trim() ||
      !payload.nom.trim() ||
      !payload.telephone.trim() ||
      !payload.email.trim() ||
      !payload.adresse.trim() ||
      !payload.disponibilites.trim()
    ) {
      setStatus("error");
      setFeedback("Merci de compléter les champs obligatoires.");
      return;
    }

    try {
      const res = await fetch("/forms/demande.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = await res.json().catch(() => null);
      if (!res.ok || !json?.ok)
        throw new Error(json?.error || "Erreur serveur");

      setStatus("ok");

      // redirection page Merci (plus pro + mieux pour l’utilisateur)
      window.location.href = `/merci?service=${encodeURIComponent(
        serviceTitle
      )}`;
    } catch {
      setStatus("error");
      setFeedback(
        "Désolé, l’envoi a échoué. Réessayez ou contactez-nous par téléphone."
      );
    }
  }

  return (
    <form onSubmit={onSubmit} className="card">
      <div style={{ display: "grid", gap: 6 }}>
        <h2 className="h2">Demande d’intervention</h2>
        <div className="lead" style={{ marginTop: 0 }}>
          <strong>{serviceTitle}</strong> — {labelForType(formType)}
        </div>
      </div>

      {/* Bloc urgence visible */}
      {isUrgenceType ? (
        <div className="card" style={{ marginTop: 14, borderStyle: "dashed" }}>
          <div style={{ fontWeight: 800 }}>
            🚨 Urgence ? Appelez directement
          </div>
          <div className="lead" style={{ marginTop: 8 }}>
            <a
              className="pill pillPrimary"
              href={`tel:${CONTACT.phone1.replace(/\s/g, "")}`}
            >
              {CONTACT.phone1}
            </a>{" "}
            <a
              className="pill"
              href={`tel:${CONTACT.phone2.replace(/\s/g, "")}`}
            >
              {CONTACT.phone2}
            </a>
          </div>
          <div className="lead" style={{ marginTop: 10 }}>
            Pour un reflux important / débordement, l’appel est plus rapide que
            le formulaire.
          </div>
        </div>
      ) : null}

      {/* Honeypot anti-spam */}
      <div
        style={{
          position: "absolute",
          left: "-9999px",
          height: 0,
          overflow: "hidden",
        }}
        aria-hidden="true"
      >
        <label className="label" htmlFor="website">
          Website
        </label>
        <input
          id="website"
          name="website"
          className="input"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div style={{ marginTop: 14 }}>
        <label className="label">Décrivez votre problème *</label>
        <textarea
          name="description"
          required
          className="textarea"
          rows={6}
          placeholder="Ex: évier bouché, reflux, odeurs, fuite plafond, humidité mur, etc."
        />
      </div>

      <div className="formGrid2" style={{ marginTop: 14 }}>
        <div>
          <label className="label">Urgence *</label>
          <select
            name="urgence"
            required
            className="select"
            defaultValue={urgenceOptions[0]?.value || "non-urgente"}
          >
            {urgenceOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="label">Type de bien *</label>
          <select
            name="logement"
            required
            className="select"
            defaultValue="maison"
          >
            <option value="maison">Maison</option>
            <option value="appartement">Appartement</option>
            <option value="commerce">Commerce / Pro</option>
          </select>
        </div>

        <div>
          <label className="label">Étage (si appartement)</label>
          <input name="etage" className="input" placeholder="Ex: 2e" />
        </div>

        <div>
          <label className="label">Mode de paiement</label>
          <select name="paiement" className="select" defaultValue="bancontact">
            <option value="bancontact">Bancontact</option>
            <option value="cash">Cash</option>
          </select>
        </div>
      </div>

      {/* Extras FUITE */}
      {showFuiteExtras ? (
        <div className="card" style={{ marginTop: 14 }}>
          <div style={{ fontWeight: 750, marginBottom: 10 }}>
            Infos complémentaires — fuite / humidité
          </div>
          <div className="formGrid2">
            <div>
              <label className="label">Type de fuite présumée</label>
              <select
                name="fuiteType"
                className="select"
                defaultValue="inconnu"
              >
                <option value="inconnu">Inconnu</option>
                <option value="eau">Eau</option>
                <option value="chauffage">Chauffage</option>
                <option value="toiture">Toiture</option>
                <option value="enterree">Canalisation enterrée</option>
              </select>
            </div>
            <div>
              <label className="label">Signes visibles</label>
              <input
                name="signes"
                className="input"
                placeholder="Ex: taches, moisissures, odeur, goutte à goutte…"
              />
            </div>
          </div>

          {showAssurance ? (
            <div style={{ marginTop: 12 }}>
              <label className="label">Assurance déjà contactée ?</label>
              <select name="assurance" className="select" defaultValue="non">
                <option value="non">Non</option>
                <option value="oui">Oui</option>
              </select>
            </div>
          ) : null}
        </div>
      ) : null}

      {/* Extras INSPECTION */}
      {showInspectionExtras ? (
        <div className="card" style={{ marginTop: 14 }}>
          <div style={{ fontWeight: 750, marginBottom: 10 }}>
            Infos complémentaires — inspection / égouts
          </div>
          <div className="formGrid2">
            <div>
              <label className="label">
                Accès existant (regard, cave, chambre de visite…)
              </label>
              <input
                name="acces"
                className="input"
                placeholder="Ex: regard extérieur, cave, garage…"
              />
            </div>
            <div>
              <label className="label">Odeurs présentes ?</label>
              <select name="odeurs" className="select" defaultValue="inconnu">
                <option value="inconnu">Je ne sais pas</option>
                <option value="oui">Oui</option>
                <option value="non">Non</option>
              </select>
            </div>
          </div>

          {showAssurance ? (
            <div style={{ marginTop: 12 }}>
              <label className="label">Assurance concernée ?</label>
              <select
                name="assuranceInspection"
                className="select"
                defaultValue="non"
              >
                <option value="non">Non</option>
                <option value="oui">Oui</option>
              </select>
            </div>
          ) : null}
        </div>
      ) : null}

      {/* Extras NETTOYAGE */}
      {showNettoyageExtras ? (
        <div className="card" style={{ marginTop: 14 }}>
          <div style={{ fontWeight: 750, marginBottom: 10 }}>
            Infos complémentaires — nettoyage
          </div>
          <div className="formGrid2">
            <div>
              <label className="label">Contexte</label>
              <select
                name="contexteNettoyage"
                className="select"
                defaultValue="fin-de-bail"
              >
                <option value="fin-de-bail">
                  Fin de bail / état des lieux
                </option>
                <option value="degats-des-eaux">Dégâts des eaux</option>
                <option value="incendie">Incendie</option>
                <option value="insalubrite">Insalubrité</option>
                <option value="squat">Squat</option>
                <option value="autre">Autre</option>
              </select>
            </div>
            <div>
              <label className="label">Niveau de saleté</label>
              <select name="niveau" className="select" defaultValue="standard">
                <option value="standard">Standard</option>
                <option value="intensif">Intensif</option>
                <option value="extreme">Extrême</option>
              </select>
            </div>
          </div>

          <div style={{ marginTop: 12 }}>
            <label className="label">Évacuation déchets/encombrants ?</label>
            <select name="evacuation" className="select" defaultValue="inconnu">
              <option value="inconnu">Je ne sais pas</option>
              <option value="oui">Oui</option>
              <option value="non">Non</option>
            </select>
          </div>
        </div>
      ) : null}

      <div style={{ marginTop: 14 }}>
        <label className="label">Adresse complète *</label>
        <input
          name="adresse"
          required
          className="input"
          placeholder="Rue, numéro, code postal, ville"
        />
      </div>

      <div style={{ marginTop: 14 }}>
        <label className="label">Disponibilités (jours & heures) *</label>
        <input
          name="disponibilites"
          required
          className="input"
          placeholder="Ex: Lun–Jeu après 17h, Sam matin"
        />
      </div>

      <div className="formGrid2" style={{ marginTop: 14 }}>
        <div>
          <label className="label">Nom & prénom *</label>
          <input name="nom" required className="input" />
        </div>
        <div>
          <label className="label">Téléphone *</label>
          <input
            name="telephone"
            required
            className="input"
            placeholder="Ex: 0471 32 57 24"
          />
        </div>
        <div>
          <label className="label">Email *</label>
          <input
            type="email"
            name="email"
            required
            className="input"
            placeholder="vous@exemple.com"
          />
        </div>
      </div>

      <div
        style={{
          marginTop: 16,
          display: "flex",
          gap: 12,
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <button
          type="submit"
          className="btnPrimary"
          disabled={status === "loading"}
        >
          {status === "loading" ? "Envoi..." : "Envoyer la demande"}
        </button>
        <span className="lead" style={{ marginTop: 0 }}>
          {feedback
            ? feedback
            : "Réponse rapide. Tarifs clairs annoncés à l’avance."}
        </span>
      </div>

      {status === "error" ? (
        <p style={{ marginTop: 10, color: "#b91c1c", fontWeight: 650 }}>
          Si le formulaire ne fonctionne pas, appelez-nous directement.
        </p>
      ) : null}
    </form>
  );
}
