"use client";

import { ChangeEvent, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { ServiceFormType } from "@/lib/content";
import { CONTACT } from "@/lib/content";
import {
  getFormsUrl,
  getSiteUrl,
  isFormsSubmissionSuccessful,
  parseFormsResponse,
} from "@/lib/forms";
import styles from "./RequestForm.module.scss";

type Props = {
  serviceTitle: string;
  serviceCategory: string;
  formType: ServiceFormType;
};

type Status = "idle" | "loading" | "ok" | "error";

type SelectedPhoto = {
  file: File;
  id: string;
  previewUrl: string;
};

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
  const [selectedPhotos, setSelectedPhotos] = useState<SelectedPhoto[]>([]);
  const photosInputRef = useRef<HTMLInputElement | null>(null);
  const selectedPhotosRef = useRef<SelectedPhoto[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<File | null>(null);
  const planInputRef = useRef<HTMLInputElement | null>(null);

  const urgenceOptions = useMemo(
    () => urgenceOptionsByType[formType],
    [formType]
  );

  const showAssurance = formType === "fuite" || formType === "inspection";
  const showFuiteExtras = formType === "fuite";
  const showInspectionExtras = formType === "inspection";
  const showNettoyageExtras = formType === "nettoyage";
  const maxPhotos = 5;
  const maxPhotoSizeBytes = 8 * 1024 * 1024;

  const isUrgenceType = formType === "debouchage";

  useEffect(() => {
    selectedPhotosRef.current = selectedPhotos;
  }, [selectedPhotos]);

  useEffect(() => {
    return () => {
      for (const photo of selectedPhotosRef.current) {
        URL.revokeObjectURL(photo.previewUrl);
      }
    };
  }, []);

  function onPhotosChange(e: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || []);

    if (files.length === 0) {
      return;
    }

    setSelectedPhotos((current) => {
      const next = [...current];

      for (const file of files) {
        const id = `${file.name}-${file.size}-${file.lastModified}`;
        const alreadySelected = next.some((existing) => existing.id === id);

        if (!alreadySelected) {
          next.push({
            file,
            id,
            previewUrl: URL.createObjectURL(file),
          });
        }
      }

      return next;
    });

    e.target.value = "";
  }

  function onPlanChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;
    setSelectedPlan(file);
    e.target.value = "";
  }

  function removePlan() {
    setSelectedPlan(null);
    if (planInputRef.current) planInputRef.current.value = "";
  }

  function removePhoto(indexToRemove: number) {
    setSelectedPhotos((current) => {
      const photoToRemove = current[indexToRemove];
      if (photoToRemove) {
        URL.revokeObjectURL(photoToRemove.previewUrl);
      }

      return current.filter((_, index) => index !== indexToRemove);
    });
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setFeedback("");

    const fd = new FormData(e.currentTarget);

    // honeypot anti-spam
    const hp = String(fd.get("website") || "");
    if (hp.trim().length > 0) {
      setStatus("ok");
      window.location.href = getSiteUrl(
        `/merci?service=${encodeURIComponent(serviceTitle)}`
      );
      return;
    }

    const payload = {
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

    // validation format téléphone belge (9-10 chiffres commençant par 0)
    const normalizedPhone = payload.telephone.replace(/[\s\-\.\/]/g, "");
    if (!/^0\d{8,9}$/.test(normalizedPhone)) {
      setStatus("error");
      setFeedback(
        "Numéro de téléphone invalide. Format belge attendu, ex : 0471 32 57 24."
      );
      return;
    }

    const photos = selectedPhotos.map((photo) => photo.file);

    if (photos.length > maxPhotos) {
      setStatus("error");
      setFeedback(`Merci de sélectionner au maximum ${maxPhotos} photos.`);
      return;
    }

    for (const photo of photos) {
      if (!photo.type.startsWith("image/")) {
        setStatus("error");
        setFeedback("Seuls les fichiers image sont acceptés.");
        return;
      }

      if (photo.size > maxPhotoSizeBytes) {
        setStatus("error");
        setFeedback("Chaque photo doit faire moins de 8 Mo.");
        return;
      }
    }

    if (selectedPlan) {
      const allowedPlanTypes = ["application/pdf", "image/jpeg", "image/png", "image/webp"];
      if (!allowedPlanTypes.includes(selectedPlan.type)) {
        setStatus("error");
        setFeedback("Le plan doit être un fichier PDF, JPG, PNG ou WEBP.");
        return;
      }
      if (selectedPlan.size > 10 * 1024 * 1024) {
        setStatus("error");
        setFeedback("Le plan doit faire moins de 10 Mo.");
        return;
      }
    }

    try {
      const requestData = new FormData();
      requestData.append(
        "meta",
        JSON.stringify({
          serviceTitle,
          serviceCategory,
          formType,
          page: typeof window !== "undefined" ? window.location.pathname : "",
          submittedAt: new Date().toISOString(),
        })
      );

      for (const [key, value] of Object.entries(payload)) {
        requestData.append(key, value);
      }

      requestData.append("website", hp);

      for (const photo of photos) {
        requestData.append("photos[]", photo, photo.name);
      }

      if (selectedPlan) {
        requestData.append("plan", selectedPlan, selectedPlan.name);
      }

      const res = await fetch(getFormsUrl("/forms/demande.php"), {
        method: "POST",
        body: requestData,
      });

      const json = await parseFormsResponse(res);
      if (!isFormsSubmissionSuccessful(res, json))
        throw new Error(json?.error || "Erreur serveur");

      setStatus("ok");
      for (const photo of selectedPhotos) {
        URL.revokeObjectURL(photo.previewUrl);
      }
      setSelectedPhotos([]);
      if (photosInputRef.current) photosInputRef.current.value = "";
      setSelectedPlan(null);
      if (planInputRef.current) planInputRef.current.value = "";

      // redirection page Merci (plus pro + mieux pour l’utilisateur)
      window.location.href = getSiteUrl(
        `/merci?service=${encodeURIComponent(serviceTitle)}`
      );
    } catch {
      setStatus("error");
      setFeedback(
        "Désolé, l’envoi a échoué. Réessayez ou contactez-nous par téléphone."
      );
    }
  }

  return (
    <motion.form
      onSubmit={onSubmit}
      className={`${styles.card} ${styles.form}`}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <motion.div
        className={styles.header}
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.35, ease: "easeOut", delay: 0.04 }}
      >
        <h2 className={styles.h2}>Demande d’intervention</h2>
        <div className={`${styles.lead} ${styles.leadTight}`}>
          <strong>{serviceTitle}</strong> — {labelForType(formType)}
        </div>
      </motion.div>

      <p className={`${styles.lead} ${styles.leadTight} ${styles.requiredNote}`}>
        Les champs marqués <span aria-hidden="true">*</span>
        <span className="sr-only">d&apos;un astérisque</span> sont obligatoires.
      </p>

      {/* Bloc urgence visible */}
      {isUrgenceType ? (
        <motion.div
          className={`${styles.sectionCard} ${styles.urgentCard}`}
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.3, ease: "easeOut", delay: 0.08 }}
        >
          <div className={styles.urgentTitle}>
            🚨 Urgence ? Appelez directement
          </div>
          <div className={`${styles.lead} ${styles.mt8}`}>
            <a
              className={`${styles.pill} ${styles.pillPrimary}`}
              href={`tel:${CONTACT.phone1.replace(/\s/g, "")}`}
            >
              {CONTACT.phone1}
            </a>{" "}
            <a
              className={styles.pill}
              href={`tel:${CONTACT.phone2.replace(/\s/g, "")}`}
            >
              {CONTACT.phone2}
            </a>
          </div>
          <div className={`${styles.lead} ${styles.mt10}`}>
            Pour un reflux important / débordement, l’appel est plus rapide que
            le formulaire.
          </div>
        </motion.div>
      ) : null}

      {/* Honeypot anti-spam */}
      <div className={styles.honeypot} aria-hidden="true">
        <label className={styles.label} htmlFor="website">
          Website
        </label>
        <input
          id="website"
          name="website"
          className={styles.input}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className={styles.mt14}>
        <label className={styles.label}>Décrivez votre problème *</label>
        <textarea
          name="description"
          required
          className={styles.textarea}
          rows={6}
          placeholder="Ex: évier bouché, reflux, odeurs, fuite plafond, humidité mur, etc."
        />
      </div>

      <div className={`${styles.formGrid2} ${styles.mt14}`}>
        <div>
          <label className={styles.label}>Urgence *</label>
          <select
            name="urgence"
            required
            className={styles.select}
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
          <label className={styles.label}>Type de bien *</label>
          <select
            name="logement"
            required
            className={styles.select}
            defaultValue="maison"
          >
            <option value="maison">Maison</option>
            <option value="appartement">Appartement</option>
            <option value="commerce">Commerce / Pro</option>
          </select>
        </div>

        <div>
          <label className={styles.label}>Étage (si appartement)</label>
          <input name="etage" className={styles.input} placeholder="Ex: 2e" />
        </div>

        <div>
          <label className={styles.label}>Mode de paiement</label>
          <select name="paiement" className={styles.select} defaultValue="bancontact">
            <option value="bancontact">Bancontact</option>
            <option value="cash">Cash</option>
          </select>
        </div>
      </div>

      {/* Extras FUITE */}
      {showFuiteExtras ? (
        <div className={styles.sectionCard}>
          <div className={styles.sectionTitle}>
            Infos complémentaires — fuite / humidité
          </div>
          <div className={styles.formGrid2}>
            <div>
              <label className={styles.label}>Type de fuite présumée</label>
              <select
                name="fuiteType"
                className={styles.select}
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
              <label className={styles.label}>Signes visibles</label>
              <input
                name="signes"
                className={styles.input}
                placeholder="Ex: taches, moisissures, odeur, goutte à goutte…"
              />
            </div>
          </div>

          {showAssurance ? (
            <div className={styles.mt12}>
              <label className={styles.label}>Assurance déjà contactée ?</label>
              <select name="assurance" className={styles.select} defaultValue="non">
                <option value="non">Non</option>
                <option value="oui">Oui</option>
              </select>
            </div>
          ) : null}
        </div>
      ) : null}

      {/* Extras INSPECTION */}
      {showInspectionExtras ? (
        <div className={styles.sectionCard}>
          <div className={styles.sectionTitle}>
            Infos complémentaires — inspection / égouts
          </div>
          <div className={styles.formGrid2}>
            <div>
              <label className={styles.label}>
                Accès existant (regard, cave, chambre de visite…)
              </label>
              <input
                name="acces"
                className={styles.input}
                placeholder="Ex: regard extérieur, cave, garage…"
              />
            </div>
            <div>
              <label className={styles.label}>Odeurs présentes ?</label>
              <select name="odeurs" className={styles.select} defaultValue="inconnu">
                <option value="inconnu">Je ne sais pas</option>
                <option value="oui">Oui</option>
                <option value="non">Non</option>
              </select>
            </div>
          </div>

          {showAssurance ? (
            <div className={styles.mt12}>
              <label className={styles.label}>Assurance concernée ?</label>
              <select
                name="assuranceInspection"
                className={styles.select}
                defaultValue="non"
              >
                <option value="non">Non</option>
                <option value="oui">Oui</option>
              </select>
            </div>
          ) : null}

          <div className={styles.mt12}>
            <label className={styles.label}>Plan de la maison (facultatif)</label>
            <input
              type="file"
              accept=".pdf,image/*"
              className={styles.fileInput}
              ref={planInputRef}
              onChange={onPlanChange}
            />
            <p className={`${styles.lead} ${styles.fileHelp}`}>
              PDF ou image, 10 Mo maximum. Utile pour guider l&apos;intervention.
            </p>
            {selectedPlan ? (
              <div className={styles.fileCard} style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 8 }}>
                <span className={styles.fileName}>{selectedPlan.name}</span>
                <button type="button" className={styles.fileRemove} onClick={removePlan}>
                  Retirer
                </button>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}

      {/* Extras NETTOYAGE */}
      {showNettoyageExtras ? (
        <div className={styles.sectionCard}>
          <div className={styles.sectionTitle}>
            Infos complémentaires — nettoyage
          </div>
          <div className={styles.formGrid2}>
            <div>
              <label className={styles.label}>Contexte</label>
              <select
                name="contexteNettoyage"
                className={styles.select}
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
              <label className={styles.label}>Niveau de saleté</label>
              <select name="niveau" className={styles.select} defaultValue="standard">
                <option value="standard">Standard</option>
                <option value="intensif">Intensif</option>
                <option value="extreme">Extrême</option>
              </select>
            </div>
          </div>

          <div className={styles.mt12}>
            <label className={styles.label}>Évacuation déchets/encombrants ?</label>
            <select name="evacuation" className={styles.select} defaultValue="inconnu">
              <option value="inconnu">Je ne sais pas</option>
              <option value="oui">Oui</option>
              <option value="non">Non</option>
            </select>
          </div>
        </div>
      ) : null}

      <div className={styles.mt14}>
        <label className={styles.label}>Adresse complète *</label>
        <input
          name="adresse"
          required
          className={styles.input}
          placeholder="Rue, numéro, code postal, ville"
        />
      </div>

      <div className={styles.mt14}>
        <label className={styles.label}>Disponibilités (jours & heures) *</label>
        <input
          name="disponibilites"
          required
          className={styles.input}
          placeholder="Ex: Lun–Jeu après 17h, Sam matin"
        />
      </div>

      <div className={styles.mt14}>
        <label className={styles.label}>Photos du problème</label>
        <input
          type="file"
          name="photos"
          accept="image/*"
          multiple
          className={styles.fileInput}
          ref={photosInputRef}
          onChange={onPhotosChange}
        />
        <p className={`${styles.lead} ${styles.fileHelp}`}>
          Vous pouvez joindre jusqu&apos;à 5 photos, 8 Mo maximum par fichier.
        </p>
        {selectedPhotos.length > 0 ? (
          <ul className={styles.fileGrid}>
            {selectedPhotos.map((photo, index) => (
              <li key={photo.id} className={styles.fileCard}>
                <img
                  src={photo.previewUrl}
                  alt={photo.file.name}
                  className={styles.filePreview}
                />
                <span className={styles.fileName}>{photo.file.name}</span>
                <button
                  type="button"
                  className={styles.fileRemove}
                  onClick={() => removePhoto(index)}
                >
                  Retirer
                </button>
              </li>
            ))}
          </ul>
        ) : null}
      </div>

      <div className={`${styles.formGrid2} ${styles.mt14}`}>
        <div>
          <label className={styles.label}>Nom & prénom *</label>
          <input name="nom" required className={styles.input} />
        </div>
        <div>
          <label className={styles.label}>Téléphone *</label>
          <input
            name="telephone"
            required
            className={styles.input}
            placeholder="Ex: 0471 32 57 24"
          />
        </div>
        <div>
          <label className={styles.label}>Email *</label>
          <input
            type="email"
            name="email"
            required
            className={styles.input}
            placeholder="vous@exemple.com"
          />
        </div>
      </div>

      <div className={styles.actionsRow}>
        <button
          type="submit"
          className={styles.btnPrimary}
          disabled={status === "loading"}
        >
          {status === "loading" ? "Envoi..." : "Envoyer la demande"}
        </button>
        <AnimatePresence mode="wait">
          <motion.span
            key={feedback || "default"}
            className={`${styles.lead} ${styles.leadTight}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            {feedback
              ? feedback
              : "Réponse rapide. Tarifs clairs annoncés à l’avance."}
          </motion.span>
        </AnimatePresence>
      </div>

      {status === "error" ? (
        <p className={styles.errorText}>
          Si le formulaire ne fonctionne pas, appelez-nous directement.
        </p>
      ) : null}
    </motion.form>
  );
}
